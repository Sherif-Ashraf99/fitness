import { useState } from "react";
import styles from "./index.module.css";
import twistLogo from "src/assets/images/Twist/twist.png";
import { useCheckSubscriptionByService } from "src/utils/checkSubscriptionByService";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function UserNumberInput({ setStepNum, userNum, setUserNum }) {
	const { serviceName } = useParams();

	const {
		handleOnSendCode,
		dataSendCode,
		isLoadingSendCode,
		isLoadingCheckPin,
		isLoadingHeaderEnrichment,
		isLoadingdecrypt,
		isLoadingCheckSub,
		isLoadingSubToken,
		isWifi,
	} = useCheckSubscriptionByService(serviceName);

	const loading =
		isLoadingHeaderEnrichment ||
		isLoadingdecrypt ||
		isLoadingCheckSub ||
		isLoadingSubToken ||
		isLoadingCheckPin;

	const [inputInvalid, setInputlInvalid] = useState(true);

	const validateInput = (num) => {
		if (num?.length == 11 && num.slice(0, 3) == "011") {
			setInputlInvalid(false);
			return num;
		} else if (num.slice(0, 3) !== "011" || num?.length < 11) {
			setInputlInvalid(true);
			return num.slice(0, 11);
		} else {
			return num.slice(0, 11);
		}
	};

	useEffect(() => {
		if (dataSendCode?.status == "200") {
			setStepNum(1);
		}
	}, [dataSendCode?.status]);

	const renderErrorMsgs = () => {
		if (dataSendCode?.status == "-3")
			return <p>لقد استنفذت عدد المحاولات المسموح بها </p>;
		else return <p>رقم الهاتف مكون من 11 رقم و يبدأ بـ 011</p>;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		handleOnSendCode(userNum);
	};

	return (
		<div className={styles["UserNumberInput"]}>
			{loading ? (
				<h4>{"جاري التحقق من حالة الاشتراك ..."}</h4>
			) : (
				<>
					<img src={twistLogo} alt="twist logo" />
					<h4>ضع رقمك وسنرسل لك رمز تحقق</h4>

					<form onSubmit={handleSubmit}>
						<label>
							{"رقم الهاتف المحمول"}
							<input
								type="text"
								onChange={(e) => setUserNum(validateInput(e.target.value))}
								value={userNum}
								placeholder="011xxxxxxxx"
								autoFocus
							/>
						</label>

						<button disabled={inputInvalid || isLoadingSendCode}>
							{"متابعة"}
						</button>
					</form>
					{renderErrorMsgs()}
				</>
			)}
		</div>
	);
}

export default UserNumberInput;
