import { createContext, useContext } from "react";
import { toast } from "react-toastify";

type ToastProps = {
  getToast: (
    type: "success" | "error" | "warning" | "info",
    message: string
  ) => void;
};

const ToastContext = createContext<ToastProps>({
  getToast: () => {},
});


export const useToast = () => {
  return useContext(ToastContext);
};




export default function ToastContextProvider({ children }: { children: React.ReactNode }) {


  const getToast = (
    type: "success" | "error" | "warning" | "info",
    message: string
  ) => {
    return toast[type](message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
    });
  };

  return (
    <ToastContext.Provider value={{ getToast }}>
      {children}
    </ToastContext.Provider>
  )
}