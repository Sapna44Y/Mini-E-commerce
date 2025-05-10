const Button = ({
  children,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
  ...props
}) => {
  const variants = {
    primary:
      "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-indigo-200",
    secondary:
      "bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
        variants[variant]
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
