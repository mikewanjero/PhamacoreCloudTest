/* eslint-disable react/prop-types */
// import { Button } from "react-bootstrap";

/**
 * Step-Navigation Component
 * Renders the navigation buttons for the stepper - Back and Next
 * Multi-step form navigation with buttons
 *
 * @param {number} current - The index of the current step
 * @param {number} stepsLength - The total number of steps in the stepper
 * @param {function} onNext - The function to move to the next step
 * @param {function} onPrevious - The function to move to the previous step
 */

export default function StepNavigation({
  current,
  stepsLength,
  onNext,
  onPrevious,
}) {
  console.log("Current Step:", current);
  console.log("Steps Length:", stepsLength);

  return (
    <div className="d-flex justify-content-between mt-6 pt-3 w-100">
      {/* Render "previous" button if not on the first step */}
      {current > 0 && (
        <button
          type="button"
          onClick={onPrevious}
          className="btn step-nav-button"
          aria-label="Previous Step"
        >
          <span className="step-nav-icon">
            <svg
              className="bs bs-arrow-left"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M10 15a1 1 0 0 1-1.414 0L1.707 8.707a1 1 0 0 1 0-1.414L8.586.707A1 1 0 1 1 10 2.121L4.828 7H14a1 1 0 0 1 0 2H4.828l5.172 4.879A1 1 0 0 1 10 15z"
              />
            </svg>
          </span>
          <span className="step-nav-text">Previous</span>
        </button>
      )}
      {/* Render "next" button if not on the last step */}
      {current < stepsLength - 1 && (
        <button
          type="button"
          onClick={onNext}
          className="btn step-nav-button"
          aria-label="Next Step"
        >
          <span className="step-nav-text">Next</span>
          <span className="step-nav-icon">
            <svg
              className="bs bs-arrow-right"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M5.854 1.146a.5.5 0 0 1 0 .708L9.293 5H0.5a.5.5 0 0 1 0 1H9.293l-3.147 3.146a.5.5 0 0 1 .708.708l4-4a.5.5 0 0 1 0-.708l-4-4a.5.5 0 0 1-.708 0z"
              />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
