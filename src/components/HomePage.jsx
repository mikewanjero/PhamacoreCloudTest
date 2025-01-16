import { useState } from "react";
import { FileOutlined, UserOutlined } from "@ant-design/icons";
import StepContent from "./StepContent";
import StepNavigation from "./StepNavigation";
import StepIndicator from "./StepIndicator";
import SubscriptionForm from "./Subscription/SubscriptionForm";
import { ToastContainer } from "react-toastify";
import UploadForm from "./Upload/UploadForm";

const steps = [
  {
    title: "Upload Training Sheet",
    icon: <FileOutlined />,
    description: "Please upload the required training document",
    component: (props) => <UploadForm {...props} />,
  },
  {
    title: "Upload Master Doc(s)",
    icon: <FileOutlined />,
    description: "Upload the Master Document (OPTIONAL).",
    component: (props) => <UploadForm {...props} />,
  },
  {
    title: "Activate Account",
    icon: <UserOutlined />,
    description: "Complete the Account Activation Process.",
    component: (props) => <SubscriptionForm {...props} />,
  },
];

export default function HomePage() {
  /* State to check the current step index*/
  const [current, setCurrent] = useState(0);

  /* State to store form data */
  const [formData, setFormData] = useState({ files: [] });

  /* State to track completion of each step*/
  const [stepStatus, setStepStatus] = useState([null, null, null]); // null - incomplete, true - completed, false - incomplete

  /**
   * Move on to the next step if  it is before the next step
   * @param {number} step - The index of the step to navigate to
   */
  const handleStepClick = (step) => {
    if (step < current) setCurrent(step);
  };

  /** Update form data when a value changes for the child components
   * @param {string} name - The name of the input field
   * @param {string} value - The value of the input field
   */
  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /** Move to the next step
   * Mark the current step as completed before moving to the next step
   */
  const NextStep = () => {
    setStepStatus((prev) => {
      const current = prev[stepStatus];
      prev[current] = true;
      return prev;
    });
    setCurrent((prev) => prev + 1);
  };

  /* Moving back to the previous step */
  const PreviousStep = () => {
    setCurrent((prev) => prev - 1);
  };

  return (
    <div>
      {/* Header */}
      <div>
        <img src="https://via.placeholder.com/150" alt="logo" />
        <h1>
          phAMACore<sup>™</sup>Cloud
        </h1>
      </div>
      {/* Main */}
      <div>
        <div>
          {/* StepIndicator */}
          <StepIndicator
            steps={steps}
            current={current}
            onStepClick={handleStepClick}
          />
          {/* StepContent */}
          <StepContent
            steps={steps}
            current={current}
            formData={formData}
            handleChange={handleChange}
          />
          {/* StepNavigation */}
          <StepNavigation
            stepLength={steps.length}
            onNext={NextStep}
            onPrevious={PreviousStep}
          />
        </div>
      </div>
      {/* Toast Notifications */}
      <ToastContainer position="top-center" />
    </div>
  );
}
