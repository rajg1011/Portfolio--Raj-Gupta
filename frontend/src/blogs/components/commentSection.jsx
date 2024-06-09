import { useEffect, useState } from "react";
import useAuth from "../../components/customHooks/useAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PulseLoader from "react-spinners/PulseLoader";
import axios from "axios";
export default function CommentSection({ post_id }) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  //Taking data from authContext
  const { userId, admin } = useAuth();
  const [commentdata, setCommentdata] = useState([]);
  const fetchComment = async () => {
    setLoading(true);
    try {
      //taking comment from DB
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/db/getcomment`,
        {
          post_id,
        }
      );
      setCommentdata(data.comment_data);
    } catch (e) {
      toast.error(e.message, {
        className: "toast-message",
      });
    } finally {
      setLoading(false);
    }
  };
  //Fetching the comment on loading of post
  useEffect(() => {
    fetchComment();
  }, [post_id]);

  //delete the comment by its admin
  const deleteCommentHandler = async (comment_id, user_id) => {
    setLoading(true);
    try {
      var { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/db/deletecomment`,
        {
          comment_id,
          user_id,
          isAdmin: admin,
        }
      );

      if (data.success) {
        return fetchComment();
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      toast.error(e.message, {
        className: "toast-message",
      });
    }
  };
  // Posting the comment
  const commentHandler = async (e) => {
    e.preventDefault();
    if (comment.length < 10 || comment.trim().length < 10) {
      toast.error("Please Enter comment >10 letters", {
        className: "toast-message",
      });
      return;
    }
    try {
      setLoading(true);
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/db/postcomment`,
        {
          comment_description: comment,
          post_id: +post_id,
          user_id: +userId,
          isAdmin: admin,
        }
      );
      //If postinf success then fetch comment again
      if (data.success) {
        setComment("");
        setLoading(false);
        fetchComment();
      } else {
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
  return (
    <div className="comment-section">
      <div className="comment-form">
        <form onSubmit={commentHandler}>
          <textarea
            name="coment"
            id="comment"
            placeholder="Your Review Matter"
            className="comment"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <button className="btn btn-primary">Comment</button>
          <PulseLoader
            color="#6c63ff"
            loading={loading}
            cssOverride={{
              zIndex: 10,
              position: "relative",
              display: "inline",
              left: "46%",
              bottom: "1rem",
            }}
            size="1rem"
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </form>
      </div>

      {/* Put the fetch comment here  */}
      {commentdata?.map((comment) => {
        return (
          <div className="user-comment">
            <div className="comment-details">
              <div className="user-name">{comment.user.name}</div>
              <div className="data">
                <p>{comment.comment_description}</p>
              </div>
            </div>
            {(+comment?.user_id === +userId || admin) && (
              <div
                className="delete-trash"
                onClick={() => deleteCommentHandler(+comment.id, +userId)}
              >
                <i class="fa-solid fa-trash"></i>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
