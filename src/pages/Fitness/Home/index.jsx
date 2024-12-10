import styles from "./index.module.css";
import HeroSection from "src/components/Fitness/HeroSection";
import Carousel from "src/components/Fitness/Carousel";
import AskAliBanner from "src/components/Fitness/AskAliBanner";
import OfferBanner from "src/components/Fitness/OfferBanner";
import OurTips from "src/components/Fitness/OurTips";
import { useCheckSubscriptionByService } from "src/utils/checkSubscriptionByService";
import SubscribeBtn from "src/components/Shared/Subscription/SubscribeBtn";

const FitnessHomePage = () => {
  // const { isSubscripedInTheServie, setRedirectToSubscriptionUI } =
  //   useCheckSubscriptionByService("fitness");

  // if (!isSubscripedInTheServie)
  //   return (
  //     <SubscribeBtn setRedirectToSubscriptionUI={setRedirectToSubscriptionUI} />
  //   );

  const isOldFeatures = false;

  return (
    <div className={styles["home-page"]}>
      {isOldFeatures && <HeroSection />}
      <Carousel />
      <section className={styles["ask-ali-section"]}>
        <AskAliBanner />
      </section>
      {isOldFeatures && (
        <section className={styles["offer-section"]}>
          <OfferBanner />
        </section>
      )}
      {isOldFeatures && <OurTips />}
    </div>
  );
};

export default FitnessHomePage;
