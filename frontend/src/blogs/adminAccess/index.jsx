import "./style.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PulseLoader from "react-spinners/PulseLoader";
import React, { useEffect, useState } from "react";
import TextEditor from "./OnlineTextEditor";
import axios from "axios";
import useAuth from "../../components/customHooks/useAuth";
import { useNavigate } from "react-router-dom";
export default function CreatePostPage() {
  //Taking data from authConetext
  const { admin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [textEditorData, setTextEditorData] = useState("");
  const [formConstraint, setformConstraint] = useState({
    tag: "",
    heading: "",
    main_content: "",
  });

  //Only open file if user is an admin
  useEffect(() => {
    console.log(admin);
    if (!authLoading && !admin) {
      navigate("/auth/login");
      return;
    }
  }, [admin, authLoading, navigate]);

  const handleTextEditorDataInForm = (data) => {
    setTextEditorData(data);
  };

  //Creating post
  const CreatPostSubmitHandler = async (e) => {
    e.preventDefault();
    //validations
    if (
      formConstraint.tag.length == 0 ||
      formConstraint.tag.trim().length == 0
    ) {
      toast.error("Please Enter Tag Properly", {
        className: "toast-message",
      });
      return;
    }
    if (
      formConstraint.heading.length == 0 ||
      formConstraint.heading.trim().length == 0
    ) {
      toast.error("Please Enter Heading Properly", {
        className: "toast-message",
      });
      return;
    }
    if (
      formConstraint.main_content.length < 150 ||
      formConstraint.main_content.trim().length < 150
    ) {
      toast.error("Please Enter Content Properly", {
        className: "toast-message",
      });
      return;
    }
    if (textEditorData.length < 2000 || textEditorData.trim().length < 2000) {
      toast.error("Post Data must be >=2000 letters", {
        className: "toast-message",
      });
      return;
    }
    //sending data to backend
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/db/create`,
        {
          tag: formConstraint.tag,
          post_data: textEditorData,
          route: formConstraint.heading,
          main_content: formConstraint.main_content,
        }
      );
      //if data sending is success
      if (data.success) {
        setLoading(false);
        setformConstraint({
          tag: "",
          heading: "",
          main_content: "",
        });
        toast.success(`${data.message}`, {
          className: "toast-message",
        });
      }
      //if it is an error
      else {
        toast.error(data.message, {
          className: "toast-message",
        });
      }
    } catch (e) {
      toast.error(e.message, {
        className: "toast-message",
      });
    } finally {
      setLoading(false);
    }
  };
  //to deal with asynchronous nature of useEffect;
  if (authLoading) {
    return <div>Checking...</div>;
  }
  return (
    <div className="admin-page">
      <h1>Create Post</h1>
      <form onSubmit={CreatPostSubmitHandler}>
        <label htmlFor="tag">Tag</label>
        <input
          type="text"
          id="tag"
          name="tag"
          placeholder="Hashtag"
          onChange={(e) =>
            setformConstraint((prev) => {
              return { ...prev, tag: e.target.value };
            })
          }
          value={formConstraint.tag}
          required
        />
        <label htmlFor="heading">Heading</label>
        <input
          type="text"
          id="heading"
          name="heading"
          placeholder="Git and GitHub"
          onChange={(e) =>
            setformConstraint((prev) => {
              return { ...prev, heading: e.target.value };
            })
          }
          value={formConstraint.heading}
          required
        />
        <label htmlFor="tag">Tag</label>
        <textarea
          type="text"
          id="main-content"
          rows={6}
          cols={30}
          name="main-content"
          placeholder="Explain the content is about.."
          onChange={(e) =>
            setformConstraint((prev) => {
              return { ...prev, main_content: e.target.value };
            })
          }
          value={formConstraint.main_content}
          required
        />

        <TextEditor onChangeInEditor={handleTextEditorDataInForm} />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <PulseLoader
          color="#6c63ff"
          loading={loading}
          cssOverride={{
            position: "relative",
            left: "47%",
            zIndex: 10,
          }}
          size="1rem"
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </form>
    </div>
  );
}
