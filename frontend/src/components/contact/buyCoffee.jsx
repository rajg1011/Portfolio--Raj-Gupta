import axios from "axios";
import { motion } from "framer-motion";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef, useState } from "react";
import useClickOutside from "../customHooks/clickOutside";
const BuyCoffeeDeatils = ({ changeState }) => {
  const [loading, setLoading] = useState(false);
  const [formValues, changeFormValues] = useState({
    name: "",
    money: "",
    email: "",
    phone: "",
  });
  //Ref to check for clickOutside
  const CoffeeForm = useRef();
  useClickOutside(CoffeeForm, changeState);

  const checkout = async (e) => {
    e.preventDefault();
    //Validations
    if (formValues.name.length === 0) {
      toast.error("Please Enter Name", {
        className: "toast-message",
      });
      return;
    } else if (formValues.name.trim().length === 0) {
      toast.error("Please Enter Valid Name", {
        className: "toast-message",
      });
      return;
    }
    if (formValues.email.length === 0) {
      toast.error("Please Enter Email", {
        className: "toast-message",
      });
      return;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formValues.email)
    ) {
      toast.error("Please Enter Valid Email", {
        className: "toast-message",
      });
      return;
    }
    if (formValues.phone.length < 10 || formValues.phone.length > 10) {
      toast.error("Please Enter Correct Phone Number", {
        className: "toast-message",
      });
      return;
    }
    if (+formValues.money < 5 || +formValues.money > 50000) {
      toast.error("Please Enter Amount More than 5 and Less than 50K", {
        className: "toast-message",
      });
      return;
    }
    //Creating order
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/coffee`,
        {
          amount: formValues.money,
        }
      );

      // data to be provided for order
      var options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: "INR",
        name: formValues.name,
        description: "Test Transaction",
        order_id: data.order.id,
        handler: async (response) => {
          try {
            const res = await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/api/paymentVerification`,
              {
                name: formValues.name,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }
            );
            const verifydata = res;
            if (verifydata.data) {
              toast(verifydata.data, {
                className: "toast-message",
              });
            }
          } catch (err) {
            toast.error(err.message, {
              className: "toast-message",
            });
          }
        },
        prefill: {
          name: formValues.name,
          email: formValues.email,
          contact: formValues.phone,
        },
        notes: {
          address: "Null",
        },
        theme: {
          color: "#6c63ff",
        },
      };
      setLoading(false);
      //Open razorpay window
      var razor = new window.Razorpay(options);
      razor.open();
    } catch (e) {
      setLoading(false);
      toast.error("Error in Loading RazorPay", {
        className: "toast-message",
      });
    } finally {
      changeFormValues({
        name: "",
        money: "",
        email: "",
        phone: "",
      });
    }
  };

  return (
    <div className="buy-details">
      <motion.div
        className="coffee-details"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <form ref={CoffeeForm} onSubmit={checkout}>
          <h1>Yayy Coffee 😊</h1>
          <input
            id="coffee-name"
            name="coffee-name"
            type="text"
            onChange={(e) =>
              changeFormValues((prev) => {
                return { ...prev, name: e.target.value };
              })
            }
            value={formValues.name}
            placeholder="Name"
            required
          />
          <input
            id="coffee-email"
            name="coffee-email"
            type="email"
            onChange={(e) =>
              changeFormValues((prev) => {
                return { ...prev, email: e.target.value };
              })
            }
            value={formValues.email}
            placeholder="Email"
            required
          />
          <input
            id="coffee-phone"
            name="coffee-phone"
            type="number"
            onChange={(e) =>
              changeFormValues((prev) => {
                return { ...prev, phone: e.target.value };
              })
            }
            value={formValues.phone}
            placeholder="Phone"
            required
          />
          <input
            type="number"
            name="coffee-money"
            id="coffee-money"
            onChange={(e) =>
              changeFormValues((prev) => {
                return { ...prev, money: e.target.value };
              })
            }
            value={formValues.money}
            placeholder="Amount"
            required
          />
          <button
            id="coffee-button"
            type="submit"
            value="Send"
            class="btn btn-primary"
          >
            Submit
          </button>
          <PulseLoader
            color="#6c63ff"
            loading={loading}
            cssOverride={{
              marginLeft: "1rem",
              zIndex: 10,
            }}
            size="1rem"
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </form>
      </motion.div>
    </div>
  );
};

export default BuyCoffeeDeatils;
