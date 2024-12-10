import { useState } from "react";
import styles from "./index.module.css";
import twistLogo from "src/assets/images/Twist/twist.png";
import { useRef } from "react";
import { useCheckSubscriptionByService } from "src/utils/checkSubscriptionByService";

function UserPinCodeInput({ userNum }) {
  const { handleOnCheckPin, dataCheckPin, isLoadingCheckPin } =
    useCheckSubscriptionByService();

  const [inputInvalid, setInputlInvalid] = useState(true);
  const [userPin, setUserPin] = useState("");

  const inputTouchedRef = useRef(false);

  const validateInput = (num) => {
    if (num?.length == 5) {
      setInputlInvalid(false);
      return num;
    } else if (num?.length < 5) {
      setInputlInvalid(true);
      return num.slice(0, 5);
    } else {
      return num.slice(0, 5);
    }
  };

  const renderErrorMsgs = () => {
    if (dataCheckPin?.status == "-4")
      return <p> لقد استنفذت عدد المحاولات المسموح بها </p>;
    else if (dataCheckPin?.status == "-6")
      return <p>هذا الرقم غير مشترك في الخدمة </p>;
    else if (dataCheckPin?.status == "-2") return <p>رمز التحقق غير صحيح </p>;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleOnCheckPin(userNum, userPin);
  };

  return (
    <div className={styles["UserPinCodeInput"]}>
      <img src={twistLogo} alt="twist logo" />
      <h4>ضع رقمك وسنرسل لك رمز تحقق</h4>

      <form onSubmit={handleSubmit}>
        <label>
          {"رمز التأكيد"}
          <input
            type="text"
            onChange={(e) => setUserPin(validateInput(e.target.value))}
            onBlur={() => (inputTouchedRef.current = true)}
            value={userPin}
            placeholder="X X X X X"
            autoFocus
          />
        </label>

        <button disabled={inputInvalid || isLoadingCheckPin}>{"متابعة"}</button>
      </form>
      {inputTouchedRef.current && <p>{renderErrorMsgs()}</p>}
    </div>
  );
}

export default UserPinCodeInput;
