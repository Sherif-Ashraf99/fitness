import { useState } from "react";
import styles from "./index.module.css";
import UserNumberInput from "./UserNumberInput";
import UserPinCodeInput from "./UserPinCodeInput";

function Subscription() {

  const [stepNum, setStepNum] = useState(0)
  const [userNum, setUserNum] = useState("")

  const renderCorrispondingUI = () => {
    if (stepNum === 0) return <UserNumberInput setStepNum={setStepNum} userNum={userNum} setUserNum={setUserNum} />
    if (stepNum === 1) return <UserPinCodeInput userNum={userNum} />
  }

  return (
    <div className={styles["subscription"]}>
      {renderCorrispondingUI()}
    </div>
  );
}


export default Subscription;
