import styles from "./index.module.css";
import placeHolderImg from "src/assets/images/Fitness/ali-mazhar-placeholder-img.png";
import { AiTwotoneHeart } from "react-icons/ai";
import { BsPlayCircle } from "react-icons/bs";
import { useState } from "react";
import { ImgURL, getUserPhoneNumnberFromCookies } from "src/utils/globalFn";
import apis from "src/services/Fitness";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PropagateLoader } from "react-spinners";

const apiAddFn = (data) => apis.user.addFavourites(data);
const apiDeleteFn = (params) => apis.user.deleteFavourites(params);

const MediaCard = ({
  horizontal = false,
  isVideo = false,
  item,
  type,
  refetch,
}) => {
  let userPhoneNumber = getUserPhoneNumnberFromCookies("fitness");
  userPhoneNumber = "01114434011";
  const { video_cover, id, ask, title, description, include } = item;

  const [selected, setselected] = useState(false);
  const [selectedDeleteFav, setSelectedDeleteFav] = useState({
    favId: "",
    type: "",
  });

  const { mutate, isLoading } = useMutation(apiAddFn);

  const addFav = () => {
    mutate(
      {
        msisdn: userPhoneNumber,
        portal_id: "3",
        videos: "1",
        news: "1",
        matches: "1",
        favouriteable_id: id,
        favouriteable_type: type,
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
    return deleteFavBtn(id, type);
  };

  let cardImgSrc = video_cover ? ImgURL(video_cover) : placeHolderImg;
  let cardTitle =
    (ask || title) && (ask || title?.split(" ").slice(0, 5).join(" "));
  let cardDescription =
    description && description?.split(" ").slice(0, 25).join(" ").concat("...");

  if (isFetchingDelete || isLoading)
    return (
      <div className="modal-favourites-loader">
        <PropagateLoader color="var(--light-green)" size={20} />
      </div>
    );

  return (
    <div
      className={`${styles["media-card"]} ${
        horizontal && styles["horizontal"]
      }`}
    >
      <div className={`${styles["img-section"]}`}>
        <img src={cardImgSrc} alt="img" />
        <AiTwotoneHeart
          className={`${styles["heart-icon"]} ${
            styles[selected || include ? "fav" : ""]
          }`}
          size={25}
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        />
        {isVideo && <BsPlayCircle className={styles["play-icon"]} size={40} />}
      </div>
      <div className={`${styles["description-section"]}`}>
        <h6>{cardTitle}</h6>
        <p>{cardDescription}</p>
      </div>
    </div>
  );
};

export default MediaCard;
