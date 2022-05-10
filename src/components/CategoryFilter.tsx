import styled from "styled-components";
import { useEffect, useState } from "react";
import { axiosFetchCategories } from "../api";
import { Category, CategoryTreeNode, Filter } from "../interfaces";
import { makeCategoryTree } from "../utils/makeCategoryTree";

interface CategoryFilterProps {
  setFilter: React.Dispatch<React.SetStateAction<Filter | undefined>>;
}

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 35%;
  padding: 20px;
`;

const Children = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

const Parent = styled.div<{ isSelected: boolean }>`
  cursor: pointer;
  font-weight: ${({ isSelected }) => (isSelected ? "bold" : "normal")};
`;

const Child = styled.div<{ isSelected: boolean }>`
  margin-left: 20px;
  cursor: pointer;
  font-weight: ${({ isSelected }) => (isSelected ? "bold" : "normal")};
`;

const CategoryFilter = ({ setFilter }: CategoryFilterProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryTree, setCategoryTree] = useState<CategoryTreeNode[]>();
  const [currentCategory, setCurrentCategory] = useState<Category>();
  const [openedCategoryList, setOpenedCategoryList] = useState<boolean[]>([]);

  useEffect(() => {
    if (categories.length === 0)
      axiosFetchCategories().then((response) => setCategories(response));
  }, [categories]);

  useEffect(() => {
    const newCategoryTree = makeCategoryTree(categories);
    setCategoryTree(newCategoryTree);
  }, [categories]);

  useEffect(() => {
    const updateFilter = () => {
      if (currentCategory === undefined) return;

      setFilter((prevFilter) => {
        const newFilter = { ...prevFilter, categoryId: currentCategory.id };
        return newFilter;
      });
    };

    updateFilter();
  }, [currentCategory, setFilter]);

  useEffect(() => {
    const initOpenedCategoryList = () => {
      if (categoryTree === undefined) return;
      const newOpenedCategoryList = new Array(categoryTree.length).fill(false);
      setOpenedCategoryList(newOpenedCategoryList);
    };

    initOpenedCategoryList();
  }, [categoryTree]);

  const onParentCategoryClick = (selectedCategory: Category) => {
    let newOpenedCategoryList: boolean[] = openedCategoryList;
    newOpenedCategoryList[selectedCategory.id - 1] =
      !newOpenedCategoryList[selectedCategory.id - 1];

    setOpenedCategoryList([...newOpenedCategoryList]);
    setCurrentCategory(selectedCategory);
  };

  const onChildCategoryClick = (selectedCategory: Category) => {
    setCurrentCategory(selectedCategory);
  };

  return (
    <Container>
      <h4>[Category]</h4>
      <div>
        {categoryTree?.map((node: CategoryTreeNode) => (
          <div key={node.parent.id}>
            <Parent
              isSelected={node.parent.id === currentCategory?.id}
              onClick={() => onParentCategoryClick(node.parent)}
            >
              {node.parent.name}
            </Parent>
            <Children isOpen={openedCategoryList[node.parent.id - 1]}>
              {node.children?.map((child) => (
                <Child
                  key={child.id}
                  isSelected={child.id === currentCategory?.id}
                  onClick={() => onChildCategoryClick(child)}
                >
                  {child.name}
                </Child>
              ))}
            </Children>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default CategoryFilter;
