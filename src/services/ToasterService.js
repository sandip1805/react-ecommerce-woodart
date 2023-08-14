import React from "react";
import { Alert } from "@material-tailwind/react";

const AlertService = ({type, message}) => {
  const [open, setOpen] = React.useState(true);

  return (
    <>
      <Alert className="alert_box" color={type === 'SUCCESS' ? "green" : type === 'ERROR' ? "red" : type === 'INFO' ? "blue" : type === 'WARNING' ? "amber" : "gray"} open={open} onClose={() => setOpen(false)}>
        {message}
      </Alert>
    </>
  );
}

export default AlertService;
