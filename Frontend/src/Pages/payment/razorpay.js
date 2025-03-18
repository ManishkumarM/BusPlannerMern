import axios from "axios";
import logo from "../../Images/logo.png";
import { error, success } from "../../Utils/notification";
import { sendOrderRequest } from "./sendOrderRequest";

export const initPayment = async (
  busdata,
  creds,
  orderDetails,
  date,
  ticket,
  busid,
  userid,
  amount,
  token,
  dispatch,
  navigate
) => {
  const { name, age, gender, phone, email } = creds; // Use the correct field names

  const options = {
    key: "rzp_test_EpEUZjh3akkK9N", // Test Razorpay API Key
    order_id: orderDetails.id, // Order ID from backend
    amount: orderDetails.amount, // Amount in paise
    currency: orderDetails.currency, // Currency (e.g., "INR")
    image: logo,
    name: "Bus Planner",
    description: "Thanks For Booking, Happy Journey!",

    prefill: {
      name,
      email,
      contact: phone, // Correct field for mobile number
    },

    handler: async function (response) {
      try {
        const { data } = await axios.post(
          "http://localhost:2000/api/payment/verify",
          response
        );

        success(data.message);

        sendOrderRequest(
          busdata,
          creds,
          orderDetails.id,
          response,
          date,
          ticket,
          busid,
          userid,
          amount,
          token,
          dispatch,
          navigate
        );
      } catch (err) {
        console.error("Verification error:", err);
        error("Payment verification failed. Please contact support.");
      }
    },

    theme: { color: "#5266FA" },
  };

  try {
    const rzp = new Razorpay(options); // Use consistent Razorpay reference

    rzp.on("payment.failed", (response) => {
      console.error("Payment failed:", response.error);
      error("Payment failed: " + (response.error.description || "Unknown error"));
    });

    rzp.open(); // Open Razorpay modal
  } catch (err) {
    console.error("Razorpay initialization error:", err);
    error("Unable to initialize payment. Please try again.");
  }
};
