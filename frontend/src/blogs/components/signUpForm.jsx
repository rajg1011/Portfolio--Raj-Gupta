import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PulseLoader from "react-spinners/PulseLoader";
import { useState } from "react";
import useAuth from "../../components/customHooks/useAuth";
export default function SignUpForm() {
  const [emailPassword, changeEmailPassword] = useState({
    name: "",
    email: "",
    password: "",
  });
  //Taking context from authContext;
  const { signUp, loading } = useAuth();
  const navigate = useNavigate();
  //on submission of sign up form
  const SignUpSubmit = async (e) => {
    e.preventDefault();
    //Validations
    if (
      emailPassword.name.length === 0 ||
      emailPassword.name.trim().length === 0
    ) {
      toast.error("Please Enter Name", {
        className: "toast-message",
      });
      return;
    }
    if (
      emailPassword.email.length === 0 ||
      emailPassword.email.trim().length === 0
    ) {
      toast.error("Please Enter Email", {
        className: "toast-message",
      });
      return;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(emailPassword.email)
    ) {
      toast.error("Please Enter Valid Email", {
        className: "toast-message",
      });
      return;
    }
    if (
      emailPassword.password.trim().length === 0 ||
      emailPassword.password.length == 0
    ) {
      toast.error("Please Enter Password", {
        className: "toast-message",
      });
      return;
    }
    //signup using signup context of authContext
    const success = await signUp(
      emailPassword.name,
      emailPassword.email,
      emailPassword.password
    );
    if (success) {
      changeEmailPassword({
        name: "",
        email: "",
        password: "",
      });
      setTimeout(() => {
        navigate("/blog");
      }, 2000);
    }
  };
  return (
    <motion.div
      className="auth-form-page"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: "0vw" }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <h1>Sign Up</h1>
      <form onSubmit={SignUpSubmit}>
        <label htmlFor="nameAuthSignup">Name</label>
        <input
          type="text"
          name="nameAuthSignup"
          placeholder="Name"
          id="nameAuthSignup"
          onChange={(e) =>
            changeEmailPassword((prev) => {
              return { ...prev, name: e.target.value };
            })
          }
          value={emailPassword.name}
        />
        <label htmlFor="emailAuthSignUp">Email</label>
        <input
          type="email"
          name="emailAuthSignUp"
          placeholder="Email"
          id="emailAuthSignUp"
          onChange={(e) =>
            changeEmailPassword((prev) => {
              return { ...prev, email: e.target.value };
            })
          }
          value={emailPassword.email}
        />
        <label htmlFor="passwordAuthSignUp">Password</label>
        <input
          type="password"
          id="passwordAuthSignUp"
          placeholder="Password"
          name="passwordAuthSignUp"
          onChange={(e) =>
            changeEmailPassword((prev) => {
              return { ...prev, password: e.target.value };
            })
          }
          value={emailPassword.password}
        />
        <p>
          <Link to="/auth/login" className="auth-link">
            Login...
          </Link>
        </p>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <PulseLoader
          color="#6c63ff"
          loading={loading}
          cssOverride={{
            marginLeft: "0.3rem",
            zIndex: 10,
          }}
          size="1rem"
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </form>
    </motion.div>
  );
}
