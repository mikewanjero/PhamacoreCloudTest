import { BsArrowRepeat, BsCheckLg } from "react-icons/bs";

/* eslint-disable react/prop-types */

/**
 *
 * @param {Array} steps - The array of steps containing title, icon and description
 * @param {number} current - The index of the current step
 * @param {function} onStepClick - The function to navigate to a specific step - click handling on step indicators
 */
export default function StepIndicator({ steps, current, onStepClick }) {
  return (
    <div className="d-flex flex-row justify-content-between w-100 mb-4">
      {steps.map((item, index) => (
        <div
          key={index}
          className={`flex-grow-1 d-flex flex-column align-items-center ${
            index <= current ? "font-bold" : "text-muted"
          }`}
          onClick={() => onStepClick(index)}
        >
          <div
            className={`d-flex align-items-center justify-content-center rounded-circle border border-2 transition ${
              index === current
                ? "border-warning bg-transparent text-dark cursor-pointer" // Active step
                : index < current
                ? "border-success bg-success text-white" // Completed step
                : "border-gray 300 bg-white text-muted" // Incomplete step
            } `}
            style={{ width: "3rem", height: "3rem", fontSize: "1.5rem" }}
          >
            {/* Render icon based on step state */}
            {index === current ? (
              <BsArrowRepeat className="spinner border-sm text-dark" /> //Loading spinner - current step
            ) : index < current ? (
              <BsCheckLg /> // Checkmark - completed step
            ) : (
              item.icon // Default icon for upcoming step
            )}
          </div>

          {/* Display step title */}
          <span className="text-center text-sm mt-2">{item.title}</span>
        </div>
      ))}
    </div>
  );
}
