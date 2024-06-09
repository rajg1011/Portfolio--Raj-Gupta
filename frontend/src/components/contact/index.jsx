import contactDetails from "./contactData";
import ReactDOM from "react-dom";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import BuyCoffeeDeatils from "./buyCoffee";
export default function Contact() {
  // check if deivce is >500px
  const isPhone = useMediaQuery({
    query: "(min-width: 500px)",
  });
  //for emailjs
  const sendForm = useRef();
  const [formValues, changeFormvalues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [coffee, changeCoffee] = useState(false);

  const CoffeeHandler = (e) => {
    return changeCoffee(true);
  };

  const changeState = () => {
    changeCoffee(false);
  };

  const sendEmail = (e) => {
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
    if (formValues.subject.length === 0) {
      toast.error("Please Enter Subject", {
        className: "toast-message",
      });
      return;
    } else if (formValues.subject.trim().length === 0) {
      toast.error("Please Enter Valid Subject", {
        className: "toast-message",
      });
      return;
    }
    if (formValues.message.length === 0) {
      toast.error("Please Enter Message", {
        className: "toast-message",
      });
      return;
    } else if (formValues.message.trim().length === 0) {
      toast.error("Please Enter Valid Message", {
        className: "toast-message",
      });
      return;
    }

    //Send email using email.js
    const email = emailjs.sendForm(
      import.meta.env.VITE_SERVICE_KEY,
      import.meta.env.VITE_TEMPLATE_KEY,
      sendForm.current,
      {
        publicKey: import.meta.env.VITE_PUBLIC_KEY,
      }
    );
    //send toast notification
    toast.promise(email, {
      pending: "Message Sending",
      success: "Message Sent",
      error: "Message Not Sent",
    });

    changeFormvalues({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <motion.div
      className="contact-section"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: "0vw" }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <div
        className={`${!isPhone ? "isPhone-coffee" : "contact-heading-message"}`}
      >
        {isPhone && (
          <div className="contact-heading">
            <h1>Let's Meet</h1>
          </div>
        )}
        <div className="coffee">
          <div
            type="button"
            className=" buy-coffee btn btn-primary"
            onClick={CoffeeHandler}
          >
            Buy Me A Coffee
          </div>
        </div>
      </div>
      <div className="address-email">
        <div className="address">
          <ul>
            <li>
              <span>My Office:</span>
              <h3>{contactDetails.officeAddress}</h3>
            </li>
            <div className="contact-divider"></div>
            <li>
              <span>Call Me:</span>
              <h3>{contactDetails.phone}</h3>
            </li>
            <div className="contact-divider"></div>
            <li>
              <span>Mail Me:</span>
              <h3>{contactDetails.mail}</h3>
            </li>
            <div className="contact-divider"></div>
            <li>
              <span>Follow Me:</span>
              <div className="follow-links">
                <div>
                  <a href={`${contactDetails.instaLink}`} target="_blank">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </div>
                <div>
                  <a href={`${contactDetails.facebookLink}`} target="_blank">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                </div>
                <div>
                  <a href={`${contactDetails.linkedinLink}`} target="_blank">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="meet-form">
          <h4>Send Me A Mail</h4>
          <form ref={sendForm} onSubmit={sendEmail}>
            <div className="name-email">
              <input
                type="text"
                placeholder="Your Name"
                name="send-name"
                id="send-name"
                value={formValues.name}
                onChange={(e) =>
                  changeFormvalues((prev) => {
                    return { ...prev, name: e.target.value };
                  })
                }
                required
              />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={formValues.email}
                onChange={(e) =>
                  changeFormvalues((prev) => {
                    return { ...prev, email: e.target.value };
                  })
                }
                required
              />
            </div>
            <div className="subject-form">
              <input
                type="text"
                name="send-subject"
                id="send-subject"
                placeholder="Subject"
                value={formValues.subject}
                onChange={(e) =>
                  changeFormvalues((prev) => {
                    return { ...prev, subject: e.target.value };
                  })
                }
                required
              />
            </div>
            <div className="textarea">
              <textarea
                name="message"
                id="textarea"
                cols="30"
                rows="7"
                placeholder="Write Message"
                value={formValues.message}
                onChange={(e) =>
                  changeFormvalues((prev) => {
                    return { ...prev, message: e.target.value };
                  })
                }
                required
              ></textarea>
            </div>
            <button
              type="submit"
              id="send-button"
              value="Send"
              class="btn btn-primary"
            >
              Send
            </button>
          </form>
        </div>
      </div>
      {ReactDOM.createPortal(
        coffee && <BuyCoffeeDeatils changeState={changeState} />,
        document.getElementById("back-root")
      )}
    </motion.div>
  );
}
