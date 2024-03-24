import { useContext, useState } from "react";
import {
  faUser,
  faRulerVertical,
  faWeightHanging,
  faHome,
  faBuilding,
  faLocationDot,
  faMapPin,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";

import AuthContext from "../../contexts/AuthContext";
import Input from "../shared/Input";
import Button from "../shared/Button";
import styles from "./DashboardAssociate.module.scss";
import { SERVER_BASE_URL } from "../../contexts/AuthProvider";

export default function PackageForm() {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    source_branch_id: user.branch_id,
    base_shipping_cost: Math.random() * 20,
    additional_fees: Math.random() * 5,
  });
  const [packageType, setPackageType] = useState(null);
  const [packageSpeed, setPackageSpeed] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const updatePackageType = (e) => {
    e.preventDefault();
    e.target.classList.add(styles.selectedButton);
    packageType?.classList.remove(styles.selectedButton);
    setPackageType(e.target);
    setForm((prev) => ({ ...prev, type: e.target.value }));
  };

  const updatePackageSpeed = (e) => {
    e.preventDefault();
    e.target.classList.add(styles.selectedButton);
    packageSpeed?.classList.remove(styles.selectedButton);
    setPackageSpeed(e.target);
    setForm((prev) => ({ ...prev, speed: e.target.value }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);

    setIsLoading(true);

    fetch(`${SERVER_BASE_URL}/package`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errno) {
          alert(`An error occurred: ${data.message}. Check the console.`);
          console.log(data);
        } else {
          alert("Package created successfully!");
        }
      })
      .catch((error) => {
        alert(`An error occurred: ${error.message}. Check the consnole.`);
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div id={styles.formContainer}>
      <h1 id={styles.heading}>Create New Package</h1>
      <p id={styles.paragraph}>Please enter in the package details below.</p>
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <h2 className={styles.subHeading}>Customer Details</h2>
        <Input
          containerClassName={styles.inputContainer}
          className={styles.input}
          type="text"
          name="sender_username"
          label="Sender Username"
          icon={faUser}
        />
        <Input
          containerClassName={styles.inputContainer}
          className={styles.input}
          type="text"
          name="receiver_username"
          label="Receiver Username"
          icon={faUser}
        />

        <h2 className={styles.subHeading}>Package Details</h2>
        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            value="Parcel"
            onClick={updatePackageType}
          >
            📦 Parcel
          </button>
          <button
            className={styles.button}
            value="Mail"
            onClick={updatePackageType}
          >
            📧 Mail
          </button>
        </div>
        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            value="Standard"
            onClick={updatePackageSpeed}
          >
            🐌 Standard
          </button>
          <button
            className={styles.button}
            value="Express"
            onClick={updatePackageSpeed}
          >
            🐢 Express
          </button>
          <button
            className={styles.button}
            value="Overnight"
            onClick={updatePackageSpeed}
          >
            🐇 Overnight
          </button>
        </div>
        <Input
          containerClassName={styles.inputContainer}
          className={styles.input}
          type="number"
          name="width"
          label="Width"
          icon={faRulerVertical}
        />
        <Input
          containerClassName={styles.inputContainer}
          className={styles.input}
          type="number"
          name="length"
          label="Length"
          icon={faRulerVertical}
        />
        <Input
          containerClassName={styles.inputContainer}
          className={styles.input}
          type="number"
          name="height"
          label="Height"
          icon={faRulerVertical}
        />
        <Input
          containerClassName={styles.inputContainer}
          className={styles.input}
          type="number"
          name="weight"
          label="Weight"
          icon={faWeightHanging}
        />

        <h2 className={styles.subHeading}>Address Details</h2>
        <Input
          containerClassName={styles.inputContainer}
          className={styles.input}
          type="text"
          name="destination_address_line1"
          label="Address Line 1"
          icon={faHome}
        />
        <Input
          containerClassName={styles.inputContainer}
          className={styles.input}
          type="text"
          name="destination_address_line2"
          label="Address Line 2"
          icon={faBuilding}
          required={false}
        />
        <Input
          containerClassName={styles.inputContainer}
          className={styles.input}
          type="text"
          name="destination_address_city"
          label="City"
          icon={faLocationDot}
        />
        <Input
          containerClassName={styles.inputContainer}
          className={styles.input}
          type="text"
          name="destination_address_state"
          label="State"
          icon={faMapPin}
        />
        <Input
          containerClassName={styles.inputContainer}
          className={styles.input}
          type="text"
          name="destination_address_zip"
          label="Zip"
          icon={faLocationArrow}
        />

        <h2 className={styles.subHeading}>Instructions</h2>
        <label className={styles.label} htmlFor="special_handling_instructions">
          Special Handling Instructions
        </label>
        <textarea
          className={styles.textarea}
          name="special_handling_instructions"
        ></textarea>

        <label className={styles.label} htmlFor="delivery_instructions">
          Delivery Instructions
        </label>
        <textarea
          className={styles.textarea}
          name="delivery_instructions"
        ></textarea>

        <h2 className={styles.subHeading}>Summary</h2>
        <h3 className={styles.h3}>Base shipping cost</h3>
        <pre>$19.99</pre>
        <h3 className={styles.h3}>Additional Fees</h3>
        <pre>$1.50</pre>
        <h3 className={styles.h3}>Total</h3>
        <pre>$21.49</pre>

        <Button
          className={styles.submit}
          text="Create Package"
          isLoading={isLoading}
        />
      </form>
    </div>
  );
}
