#include <iostream>
#include <memory>
#include <functional>
#include <utility>
#include <vector>
#include <time.h>
#include <sys/time.h>

using namespace std;

template<typename T, typename ...Args>
std::unique_ptr<T> make_unique(Args&& ...args) {
  return std::unique_ptr<T>(new T(std::forward<Args>(args)...));
}

inline unsigned currentTime() {
  struct timeval tv;
  gettimeofday(&tv, nullptr);
  return unsigned(tv.tv_sec * 1000) + unsigned(tv.tv_usec / 1000);
}

struct Frame {
  vector<shared_ptr<void>> members;
};

static vector<Frame> frames;

inline void beginObject() {
  frames.emplace_back();
}

inline void cleanupObject() {
  auto& frame = frames.back();
  frames.pop_back();
  while (frame.members.size() > 0) {
    frame.members.pop_back();
  }
}

template <typename T, typename... Args>
inline T& member(Args&&... args) {
  auto _member = make_shared<T>(forward<Args>(args)...);
  frames.back().members.push_back(_member);
  return *_member;
}

template <typename T>
class Value {
  T value;

 public:
  void set(T const& newValue) {
    value = newValue;
  }

  T get() const {
    return value;
  }
};

using Float = Value<float>;

struct Activity {
  virtual ~Activity();
  virtual void perform() = 0;
};

Activity::~Activity() {}

inline Activity& runWithClock(function<void (Float const& time)> gen) {
  auto& _time = member<Float>();
  gen(_time);

  struct ActivityImpl : public Activity {
    Float& time;
    ActivityImpl(Float& _t): time(_t) {}

    virtual void perform() {
      auto t = currentTime();

      for (;;) {
        cout << "main\n";

        struct timespec req = {1, 0};
        nanosleep(&req, nullptr);

        auto t1 = currentTime();
        auto dt = t1 - t;
        time.set(time.get() + dt); // TODO: Switch to integer to avoid precision problems.
      }
    }
  };

  return member<ActivityImpl>(_time);
}

inline void activityMain(function<Activity& ()> genActivity) {
  beginObject();
  auto& activity = genActivity();
  activity.perform();
  cleanupObject();
}

int main() {
  activityMain([] () -> Activity& {
    return runWithClock([] (Float const& /*time*/) {
    });
  });
}
