import styles from "./index.module.css";

function GameSuccessView({ numOfCorrectAswers, questionsLength, gameName }) {
  return (
    <div
      className={`${styles["success-conatiner"]} d-flex flex-column justify-content-center align-items-center text-center`}
    >
      <span>{gameName ? gameName : "تم إرسال الإجابات "}</span>
    </div>
  );
}

export default GameSuccessView;
