import React from 'react';
import authService from '../services/AuthService.js';
import toastService from '../services/ToasterService.js';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = ({email, password}) => {
    console.log('Email:', email);
    console.log('Password:', password);
    authService
      .login(email, password)
      .then((response) => {
        toastService.success(response.message);
        // Implement any actions after successful login (e.g., redirect to dashboard).
      })
      .catch((error) => {
        toastService.error(error.message);
        // Implement error handling (e.g., show error message to the user).
      });
  };

  const whiteSpaceValidation = async (value) => {
    return !!value.trim();
  };

  return (
    <>
      <div className='grid h-screen justify-center items-center'>
        <Card color="transparent" className="p-12 login_register_shadow">
          <Typography variant="h4" color="blue-gray" className="text-center">
            Sign In
          </Typography>
          <Typography color="gray" className="mt-1 font-normal text-center">
            Enter your details to Login.
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6" onSubmit={handleSubmit(handleLogin)}>
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
                    validate: whiteSpaceValidation
                  })}
                />
                <span className="flex justify-start text-left input_field_error">
                  <p className="text-red text-sm font-medium">
                    <ErrorMessage errors={errors} name="password"/>
                  </p>
                </span>
              </div>
            </div>
            <div className='terms_and_condition_div'>
              <Checkbox
                {...register("termsAndConditions", {
                  required: {
                    value: true,
                    message: "⚠ Please accept terms and condition to continue.",
                  },
                })}
                label={
                  <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center font-normal"
                  >
                    I agree the
                    <a
                      href="/"
                      className="font-medium transition-colors hover:text-blue-500"
                    >
                      &nbsp;Terms and Conditions
                    </a>
                  </Typography>
                }
                containerProps={{ className: "-ml-2.5 terms_and_condition" }}
              />
              <span className="flex justify-start text-left input_field_error">
                <p className="text-red text-sm font-medium">
                  <ErrorMessage errors={errors} name="termsAndConditions"/>
                </p>
              </span>
            </div>
            <Button className="mt-6" fullWidth onClick={handleSubmit(handleLogin)}>
              Login
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-blue-500 transition-colors hover:text-blue-700"
              >
                Register Here
              </Link>
            </Typography>
          </form>
        </Card>
      </div>
    </>
  );
};

export default Login;
