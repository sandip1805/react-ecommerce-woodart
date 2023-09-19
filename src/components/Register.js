import React, { useEffect, useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import authService from "../services/AuthService";
import { Link } from "react-router-dom";
import toastService from "../services/ToasterService.js";
import { LoginSocialGoogle } from "reactjs-social-login";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

const Register = () => {
  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    console.log("REACT_APP_GG_APP_ID ---> ", process.env.REACT_APP_GG_APP_ID);
    console.log("REACT_APP_FB_APP_ID ---> ", process.env.REACT_APP_FB_APP_ID);
    console.log(profile);
    console.log(provider);
  }, [profile, provider]);

  const handleRegister = async ({name, email, password}) => {
    console.log(name);
    console.log(email);
    console.log(password);

    try {
      // Call the register function from the authService
      const response = await authService.register(name, email, password);
      console.log(response); // Do something with the response, e.g., show a success message or redirect to another page.
      toastService.success(response.message);
    } catch (error) {
      console.error(error); // Handle the registration error, e.g., show an error message.
      toastService.error(error.message);
    }
  };

  const whiteSpaceValidation = async (value) => {
    return !!value.trim();
  };

  return (
    <div className="grid h-screen justify-center items-center">
      <Card color="transparent" className="p-12 login_register_shadow">
        <Typography variant="h2" className="text-center text-black">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal text-center">
          Enter your details to register.
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit(handleRegister)}
        >
          <div className="mb-4 flex flex-col gap-6">
            <div>
              <Input
                required
                size="lg"
                label="Name"
                autoComplete="off"
                {...register("name", {
                  required: {
                    value: true,
                    message:
                      "⚠ Name is required to continue.",
                  },
                  validate: whiteSpaceValidation,
                })}
              />
              <span className="flex justify-start text-left input_field_error">
                <p className="text-red text-sm font-medium">
                  <ErrorMessage
                    errors={errors}
                    name="name"
                  />
                </p>
                {errors.name &&
                  errors.name.type === "validate" && (
                    <p className="text-red text-sm font-medium">
                      ⚠ Name is required to continue.
                    </p>
                )}
              </span>
            </div>
            <div>
              <Input
                required
                size="lg"
                label="Email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "⚠ Email is required to continue.",
                  },
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "⚠ Please enter a valid Email",
                  },
                })}
              />
              <span className="flex justify-start text-left input_field_error">
                <p className="text-red text-sm font-medium">
                  <ErrorMessage errors={errors} name="email" />
                </p>
              </span>
            </div>
            <div>
              <Input
                required
                type="password"
                size="lg"
                label="Password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "⚠ Password is required to continue.",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/,
                    message:
                      "⚠ Password must contain atleast minimum eight characters and maximum 10 characters, one uppercase letter, one lowercase letter, one number and one special character",
                  },
                })}
              />
              <span className="flex justify-start text-left input_field_error">
                <p className="text-red text-sm font-medium">
                  <ErrorMessage errors={errors} name="password"/>
                </p>
              </span>
            </div>
          </div>
          <Button
            type="submit"
            className="mt-6"
            fullWidth
            onClick={handleSubmit(handleRegister)}
          >
            Register
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Sign In
            </Link>
          </Typography>
        </form>
        <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-black after:mt-0.5 after:flex-1 after:border-t after:border-black">
          <p className="mx-4 mb-0 text-center font-semibold dark:text-white">
            Or
          </p>
        </div>
        <div className="flex justify-center items-center gap-4">
          <LoginSocialGoogle
            isOnlyGetToken
            client_id={process.env.REACT_APP_GG_APP_ID || ""}
            onResolve={({ provider, data }) => {
              setProvider(provider);
              setProfile(data);
            }}
            onReject={(err) => {
              console.log(err);
            }}
          >
            <Button
              size="lg"
              variant="outlined"
              className="flex items-center gap-3 border-black"
            >
              <img
                src="/img/icons/google.svg"
                alt="metamask"
                className="h-6 w-6"
              />
            </Button>
          </LoginSocialGoogle>
          <FacebookLogin
            appId={process.env.REACT_APP_FB_APP_ID || ""}
            autoLoad={false}
            fields="name,email,picture"
            callback={(response) => {
              console.log(response);
            }} 
            render={(renderProps) => (
              <Button
                onClick={renderProps.onClick}
                size="lg"
                variant="outlined"
                className="flex items-center gap-3 border-black"
              >
                <img
                  src="/img/icons/facebook.svg"
                  alt="metamask"
                  className="h-6 w-6"
                />
              </Button>
            )}
          >
          </FacebookLogin>
        </div>
      </Card>
    </div>
  );
};

export default Register;
