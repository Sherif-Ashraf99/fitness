import { useInfiniteQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import apis from "src/services/Twist";
import SectionTitle from "../../shared/SectionTitle";
import styles from "./index.module.css";
import MainMediaCarousel from "../../MainMediaCarousel";
import withOnDemandAndErrorBoundary from "src/HOC/withOnDemandAndErrorBoundary";
import SkeletonsElements from "src/components/Shared/SkeletonsElements";
import useWindowSize from "src/hooks/useWindowSize";
import MainMediaCarouselMobileView from "../../MainMediaCarousel/MainMediaCarouselMobileView";

const apiFn = (params) => apis.media.getMediaList(params);

function TopNews({
  season_id,
  items_count = 4,
  type = null,
  service_id = null,
  sport_id = null,
  tournament_id = null,
  media_id = null,
  team_id = null,
  player_id = null,
  top_stories = null,
  latest = null,
  popular = null,
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
      service_id,
      sport_id,
      tournament_id,
      media_id,
      team_id,
      player_id,
      top_stories,
      latest,
      popular,
    ],
    queryFn: ({ pageParam = 1 }) =>
      apiFn({
        season_id,
        items_count,
        type,
        service_id,
        sport_id,
        tournament_id,
        media_id,
        team_id,
        player_id,
        top_stories,
        latest,
        popular,
        page: pageParam,
      }),
    getNextPageParam: (_lastPage, pages) => {
      if (pages.at(-1).current_page === pages.at(-1).last_page)
        return undefined;
      return pages.at(-1).current_page + 1;
    },
  });

  return (
    <section className={styles["top-news"]}>
      <SectionTitle title="أهم الأحداث" />
      {isLoading && (
        <div className={styles["main-media-carousel-loader"]}>
          {[...Array(4).keys()].map((key) => (
            <SkeletonsElements
              key={key}
              type="twistMediaCard"
              imageHeight={!key && width >= 992 ? "4rem" : "2rem"}
              textHeight={!key && width >= 992 ? "1.5rem" : "1rem"}
            />
          ))}
        </div>
      )}
      {!isLoading && (
        <>
          {width <= 991.98 ? (
            <MainMediaCarouselMobileView
              data={data?.pages?.[0]?.data}
              isPlayBtn={isPlayBtn}
            />
          ) : (
            <MainMediaCarousel
              data={data?.pages?.slice(0, 1)}
              isPlayBtn={isPlayBtn}
              onDemand={false}
            />
          )}
        </>
      )}
    </section>
  );
}

TopNews.propTypes = {
  season_id: PropTypes.number,
  items_count: PropTypes.number,
  type: PropTypes.number,
  service_id: PropTypes.number,
  sport_id: PropTypes.number,
  tournament_id: PropTypes.number,
  media_id: PropTypes.number,
  team_id: PropTypes.number,
  player_id: PropTypes.number,
  top_stories: PropTypes.bool,
  latest: PropTypes.bool,
  popular: PropTypes.bool,
  isPlayBtn: PropTypes.bool,
};

export default withOnDemandAndErrorBoundary(TopNews);
