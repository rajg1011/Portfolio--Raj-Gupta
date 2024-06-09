import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function useGetData(url) {
    const [loadingBlogs, setLoadingBlogs] = useState(false);
    const [data, setData] = useState([]);
    //get data from given url
    useEffect(() => {
        setLoadingBlogs(true);
        const fetchData = async () => {
          try {
            const res = await axios.get(
              `${import.meta.env.VITE_BACKEND_URL}/${url}`
            );
            setData(res.data.message);
            setLoadingBlogs(false);
          } catch (e) {
            toast.error("Something went wrong.. Please Refresh", {
                className: "toast-message",
              });
            setLoadingBlogs(false);
          }
        };
        fetchData();
      }, []);
      return {loadingBlogs, data};
}