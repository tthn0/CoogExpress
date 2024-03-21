import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { faUserCircle, faLock } from "@fortawesome/free-solid-svg-icons";
import { styles } from "../shared/AuthPageRight";
import AuthContext from "../../contexts/AuthContext";
import AuthPage from "../shared/AuthPage";
import Button from "../shared/Button";
import Input from "../shared/Input";

export default function Login() {
  const { attemptLogin } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = () => {
    return (e) => {
      e.preventDefault();
      setIsLoading(true);
      const username = e.target.username.value;
      const password = e.target.password.value;
      const callback = () => setIsLoading(false);
      attemptLogin(username, password, callback);
    };
  };
  const form = (
    <form className={styles.form} onSubmit={handleSubmit()}>
      <Input
        containerClassName={styles.input}
        type="text"
        name="username"
        label="Username"
        icon={faUserCircle}
      />
      <Input
        containerClassName={styles.input}
        type="password"
        name="password"
        label="Password"
        icon={faLock}
      />
      <p id={styles.prompt}>
        <Link to="#" className={styles.link}>
          Forgot password?
        </Link>
      </p>
      <Button
        className={styles.submit}
        type="submit"
        text="Login"
        isLoading={isLoading}
      />
    </form>
  );
  return (
    <AuthPage
      heading="Welcome Back"
      description="Sign in to view your personalized dashboard where you can view your previous shipments, track packages, and explore additional features tailored just for you."
      footerText="Don't have an account?"
      footerActionText="Sign up"
      footerActionLink="/register"
      children={form}
    />
  );
}
