import { useInfiniteQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import styles from "./index.module.css";
import apis from "src/services/Twist";
import MainMediaCarousel from "src/components/Twist/MainMediaCarousel";
import MainMediaLoader from "src/components/Twist/MainMediaLoader";
import withOnDemandAndErrorBoundary from "src/HOC/withOnDemandAndErrorBoundary";
import SectionTitle from "src/components/Twist/shared/SectionTitle";
import useWindowSize from "src/hooks/useWindowSize";
import MainMediaCarouselMobileView from "../MainMediaCarousel/MainMediaCarouselMobileView";

const apiFn = (params) => apis.media.getMediaList(params);

function AhlyNews({
  sport_id,
  service_id,
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
    ],
    queryFn: ({ pageParam = 1 }) =>
      apiFn({
        sport_id,
        service_id,
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
        page: pageParam,
      }),
    getNextPageParam: (_lastPage, pages) => {
      if (pages.at(-1).current_page === pages.at(-1).last_page)
        return undefined;
      return pages.at(-1).current_page + 1;
    },
  });



  return (
    <section className={`${styles["top-news"]}`}>
      <SectionTitle title=' أخبار الأهلي' color={"var(--light-black)"} />
      {isLoading && (
        <MainMediaLoader isMainCarousel={true} team_id={team_id} />
      )}  

    {!isLoading && (
        <>
          {width <= "575.98" ? (
            <MainMediaCarouselMobileView
              data={data?.pages?.[0]?.data}
              isPlayBtn={isPlayBtn}
            />
          ) : (
            <MainMediaCarousel
              data={data?.pages?.slice(0, 1)}
              isPlayBtn={isPlayBtn}
            />
          )}
        </>
      )}
    </section>
  );
}

AhlyNews.propTypes = {
  season_id: PropTypes.number,
  items_count: PropTypes.number,
  type: PropTypes.number,
  tournament_id: PropTypes.number,
  media_id: PropTypes.number,
  team_id: PropTypes.string,
  player_id: PropTypes.number,
  top_stories: PropTypes.bool,
  latest: PropTypes.bool,
  popular: PropTypes.bool,
  isPlayBtn: PropTypes.bool,
};

export default withOnDemandAndErrorBoundary(AhlyNews, { onDemand: false });
