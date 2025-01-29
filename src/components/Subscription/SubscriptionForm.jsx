import { useEffect, useState } from "react";
import {
  Form,
  Button,
  Spinner,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import InputField from "./InputField";
import PackageInfo from "./PackageInfo";
import PasswordField from "./PasswordField";
import PhoneField from "./PhoneField";
import TermsSection from "./TermsSection";
import axios from "axios";
import { z } from "zod";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const schema = z.object({
  email: z.string().email({ message: "Please enter a valid Email." }),
  username: z
    .string()
    .min(3, { message: "Username should be at least 3 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  phone: z.string().refine((val) => /^\d{10,15}$/.test(val), {
    message:
      "Phone number including country code must be between 10 and 15 digits",
  }),
  termsChecked: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

const SubscriptionForm = () => {
  const [cusCode, setCusCode] = useState("");
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const dynamicCusCode = search.get("cusCode");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      termsChecked: false,
      phone: "",
      email: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [companyDetails, setCompanyDetails] = useState({
    companyName: "",
    companyID: "",
  });
  const [packageInfo, setPackageInfo] = useState({
    name: "",
    branches: "",
    users: "",
  });

  useEffect(() => {
    const initialCusCode = search.get("cusCode");
    setCusCode(initialCusCode);

    if (!dynamicCusCode) {
      navigate(`/${initialCusCode}`, { replace: true });
    }
  }, [dynamicCusCode, navigate, search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://102.37.102.247:5028/api/NewClients/GetClientsDetails?cuscode=K68W3X`,
          {
            headers: {
              accesskey:
                "R0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9",
            },
          }
        );
        const {
          psCompanyName: companyName,
          psCusCode: companyID,
          packageName: name,
          psBranchCount: branches,
          psUserCount: users,
        } = response.data;

        if (!companyID) {
          throw new Error("No Company ID Found");
        }

        setCompanyDetails({ companyName, companyID });
        setPackageInfo({ name, branches, users });
        setLoading(false);

        if (companyID !== cusCode) {
          setCusCode(companyID);
          navigate(`/${companyID}`, { replace: true });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch company details");
        toast.error("Failed to fetch company details. Please try again.");
        setLoading(false);
      }
    };

    fetchData();
  }, [cusCode, dynamicCusCode, navigate]);

  const isFormValid = Object.keys(errors).length === 0 && watch("termsChecked");

  const onSubmit = async () => {
    const requestData = {
      cusCode,
      companyName: companyDetails.companyName,
      username: watch("username"),
      password: watch("password"),
      email: watch("email"),
      phone: watch("phone"),
    };

    console.log("Data to Send:", { ...requestData, password: "******" });
    setLoading(true);
    try {
      const response = await axios.post(
        "http://102.37.102.247:5028/api/NewClients/ActivateClient",
        requestData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            accesskey:
              "R0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9",
          },
        }
      );
      setLoading(false);
      toast.success("Account Activated Successfully!");
      console.log("Activation response:", response.data);

      setTimeout(() => {
        window.location.href = "https://phamacoreonline.co.ke/";
      }, 2200);
    } catch (error) {
      setLoading(false);
      console.error("Error activating account:", error.response?.data);
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(`Error: ${errorMessage}`);

      setValue("username", "");
      setValue("password", "");
      setValue("email", "");
      setValue("phone", "+254");
      setValue("termsChecked", false);
    }
  };

  return (
    <Container className="subscription-form p-4">
      <Row>
        <Col lg={6} className="border-end p-4">
          <h2 className="text-danger">Activate My Subscription</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              label="Email"
              type="text"
              {...register("email")}
              onBlur={() => trigger("email")}
              error={errors.email?.message}
            />
            <InputField
              label="Business Email (Optional)"
              type="text"
              {...register("email")}
              onBlur={() => trigger("email")}
              error={errors.email?.message}
            />
            <InputField
              label="Username"
              type="text"
              {...register("username")}
              onBlur={() => trigger("username")}
              error={errors.username?.message}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <PhoneField
                  label="Phone"
                  value={field.value}
                  {...field}
                  onBlur={() => trigger("phone")}
                  error={errors.phone?.message}
                />
              )}
            />
            <PasswordField
              label="Password"
              {...register("password")}
              onBlur={() => trigger("password")}
              error={errors.password?.message}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
            <Button
              type="submit"
              className="btn btn-caramel-dark btn-caramel w-100 mt-3"
              disabled={!isFormValid}
            >
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Activate My Account"
              )}
            </Button>
          </Form>
        </Col>

        <Col lg={6} className="p-4">
          <h3 className="text-dark">
            {loading
              ? error
              : companyDetails.companyName
              ? `${companyDetails.companyName} - ${companyDetails.companyID}`
              : "Details not fetched"}
          </h3>
          <PackageInfo packageInfo={packageInfo} />
          <TermsSection
            termsChecked={watch("termsChecked")}
            onChange={(e) => setValue("termsChecked", e.target.checked)}
          />
          {errors.termsChecked && (
            <Alert variant="danger">{errors.termsChecked.message}</Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SubscriptionForm;
