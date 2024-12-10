import { useInfiniteQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import LoadMore from "../LoadMore";
import Media from "../../Media";
import apis from "src/services/Twist";
import SectionTitle from "../SectionTitle";
import styles from "./index.module.css";
import useWindowSize from "src/hooks/useWindowSize";
import SkeletonsElements from "src/components/Shared/SkeletonsElements";
import ArrowPage from "../../ArrowPage";

const apiFn = (params) => apis.media.getMediaList(params);

function MediaSection({
  season_id,
  items_count = 4,
  type = null,
  tournament_id = null,
  media_id = null,
  team_id = null,
  player_id = null,
  top_stories = null,
  latest = null,
  sport_id = null,
  service_id = null,
  popular = null,
  date = null,
  week = null,
  month = null,
  isPlayBtn = false,
  title = "",
  gridColumn,
  columnsNum,
  showTitle = true,
  showLoadMore = true,
  horizontal = true,
  keyword = null,
  loaderCount = 8,
  columnsLoaderNums = 4,
  isArrowPage = true,
  section_id = null,
}) {
  const initialParams = {
    season_id,
    items_count,
    type,
    sport_id,
    service_id,
    tournament_id,
    media_id,
    team_id,
    player_id,
    top_stories,
    latest,
    popular,
    date,
    week,
    month,
    page: 1,
    section_id,
  };

  const modifyApiParams = (pageParam) => {
    if (keyword) return { ...initialParams, page: pageParam, keyword };
    return { ...initialParams, page: pageParam };
  };

  const {
    data = {},
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useInfiniteQuery({
    queryKey: [
      "media",
      season_id,
      type,
      items_count,
      sport_id,
      service_id,
      tournament_id,
      media_id,
      team_id,
      player_id,
      top_stories,
      latest,
      popular,
      date,
      week,
      month,
      keyword,
    ],
    queryFn: ({ pageParam = 1 }) => apiFn(modifyApiParams(pageParam)),
    getNextPageParam: (_lastPage, pages) => {
      if (pages.at(-1).current_page === pages.at(-1).last_page)
        return undefined;
      return pages.at(-1).current_page + 1;
    },
  });

  const dataArrLength = data?.pages?.[0]?.data.length;

  const getMediaData = () =>
    data?.pages?.reduce((prev, curr) => [...prev, ...curr.data], []);

  const windowSize = useWindowSize();

  const numOfMediaColumns = (columnsNum) => {
    if (windowSize.width <= 575) return 1;
    if (windowSize.width <= 992) return 2;
    if (columnsNum) return columnsNum;
    return 4;
  };

  return (
    <section
      className={styles["media-section"]}
      style={{ gridColumn: gridColumn }}
    >
      {showTitle && title && (
        <div className={styles["header-media-section"]}>
          <SectionTitle title={title} />
          {isArrowPage && (
            <ArrowPage
              title={type === 1 ? "كل الأخبار" : "كل الفيديوهات"}
              endPoint={type === 1 ? "/news" : "/videos"}
            />
          )}
        </div>
      )}
      {horizontal && isLoading && (
        <div
          className={styles["sub-media-carousel-loader"]}
          style={{
            gridTemplateRows: `repeat(${
              loaderCount / columnsLoaderNums
            }, calc(250 * var(--resizing-xd-ratio)))`,
            gridTemplateColumns: `repeat(${numOfMediaColumns(
              columnsLoaderNums
            )},1fr)`,
          }}
        >
          {[...Array(loaderCount).keys()].map((key) => (
            <SkeletonsElements
              key={key}
              type="twistMediaCard"
              imageHeight="2.5rem"
              textHeight="1.5rem"
              videoIcon={isPlayBtn}
            />
          ))}
        </div>
      )}
      {(!horizontal || !isLoading) && (
        <>
          <Media
            data={getMediaData()}
            isPlayBtn={isPlayBtn}
            columnsNum={numOfMediaColumns(columnsNum)}
            horizontal={horizontal}
            isLoading={isLoading}
          />
          {showLoadMore && dataArrLength > 0 && (
            <LoadMore
              isLoading={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
            />
          )}
        </>
      )}
    </section>
  );
}

MediaSection.propTypes = {
  season_id: PropTypes.number,
  items_count: PropTypes.number,
  type: PropTypes.number,
  tournament_id: PropTypes.number,
  media_id: PropTypes.number,
  team_id: PropTypes.number,
  player_id: PropTypes.number,
  service_id: PropTypes.number,
  sport_id: PropTypes.number,
  top_stories: PropTypes.bool,
  latest: PropTypes.bool,
  popular: PropTypes.bool,
  date: PropTypes.bool,
  week: PropTypes.bool,
  month: PropTypes.bool,
  isPlayBtn: PropTypes.bool,
  title: PropTypes.string,
  columnsNum: PropTypes.number,
  showTitle: PropTypes.bool,
  showLoadMore: PropTypes.bool,
  horizontal: PropTypes.bool,
  loaderCount: PropTypes.number,
  columnsLoaderNums: PropTypes.number,
  gridColumn: PropTypes.string,
};

export default MediaSection;
