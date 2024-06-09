import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import useGetData from "../../components/customHooks/getDataFromDB";
import CommentSection from "./commentSection";

export default function BlogData() {
  const { blogId } = useParams();
  //taking data from DB using useGetData custom hook
  const { loadingBlogs, data } = useGetData("api/db/getblogs");
  //to deal with asychronous nature of useEffect
  if (loadingBlogs) {
    return (
      <ClipLoader
        color="#6c63ff"
        loading={true}
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
    );
  }
  //Taking object from array where item.route=blogId
  const foundItem = data?.find((item) => item.route === blogId);
  const htmlString = foundItem?.post_data;
  const post_id = foundItem?.id;

  return (
    <div className="blog-post-page">
      <div>
      {/* Put String of data here  */}
        <div
          className="editor-html"
          dangerouslySetInnerHTML={{ __html: htmlString }}
        />
      </div>
      <CommentSection post_id={post_id} />
    </div>
  );
}
