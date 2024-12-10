import MediaCard from "src/components/Fitness/MediaCard";
import styles from "./index.module.css";
import apis from "src/services/Fitness";
import { useQuery } from "@tanstack/react-query";
import { useCheckSubscriptionByService } from "src/utils/checkSubscriptionByService";
import SubscribeBtn from "src/components/Shared/Subscription/SubscribeBtn";
import { useNavigate } from "react-router-dom";
import { exerciseApiParams } from "src/utils/Fitness/globalData";
import { getUserPhoneNumnberFromCookies } from "src/utils/globalFn";

const apiFn = (params) => apis.workout.getWorkout(params);
const apiGetFavFn = (params) => apis.user.getFavourites(params);

const GymWorkoutPage = () => {
  let userPhoneNumber = getUserPhoneNumnberFromCookies("fitness");
  userPhoneNumber = "01114434011";
  const navigate = useNavigate();
  // const { isSubscripedInTheServie, setRedirectToSubscriptionUI } =
  //   useCheckSubscriptionByService("fitness");
  // if (!isSubscripedInTheServie)
  //   return (
  //     <SubscribeBtn setRedirectToSubscriptionUI={setRedirectToSubscriptionUI} />
  //   );

  const initialParams = {
    type: exerciseApiParams.workoutType.gym_WORKOUT,
    limit: 20,
  };

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["gym-workout"],
    queryFn: () => apiFn(initialParams),
  });

  const {
    data: dataFav,
    isLoading: isLoadingFav,
    refetch,
  } = useQuery({
    queryKey: ["Get-favourite-fitness"],
    queryFn: () =>
      apiGetFavFn({
        msisdn: userPhoneNumber,
      }),
    select: (data) => data?.exercises,
  });

  const isInclude = (data, myFav) => {
    const myFavId = myFav?.map((obj) => obj.id);

    const dataWithIncludesProperty = data
      ?.map((obj) =>
        myFavId?.includes(obj.id)
          ? { ...obj, include: true }
          : { ...obj, include: false }
      )
      .filter((obj) => !obj.break_time);

    const sortByInclude = dataWithIncludesProperty.sort(
      (a, b) => b.include - a.include
    );
    return sortByInclude;
  };

  if (isLoading || isLoadingFav) return <div>Loading...</div>;

  return (
    <div className={styles["gym-workout-page"]}>
      <h1>{"تمارين الجيم"}</h1>

      <div className={styles["cards-container"]}>
        {isInclude(data, dataFav)?.map((item) => (
          <div
            key={item.id}
            className={styles["card-wrapper"]}
            onClick={() =>
              item.video && navigate(`/fitness/media/gym/${item.id}`)
            }
          >
            <MediaCard
              horizontal={true}
              isVideo={true}
              item={item}
              type={"exercise"}
              refetch={refetch}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GymWorkoutPage;
