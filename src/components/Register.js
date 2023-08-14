import React, {useState} from 'react';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import authService from '../services/AuthService';
import { Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Call the register function from the authService
      const response = await authService.register(name, email, password);
      console.log(response); // Do something with the response, e.g., show a success message or redirect to another page.
    } catch (error) {
      console.error(error); // Handle the registration error, e.g., show an error message.
    }
  };
  return (
    <div className='grid h-screen justify-center items-center'>
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input size="lg" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" size="lg" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
          <Button className="mt-6" fullWidth onClick={handleRegister}>
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
      </Card>
    </div>
  );
};

export default Register;
