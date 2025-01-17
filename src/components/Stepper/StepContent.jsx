/* eslint-disable react/prop-types */

/**
 *
 * @param {number} current - The index of the current step
 * @param {array} steps - The array of steps containing description and component to be rendered
 * @param {object} formData - The object containing form data - shared between the different steps
 * @param {function} handleChange - The function to update the form data
 * @returns
 */
export default function StepContent({
  current,
  steps,
  formData,
  handleChange,
}) {
  // Destructure and retrieve component to render current step
  const { component: StepComponent } = steps[current];

  return (
    <div>
      {/* Display description for current step*/}
      <div>
        <p>{steps[current].description}</p>
      </div>
      {/* Render the component for the current step, adding necessary props */}
      {StepComponent && (
        <StepComponent formData={formData} handleChange={handleChange} />
      )}
    </div>
  );
}
