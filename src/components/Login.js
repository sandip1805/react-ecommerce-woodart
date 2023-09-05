import React, { useState } from 'react';
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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

  return (
    <>
      <div className='grid h-screen justify-center items-center'>
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Sign In
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details to Login.
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
            <Input 
              size="lg" 
              label="Email" 
              type="email"
              value={email}
              onChange={handleEmailChange}
              id="email"
            />
            <Input 
              type="password" 
              size="lg" 
              label="Password"
              value={password}
              onChange={handlePasswordChange}
              id="password"
            />
            </div>
            <Checkbox
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
              containerProps={{ className: "-ml-2.5" }}
            />
            <Button className="mt-6" fullWidth onClick={handleSubmit}>
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
