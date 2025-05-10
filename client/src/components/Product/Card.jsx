import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-white rounded-xl overflow-hidden transition-all duration-300 
                border border-gray-200 hover:border-primary-300
                shadow-md hover:shadow-xl
                transform hover:-translate-y-1
                cursor-pointer"
    >
      <div className="aspect-w-4 aspect-h-3 bg-gray-100 overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-48 flex items-center justify-center bg-gradient-to-r from-primary-50 to-secondary-50 group-hover:from-primary-100 group-hover:to-secondary-100 transition-colors duration-300">
            <span className="text-gray-500 text-lg group-hover:text-gray-700 transition-colors duration-300">
              No Image
            </span>
          </div>
        )}
      </div>
      <div className="p-4 transition-colors duration-300 group-hover:bg-gray-50">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-primary-600 transition-colors duration-300">
            {product.name}
          </h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-primary-100 text-primary-700 group-hover:bg-primary-200 group-hover:text-primary-800 transition-colors duration-300">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <p className="mt-2 text-gray-600 line-clamp-2 group-hover:text-gray-800 transition-colors duration-300">
          {product.description}
        </p>
        <button
          className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium 
                    text-white bg-primary-600 hover:bg-primary-700 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
                    transition-colors duration-300 transform group-hover:scale-[1.02]"
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
