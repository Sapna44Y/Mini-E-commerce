import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/api";
import Spinner from "../components/UI/Spinner";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await getProductById(id);
        setProduct(response.data);
      } catch (err) {
        setError("Failed to fetch product details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg
              className="h-6 w-6 text-red-500 animate-pulse"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12 bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-lg hover:shadow-xl transition-all duration-500">
        <h3 className="mt-2 text-xl font-semibold text-gray-800">
          Product not found
        </h3>
        <button
          onClick={() => navigate("/products")}
          className="mt-6 inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-full shadow-md text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 transform hover:scale-105"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={`mb-8 inline-flex items-center px-4 py-2.5 border border-gray-300 text-sm font-medium rounded-full shadow-sm transition-all duration-300 ${
          isHovering
            ? "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 shadow-md -translate-x-1"
            : "bg-white text-gray-700"
        }`}
      >
        <svg
          className={`w-5 h-5 mr-2 transition-transform duration-300 ${
            isHovering ? "transform -translate-x-1" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Products
      </button>

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl">
        <div className="px-6 py-5 sm:px-8 flex justify-between items-center border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <span className="inline-flex items-center px-4 py-2 rounded-full text-xl font-semibold bg-gradient-to-br from-primary-100 to-primary-200 text-primary-800 shadow-inner">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <div className="px-6 py-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex justify-center items-center">
            {product.imageUrl ? (
              <div className="relative group">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="max-h-85 w-auto object-contain rounded-xl transform transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500"></div>
              </div>
            ) : (
              <div className="w-full h-64 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-inner">
                <span className="text-gray-500 text-lg">
                  No Image Available
                </span>
              </div>
            )}
          </div>
          <div className="space-y-8">
            <div className="p-6 bg-gray-50 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2 border-gray-200">
                Description
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2 border-gray-200">
                Features
              </h2>
              <ul className="space-y-3">
                {product.features?.length > 0 ? (
                  product.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start text-gray-700 hover:text-gray-900 transition-colors duration-200"
                    >
                      <svg
                        className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No features listed</li>
                )}
              </ul>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center">
                  <label
                    htmlFor="quantity"
                    className="mr-4 text-lg font-medium text-gray-700"
                  >
                    Quantity:
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-inner">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-center min-w-[3rem] font-medium text-gray-800 bg-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
