#ifndef __QUAD_TREE_H__
#define __QUAD_TREE_H__

#include <set>
#include <memory>

template <typename C, typename T>
class QuadTree {
 public:
  using Coord = C;
  using Value = T;

  struct Area {
  };

  template <typename Visitor>
  void visit(Area const& area, Visitor&& visitor) {
    VisitRecurser<Visitor>(area, visitor)(root, rootScale(), rootOffsetX(), rootOffsetY());
  }

 private:
  template <typename U> using shared_ptr = std::shared_ptr<U>;

  struct Node {
  };

  shared_ptr<Node> root;

  template <typename Visitor>
  struct VisitRecurser {
    Area const& area;
    Visitor& visitor;

    VisitRecurser(Area const& _area, Visitor& _visitor): visitor(_visitor), area(_area) {
    }

    void visitRecurse(shared_ptr<Node> const& node, Coord scale, Coord x, Coord y) {
      asdf();
    }
  };

  Coord rootScale() {
    return (1 << rootScaleExponent);
  }

  Coord rootOffsetX() {
    return (1 << rootScaleExponent) * rootOffsetIndexX;
  }

  Coord rootOffsetY() {
    return (1 << rootScaleExponent) * rootOffsetIndexY;
  }
};

inline void testQuadTree() {
  using namespace std;

  using Tree = QuadTree<int, string>;
  using Area = Tree::Area;

  auto queryAsSet = [](Tree const& tree, Area const& area) {
    set<string> results;
    tree.visit(area, [&results] (Area const& area, string const& payload) {
      results.insert(payload);
    });
  };

  {
    Tree tree;
    assert(queryAsSet(tree, Area(0, 0, 1, 1)) == set<string> {});

    tree.insert(Area(3, 4, 0, 0), "string1");
    assert(queryAsSet(tree, Area(0, 0, 1, 1)) == set<string> {});
    assert(queryAsSet(tree, Area(3, 4, 0, 0)) == set<string> {});
    assert(queryAsSet(tree, Area(3, 4, 1, 1)) == set<string> {"string1"});
    assert(queryAsSet(tree, Area(-3, -4, 10, 10)) == set<string> {"string1"});
  }

  {
    Tree tree;
    tree.insert(Area(-3, -4, 0, 0), set<string> {"string2"});
    tree.insert(Area(-30, -40, 100, 100), set<string> {"string3"});
    assert(queryAsSet(tree, Area(-100, -100, 100, 100)), set<string> {});
    assert(queryAsSet(tree, Area(-10, -10, 2, 2)), set<string> {"string3"});
    assert(queryAsSet(tree, Area(-10, -10, 8, 8)), set<string> {"string2", "string3"});
  }
}

#endif //__QUAD_TREE_H__
