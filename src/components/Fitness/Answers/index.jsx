import MediaCard from "src/components/Fitness/MediaCard/index";
import styles from "./index.module.css";
import askAliImg from "src/assets/images/Fitness/AskAli.png";
import apis from "src/services/Fitness";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getUserPhoneNumnberFromCookies } from "src/utils/globalFn";

const apiFn = (params) => apis.answers.getAnswers(params);
const apiGetFavFn = (params) => apis.user.getFavourites(params);

const Answers = () => {
  let userPhoneNumber = getUserPhoneNumnberFromCookies("fitness");
  userPhoneNumber = "01114434011";
  const navigate = useNavigate();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["answers-mazhar"],
    queryFn: () => apiFn(),
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
    select: (data) => data?.answerMazhar,
  });

  const isInclude = (data, myFav) => {
    const myFavId = myFav?.map((obj) => obj.id);

    const dataWithIncludesProperty = data?.map((obj) =>
      myFavId?.includes(obj.id)
        ? { ...obj, include: true }
        : { ...obj, include: false }
    );

    const sortByInclude = dataWithIncludesProperty.sort(
      (a, b) => b.include - a.include
    );
    return sortByInclude;
  };

  return (
    <>
      {!isLoading && !isLoadingFav && (
        <div className={styles["answers-container"]}>
          <div className={styles["answers-section"]}>
            {isInclude(data, dataFav)?.map((item) => (
              <div
                key={item.id}
                onClick={() =>
                  item.video && navigate(`/fitness/media/answer/${item.id}`)
                }
              >
                <MediaCard
                  item={item}
                  horizontal={true}
                  isVideo={true}
                  type={"ask"}
                  refetch={refetch}
                />
              </div>
            ))}
          </div>

          <div className={styles["img-section"]}>
            <img src={askAliImg} alt="Ali Mazhar Image" />
          </div>
        </div>
      )}
    </>
  );
};

export default Answers;
