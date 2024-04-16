import { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  faTrash,
  faCalendar,
  faCar,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./Employees.module.scss";
import Button from "../shared/Button";
import NavBar from "../shared/NavBar";
import Input, { VALIDATORS } from "../shared/Input";
import AuthContext from "../../contexts/AuthContext";
import { SERVER_BASE_URL } from "../../contexts/AuthProvider";

const UserCard = ({
  profilePicture,
  firstName,
  lastName,
  role,
  employeeId,
  employees,
  setEmployees,
}) => {
  const DEFAULT_PROFILE_PICTURE =
    "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg";
  const handleDelete = (employeeId) => {
    return async (e) => {
      const confirm = window.confirm(
        "Are you sure you want to delete this employee?"
      );
      if (!confirm) return;
      await fetch(`${SERVER_BASE_URL}/employee`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: employeeId }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.errno) {
            alert(`Error deleting employee: ${data.message}`);
            console.log(data);
          } else {
            setEmployees(employees.filter((e) => e.employee_id !== employeeId));
          }
        });
    };
  };

  return (
    <div className={styles.userCard}>
      <div className={styles.userContainer}>
        <div>
          <img
            className={styles.profilePicture}
            src={profilePicture || DEFAULT_PROFILE_PICTURE}
            alt="User"
          />
        </div>
        <div className={styles.text}>
          <h1>
            {firstName} {lastName}
          </h1>
          <p>{role}</p>
        </div>
      </div>
      <div className={styles.trashContainer} onClick={handleDelete(employeeId)}>
        <FontAwesomeIcon icon={faTrash} />
      </div>
    </div>
  );
};

export default function Employee() {
  const { user } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.body.style.background = "#EBEBEB";
    return () => (document.body.style.background = "");
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await fetch(
      `${SERVER_BASE_URL}/employee?branch_id=${user.branch_id}`
    );
    const employees = await response.json();
    const activeEmployees = employees.filter((employee) => !employee.deleted);
    setEmployees(activeEmployees);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    const {
      first_name,
      last_name,
      username,
      email,
      password_hash,
      phone_number,
      phone_country_code,
      date_of_birth,
      driver_license_number,
      line1,
      line2,
      city,
      state,
      zip,
      gender,
      role,
      shirt_size,
    } = e.target.elements;

    let empty, message;
    if (gender.value === "") {
      message = "Please select a gender";
      empty = true;
    } else if (role.value === "") {
      message = "Please select a role";
      empty = true;
    } else if (shirt_size.value === "") {
      message = "Please select a shirt size";
      empty = true;
    }

    if (empty) {
      alert(message);
      setIsLoading(false);
      return;
    }

    const branch_id = user.branch_id;
    const supervisor_employee_id = user.employee_id;

    fetch(`${SERVER_BASE_URL}/employee`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: first_name.value,
        last_name: last_name.value,
        username: username.value,
        email: email.value,
        password_hash: password_hash.value,
        phone_number: phone_number.value,
        phone_country_code: phone_country_code.value,
        branch_id,
        supervisor_employee_id,
        date_of_birth: date_of_birth.value,
        gender: gender.value,
        driver_license_number: driver_license_number.value,
        role: role.value,
        shirt_size: shirt_size.value,
        line1: line1.value,
        line2: line2.value,
        city: city.value,
        state: state.value,
        zip: zip.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errno) {
          alert(`Error adding employee: ${data.message}`);
          console.error(data);
        } else {
          fetchEmployees();
          alert("New employee added!");
        }
      })
      .then(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <NavBar />
      <div id={styles.container}>
        <div id={styles.innerContainer}>
          <section className={styles.section}>
            <h1 className={styles.heading}>Add New Employee</h1>
            <p className={styles.paragraph}>
              Please enter in the employee's information below.
            </p>
            <form id={styles.form} onSubmit={handleSubmit}>
              <h2 className={styles.subHeading}>Employee Details</h2>
              <Input
                containerClassName={styles.inputContainer}
                className={styles.input}
                label="First Name"
                name="first_name"
                type="text"
                icon={faUser}
                {...VALIDATORS.NAME}
              />
              <Input
                containerClassName={styles.inputContainer}
                className={styles.input}
                label="Last Name"
                name="last_name"
                type="text"
                icon={faUser}
                {...VALIDATORS.NAME}
              />
              <Input
                containerClassName={styles.inputContainer}
                className={styles.input}
                label="Username"
                name="username"
                type="text"
                icon={faCircleUser}
                {...VALIDATORS.USERNAME}
              />
              <Input
                containerClassName={styles.inputContainer}
                className={styles.input}
                label="Email"
                name="email"
                type="email"
                icon={faEnvelope}
                {...VALIDATORS.EMAIL}
              />
              <Input
                containerClassName={styles.inputContainer}
                className={styles.input}
                label="Password"
                name="password_hash"
                type="password"
                icon={faLock}
                {...VALIDATORS.PASSWORD}
              />
              <Input
                containerClassName={styles.inputContainer}
                className={styles.input}
                label="Phone Number"
                name="phone_number"
                type="tel"
                icon={faPhone}
                {...VALIDATORS.PHONE}
              />
              <Input
                containerClassName={styles.inputContainer}
                className={styles.input}
                label="Phone Country Code"
                name="phone_country_code"
                type="text"
                icon={faPhone}
                {...VALIDATORS.PHONE_COUNTRY_CODE}
              />
              <Input
                containerClassName={styles.inputContainer}
                className={styles.input}
                label="Date of Birth"
                name="date_of_birth"
                type="date"
                icon={faCalendar}
              />
              <Input
                containerClassName={styles.inputContainer}
                className={styles.input}
                label="Driver's License Number"
                name="driver_license_number"
                type="text"
                icon={faCar}
                {...VALIDATORS.DRIVERS_LICENSE}
              />
              <h2 className={styles.subHeading}>Address Details</h2>
              <Input
                containerClassName={styles.inputContainer}
                className={styles.input}
                type="text"
                name="line1"
                label="Address Line 1"
                icon={faHome}
                {...VALIDATORS.ADDRESS_LINE_1}
              />
              <Input
                containerClassName={styles.inputContainer}
                className={styles.input}
                type="text"
                name="line2"
                label="Address Line 2"
                required={false}
                icon={faBuilding}
                {...VALIDATORS.ADDRESS_LINE_2}
              />
              <Input
                containerClassName={styles.inputContainer}
                className={styles.input}
                type="text"
                name="city"
                label="City"
                icon={faLocationDot}
                {...VALIDATORS.CITY}
              />
              <Input
                containerClassName={styles.inputContainer}
                className={styles.input}
                type="text"
                name="state"
                label="State"
                icon={faMapPin}
                {...VALIDATORS.STATE}
              />
              <Input
                containerClassName={styles.inputContainer}
                className={styles.input}
                type="text"
                name="zip"
                label="Zip Code"
                icon={faLocationArrow}
                {...VALIDATORS.ZIP}
              />
              <h2 className={styles.subHeading}>Additional Details</h2>
              <select className={styles.select} name="gender" required>
                <option disabled selected value="">
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <select className={styles.select} name="role" required>
                <option disabled selected value="">
                  Select Role
                </option>
                <option value="Associate">Associate</option>
                <option value="Driver">Driver</option>
                <option value="Manager">Manager</option>
              </select>
              <select className={styles.select} name="shirt_size" required>
                <option disabled selected value="">
                  Select Shirt Size
                </option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="2XL">2XL</option>
                <option value="3XL">3XL</option>
              </select>
              <Button
                className={styles.submit}
                type="submit"
                text="Add Employee"
                isLoading={isLoading}
              />
            </form>
          </section>
          <section className={styles.section}>
            <h1 className={styles.heading}>{user.branch_name} Employees</h1>
            <p className={styles.paragraph}>
              Employees may be removed by clicking the trash icon.
            </p>
            <div id={styles.cardContainer}>
              {employees.map((employee) => (
                <UserCard
                  key={employee.employee_id}
                  profilePicture={employee.profile_picture}
                  firstName={employee.first_name}
                  lastName={employee.last_name}
                  role={employee.role}
                  employeeId={employee.employee_id}
                  employees={employees}
                  setEmployees={setEmployees}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
