import { useContext, useEffect, useRef, useState } from "react";
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
import Input, { VALIDATORS } from "../shared/Input";
import Button from "../shared/Button";
import styles from "./DashboardAssociate.module.scss";
import { SERVER_BASE_URL } from "../../contexts/AuthProvider";

const PACKAGE_TYPES = Object.freeze({
  PARCEL: "Parcel",
  MAIL: "Mail",
});

const PACKAGE_SPEEDS = Object.freeze({
  STANDARD: "Standard",
  EXPRESS: "Express",
  OVERNIGHT: "Overnight",
});

export default function PackageForm() {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    source_branch_id: user.branch_id,
    base_shipping_cost: 0,
    additional_fees: 0,
    type: null,
    speed: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [validUsernames, setValidUsernames] = useState([]);
  const packageTypeRef = useRef(null);
  const packageSpeedRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    fetch(`${SERVER_BASE_URL}/customer`)
      .then((res) => res.json())
      .then((data) => {
        if (data.errno) {
          alert(`An error occurred: ${data.message}. Check the console.`);
          console.log(data);
          return;
        }
        const validUsernames = data.map((customer) => customer.username);
        setValidUsernames(validUsernames);
      })
      .catch((error) => {
        alert(`An error occurred: ${error.message}. Check the console.`);
        console.log(error);
      });
  }, []);

  const updatePackageType = (e) => {
    e.preventDefault();
    packageTypeRef.current?.classList.remove(styles.selectedButton);
    packageTypeRef.current = e.target;
    packageTypeRef.current.classList.add(styles.selectedButton);
    setForm((prev) => ({ ...prev, type: e.target.value }));

    if (e.target.value === PACKAGE_TYPES.PARCEL) {
      setForm((prev) => ({ ...prev, base_shipping_cost: 4.99 }));
    } else if (e.target.value === PACKAGE_TYPES.MAIL) {
      setForm((prev) => ({ ...prev, base_shipping_cost: 0.99 }));
    } else {
      throw new Error("Invalid package type");
    }
  };

  const updatePackageSpeed = (e) => {
    e.preventDefault();
    packageSpeedRef.current?.classList.remove(styles.selectedButton);
    packageSpeedRef.current = e.target;
    packageSpeedRef.current.classList.add(styles.selectedButton);
    setForm((prev) => ({ ...prev, speed: e.target.value }));

    if (e.target.value === PACKAGE_SPEEDS.STANDARD) {
      setForm((prev) => ({ ...prev, additional_fees: 0 }));
    } else if (e.target.value === PACKAGE_SPEEDS.EXPRESS) {
      setForm((prev) => ({ ...prev, additional_fees: 1.99 }));
    } else if (e.target.value === PACKAGE_SPEEDS.OVERNIGHT) {
      setForm((prev) => ({ ...prev, additional_fees: 4.99 }));
    } else {
      throw new Error("Invalid package speed");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validateUsername = (username) => {
      return validUsernames.includes(username);
    };

    if (!validateUsername(form.sender_username)) {
      alert("Sender username is invalid.");
      return;
    } else if (!validateUsername(form.receiver_username)) {
      alert("Receiver username is invalid.");
      return;
    } else if (form.sender_username === form.receiver_username) {
      alert("Sender and receiver usernames cannot be the same.");
      return;
    }

    setIsLoading(true);

    fetch(`${SERVER_BASE_URL}/package`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        destination_address_line2: form.destination_address_line2 ?? "",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errno) {
          alert(`An error occurred: ${data.message}. Check the console.`);
          console.log(data);
        } else {
          alert("Package created successfully!");
          formRef.current.reset();
          packageTypeRef.current?.classList.remove(styles.selectedButton);
          packageSpeedRef.current?.classList.remove(styles.selectedButton);
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

  const usernameDatalistId = "usernames";
  const usernameDatalist = (
    <datalist id={usernameDatalistId}>
      {validUsernames.map((username) => (
        <option key={username} value={username} />
      ))}
    </datalist>
  );

  return (
    <div id={styles.formContainer}>
      <h1 id={styles.heading}>Create New Package</h1>
      <p className={styles.paragraph}>
        Please enter in the package details below.
      </p>
      <form ref={formRef} onSubmit={handleSubmit} onChange={handleChange}>
        <h2 className={styles.subHeading}>Customer Details</h2>
        {usernameDatalist}
        <Input
          containerClassName={styles.inputContainer}
          className={styles.input}
          type="search"
          list={usernameDatalistId}
          name="sender_username"
          label="Sender Username"
          icon={faUser}
          {...VALIDATORS.USERNAME}
        />
        <Input
          containerClassName={styles.inputContainer}
          className={styles.input}
          type="search"
          list={usernameDatalistId}
          name="receiver_username"
          label="Receiver Username"
          icon={faUser}
          {...VALIDATORS.USERNAME}
        />

        <h2 className={styles.subHeading}>Package Details</h2>
        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            value={PACKAGE_TYPES.PARCEL}
            onClick={updatePackageType}
          >
            📦 Parcel
          </button>
          <button
            className={styles.button}
            value={PACKAGE_TYPES.MAIL}
            onClick={updatePackageType}
          >
            📧 Mail
          </button>
        </div>
        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            value={PACKAGE_SPEEDS.STANDARD}
            onClick={updatePackageSpeed}
          >
            🐌 Standard
          </button>
          <button
            className={styles.button}
            value={PACKAGE_SPEEDS.EXPRESS}
            onClick={updatePackageSpeed}
          >
            🐢 Express
          </button>
          <button
            className={styles.button}
            value={PACKAGE_SPEEDS.OVERNIGHT}
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
          label="Width (cm)"
          icon={faRulerVertical}
          {...VALIDATORS.POSITIVE_INT}
        />
        <Input
          containerClassName={styles.inputContainer}
          className={styles.input}
          type="number"
          name="length"
          label="Length (cm)"
          icon={faRulerVertical}
          {...VALIDATORS.POSITIVE_INT}
        />
        <Input
          containerClassName={styles.inputContainer}
          className={styles.input}
          type="number"
          name="height"
          label="Height (cm)"
          icon={faRulerVertical}
          {...VALIDATORS.POSITIVE_INT}
        />
        <Input
          containerClassName={styles.inputContainer}
          className={styles.input}
          type="number"
          name="weight"
          label="Weight (g)"
          icon={faWeightHanging}
          {...VALIDATORS.POSITIVE_INT}
        />

        <h2 className={styles.subHeading}>Address Details</h2>
        <Input
          containerClassName={styles.inputContainer}
          className={styles.input}
          type="text"
          name="destination_address_line1"
          label="Address Line 1"
          icon={faHome}
          {...VALIDATORS.ADDRESS_LINE_1}
        />
        <Input
          containerClassName={styles.inputContainer}
          className={styles.input}
          type="text"
          name="destination_address_line2"
          label="Address Line 2"
          icon={faBuilding}
          required={false}
          {...VALIDATORS.ADDRESS_LINE_2}
        />
        <Input
          containerClassName={styles.inputContainer}
          className={styles.input}
          type="text"
          name="destination_address_city"
          label="City"
          icon={faLocationDot}
          {...VALIDATORS.CITY}
        />
        <Input
          containerClassName={styles.inputContainer}
          className={styles.input}
          type="text"
          name="destination_address_state"
          label="State"
          icon={faMapPin}
          {...VALIDATORS.STATE}
        />
        <Input
          containerClassName={styles.inputContainer}
          className={styles.input}
          type="text"
          name="destination_address_zip"
          label="Zip"
          icon={faLocationArrow}
          {...VALIDATORS.ZIP}
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
        <h3 className={styles.h3}>Base Shipping Cost</h3>
        <pre>${form.base_shipping_cost.toFixed(2)}</pre>
        <h3 className={styles.h3}>Additional Fees</h3>
        <pre>${form.additional_fees.toFixed(2)}</pre>
        <h3 className={styles.h3}>Total</h3>
        <pre>
          ${(form.base_shipping_cost + form.additional_fees).toFixed(2)}
        </pre>

        <Button
          className={styles.submit}
          text="Create Package"
          isLoading={isLoading}
        />
      </form>
    </div>
  );
}
