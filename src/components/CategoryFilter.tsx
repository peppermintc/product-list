import styled from "styled-components";
import { useEffect, useState } from "react";
import { axiosFetchCategories } from "../api";
import { Category, CategoryTreeNode, Filter } from "../interfaces";
import { makeCategoryTree } from "../utils/makeCategoryTree";

interface CategoryFilterProps {
  filter: Filter | undefined;
  setFilter: React.Dispatch<React.SetStateAction<Filter | undefined>>;
}

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 35%;
  padding: 20px;
`;

const All = styled.div<{ isSelected: boolean }>`
  cursor: pointer;
  font-weight: ${({ isSelected }) => (isSelected ? "bold" : "normal")};
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

const CategoryFilter = ({ filter, setFilter }: CategoryFilterProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryTree, setCategoryTree] = useState<CategoryTreeNode[]>();
  const [openedCategoryList, setOpenedCategoryList] = useState<boolean[]>([]);

  const currentCategoryId = filter?.categoryId;

  useEffect(() => {
    if (categories.length === 0)
      axiosFetchCategories().then((response) => setCategories(response));
  }, [categories]);

  useEffect(() => {
    const newCategoryTree = makeCategoryTree(categories);
    setCategoryTree(newCategoryTree);
  }, [categories]);

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

    setFilter((prevFilter) => {
      const newFilter = { ...prevFilter, categoryId: selectedCategory.id };
      return newFilter;
    });
  };

  const onChildCategoryClick = (selectedCategory: Category) => {
    setFilter((prevFilter) => {
      const newFilter = { ...prevFilter, categoryId: selectedCategory.id };
      return newFilter;
    });
  };

  const onAllClick = () => {
    setFilter((prevFilter) => {
      const newFilter = { ...prevFilter, categoryId: undefined };
      return newFilter;
    });
  };

  return (
    <Container>
      <h4>[Category]</h4>
      <div>
        <All isSelected={currentCategoryId === undefined} onClick={onAllClick}>
          All
        </All>
        {categoryTree?.map((node: CategoryTreeNode) => (
          <div key={node.parent.id}>
            <Parent
              isSelected={node.parent.id === currentCategoryId}
              onClick={() => onParentCategoryClick(node.parent)}
            >
              {node.parent.name}
            </Parent>
            <Children isOpen={openedCategoryList[node.parent.id - 1]}>
              {node.children?.map((child) => (
                <Child
                  key={child.id}
                  isSelected={child.id === currentCategoryId}
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
