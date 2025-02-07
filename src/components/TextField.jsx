/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { FiEye, FiEyeOff } from "react-icons/fi";

const getErrorMessage = (type) => {
  if (type === "slug") {
    return (
      <div>
        Allowed Characters:
        <ul className="list-disc pl-5">
          <li>Uppercase alphabets</li>
          <li>Lowercase alphabets</li>
          <li>Numbers (0-9)</li>
          <li>Hyphen ( - )</li>
          <li>Underscore ( _ )</li>
        </ul>
      </div>
    );
  }
  return null;
};

const TextField = ({
    label,
    id,
    type,
    errors,
    register,
    required,
    message,
    className,
    inputClassName,
    min=1,
    max,
    value,
    placeholder,
    isSlug,
  }) => {

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

    return (
      <div className="relative flex flex-col gap-1">
        <label
          htmlFor={id}
          className={`${className ? className : ""} font-semibold text-md  `}
        >
          {label}
        </label>
  
        <input
          type={showPassword ? 'text' : type}
          id={id}
          placeholder={placeholder}
          className={`${className || ""} ${inputClassName || ""} px-2 py-2 border outline-none bg-transparent text-slate-700 rounded-md ${errors[id]?.message ? "border-red-500" : "border-slate-600"}`}
          {...register(id, {
            required: { value: required, message },
            minLength: min
              ? { value: min, message: `Minimum ${min} character(s) are required.` }
              : null,
            maxLength: max
              ? { value: max, message: `Maximum ${max} characters are allowed.` }
              : null,
  
            pattern:
              type === "email"
                ? {
                    value: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+com+$/,
                    message: "Invalid email",
                  }
                : type === "url"
                ? {
                    value:
                      /^(https?:\/\/)?(([a-zA-Z0-9\u00a1-\uffff-]+\.)+[a-zA-Z\u00a1-\uffff]{2,})(:\d{2,5})?(\/[^\s]*)?$/,
                    message: "Please enter a valid url",
                  }
                : isSlug ? {
                  value:
                      /^[A-Za-z0-9_-]+$/,
                    message: "Allowed Characters: Uppercase and lower case alphabets, numbers(0-9), hyphen( - ) and underscore ( _ ). Min: 2 and Max: 12 characters allowed"
                } : null,
          })}
        />
        { type == 'password' && (
            <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-12 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
                {showPassword ? (
                  <FiEyeOff className="w-5 h-5" />
                ) : (
                  <FiEye className="w-5 h-5" />
                )}
            </button>
        )}
  
        {errors[id]?.message && (
          <div className="text-sm font-semibold text-red-600 mt-0">
            {errors[id]?.message}*
          </div>
        )}
      </div>
    );
  };
  
  export default TextField;