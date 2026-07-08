import CategoryList from "./CategoryList";
import CategoryHeader from "./Header";
import CategoryStats from "./CategoryStats";

const CategoryDashboard = () => {
  return (
    <div className="w-full mx-auto">
      <div className="p-3 sm:p-5 md:p-6 lg:p-8 space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
        <CategoryHeader />
        <CategoryStats />
        <CategoryList />
      </div>
    </div>
  );
};

export default CategoryDashboard;
