import React from 'react';

const Button = ({
  children,
  onClick,
  type = 'button', // 'button', 'submit', 'reset'
  variant = 'primary', // 'primary', 'secondary', 'danger', 'outline'
  size = 'md', // 'sm', 'md', 'lg'
  disabled = false,
  className = '', // Allow custom classes to be passed
  ...props // Spread any other props like aria-label, etc.
}) => {
  const baseStyles = "font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150";

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-indigo-500 dark:text-gray-200 dark:border-gray-500 dark:hover:bg-gray-700",
    // Add more variants as needed (e.g., 'ghost', 'link')
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed";

  const combinedClassName = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${disabled ? disabledStyles : ''}
    ${className}
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName.trim().replace(/\s+/g, ' ')} // Clean up extra spaces
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
