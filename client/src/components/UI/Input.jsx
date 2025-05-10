const Input = ({ label, type = "text", className = "", ...props }) => {
  return (
    <div className="group">
      {label && (
        <label
          htmlFor={props.name}
          className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-indigo-600 transition-colors duration-300"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`mt-1 block w-full rounded-lg border-2 border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:ring-opacity-50 p-3 transition-all duration-300 hover:border-indigo-300 ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
