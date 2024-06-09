import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import "./style.css";
import { motion } from "framer-motion";
import useGetData from "../components/customHooks/getDataFromDB";
import UserPro from "./components/userProfile";
import useAuth from "../components/customHooks/useAuth";
export default function Blogs() {
  //Taking context from authContext
  const { isAuthenticated } = useAuth();
  //Loading blogs from backend using custom hook
  const { loadingBlogs, data } = useGetData("api/db/getblogs");
  return (
    <div className="blog-page">
      {/* Checking if user is logged in or not */}
      {isAuthenticated && <UserPro />}
      <h1>
        Learn <span>And</span> Build
      </h1>
      <div className="blog-section">
        <ClipLoader
          color="#6c63ff"
          loading={loadingBlogs}
          cssOverride={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
          }}
          size="4rem"
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        {/* Show the blocks of post  */}
        {data.map((item) => {
          return (
            <motion.div
              className="blog-card"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: "0vw" }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <span>{item.tag} </span>
              <h3>{item.route}</h3>
              <p>{`${item.main_content.substring(0, 150)}`}...</p>
              <Link to={`/blog/${item.route}`} className="blog-card-link">
                Learn More
              </Link>
              <div className="border-bottom"></div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
