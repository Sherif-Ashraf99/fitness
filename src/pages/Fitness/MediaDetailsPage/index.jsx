import ReactPlayer from "react-player";
import styles from "./index.module.css";
import { AiTwotoneHeart } from "react-icons/ai";
import { BsArrowLeftShort } from "react-icons/bs";
import { useState } from "react";
import { useCheckSubscriptionByService } from "src/utils/checkSubscriptionByService";
import SubscribeBtn from "src/components/Shared/Subscription/SubscribeBtn";
import apis from "src/services/Fitness";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ImgURL, getUserPhoneNumnberFromCookies } from "src/utils/globalFn";
import { PropagateLoader } from "react-spinners";

const apiGetWorkoutByIdFn = (id, type) => {
  if (type === "answer") return apis.answers.getAnswerById(id);
  if (type === "tips") return apis.tips.getTipsById(id);
  return apis.workout.getWorkoutById(id);
};
const apiAddFavFn = (data) => apis.user.addFavourites(data);
const apiDeleteFn = (data) => apis.user.deleteFavourites(data);
const apiGetFavFn = (params) => apis.user.getFavourites(params);

const getTypeForApis = (type) => {
  if (type === "tips") return "advice";
  if (type === "answer") return "ask";
  if (type === "gym" || type === "home") return "exercise";
};

const MediaDetailsPage = () => {
  let userPhoneNumber = getUserPhoneNumnberFromCookies("fitness");
  userPhoneNumber = "01114434011";
  const { id, type } = useParams();
  const navigate = useNavigate();

  const [selected, setselected] = useState(false);
  const [selectedDeleteFav, setSelectedDeleteFav] = useState({
    favId: "",
    type: "",
  });

  // const { isSubscripedInTheServie, setRedirectToSubscriptionUI } =
  //   useCheckSubscriptionByService("fitness");

  const {
    data: myFavData,
    isLoading: isGetLoadingFav,
    refetch,
  } = useQuery({
    queryKey: ["Get-favourite-fitness"],
    queryFn: () =>
      apiGetFavFn({
        msisdn: userPhoneNumber,
      }),
    select: (data) =>
      [...data?.exercises, ...data?.answerMazhar, ...data?.advices]?.map(
        (item) => item.id
      ),
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["media-by-id", id, type],
    queryFn: () => apiGetWorkoutByIdFn(id, type),
    select: (data) => {
      const dataWithIncludeProperty = myFavData?.includes(+id)
        ? { ...data, include: true }
        : { ...data, include: false };
      return dataWithIncludeProperty;
    },
  });

  const { video, video_cover, include, ask, answer, title, description, name } =
    data ?? {};
  const { mutate, isLoading: isAddLoading } = useMutation(apiAddFavFn);

  const addFav = () => {
    mutate(
      {
        msisdn: userPhoneNumber,
        portal_id: "3",
        videos: "1",
        news: "1",
        matches: "1",
        favouriteable_id: id,
        favouriteable_type: getTypeForApis(type),
      },
      {
        onSuccess: ({ message }) => {
          if (message === "Created") {
            setselected(true);
            refetch();
          }
        },
      }
    );
  };

  const { isFetching: isFetchingDelete } = useQuery({
    queryKey: ["delete-fav-fitness", selectedDeleteFav.favId],
    queryFn: () =>
      apiDeleteFn({
        msisdn: userPhoneNumber,
        favouriteable_id: selectedDeleteFav.favId,
        favouriteable_type: selectedDeleteFav.type,
      }),
    enabled: selectedDeleteFav.favId !== "",
    onSuccess: () => {
      setSelectedDeleteFav({ favId: "", type: "" });
      setselected(false);
      refetch();
    },
  });

  const deleteFavBtn = (favId, type) => {
    setSelectedDeleteFav((perv) => ({ ...perv, favId: favId, type: type }));
  };

  const handleClick = () => {
    if (!include && !selected) return addFav();

    return deleteFavBtn(id, getTypeForApis(type));
  };

  // if (!isSubscripedInTheServie)
  //   return (
  //     <SubscribeBtn setRedirectToSubscriptionUI={setRedirectToSubscriptionUI} />
  //   );

  if (isLoading || isGetLoadingFav || isAddLoading || isFetchingDelete)
    return (
      <div className="modal-favourites-loader">
        <PropagateLoader color="var(--light-green)" size={20} />
      </div>
    );

  if (isError) return <div> لم يتم العثور على محتوى..</div>;

  return (
    <div className={`${styles["video-player-wrapper"]}`}>
      <h3>{name || title || ask}</h3>
      <div className={`${styles["custom-controls"]}`}>
        <AiTwotoneHeart
          size={40}
          className={`${styles["heart-icon"]} ${
            styles[include || selected ? "fav" : ""]
          }`}
          onClick={() => handleClick()}
        />
        <BsArrowLeftShort
          size={40}
          className={`${styles["back-icon"]}`}
          onClick={() => navigate(-1)}
        />
      </div>
      <ReactPlayer
        url={ImgURL(video)}
        light={encodeURI(ImgURL(video_cover))}
        width="100%"
        height="100%"
        // playIcon={playIconElement}
        controls={true}
        config={{
          file: {
            attributes: {
              controlsList: "nodownload",
            },
          },
        }}
      />
      <p>{description || answer}</p>
    </div>
  );
};

export default MediaDetailsPage;
