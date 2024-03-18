import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import AuthPage from "../shared/AuthPage";

const props = {
  heading: "Welcome Back",
  description:
    "Sign in to view your personalized dashboard where you can view your previous shipments, track packages, and explore additional features tailored just for you.",
  handleSubmit: (attemptLogin, setIsLoading) => {
    return (e) => {
      e.preventDefault();
      setIsLoading(true);
      const username = e.target.username.value;
      const password = e.target.password.value;
      const callback = () => setIsLoading(false);
      attemptLogin(username, password, callback);
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
  return <AuthPage {...props} />;
}
