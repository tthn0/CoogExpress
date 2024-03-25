import { useEffect, useState } from "react";
import styles from "./DashboardDriver.module.css";

export default function DashboardDriver() {
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [packages, setPackages] = useState([
    // Sample package data
    {
      id: 1,
      sender_customer_id: "123",
      receiver_customer_id: "456",
      source_branch_id: "ABCD",
      destination_address: "1234 Main St, SomeCity, SomeState, 12345",
      shipment_id: "78910",
      type: "Document",
      width: 8.5,
      length: 11.0,
      weight: 0.5,
      special_handling_instruction: "Do not bend",
      delivery_instruction: "Leave at front desk",
    },
    {
      id: 2,
      sender_customer_id: "444",
      receiver_customer_id: "999",
      source_branch_id: "housotnosdnk",
      destination_address: "1234 Main St, SomeCity, SomeState, 12345",
      shipment_id: "78910",
      type: "Document",
      width: 8.5,
      length: 11.0,
      weight: 0.5,
      special_handling_instruction: "Do not bend",
      delivery_instruction: "Leave at front desk",
    },
    {
      id: 1,
      sender_customer_id: "123",
      receiver_customer_id: "456",
      source_branch_id: "ABCD",
      destination_address: "1234 Main St, SomeCity, SomeState, 12345",
      shipment_id: "78910",
      type: "Document",
      width: 8.5,
      length: 11.0,
      weight: 0.5,
      special_handling_instruction: "Do not bend",
      delivery_instruction: "Leave at front desk",
    },
    {
      id: 2,
      sender_customer_id: "444",
      receiver_customer_id: "999",
      source_branch_id: "housotnosdnk",
      destination_address: "1234 Main St, SomeCity, SomeState, 12345",
      shipment_id: "78910",
      type: "Document",
      width: 8.5,
      length: 11.0,
      weight: 0.5,
      special_handling_instruction: "Do not bend",
      delivery_instruction: "Leave at front desk",
    },
    {
      id: 1,
      sender_customer_id: "123",
      receiver_customer_id: "456",
      source_branch_id: "ABCD",
      destination_address: "1234 Main St, SomeCity, SomeState, 12345",
      shipment_id: "78910",
      type: "Document",
      width: 8.5,
      length: 11.0,
      weight: 0.5,
      special_handling_instruction: "Do not bend",
      delivery_instruction: "Leave at front desk",
    },
    {
      id: 2,
      sender_customer_id: "444",
      receiver_customer_id: "999",
      source_branch_id: "housotnosdnk",
      destination_address: "1234 Main St, SomeCity, SomeState, 12345",
      shipment_id: "78910",
      type: "Document",
      width: 8.5,
      length: 11.0,
      weight: 0.5,
      special_handling_instruction: "Do not bend",
      delivery_instruction: "Leave at front desk",
    },
    {
      id: 1,
      sender_customer_id: "123",
      receiver_customer_id: "456",
      source_branch_id: "ABCD",
      destination_address: "1234 Main St, SomeCity, SomeState, 12345",
      shipment_id: "78910",
      type: "Document",
      width: 8.5,
      length: 11.0,
      weight: 0.5,
      special_handling_instruction: "Do not bend",
      delivery_instruction: "Leave at front desk",
    },
    {
      id: 2,
      sender_customer_id: "444",
      receiver_customer_id: "999",
      source_branch_id: "housotnosdnk",
      destination_address: "1234 Main St, SomeCity, SomeState, 12345",
      shipment_id: "78910",
      type: "Document",
      width: 8.5,
      length: 11.0,
      weight: 0.5,
      special_handling_instruction: "Do not bend",
      delivery_instruction: "Leave at front desk",
    },
    {
      id: 1,
      sender_customer_id: "123",
      receiver_customer_id: "456",
      source_branch_id: "ABCD",
      destination_address: "1234 Main St, SomeCity, SomeState, 12345",
      shipment_id: "78910",
      type: "Document",
      width: 8.5,
      length: 11.0,
      weight: 0.5,
      special_handling_instruction: "Do not bend",
      delivery_instruction: "Leave at front desk",
    },
    {
      id: 2,
      sender_customer_id: "444",
      receiver_customer_id: "999",
      source_branch_id: "housotnosdnk",
      destination_address: "1234 Main St, SomeCity, SomeState, 12345",
      shipment_id: "78910",
      type: "Document",
      width: 8.5,
      length: 11.0,
      weight: 0.5,
      special_handling_instruction: "Do not bend",
      delivery_instruction: "Leave at front desk",
    },
    {
      id: 1,
      sender_customer_id: "123",
      receiver_customer_id: "456",
      source_branch_id: "ABCD",
      destination_address: "1234 Main St, SomeCity, SomeState, 12345",
      shipment_id: "78910",
      type: "Document",
      width: 8.5,
      length: 11.0,
      weight: 0.5,
      special_handling_instruction: "Do not bend",
      delivery_instruction: "Leave at front desk",
    },
    {
      id: 2,
      sender_customer_id: "444",
      receiver_customer_id: "999",
      source_branch_id: "housotnosdnk",
      destination_address: "1234 Main St, SomeCity, SomeState, 12345",
      shipment_id: "78910",
      type: "Document",
      width: 8.5,
      length: 11.0,
      weight: 0.5,
      special_handling_instruction: "Do not bend",
      delivery_instruction: "Leave at front desk",
    },
    {
      id: 1,
      sender_customer_id: "123",
      receiver_customer_id: "456",
      source_branch_id: "ABCD",
      destination_address: "1234 Main St, SomeCity, SomeState, 12345",
      shipment_id: "78910",
      type: "Document",
      width: 8.5,
      length: 11.0,
      weight: 0.5,
      special_handling_instruction: "Do not bend",
      delivery_instruction: "Leave at front desk",
    },
    {
      id: 2,
      sender_customer_id: "444",
      receiver_customer_id: "999",
      source_branch_id: "housotnosdnk",
      destination_address: "1234 Main St, SomeCity, SomeState, 12345",
      shipment_id: "78910",
      type: "Document",
      width: 8.5,
      length: 11.0,
      weight: 0.5,
      special_handling_instruction: "Do not bend",
      delivery_instruction: "Leave at front desk",
    },
    {
      id: 1,
      sender_customer_id: "123",
      receiver_customer_id: "456",
      source_branch_id: "ABCD",
      destination_address: "1234 Main St, SomeCity, SomeState, 12345",
      shipment_id: "78910",
      type: "Document",
      width: 8.5,
      length: 11.0,
      weight: 0.5,
      special_handling_instruction: "Do not bend",
      delivery_instruction: "Leave at front desk",
    },
    {
      id: 2,
      sender_customer_id: "444",
      receiver_customer_id: "999",
      source_branch_id: "housotnosdnk",
      destination_address: "1234 Main St, SomeCity, SomeState, 12345",
      shipment_id: "78910",
      type: "Document",
      width: 8.5,
      length: 11.0,
      weight: 0.5,
      special_handling_instruction: "Do not bend",
      delivery_instruction: "Leave at front desk",
    },
    // Add more packages as needed
  ]);

  useEffect(() => {
    document.body.style.background = "#67727a";

    return () => {
      document.body.style.background = "";
    };
  });

  const checkInTime = "12:13pm";
  const checkOutTime = "7:04pm";

  const updateLocation = () => {
    // Placeholder for updating location logic
    console.log({ line1, line2, city, state, zip });
  };

  const handleCheckOut = () => {
    // Placeholder for checkout logic
    console.log("Driver checked out at", new Date().toLocaleTimeString());
    // Implement the function to handle driver's check-out
    // This might involve sending data to a backend server or handling it in some other way
  };

  return (
    <div className={styles.dashboard}>
      <h2>Driver Dashboard</h2>
      <p>Destination Address: XXXXXXXX</p>
      <div className="info">
        <h3>
          Check-In Time: <span>{checkInTime}</span>
        </h3>
        <h3>
          Check-Out Time: <span>{checkOutTime}</span>
        </h3>
      </div>
      <button onClick={handleCheckOut}>Check Out</button>{" "}
      {/* New Check-Out Button */}
      {/* Address Input Fields */}
      {/* Input fields for line1, line2, city, state, zip here */}
      <div>
        <label htmlFor="line1">Address Line 1:</label>
        <input
          type="text"
          id="line1"
          value={line1}
          onChange={(e) => setLine1(e.target.value)}
          placeholder="Street address, P.O. box, company name, c/o"
        />
      </div>
      <div>
        <label htmlFor="line2">Address Line 2:</label>
        <input
          type="text"
          id="line2"
          value={line2}
          onChange={(e) => setLine2(e.target.value)}
          placeholder="Apartment, suite, unit, building, floor, etc."
        />
      </div>
      <div>
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
        />
      </div>
      <div>
        <label htmlFor="state">State:</label>
        <input
          type="text"
          id="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="State"
        />
      </div>
      <div>
        <label htmlFor="zip">Zip Code:</label>
        <input
          type="text"
          id="zip"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          placeholder="Zip Code"
        />
      </div>
      <button onClick={updateLocation}>Update Location</button>
      {/* Packages Table */}
      <h3>Packages in the Car</h3>
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Source Branch</th>
              <th>Destination Address</th>
              <th>Shipment ID</th>
              <th>Type</th>
              <th>Dimensions (WxL)</th>
              <th>Weight</th>
              <th>Special Handling Instructions</th>
              <th>Delivery Instructions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg.id}>
                <td>{pkg.id}</td>
                <td>{pkg.sender_customer_id}</td>
                <td>{pkg.receiver_customer_id}</td>
                <td>{pkg.source_branch_id}</td>
                <td>{pkg.destination_address}</td>
                <td>{pkg.shipment_id}</td>
                <td>{pkg.type}</td>
                <td>{`${pkg.width}x${pkg.length}`}</td>
                <td>{pkg.weight} lbs</td>
                <td>{pkg.special_handling_instruction}</td>
                <td>{pkg.delivery_instruction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
