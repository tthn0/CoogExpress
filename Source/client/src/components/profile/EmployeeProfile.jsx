import React, { useState } from "react";
import background from "./background.jpg";
import placeholderImage from "./PicPlaceholder.jpg";
import './ProfileForm.css';

function EmployeeForm() {
    const [employee, setEmployee] = useState({
        // Initial employee state
        user_id: 1,
        first_name: "Thomas",
        last_name: "Nguyen",
        username: "tthn",
        email: "thomas@tthn.us",
        password_hash: "password",
        phone_number: "0000000000",
        phone_country_code: "1",
        profile_picture: null,
        created_at: "2024-03-17T17:30:45.000Z",
        last_login: "2024-03-17T17:30:45.000Z",
        deleted: 0,
        employee_id: 1,
        branch_id: 1,
        supervisor_employee_id: 1,
        date_of_birth: "2024-03-17T05:00:00.000Z",
        gender: "Male",
        driver_license_number: "1234567890123",
        role: "General Manager",
        shirt_size: "M",
        address_id: 1,
        line1: "123 Main St",
        line2: "Apt 1",
        city: "New York",
        state: "NY",
        zip: "10001",
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEmployee(prevEmployee => ({
            ...prevEmployee,
            [name]: value
        }));
    };

    const handleProfilePictureChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                setEmployee(prevEmployee => ({
                    ...prevEmployee,
                    profile_picture: e.target.result
                }));
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the form from actually submitting
        console.log(employee); // Log the current state to the console
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000); // Reset the submission state after 5 seconds
    };

    const myStyle = {
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "white",
        paddingTop: '50px',
        paddingBottom: '20px',
    };

    return (
        <div style={myStyle}>
            <div className="form-container">
                <h1>Employee Profile</h1>
                <p>Welcome, {employee.first_name} {employee.last_name}</p>
                {submitted && <p className="submission-success">Information updated successfully!</p>}
                <form onSubmit={handleSubmit}>
                    <div className="profile-picture-container">
                        <div className="profile-picture" style={{ backgroundImage: employee.profile_picture ? `url(${employee.profile_picture})` : `url(${placeholderImage})` }}>
                        </div>
                        <label className="input-file-container">
                            <input type="file" onChange={handleProfilePictureChange} style={{ display: 'none' }}/>
                            <span className="input-file-button">Add Image</span>
                        </label>
                    </div>
                    <div className="flex-row">
                        {Object.entries(employee).filter(([key]) => key !== "profile_picture" && key !== "user_id").map(([key, value]) => (
                            <div key={key} className="form-group flex-col">
                                <label className="form-label">{key.replace(/_/g, ' ').toUpperCase()}</label>
                                <input
                                    className="form-input"
                                    type="text"
                                    name={key}
                                    value={value}
                                    onChange={handleChange}
                                    readOnly={["created_at", "last_login", "deleted", "employee_id", "branch_id", "supervisor_employee_id", "date_of_birth", "address_id"].includes(key)}
                                />
                            </div>
                        ))}
                    </div>
                    <button type="submit" className="form-button">Save Changes</button>
                </form>
            </div>
        </div>
    );
}

export default EmployeeForm;
