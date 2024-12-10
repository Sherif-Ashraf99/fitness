import style from "./index.module.css";
import { ImgURL } from "src/utils/globalFn";
import { getRouteInfo } from "src/utils/globalFn";
import { useNavigate, useLocation } from "react-router";
import playerIcon from "src/assets/images/Twist/playerIcon.png";

const RelatedTags = ({ data, isLoading }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { serviceName, sportName } = getRouteInfo(pathname);

  const handleOnTagClick = (tag) => {
    if (sportName === "tennis" || sportName === "squash") {
      return navigate(
        `/othersports/${sportName}/player/${tag.tagable_id}/overview`
      );
    }

    if (tag.tagable_id === 6631) {
      return navigate(`/al-ahly/local/team/6631/overview`);
    }

    const type = `${tag.type.split("\\").at(-1).toLowerCase()}/`;
    if (
      !type.includes("tournament") &&
      !type.includes("team") &&
      !type.includes("player")
    )
      return;

    const service = `${serviceName}/`;
    const sport = sportName ? `${sportName}/` : "";

    navigate(
      `/${service}${sport}${type}${tag.tagable_id}${
        type.includes("player") && !sportName ? "" : "/overview"
      }`
    );
  };

  if (isLoading) return <p>Loading ...</p>;

  return (
    <>
      {!!data?.tags?.length && (
        <div className={`${style["related-tags"]}`}>
          <h4>{"المواضيع المتعلقه"}</h4>
          <div className={`${style["tags-container"]}`}>
            {data.tags.map((tag) => (
              <div
                key={tag.id}
                className={`${style["tag"]}`}
                onClick={() => handleOnTagClick(tag)}
              >
                <img src={ImgURL(tag?.image) || playerIcon} alt="" />
                <span>{tag.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RelatedTags;
