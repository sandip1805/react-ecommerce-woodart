import { Avatar, Button, Input, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import Container from "./Container";
import { User } from "../services/AuthService";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: (userDetails?.name) ? (userDetails?.name) : '',
      email: (userDetails?.email) ? (userDetails?.email) : '',
      address: (userDetails?.address) ? (userDetails?.address) : '',
      contactNumber: (userDetails?.contactNumber) ? (userDetails?.contactNumber) : '',
    }
  });

  useEffect(() => {
    console.log("JJKSHKDHS");
    const userObservable = User.subscribe((res) => {
      console.log(res);
      if (res) {
        setUserDetails(res);
        setValue('name', (res?.name) ? (res?.name) : '');
        setValue('email', (res?.email) ? (res?.email) : '');
        setValue('address', (res?.address) ? (res?.address) : '');
        setValue('contactNumber', (res?.contactNumber) ? (res?.contactNumber) : '');
      }
      else {
        navigate('/');
      }
    });
    return () => {
      userObservable.unsubscribe();
    };
  }, []);

  const handleContactSubmit = ({name, email, address, contactNumber}) => {
    const newDetails = { ...userDetails, name, email, address, contactNumber };
    console.log("Form data submitted:", newDetails);
    User.next(newDetails);
    // Add logic here to send the form data to a server, store in a database, etc.
  };

  const whiteSpaceValidation = async (value) => {
    return !!value.trim();
  };

  return (
    <>
      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('https://images.unsplash.com/photo-1448932223592-d1fc686e76ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
      </section>
      <section className="relative py-16 px-4">
        <Container className="flex flex-wrap lg:py-20 py-10">
          <div className="relative mb-6 -mt-64 flex w-full min-w-0 flex-col break-words rounded-3xl bg-white shadow-xl shadow-gray-500/2">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="flex w-full justify-center px-4 lg:order-2 lg:w-3/12">
                  <div className="relative">
                    <div className="-mt-20 w-40">
                      <Avatar
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                        alt="Profile picture"
                        variant="circular"
                        className="h-full w-full shadow-xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {!isEditMode ? (
                <div className="my-8 text-center">
                  <Typography variant="h2" className="mb-6">
                    {userDetails?.name}
                  </Typography>
                  <div className="mb-2 flex items-center justify-center gap-2">
                    <MapPinIcon className="-mt-px h-4 w-4" />
                    <Typography className="font-medium">
                      {userDetails?.address
                        ? userDetails?.address
                        : "H-123, Ahmedabad, Gujarat."}
                    </Typography>
                  </div>
                  <div className="mb-2 flex items-center justify-center gap-2">
                    <EnvelopeIcon className="-mt-px h-4 w-4" />
                    <Typography className="font-medium">
                      {userDetails?.email}
                    </Typography>
                  </div>
                  <div className="mb-2 flex items-center justify-center gap-2">
                    <PhoneIcon className="-mt-px h-4 w-4" />
                    <Typography className="font-medium">
                      {userDetails?.contactNumber
                        ? userDetails?.contactNumber
                        : "1234567890"}
                    </Typography>
                  </div>
                </div>
              ) : (
                <form
                  className="mt-8 mb-2"
                  onSubmit={handleSubmit(handleContactSubmit)}
                >
                  <div className="mb-4 flex justify-center">
                    <div className="w-1/3">
                      <Input
                        required
                        type="text"
                        size="lg"
                        label="Name"
                        autoComplete="off"
                        {...register("name", {
                          required: {
                            value: true,
                            message: "⚠ Name is required to continue.",
                          },
                          validate: whiteSpaceValidation,
                        })}
                      />
                      <span className="flex justify-start text-left input_field_error">
                        <p className="text-red text-sm font-medium">
                          <ErrorMessage errors={errors} name="name" />
                        </p>
                        {errors.name && errors.name.type === "validate" && (
                          <p className="text-red text-sm font-medium">
                            ⚠ Name is required to continue.
                          </p>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="mb-4 flex justify-center">
                    <div className="w-1/3">
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
                  </div>
                  <div className="mb-4 flex justify-center">
                    <div className="w-1/3">
                      <Input
                        required
                        type="text"
                        size="lg"
                        label="Address"
                        autoComplete="off"
                        {...register("address", {
                          required: {
                            value: true,
                            message: "⚠ Address is required to continue.",
                          },
                          validate: whiteSpaceValidation,
                        })}
                      />
                      <span className="flex justify-start text-left input_field_error">
                        <p className="text-red text-sm font-medium">
                          <ErrorMessage errors={errors} name="address" />
                        </p>
                        {errors.address && errors.address.type === "validate" && (
                          <p className="text-red text-sm font-medium">
                            ⚠ Address is required to continue.
                          </p>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="mb-4 flex justify-center">
                    <div className="w-1/3">
                      <Input
                        required
                        type="number"
                        size="lg"
                        label="Contact Number"
                        autoComplete="off"
                        {...register("contactNumber", {
                          required: {
                            value: true,
                            message: "⚠ Contact Number is required to continue.",
                          },
                          maxLength: {
                            value: 10,
                            message: "⚠ Please enter a valid Contact Number to continue."
                          },
                          validate: whiteSpaceValidation,
                        })}
                      />
                      <span className="flex justify-start text-left input_field_error">
                        <p className="text-red text-sm font-medium">
                          <ErrorMessage errors={errors} name="contactNumber" />
                        </p>
                        {errors.contactNumber && errors.contactNumber.type === "validate" && (
                          <p className="text-red text-sm font-medium">
                            ⚠ Contact Number is required to continue.
                          </p>
                        )}
                      </span>
                    </div>
                  </div>
                </form>
              )}
              <div className="my-8 text-center pb-10">
                {isEditMode ? (
                  <div className="flex gap-4 justify-center">
                    <Button
                      type="submit"
                      onClick={handleSubmit(handleContactSubmit)}
                    >
                      Update Profile
                    </Button>
                    <Button onClick={() => setIsEditMode(false)}>Cancel</Button>
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <Button onClick={() => setIsEditMode(true)}>
                      Edit Profile
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Profile;
