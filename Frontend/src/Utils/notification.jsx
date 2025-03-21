import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const success = (title) => {
    console.log(title);
    return toast.success(title, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
};

export const error = (title) => {
     console.log(title);
    return toast.error(title, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
};
