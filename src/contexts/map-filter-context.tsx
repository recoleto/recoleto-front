import { createContext, useContext, useState } from "react";
import { UrbanSolidWasteCategory } from "@/utils/types";

type CategoryContextType = {
  selectedCategory: UrbanSolidWasteCategory | undefined;
  setSelectedCategory: (category: UrbanSolidWasteCategory | undefined) => void;
};

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState<UrbanSolidWasteCategory | undefined>();

  return (
    <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};
