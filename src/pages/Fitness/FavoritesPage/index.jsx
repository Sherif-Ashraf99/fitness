import styles from "./index.module.css";
import MediaCard from "src/components/Fitness/MediaCard";
import { useCheckSubscriptionByService } from "src/utils/checkSubscriptionByService";
import SubscribeBtn from "src/components/Shared/Subscription/SubscribeBtn";
import apis from "src/services/Fitness";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getUserPhoneNumnberFromCookies } from "src/utils/globalFn";

const apiFn = (params) => apis.user.getFavourites(params);

const FavoritesPage = () => {
  
  const userPhoneNumber = getUserPhoneNumnberFromCookies("fitness")
  const { isSubscripedInTheServie, setRedirectToSubscriptionUI } = useCheckSubscriptionByService("fitness");

  if (!isSubscripedInTheServie)
    return (
      <SubscribeBtn setRedirectToSubscriptionUI={setRedirectToSubscriptionUI} />
    );

  const navigate = useNavigate()

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["Get-favourite-fitness"],
    queryFn: () =>
      apiFn({
        msisdn: userPhoneNumber,
      }),
  });

  const {exercises,advices,answerMazhar} = data ?? {}

  const isInclude = (arr = []) => {
    const dataWithIncludesProperty = arr?.map((obj) => {
      return {
        ...obj,
        include: true,
      };
    });

    return dataWithIncludesProperty;
  };



    if(isLoading) return <h3>loading..</h3>

  return (
    <div className={styles["favorites-page"]}>
      <h1>{"مفضلتي"}</h1>

      <div className={styles["cards-container"]}>
        {isInclude(exercises)?.map((item) => (
          <div key={item?.id} className={styles["card-wrapper"]} onClick={() => navigate(`/fitness/media/${item?.type}/${item.id}`)}>
            <MediaCard
              horizontal={true}
              isVideo={true}
              item={item}
              refetch={refetch}
              type={"exercise"}
            />
          </div>
        ))}

        {isInclude(advices)?.map((item) => (
          <div key={item?.id} className={styles["card-wrapper"]}  onClick={() => navigate(`/fitness/media/tips/${item?.id}`)}>
            <MediaCard
              horizontal={true}
              isVideo={true}
              item={item}
              refetch={refetch}
              type={"advice"}
            />
          </div>
        ))}

        {isInclude(answerMazhar)?.map((item) => (
          <div key={item?.id} className={styles["card-wrapper"]}  onClick={() => navigate(`/fitness/media/answer/${item.id}`)}>
            <MediaCard
              horizontal={true}
              isVideo={true}
              item={item}
              refetch={refetch}
              type={"ask"}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
