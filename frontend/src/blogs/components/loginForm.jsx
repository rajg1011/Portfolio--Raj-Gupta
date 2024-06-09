import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PulseLoader from "react-spinners/PulseLoader";
import useAuth from "../../components/customHooks/useAuth";
export default function LoginForm() {
  const navigate = useNavigate();
  const [emailPassword, changeEmailPassword] = useState({
    email: "",
    password: "",
  });
  //Getting data from authContext
  const { login, loading, admin } = useAuth();
  //On submission of login form
  const LoginSubmit = async (e) => {
    e.preventDefault();
    //Validations
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
    //Call login context from authContext
    const success = await login(emailPassword.email, emailPassword.password);
    if (success) {
      changeEmailPassword({
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
      <h1>Login</h1>
      <form onSubmit={LoginSubmit}>
        <label htmlFor="emailAuthlogin">Email</label>
        <input
          type="email"
          name="emailAuthlogin"
          placeholder="Email"
          id="emailAuthlogin"
          onChange={(e) =>
            changeEmailPassword((prev) => {
              return { ...prev, email: e.target.value };
            })
          }
          value={emailPassword.email}
        />
        <label htmlFor="passwordAuthlogin">Password</label>
        <input
          type="password"
          id="passwordAuthlogin"
          placeholder="Password"
          name="passwordAuthlogin"
          onChange={(e) =>
            changeEmailPassword((prev) => {
              return { ...prev, password: e.target.value };
            })
          }
          value={emailPassword.password}
        />
        <p>
          <Link to="/auth/sign-up" className="auth-link">
            SignUp...
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
