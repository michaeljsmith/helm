#include <iostream>
#include <memory>
#include <functional>
#include <utility>
#include <vector>
#include <time.h>
#include <sys/time.h>
#include <sys/ioctl.h>
#include <curses.h>
#include <boost/signal.hpp>
#include <boost/noncopyable.hpp>
#include <boost/lexical_cast.hpp>

using namespace std;
using boost::signal;
using boost::signals::connection;
using boost::noncopyable;
using boost::lexical_cast;

template<typename T, typename ...Args>
std::unique_ptr<T> make_unique(Args&& ...args) {
  return std::unique_ptr<T>(new T(forward<Args>(args)...));
}

inline unsigned currentTime() {
  struct timeval tv;
  gettimeofday(&tv, nullptr);
  return unsigned(tv.tv_sec * 1000) + unsigned(tv.tv_usec / 1000);
}

struct Frame {
  vector<function<void ()>> members; // TODO: Just make delete function.
};

static vector<Frame> frames;

inline void beginObject() {
  frames.emplace_back();
}

inline void cleanupObject() {
  auto& frame = frames.back();
  frames.pop_back();
  while (frame.members.size() > 0) {
    frame.members.back()();
    frame.members.pop_back();
  }
}

template <typename T, typename... Args>
inline T& member(Args&&... args) {
  auto _member = new T(forward<Args>(args)...);
  frames.back().members.push_back([=] () {
    delete _member;
  });
  return *_member;
}

inline void defer(function<void ()> fn) {
  frames.back().members.push_back(fn);
}

class ValueBase {
  mutable signal<void ()> sig;

 protected:
  void notify() {
    sig();
  }

 public:
  using ListenerHandle = connection;

  virtual ~ValueBase();

  ListenerHandle registerListener(function<void ()> handle) const {
    return sig.connect(handle);
  }

  void deregisterListener(ListenerHandle handle) const {
    handle.disconnect();
  }
};

ValueBase::~ValueBase() {}

template <typename T>
class Value : public ValueBase {
  T value;

 public:
  Value() {}
  Value(T const& v): value(v) {}

  void set(T const& newValue) {
    value = newValue;
    notify();
  }

  T get() const {
    return value;
  }
};

template <>
class Value<void> : public ValueBase {
 public:
  virtual ~Value();

  void set() {
    notify();
  }
};

Value<void>::~Value() {
}

template <typename T>
struct Size {
  Value<T> x;
  Value<T> y;

  Size() {}
  Size(T const& _x, T const& _y): x(_x), y(_y) {}
};

template <typename T>
inline Size<T> size(T const& x, T const& y) {
  return member<Size>(x, y);
}

template <typename T>
void listen(Value<T> const& _value, function<void ()> const& _fn) {
  auto _handle = _value.registerListener(_fn);
  defer([=, &_value]() {
    _value.deregisterListener(_handle);
  });
}

template <typename T>
void track(Value<T>& _dst, Value<T> const& _src) {
  _dst.set(_src.get());
  listen(_src, [&]() {
    _dst.set(_src.get());
  });
}

template <typename T>
Value<T> const& constant(T const& _value) {
  return member<Value<T>>(_value);
}

using Trigger = Value<void>;
using Integer = Value<int>;
using Float = Value<float>;

template <typename T>
Value<string> const& format(Value<T> const& _value) {
  auto& _out = member<Value<string>>(lexical_cast<string>(_value.get()));

  listen(_value, [&]() {
    _out.set(lexical_cast<string>(_value.get()));
  });

  return _out;
}

template <typename T>
struct Positionable : noncopyable {
  T& position;
  Positionable(T& _p): position(_p) {}
};

template <typename T>
struct Rigid : public Positionable<T> {
  T const& size;
  Rigid(T const& _s, T& _p): Positionable<T>(_p), size(_s) {}
};

template <typename T>
struct Flexible : public Positionable<T> {
  T& size;
  Flexible(T& _s, T& _p): Positionable<T>(_p), size(_s) {}
};

template <typename T, typename P, template <typename> class X, template <typename> class Y>
struct Layoutable {
  P payload;
  X<T>& x;
  Y<T>& y;

  Layoutable(P _p, X<T>& _x, Y<T>& _y): payload(_p), x(_x), y(_y) {}
};

struct Activity : noncopyable {
  virtual ~Activity();
  virtual void perform() = 0;
};

Activity::~Activity() {}

inline void activityMain(function<Activity& ()> genActivity) {
  beginObject();
  auto& activity = genActivity();
  activity.perform();
  cleanupObject();
}

inline Activity& runWithClock(function<void (Float const& time, Trigger const& loop)> gen) {
  auto& _time = member<Float>();
  auto& _loop = member<Trigger>();
  gen(_time, _loop);

  struct ActivityImpl : public Activity {
    Float& time;
    Trigger& loop;
    ActivityImpl(Float& _t, Trigger& _l): time(_t), loop(_l) {}

    virtual void perform() {
      auto t = currentTime();

      for (;;) {
        loop.set();

        // TODO: Amend sleep period to seek constant fps.
        struct timespec req = {1, 0};
        nanosleep(&req, nullptr);

        auto t1 = currentTime();
        auto dt = (t1 - t) / 1000.0f;
        t = t1;
        time.set(time.get() + dt); // TODO: Switch to integer to avoid precision problems.
      }
    }
  };

  return member<ActivityImpl>(_time, _loop);
}

struct Renderable : noncopyable {
  virtual ~Renderable();
  virtual void render() const = 0;
};

Renderable::~Renderable() {}

template <template <typename> class X, template <typename> class Y>
using Widget = Layoutable<Integer, Renderable const&, X, Y>;

inline Size<int>& terminalSize() {
  struct winsize ws;

  if (ioctl(0, TIOCGWINSZ, &ws) < 0) {
    cerr << "couldn't get window size: " << strerror(errno) << "\n"; // TODO: unthreadsafe
    exit(EXIT_FAILURE);
  }

  return member<Size<int>>(ws.ws_row, ws.ws_col);
}

inline void terminal_ui(Trigger const& _loop, Widget<Flexible, Flexible>& _widget) {

  WINDOW* window;
  if ((window = initscr()) == nullptr) {
    cerr << "Error initializing ncurses.\n";
    return;
  }

  noecho();
  nodelay(window, TRUE);
  keypad(window, TRUE);
  curs_set(0);

  defer([=]() {
    curs_set(1);
    delwin(window);
    endwin();
    refresh();
  });

  auto& _size = terminalSize();
  track(_widget.x.size, _size.x);
  track(_widget.y.size, _size.y);

  listen(_loop, [&]() {
    _widget.payload.render();
    refresh();
  });
}

inline Widget<Flexible, Flexible>& label(Value<string> const& _text) {
  class RenderableImpl : public Renderable {
    Value<string> const& text;
   public:
    RenderableImpl(Value<string> const& t): text(t) {}

    virtual void render() const {
      mvaddstr(5, 10, text.get().c_str());
    }
  };

  return member<Widget<Flexible, Flexible>>(
      member<RenderableImpl>(_text),
      member<Flexible<Integer>>(member<Integer>(), member<Integer>()),
      member<Flexible<Integer>>(member<Integer>(), member<Integer>()));
}

int main() {
  activityMain([] () -> Activity& {
    return runWithClock([] (Float const& _time, Trigger const& _loop) {

      terminal_ui(_loop, label(format(_time)));
    });
  });
}
