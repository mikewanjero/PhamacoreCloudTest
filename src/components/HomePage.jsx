import { useState } from "react";
import { BsFileEarmarkFill, BsPersonFill } from "react-icons/bs";
import phamacoreLogo from "../assets/phamacoreLogo.png";
import StepContent from "../components/Stepper/StepContent";
import StepNavigation from "../components/Stepper/StepNavigation";
import StepIndicator from "../components/Stepper/StepIndicator";
import SubscriptionForm from "./Subscription/SubscriptionForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UploadForm from "./Upload/UploadForm";

const steps = [
  {
    title: "Upload Training Sheet",
    icon: <BsFileEarmarkFill className="text-muted" />,
    description: "Please upload the required training document",
    component: (props) => <UploadForm {...props} />,
  },
  {
    title: "Upload Master Doc(s)",
    icon: <BsFileEarmarkFill className="text-muted" />,
    description: "Upload the Master Document (OPTIONAL).",
    component: (props) => <UploadForm {...props} />,
  },
  {
    title: "Activate Account",
    icon: <BsPersonFill className="text-muted" />,
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
   *
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
    <div className="welcome-container d-flex flex-column align-items-center p-6 bg-light-gray">
      {/* Header */}
      <div className="d-flex flex-column align-items-center mb-4">
        <img src={phamacoreLogo} alt="logo" className="w-40 h-40" />
        <h1 className="display-5 text-caramel-caramel fw-bold">
          phAMACore<sup>™</sup>Cloud
        </h1>
      </div>
      {/* Main */}
      <div
        className="d-flex flex-column flex-lg-row w-100 p-4 bg-white-seashell rounded-3 shadow-lg"
        style={{ maxWidth: "64rem" }}
      >
        <div className="w-100 d-flex flex-column align-items-center">
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
            current={current}
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
