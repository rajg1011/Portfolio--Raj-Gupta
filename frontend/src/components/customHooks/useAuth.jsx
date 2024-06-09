import { useContext } from "react";
import { AuthContext } from "../../authContext/authContext";

export default function useAuth(){
    //custom hook for AuthContext
    return useContext(AuthContext);
}