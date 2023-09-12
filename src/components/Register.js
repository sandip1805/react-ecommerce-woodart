import React, {useEffect, useState} from 'react';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import authService from '../services/AuthService';
import { Link } from 'react-router-dom';
import toastService from '../services/ToasterService.js';
import { LoginSocialGoogle } from 'reactjs-social-login';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [provider, setProvider] = useState('');
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    console.log(process.env.REACT_APP_GG_APP_ID);
    console.log(profile);
    console.log(provider);
  }, [profile, provider]);

  const handleRegister = async (e) => {
    console.log(e);
    e.preventDefault();

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

  return (
    <div className='grid h-screen justify-center items-center'>
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleRegister}>
          <div className="mb-4 flex flex-col gap-6">
            <Input required size="lg" label="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input required size="lg" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input required type="password" size="lg" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
          <Button type='submit' className="mt-6" fullWidth onClick={handleRegister}>
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
        <div className="flex flex-col items-center gap-4">
          <LoginSocialGoogle
            isOnlyGetToken
            client_id={process.env.REACT_APP_GG_APP_ID || ''}
            onResolve={({ provider, data }) => {
              setProvider(provider);
              setProfile(data);
            }}
            onReject={(err) => {
              console.log(err)
            }}
          >
            <Button
              size="lg"
              variant="outlined"
              color="blue-gray"
              className="flex items-center gap-3"
            >
              <img src="/img/icons/google.svg" alt="metamask" className="h-6 w-6" />
            </Button>
          </LoginSocialGoogle>
        </div>
      </Card>
    </div>
  );
};

export default Register;
