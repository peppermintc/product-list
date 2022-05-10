import { Category, CategoryTreeNode } from "../interfaces";

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
