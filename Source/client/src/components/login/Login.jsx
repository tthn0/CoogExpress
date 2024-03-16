import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import Authentication from "../shared/Authentication";

const props = {
  heading: "Welcome Back",
  description:
    "Sign in to view your personalized dashboard where you can view your previous shipments, track packages, and explore additional features tailored just for you.",
  handleSubmit: (navigate) => {
    return (e) => {
      e.preventDefault();
      console.log(e.target.username.value);
      console.log(e.target.password.value);
      navigate("/profile");
    };
  },
  inputPropArray: [
    {
      type: "text",
      name: "username",
      label: "Username",
      icon: faUser,
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      icon: faLock,
    },
  ],
  promptFragment: (
    <span
      style={{ fontWeight: 600, cursor: "pointer" }}
      onClick={() => alert("This feature hasn't been implemented yet.")}
    >
      Forgot password?
    </span>
  ),
  buttonText: "Login",
  footerText: "Don't have an account?",
  footerActionText: "Sign up",
  footerActionLink: "/register",
};

export default function Login() {
  return <Authentication {...props} />;
}
