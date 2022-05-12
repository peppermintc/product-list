import { Category, CategoryTreeNode } from "../interfaces";

// NEW
// 트리의 노드는 parent가 null | Category, current는 Category, children은 Category[] | Category

export interface TreeNode {
  parent: Category | null;
  current: Category;
  children: Category[] | Category;
}

export const newCategoryTreeMaker = (categories: Category[]) => {
  let tree: TreeNode[] = [];

  categories.forEach((category: Category) => {
    const parent = categories.find((c) => c.id === category.parent_id) || null;
    const children = categories.filter((c) => c.parent_id === category.id);
    tree.push({ parent: parent, current: category, children: children });
  });

  return tree;
};

export const makeCategoryTree = (categories: Category[]) => {
  let categoryTree: CategoryTreeNode[] = [];

  categories.forEach((category: Category) => {
    if (category.parent_id === null)
      categoryTree.push({ parent: category, children: null });
  });

  categoryTree = categoryTree.map((categoryTreeNode: CategoryTreeNode) => {
    return {
      parent: categoryTreeNode.parent,
      children: categories.filter(
        (category) => category.parent_id === categoryTreeNode.parent.id
      ),
    };
  });

  return categoryTree;
};
