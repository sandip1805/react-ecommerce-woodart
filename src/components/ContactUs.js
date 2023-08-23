import { Button, Card, Input, Textarea, Typography } from '@material-tailwind/react';
import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log('Form data submitted:', formData);
    // Add logic here to send the form data to a server, store in a database, etc.
  };

  return (
    <>
    <div className='grid h-screen justify-center items-center'>
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Contact Us
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to contact us.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col gap-6">
            <Input 
              size="lg" 
              label="Name" 
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              required
              id="name"
              name="name"
            />
          </div>
          <div className="mb-4 flex flex-col gap-6">
            <Input 
              size="lg" 
              label="Email" 
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              id="email"
              name="email"
            />
          </div>
          <div className="mb-4 flex flex-col gap-6">
            <Textarea 
              size="lg" 
              label="Message" 
              type="text"
              value={formData.message}
              onChange={handleInputChange}
              required
              id="message"
              name="message"
            />
          </div>
          <Button type='submit' className="mt-6" fullWidth onClick={handleSubmit}>
            Submit
          </Button>
        </form>
      </Card>
    </div>
  </>
  );
};

export default ContactUs;
