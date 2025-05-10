import { useState } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";

const ProductForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
    features: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6 pb-2 border-b border-indigo-100">
        Product Details
      </h2>

      <div className="grid grid-cols-1 gap-6">
        <Input
          label="Product Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <Input
          label="Price"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
        />

        <div className="group">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-indigo-600 transition-colors duration-300"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-lg border-2 border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:ring-opacity-50 p-3 transition-all duration-300 hover:border-indigo-300"
          />
        </div>

        <Input
          label="Image URL (Optional)"
          type="url"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
        />

        <div className="group">
          <label
            htmlFor="features"
            className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-indigo-600 transition-colors duration-300"
          >
            Features (One per line)
          </label>
          <textarea
            id="features"
            name="features"
            rows={4}
            value={formData.features}
            onChange={handleChange}
            placeholder="Enter each feature on a new line"
            className="mt-1 block w-full rounded-lg border-2 border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:ring-opacity-50 p-3 transition-all duration-300 hover:border-indigo-300"
          />
          <p className="mt-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-600">
            Separate each feature with a new line
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
          className="w-full sm:w-auto"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            "Add Product"
          )}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
