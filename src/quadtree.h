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
    Area(Coord _left, Coord _top, Coord _right, Coord _bottom):
      left(_left), top(_top), right(_right), bottom(_bottom) {}

    Coord left;
    Coord top;
    Coord right;
    Coord bottom;
  };

  template <typename Visitor>
  void visit(Area const& area, Visitor&& visitor) const {
    VisitRecurser<Visitor>(area, visitor)(root, rootScaleExponent, rootOffsetIndexX, rootOffsetIndexY);
  }

  void insert(Area const& area, Value payload) {
    asdf();
  }

 private:
  template <typename U> using shared_ptr = std::shared_ptr<U>;

  struct Node {
  };

  shared_ptr<Node> root;
  int rootScaleExponent;
  int rootOffsetIndexX;
  int rootOffsetIndexY;

  template <typename Visitor>
  struct VisitRecurser {
    Area const& area;
    Visitor& visitor;

    VisitRecurser(Area const& _area, Visitor& _visitor): visitor(_visitor), area(_area) {
    }

    void visitRecurse(shared_ptr<Node> const& node, int scaleExponent, int offsetIndexX, int offsetIndexY) {
      if (node == nullptr) {
        return;
      }

      auto strictSize = Coord(1 << scaleExponent);
      auto left = offsetIndexX * strictSize;
      auto top = offsetIndexY * strictSize;

      auto right = left + strictSize * 2;
      auto bottom = top + strictSize * 2;

      if (area.right < left || area.left >= right) {
        return;
      }

      if (area.bottom < top || area.top >= bottom) {
        return;
      }

      for (auto item : node->items) {
        auto& bounds = item.bounds;

        if (area.right < bounds.left || area.left >= bounds.right) {
          continue;
        }

        if (area.bottom < bounds.top || area.top >= bounds.bottom) {
          continue;
        }

        visitor(bounds, item.value);
      }

      visitRecurse(node->children[0][0], scaleExponent - 1, 2 * offsetIndexX, 2 * offsetIndexY);
      visitRecurse(node->children[0][1], scaleExponent - 1, 2 * offsetIndexX, 2 * offsetIndexY + 1);
      visitRecurse(node->children[1][0], scaleExponent - 1, 2 * offsetIndexX + 1, 2 * offsetIndexY);
      visitRecurse(node->children[1][1], scaleExponent - 1, 2 * offsetIndexX + 1, 2 * offsetIndexY + 1);
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
    tree.visit(area, [&results] (Area const& /*area*/, string const& payload) {
      results.insert(payload);
    });
    return results;
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
