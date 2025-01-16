/* eslint-disable react/prop-types */
export default function StepIndicator({ steps }) {
  return (
    <div>
      <ul>
        {steps.map((step, index) => (
          <li key={index}>
            <span>{step.title}</span>
            <span>{step.icon}</span>
            <span>{step.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
