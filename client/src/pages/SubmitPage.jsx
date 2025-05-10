import { useNavigate } from "react-router-dom";
import ProductForm from "../components/Product/Form";
import useProducts from "../hooks/useProducts";

const SubmitPage = () => {
  const navigate = useNavigate();
  const { addProduct, loading } = useProducts();

  const handleSubmit = async (productData) => {
    const processedData = {
      ...productData,
      features: productData.features
        ? productData.features.split("\n").filter((f) => f.trim() !== "")
        : [],
    };

    const success = await addProduct(processedData);
    if (success) {
      navigate("/products");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-indigo-700 mb-3 transition-all duration-300 hover:text-indigo-800">
          Expand Your Product Catalog
        </h1>
        <p className="text-lg text-gray-600 transition-colors duration-300 hover:text-gray-700 max-w-2xl mx-auto">
          Add your unique products to our marketplace and connect with customers
          worldwide. Complete the form below to create your product listing.
        </p>
      </div>

      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-1 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="bg-white rounded-lg p-1">
          <ProductForm onSubmit={handleSubmit} isLoading={loading} />
        </div>
      </div>
    </div>
  );
};

export default SubmitPage;
