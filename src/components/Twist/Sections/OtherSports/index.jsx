import { useInfiniteQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import LoadMore from "../../shared/LoadMore";
import Media from "../../Media";
import apis from "src/services/Twist";
import MainMedia from "../../shared/MainMedia";
import SectionTitle from "../../shared/SectionTitle";
import styles from "./index.module.css";
import SkeletonsElements from "src/components/Shared/SkeletonsElements";
import useWindowSize from "src/hooks/useWindowSize";
import ArrowPage from "../../ArrowPage";

const apiFn = (params) => apis.media.getMediaList(params);

function OtherSports({
  season_id,
  items_count = 4,
  type = null,
  tournament_id = null,
  media_id = null,
  team_id = null,
  player_id = null,
  top_stories = null,
  latest = null,
  popular = null,
  sport_id = null,
  service_id = null,
  isPlayBtn = false,
}) {
  const { width } = useWindowSize();

  const {
    data = {},
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: [
      "media",
      season_id,
      items_count,
      type,
      tournament_id,
      media_id,
      team_id,
      player_id,
      top_stories,
      latest,
      popular,
      sport_id,
      service_id,
    ],
    queryFn: ({ pageParam = 1 }) =>
      apiFn({
        season_id,
        items_count,
        type,
        tournament_id,
        media_id,
        team_id,
        player_id,
        top_stories,
        latest,
        popular,
        sport_id,
        service_id,
        page: pageParam,
      }),
    getNextPageParam: (_lastPage, pages) => {
      if (pages.at(-1).current_page === pages.at(-1).last_page)
        return undefined;
      return pages.at(-1).current_page + 1;
    },
  });

  const getMainMediaData = () => data?.pages?.[0]?.data.slice(0, 4);

  const getMediaData = () =>
    data?.pages?.slice(1).reduce((prev, curr) => [...prev, ...curr.data], []);

  return (
    <section className={styles["othersports"]}>
     
     <div  className={styles["header-othersports"]}>
     <SectionTitle title='الرياضات الأخرى'/>
    <ArrowPage title={"كل الرياضات"} endPoint={"/othersports"}/>
     </div>

      {isLoading && (
        <div className={styles["main-media-carousel-loader"]}>
          {[...Array(4).keys()].map((key) => (
            <SkeletonsElements
              key={key}
              type='twistMediaCard'
              imageHeight={!key && width >= 992 ? "4rem" : "2rem"}
              textHeight={!key && width >= 992 ? "1.5rem" : "1rem"}
            />
          ))}
        </div>
      )}
      {!isLoading && (
        <>
          <MainMedia data={getMainMediaData()} isPlayBtn={isPlayBtn} />
          {data?.pages?.length > 1 && (
            <Media data={getMediaData()} isPlayBtn={isPlayBtn} />
          )}
          {
            <LoadMore
              isLoading={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
            />
          }
        </>
      )}
    </section>
  );
}

OtherSports.propTypes = {
  season_id: PropTypes.number,
  items_count: PropTypes.number,
  type: PropTypes.number,
  tournament_id: PropTypes.number,
  media_id: PropTypes.number,
  team_id: PropTypes.number,
  player_id: PropTypes.number,
  top_stories: PropTypes.bool,
  latest: PropTypes.bool,
  popular: PropTypes.bool,
  sport_id: PropTypes.number,
  service_id: PropTypes.number,
  isPlayBtn: PropTypes.bool,
};

export default OtherSports;
