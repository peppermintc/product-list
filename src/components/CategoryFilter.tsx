import styled from "styled-components";
import { useEffect, useState } from "react";
import { fetchCategories } from "../api";
import { Category, CategoryTreeNode, Filter } from "../interfaces";
import { newCategoryTreeMaker, TreeNode } from "../utils/makeCategoryTree";

interface CategoryFilterProps {
  filter: Filter | undefined;
  setFilter: React.Dispatch<React.SetStateAction<Filter | undefined>>;
}

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 30%;
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

const CategoryItem = styled.div<{ isSelected: boolean; depth: number }>`
  cursor: pointer;
  font-weight: ${({ isSelected }) => (isSelected ? "bold" : "normal")};
  margin-left: ${({ depth }) => `${depth * 10}px`};
`;

const CategoryFilter = ({ filter, setFilter }: CategoryFilterProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryTree, setCategoryTree] = useState<TreeNode[]>([]);
  const [openedCategoryList, setOpenedCategoryList] = useState<boolean[]>([]);

  useEffect(() => {
    if (categories.length === 0)
      fetchCategories().then((response) => setCategories(response));
  }, [categories]);

  useEffect(() => {
    const newCategoryTree = newCategoryTreeMaker(categories);
    console.log(newCategoryTree);
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

  const renderCategoryTree = (categoryTree: TreeNode[]) => {
    const addChildren = (children: number[], depth: number) => {
      return children.map((childId) => {
        const childNode = categoryTree.find(
          (node) => node.current.id === childId
        );

        return (
          <CategoryItem
            key={childNode?.current.id}
            isSelected={childNode?.current.id === currentCategoryId}
            onClick={() => {}}
            depth={depth}
          >
            <span>{childNode?.current.name}</span>
            {childNode?.children !== undefined &&
              addChildren(childNode.children, depth + 1)}
          </CategoryItem>
        );
      });
    };

    return categoryTree.map((node: TreeNode) => (
      <CategoryItem
        key={node.current.id}
        isSelected={node.current.id === currentCategoryId}
        onClick={() => {}}
        depth={0}
      >
        <span>{node.current.name}</span>

        {addChildren(node.children, 1)}
      </CategoryItem>
    ));
  };

  const currentCategoryId = filter?.categoryId;

  return (
    <Container>
      <h4>[Category]</h4>
      <div>
        <All isSelected={currentCategoryId === undefined} onClick={onAllClick}>
          All
        </All>
        {renderCategoryTree(categoryTree)}
      </div>
    </Container>
  );
};

export default CategoryFilter;
