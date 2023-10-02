import { toast } from "react-toastify";

const defaultConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
}

const toastService = {
  success: (message) => {
    toast.success(message, defaultConfig);
  },
  error: (message) => {
    toast.error(message, defaultConfig);
  },
  warning: (message) => {
    toast.warn(message, defaultConfig);
  },
  info: (message) => {
    toast.info(message, defaultConfig);
  },
}

export default toastService;