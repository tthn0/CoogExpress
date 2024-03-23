import React, { Component } from "react";
import background from "./background.jpg";
import placeholderImage from "./PicPlaceholder.jpg";
import './ProfileForm.css';

class CustomerProfile extends Component {
    state = {
        customer: {
            user_id: 2,
            first_name: "John",
            last_name: "Cena",
            username: "jc",
            email: "john@cena.com",
            password_hash: "ucantseeme",
            phone_number: "1112223337",
            phone_country_code: "1",
            profile_picture: null,
            created_at: "2024-03-17T01:47:07.000Z",
            last_login: "2024-03-17T01:47:07.000Z",
            deleted: 0,
            customer_id: 1,
            preferred_branch_id: null,
            preferred_communication_method: null,
            address_id: 101,
            line1: "123 Main St",
            line2: null,
            city: "City",
            state: "ST",
            zip: "12345",
            profile_picture: null, 
        },
        cardInfo: {
            cardNumber: '',
            expirationDate: '',
            cvv: '',
            nameOnCard: '',
        },
        feedbackMessage: "",
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        const targetStateKey = name in this.state.cardInfo ? "cardInfo" : "customer";
        this.setState(prevState => ({
            [targetStateKey]: {
                ...prevState[targetStateKey],
                [name]: value
            }
        }));
    };
    
    handleProfilePictureChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState(prevState => ({
                    customer: {
                        ...prevState.customer,
                        profile_picture: e.target.result
                    }
                }));
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("Customer Info:", this.state.customer);
        console.log("Card Info:", this.state.cardInfo);
        this.setState({ feedbackMessage: "Profile updated successfully!" });
        setTimeout(() => this.setState({ feedbackMessage: "" }), 3000);
    };

    render() {
        const { customer, cardInfo, feedbackMessage } = this.state;

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
                    <h1>Customer Profile</h1>
                    <p>Welcome, {customer.first_name} {customer.last_name}</p>
                    {feedbackMessage && <div className="feedback-message">{feedbackMessage}</div>}
                    <form onSubmit={this.handleSubmit}>
                        <div className="profile-picture-container">
                            <div className="profile-picture" style={{ backgroundImage: customer.profile_picture ? `url(${customer.profile_picture})` : `url(${placeholderImage})` }}>
                            </div>
                            <label className="input-file-container">
                                <input type="file" onChange={this.handleProfilePictureChange} style={{ display: 'none' }}/>
                                <span className="input-file-button">Add Image</span>
                            </label>
                        </div>
                        <div className="flex-row">
                            {Object.entries(customer).filter(([key]) => !["profile_picture", "user_id", "created_at", "last_login", "deleted", "customer_id", "address_id"].includes(key)).map(([key, value]) => (
                                <div key={key} className="form-group flex-col">
                                    <label className="form-label">{key.replace(/_/g, ' ').toUpperCase()}</label>
                                    <input
                                        className="form-input"
                                        type="text"
                                        name={key}
                                        value={value}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            ))}
                        </div>
                        <div>
                            <h2>Other Information</h2>
                            {["user_id", "created_at", "last_login", "deleted", "customer_id", "address_id"].map(field => (
                                <div key={field} className="form-group flex-col">
                                                                   <label className="form-label">{field.replace(/_/g, ' ').toUpperCase()}</label>
                                    <input
                                        className="form-input"
                                        type="text"
                                        name={field}
                                        value={customer[field] || ''}
                                        readOnly
                                    />
                                </div>
                            ))}
                        </div>
                        <button type="submit" className="form-button">Save Changes</button>
                    </form>

                    <h2>Card Information</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="flex-row">
                            <div className="form-group flex-col">
                                <label className="form-label">CARD NUMBER</label>
                                <input
                                    className="form-input"
                                    type="text"
                                    name="cardNumber"
                                    value={cardInfo.cardNumber}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group flex-col">
                                <label className="form-label">EXPIRATION DATE</label>
                                <input
                                    className="form-input"
                                    type="text"
                                    name="expirationDate"
                                    value={cardInfo.expirationDate}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group flex-col">
                                <label className="form-label">CVV</label>
                                <input
                                    className="form-input"
                                    type="text"
                                    name="cvv"
                                    value={cardInfo.cvv}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group flex-col">
                                <label className="form-label">NAME ON CARD</label>
                                <input
                                    className="form-input"
                                    type="text"
                                    name="nameOnCard"
                                    value={cardInfo.nameOnCard}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <button type="submit" className="form-button">Update Card Info</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default CustomerProfile;


