import React, { useContext, useState, useEffect } from "react";
import styles from "./DashboardManager.module.css";
import AuthContext from "../../contexts/AuthContext";
import { SERVER_BASE_URL } from "../../contexts/AuthProvider";

const DashboardManager = () => {
  const { user } = useContext(AuthContext);

  const [packageStats, setPackageStats] = useState({
    last7Days: 0,
    last30Days: 0,
    last90Days: 0,
  });
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchPackageStats();
    fetchEmployees();
  }, []);

  const [newEmployee, setNewEmployee] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    passwordHash: "",
    phoneNumber: "",
    phoneCountryCode: "",
    branchId: "",
    supervisorEmployeeId: "",
    dateOfBirth: "",
    gender: "",
    driverLicenseNumber: "",
    role: "",
    shirtSize: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    zip: "",
  });

  const addNewEmployee = async () => {
    // Validation could be more complex depending on requirements
    if (!newEmployee.email.includes("@")) {
      console.error("Please enter a valid email.");
      return;
    }
    if (newEmployee.passwordHash.length < 6) {
      console.error("Password must be at least 6 characters.");
      return;
    }

    // You could add more validations as needed here

    try {
      // Replace with your API call
      const response = await fetch("http://localhost:3001/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include other headers like authorization if needed
        },
        body: JSON.stringify({
          first_name: newEmployee.firstName,
          last_name: newEmployee.lastName,
          username: newEmployee.username,
          email: newEmployee.email,
          password_hash: newEmployee.passwordHash,
          phone_number: newEmployee.phoneNumber,
          phone_country_code: newEmployee.phoneCountryCode,
          branch_id: newEmployee.branchId,
          supervisor_employee_id: newEmployee.supervisorEmployeeId,
          date_of_birth: newEmployee.dateOfBirth,
          gender: newEmployee.gender,
          driver_license_number: newEmployee.driverLicenseNumber,
          role: newEmployee.role,
          shirt_size: newEmployee.shirtSize,
          line1: newEmployee.line1,
          line2: newEmployee.line2,
          city: newEmployee.city,
          state: newEmployee.state,
          zip: newEmployee.zip,
          // Other fields can be added here as needed
        }),
      });

      const data = await response.json();

      if (data.errno) {
        // Handle response errors
        alert("Error, please check console");
        console.error("Error adding employee:", data);
        return;
      }

      // Handle the successful response
      alert("New employee registered!");
      console.log("Employee added successfully:", data);
      setEmployees([...employees, data]);

      // Clear the form fields
      setNewEmployee({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        passwordHash: "",
        phoneNumber: "",
        phoneCountryCode: "",
        branchId: "",
        supervisorEmployeeId: "",
        dateOfBirth: "",
        gender: "",
        driverLicenseNumber: "",
        role: "",
        shirtSize: "",
        line1: "",
        line2: "",
        city: "",
        state: "",
        zip: "",
      });
    } catch (error) {
      // Handle errors like network issues
      console.error("Network error when adding employee:", error);
    }
  };

  const [reportRequest, setReportRequest] = useState({
    group: "",
    protocolNumber: "",
    employee: "",
    principalInvestigator: "",
    project: "",
    additionalPersonnel: "",
    activityFromDate: "",
    activityToDate: "",
    includeInactiveEmployees: false,
  });

  const fetchPackageStats = async () => {
    // Placeholder: Replace with your API call
    const stats = {
      last7Days: 100, // Example data
      last30Days: 400,
      last90Days: 1200,
    };
    setPackageStats(stats);
  };

  const fetchEmployees = async () => {
    const response = await fetch(`${SERVER_BASE_URL}/employee`);
    const employees = await response.json();

    const employeesAtMyBrach = employees.filter((e) => {
      return e.branch_id === user.branch_id;
    });

    console.log(employeesAtMyBrach);

    setEmployees(employeesAtMyBrach);
  };

  const handleReportInputChange = (e) => {
    const { name, value } = e.target;
    const isCheckbox = e.target.type === "checkbox";
    setReportRequest({
      ...reportRequest,
      [name]: isCheckbox ? e.target.checked : value,
    });
  };

  const handleViewReport = () => {
    // Placeholder: Replace with your logic to generate and view the report
    console.log("Report Requested with parameters:", reportRequest);
    // Fetch or generate the report here
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.header}>Manager Dashboard</h1>
      <div className={styles.stats}>
        <h2>Package Statistics</h2>
        <p>Last 7 days: {packageStats.last7Days}</p>
        <p>Last 30 days: {packageStats.last30Days}</p>
        <p>Last 90 days: {packageStats.last90Days}</p>
      </div>
      <div className={styles.employees}>
        <h2>Employees</h2>
        <ul>
          {employees.map((employee) => (
            <li key={employee.employee_id}>
              {employee.first_name} {employee.last_name} - {employee.role}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.newEmployeeSection}>
        <h2>Add New Employee</h2>
        <form
          className={styles.newEmployeeForm}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            style={{ width: "25%" }}
            type="text"
            name="firstName"
            placeholder="First Name"
            value={newEmployee.firstName}
            onChange={handleInputChange}
          />
          <input
            style={{ width: "25%" }}
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={newEmployee.lastName}
            onChange={handleInputChange}
          />
          <input
            style={{ width: "25%" }}
            type="text"
            name="username"
            placeholder="Username"
            value={newEmployee.username}
            onChange={handleInputChange}
          />
          <input
            style={{ width: "25%" }}
            type="email"
            name="email"
            placeholder="Email"
            value={newEmployee.email}
            onChange={handleInputChange}
          />
          <input
            style={{ width: "25%" }}
            type="password"
            name="passwordHash"
            placeholder="Password"
            value={newEmployee.passwordHash}
            onChange={handleInputChange}
          />
          <input
            style={{ width: "25%" }}
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={newEmployee.phoneNumber}
            onChange={handleInputChange}
          />
          <input
            style={{ width: "25%" }}
            type="text"
            name="phoneCountryCode"
            placeholder="Country Code"
            value={newEmployee.phoneCountryCode}
            onChange={handleInputChange}
          />
          <input
            style={{ width: "25%" }}
            type="text"
            name="branchId"
            placeholder="Branch ID"
            value={newEmployee.branchId}
            onChange={handleInputChange}
          />
          <input
            style={{ width: "25%" }}
            type="text"
            name="supervisorEmployeeId"
            placeholder="Supervisor Employee ID"
            value={newEmployee.supervisorEmployeeId}
            onChange={handleInputChange}
          />
          <input
            style={{ width: "25%" }}
            type="date"
            name="dateOfBirth"
            placeholder="Date of Birth"
            value={newEmployee.dateOfBirth}
            onChange={handleInputChange}
          />
          <select
            style={{ width: "25%" }}
            name="gender"
            value={newEmployee.gender}
            onChange={handleInputChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input
            style={{ width: "25%" }}
            type="text"
            name="driverLicenseNumber"
            placeholder="Driver's License Number"
            value={newEmployee.driverLicenseNumber}
            onChange={handleInputChange}
          />
          <input
            style={{ width: "25%" }}
            type="text"
            name="role"
            placeholder="Role"
            value={newEmployee.role}
            onChange={handleInputChange}
          />
          <input
            style={{ width: "25%" }}
            type="text"
            name="shirtSize"
            placeholder="Shirt Size"
            value={newEmployee.shirtSize}
            onChange={handleInputChange}
          />
          <input
            style={{ width: "25%" }}
            type="text"
            name="line1"
            placeholder="Address Line 1"
            value={newEmployee.line1}
            onChange={handleInputChange}
          />
          <input
            style={{ width: "25%" }}
            type="text"
            name="line2"
            placeholder="Address Line 2"
            value={newEmployee.line2}
            onChange={handleInputChange}
          />
          <input
            style={{ width: "25%" }}
            type="text"
            name="city"
            placeholder="City"
            value={newEmployee.city}
            onChange={handleInputChange}
          />
          <input
            style={{ width: "25%" }}
            type="text"
            name="state"
            placeholder="State"
            value={newEmployee.state}
            onChange={handleInputChange}
          />
          <input
            style={{ width: "25%" }}
            type="text"
            name="zip"
            placeholder="Zip Code"
            value={newEmployee.zip}
            onChange={handleInputChange}
          />
          <button type="button" onClick={addNewEmployee}>
            Add Employee
          </button>
        </form>
      </div>

      <div className={styles.reportRequest}>
        <h2>Activity Report</h2>
        <div className={styles.formControl}>
          <label>Group</label>
          <select
            name="group"
            value={reportRequest.group}
            onChange={handleReportInputChange}
          >
            {/* Populate with actual groups */}
            <option value="ORIT">ORIT</option>
            {/* ... other options ... */}
          </select>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formControl}></div>

          <div className={styles.inlineCheckbox}>
            <input
              id="includeInactiveEmployees"
              type="checkbox"
              name="includeInactiveEmployees"
              checked={reportRequest.includeInactiveEmployees}
              onChange={handleReportInputChange}
            />
            <label htmlFor="includeInactiveEmployees">
              Include inactive employee(s)
            </label>
          </div>
        </div>

        <div className={styles.datePicker}>
          <label>Activity date from</label>
          <input
            style={{ width: "25%" }}
            type="date"
            name="activityFromDate"
            value={reportRequest.activityFromDate}
            onChange={handleReportInputChange}
          />
          <label>Activity date to</label>
          <input
            style={{ width: "25%" }}
            type="date"
            name="activityToDate"
            value={reportRequest.activityToDate}
            onChange={handleReportInputChange}
          />
        </div>
        <div className={styles.formActions}>
          <button onClick={handleViewReport}>View Report</button>
          <button>Save As</button> {/* Implement the saving functionality */}
        </div>
      </div>
    </div>
  );
};

export default DashboardManager;
