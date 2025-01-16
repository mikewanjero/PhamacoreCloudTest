/* eslint-disable react/prop-types */
export default function StepContent({ steps }) {
  return (
    <div>
      {steps.map((step, index) => (
        <div key={index}>{step.component}</div>
      ))}
    </div>
  );
}
