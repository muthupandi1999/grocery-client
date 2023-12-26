import { toast } from "react-toastify";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export const OTPToast = (otp) => {
  return toast(otp, {
    position: "top-center",
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};
export const LoginSuccess = () => {
  return toast.success("Login Successful !", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
export const LoginError = () => {
  return toast.error("Authentication failed!", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
export const PaymentSuccess = (router) => {
  Swal.fire({
    title: "Your order has been placed!",
    text: "",
    icon: "success",
    showCancelButton: false,
    confirmButtonColor: "#0C831F",
    onClose: () => {
      router.push("/");
    },
    confirmButtonText: "continue shopping",
  }).then((result) => {
    if (result.isConfirmed) {
      router.push("/");
    }
  });
};
export const PaymentFailed = () => {
  Swal.fire({
    title: "Payment Failed ",
    text: "",
    icon: "error",
  });
};
