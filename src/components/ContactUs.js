import { ErrorMessage } from '@hookform/error-message';
import { Button, Card, Input, Textarea, Typography } from '@material-tailwind/react';
import React from 'react';
import { useForm } from 'react-hook-form';

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleContactSubmit = (data) => {
    console.log('Form data submitted:', data);
    // Add logic here to send the form data to a server, store in a database, etc.
  };

  const whiteSpaceValidation = async (value) => {
    return !!value.trim();
  };

  return (
    <>
    <div className='grid h-screen justify-center items-center'>
      <Card color="transparent" shadow={false} className="p-12 login_register_shadow">
        <Typography variant="h2" className="text-center text-black">
          Contact Us
        </Typography>
        <Typography color="gray" className="mt-1 font-normal text-center">
          Enter your details to contact us.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit(handleContactSubmit)}>
          <div className="mb-4 flex flex-col">
            <div>
              <Input 
                required
                type='text'
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
          </div>
          <div className="mb-4 flex flex-col">
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
          </div>
          <div className="mb-4 flex flex-col">
            <Textarea 
              required
              size="lg" 
              label="Message" 
              type="text"
              {...register("message", {
                required: {
                  value: true,
                  message:
                    "⚠ Message is required to continue.",
                },
                validate: whiteSpaceValidation,
              })}
            />
            <span className="flex justify-start text-left input_field_error">
              <p className="text-red text-sm font-medium">
                <ErrorMessage
                  errors={errors}
                  name="message"
                />
              </p>
              {errors.message &&
                errors.message.type === "validate" && (
                <p className="text-red text-sm font-medium">
                  ⚠ Message is required to continue.
                </p>
              )}
            </span>
          </div>
          <Button type='submit' className="mt-6" fullWidth onClick={handleSubmit(handleContactSubmit)}>
            Submit
          </Button>
        </form>
      </Card>
    </div>
  </>
  );
};

export default ContactUs;
