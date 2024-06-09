import AboutPage from "./components/aboutPage";
import Blogs from "./blogs";
import SignUpForm from "./blogs/components/signUpForm";
import LoginForm from "./blogs/components/loginForm";
import CreatePostPage from "./blogs/adminAccess";



function About(){
    return(
        <AboutPage/>
    )   
}
function BlogPage(){
    return(
        <Blogs/>
    )   
}

function SignUp(){
    return(
        <SignUpForm/>
    )
}

function Login(){
    return(
        <LoginForm/>
    )
}
function CreatePost(){
    return(
        <CreatePostPage/>
    )   
}


export {About,BlogPage,SignUp, Login , CreatePost}