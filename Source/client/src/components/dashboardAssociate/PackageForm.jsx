import { useContext, useRef, useState } from "react";
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
  const [base_shipping_cost, setBase_shipping_cost] = useState(0);
  const [additional_fees, setAdditional_fees] = useState(0);
  const [form, setForm] = useState({
    source_branch_id: user.branch_id,
    base_shipping_cost: base_shipping_cost,
    additional_fees: additional_fees,
    type: null,
    speed: null,
  });
  const [packageType, setPackageType] = useState(null);
  const [packageSpeed, setPackageSpeed] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);
  const packageTypeRef = useRef(null);
  const packageSpeedRef = useRef(null);

  const updatePackageType = (e) => {
    e.preventDefault();
    packageTypeRef.current = e.target;
    e.target.classList.add(styles.selectedButton);
    packageType?.classList.remove(styles.selectedButton);
    setPackageType(e.target);
    setForm((prev) => ({ ...prev, type: e.target.value }));

    if (e.target.value === PACKAGE_TYPES.PARCEL) {
      setBase_shipping_cost(4.99);
    } else if (e.target.value === PACKAGE_TYPES.MAIL) {
      setBase_shipping_cost(0.99);
    } else {
      throw new Error("Invalid package type");
    }
  };

  const updatePackageSpeed = (e) => {
    e.preventDefault();
    packageSpeedRef.current = e.target;
    e.target.classList.add(styles.selectedButton);
    packageSpeed?.classList.remove(styles.selectedButton);
    setPackageSpeed(e.target);
    setForm((prev) => ({ ...prev, speed: e.target.value }));

    if (e.target.value === PACKAGE_SPEEDS.STANDARD) {
      setAdditional_fees(0);
    } else if (e.target.value === PACKAGE_SPEEDS.EXPRESS) {
      setAdditional_fees(1.99);
    } else if (e.target.value === PACKAGE_SPEEDS.OVERNIGHT) {
      setAdditional_fees(4.99);
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
          formRef.current.reset();
          setBase_shipping_cost(0);
          setAdditional_fees(0);
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

  return (
    <div id={styles.formContainer}>
      <h1 id={styles.heading}>Create New Package</h1>
      <p className={styles.paragraph}>
        Please enter in the package details below.
      </p>
      <form ref={formRef} onSubmit={handleSubmit} onChange={handleChange}>
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
        <h3 className={styles.h3}>Base Shipping Cost</h3>
        <pre>${base_shipping_cost.toFixed(2)}</pre>
        <h3 className={styles.h3}>Additional Fees</h3>
        <pre>${additional_fees.toFixed(2)}</pre>
        <h3 className={styles.h3}>Total</h3>
        <pre>${(base_shipping_cost + additional_fees).toFixed(2)}</pre>

        <Button
          className={styles.submit}
          text="Create Package"
          isLoading={isLoading}
        />
      </form>
    </div>
  );
}
