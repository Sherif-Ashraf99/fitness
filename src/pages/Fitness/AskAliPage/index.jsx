import { useState } from "react";
import styles from "./index.module.css";
import AskInput from "src/components/Fitness/AskInput";
import Answers from "src/components/Fitness/Answers";
import { useCheckSubscriptionByService } from "src/utils/checkSubscriptionByService";
import SubscribeBtn from "src/components/Shared/Subscription/SubscribeBtn";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const FitnessAskAliPage = () => {
  const { pathname } = useLocation();
  const { tab } = useParams();
  const [activeTab, setActiveTab] = useState(tab ?? "question");
  const navigate = useNavigate();

  // const { isSubscripedInTheServie, setRedirectToSubscriptionUI } = useCheckSubscriptionByService('fitness')

  const tabs = {
    question: <AskInput />,
    answers: <Answers />,
  };

  const handleOnTabClick = (tab) => {
    setActiveTab(tab);
    navigate(`/fitness/ask-mazhar/${tab}`, {
      state: { previousPathname: pathname },
    });
  };

  // if (!isSubscripedInTheServie) return <SubscribeBtn setRedirectToSubscriptionUI={setRedirectToSubscriptionUI} />

  return (
    <div className={styles["ask-ali-page"]}>
      <nav>
        <span
          className={activeTab == "answers" && styles["active"]}
          onClick={() => handleOnTabClick("answers")}
        >
          اجوبة
        </span>
        <span
          className={activeTab == "question" && styles["active"]}
          onClick={() => handleOnTabClick("question")}
        >
          طرح سؤال
        </span>
      </nav>

      {tabs[activeTab]}
    </div>
  );
};

export default FitnessAskAliPage;
