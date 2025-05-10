import { NavLink } from "react-router-dom";

const Tabs = () => {
  return (
    <nav className="flex space-x-8 border-b border-gray-200">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
            isActive
              ? "border-primary-500 text-primary-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`
        }
      >
        Product Submission
      </NavLink>
      <NavLink
        to="/products"
        className={({ isActive }) =>
          `whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
            isActive
              ? "border-primary-500 text-primary-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`
        }
      >
        My Products
      </NavLink>
    </nav>
  );
};

export default Tabs;
