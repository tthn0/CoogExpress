import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  faCircleUser,
  faEnvelope,
  faLock,
  faUser,
  faPhone,
  faHome,
  faBuilding,
  faLocationDot,
  faMapPin,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import { styles } from "../shared/AuthPageRight";
import { SERVER_BASE_URL } from "../../contexts/AuthProvider";
import AuthContext from "../../contexts/AuthContext";
import AuthPage from "../shared/AuthPage";
import Button from "../shared/Button";
import Input, { VALIDATORS } from "../shared/Input";

export default function Register() {
  const { attemptLogin } = useContext(AuthContext);
  const [formIndex, setFormIndex] = useState(0);
  const [customer, setCustomer] = useState({});
  useEffect(() => {
    const hasNullValues = (obj) => Object.values(obj).every((v) => !v);
    if (formIndex !== 3) return;
    if (hasNullValues(customer)) {
      return alert(
        "There are null values. I was too lazy to put proper validation in place. Inspect the code again."
      );
    }
    fetch(`${SERVER_BASE_URL}/customer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          // SQL errors will be returned as an array.
          alert("There's probably a data validation error. Check the console.");
          return console.log(data);
        }
        attemptLogin(customer.username, customer.password_hash);
      })
      .catch((err) => {
        alert("There's an error with the fetch request. Check the console.");
        return console.log(err);
      });
  }, [formIndex]);
  const children = (
    <>
      <form
        style={{
          display: formIndex === 0 ? "block" : "none",
        }}
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          const username = e.target.username.value;
          const email = e.target.email.value;
          const password = e.target.password.value;
          setCustomer({
            ...customer,
            username,
            email,
            password_hash: password,
          });
          setFormIndex((prev) => prev + 1);
        }}
      >
        <Input
          containerClassName={styles.input}
          type="text"
          name="username"
          label="Username"
          icon={faCircleUser}
          {...VALIDATORS.USERNAME}
        />
        <Input
          containerClassName={styles.input}
          type="email"
          name="email"
          label="Email"
          icon={faEnvelope}
          {...VALIDATORS.EMAIL}
        />
        <Input
          containerClassName={styles.input}
          type="password"
          name="password"
          label="Password"
          icon={faLock}
          {...VALIDATORS.PASSWORD}
        />
        <Button
          className={styles.submit}
          type="submit"
          text="Next"
          isLoading={formIndex !== 0}
        />
      </form>
      <form
        style={{
          display: formIndex === 1 ? "block" : "none",
        }}
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          const first_name = e.target.first_name.value;
          const last_name = e.target.last_name.value;
          const phone_number = e.target.phone_number.value;
          const phone_country_code = e.target.phone_country_code.value;
          setCustomer({
            ...customer,
            first_name,
            last_name,
            phone_number,
            phone_country_code,
          });
          setFormIndex((prev) => prev + 1);
        }}
      >
        <Input
          containerClassName={styles.input}
          type="text"
          name="first_name"
          label="First Name"
          icon={faUser}
          {...VALIDATORS.NAME}
        />
        <Input
          containerClassName={styles.input}
          type="text"
          name="last_name"
          label="Last Name"
          icon={faUser}
          {...VALIDATORS.NAME}
        />
        <Input
          containerClassName={styles.input}
          type="tel"
          name="phone_number"
          label="Phone Number"
          icon={faPhone}
          {...VALIDATORS.PHONE}
        />
        <Input
          containerClassName={styles.input}
          type="text"
          name="phone_country_code"
          label="Country Code"
          icon={faPhone}
          {...VALIDATORS.PHONE_COUNTRY_CODE}
        />
        <Button
          className={styles.submit}
          type="submit"
          text="Next"
          isLoading={formIndex !== 1}
        />
      </form>
      <form
        style={{
          display: formIndex === 2 ? "block" : "none",
        }}
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          const line1 = e.target.line_1.value;
          const line2 = e.target.line_2.value;
          const city = e.target.city.value;
          const state = e.target.state.value;
          const zip = e.target.zip.value;
          setCustomer({
            ...customer,
            line1,
            line2,
            city,
            state,
            zip,
          });
          setFormIndex((prev) => prev + 1);
        }}
      >
        <Input
          containerClassName={styles.input}
          type="text"
          name="line_1"
          label="Address Line 1"
          icon={faHome}
          {...VALIDATORS.ADDRESS_LINE_1}
        />
        <Input
          containerClassName={styles.input}
          type="text"
          name="line_2"
          label="Address Line 2"
          required={false}
          icon={faBuilding}
          {...VALIDATORS.ADDRESS_LINE_2}
        />
        <Input
          containerClassName={styles.input}
          type="text"
          name="city"
          label="City"
          icon={faLocationDot}
          {...VALIDATORS.CITY}
        />
        <Input
          containerClassName={styles.input}
          type="text"
          name="state"
          label="State"
          icon={faMapPin}
          {...VALIDATORS.STATE}
        />
        <Input
          containerClassName={styles.input}
          type="text"
          name="zip"
          label="Zip Code"
          icon={faLocationArrow}
          {...VALIDATORS.ZIP}
        />
        <p id={styles.prompt}>
          By registering, you accept our{" "}
          <Link to="#" className={styles.link}>
            Terms of Use
          </Link>
          &nbsp;and&nbsp;
          <Link to="#" className={styles.link}>
            Privacy Policy
          </Link>
          .
        </p>
        <Button
          className={styles.submit}
          type="submit"
          text="Register"
          isLoading={formIndex !== 2}
        />
      </form>
    </>
  );
  return (
    <AuthPage
      heading="Client Registration"
      description="We make it quick and easy for our valued customers to send their packages in a convenient manner. Take the first step by registering below!"
      footerText="Already have an account?"
      footerActionText="Sign in"
      footerActionLink="/login"
      children={children}
    />
  );
}
