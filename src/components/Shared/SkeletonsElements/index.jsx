import PropTypes from "prop-types";
import MediaCardSkeleton from "./MediaCardSkeleton";
import TwistMediaCardSkeleton from "./TwistMediaCardSkeleton";
import TwistMatchCardSkeleton from "./TwistMatchCardSkeleton";
import TwistTableSkeleton from "./TwistTableSkeleton";
import TwistTournamentsCarouselSkeleton from "./TwistTournamentsCarouselSkeleton";
import TwistMatchHeader from "./TwistMatchHeader";
import SectionSkeleton from "./SectionSkeleton";

function SkeletonsElements({
  type,
  imageHeight,
  textHeight,
  twoColumns,
  rowsNumbers,
  tournamentsNumber,
  horizontal,
  videoIcon,
  bgTransparent,
}) {
  const skeletonsTypes = {
    mediaCard: (
      <MediaCardSkeleton twoColumns={twoColumns} videoIcon={videoIcon} />
    ), // need change name
    twistMatchCard: <TwistMatchCardSkeleton />,
    twistMediaCard: (
      <TwistMediaCardSkeleton
        imageHeight={imageHeight}
        textHeight={textHeight}
        videoIcon={videoIcon}
        twoColumns={twoColumns}
      />
    ),
    twistTable: <TwistTableSkeleton rowsNumbers={rowsNumbers} />,
    tournamentsCarousel: (
      <TwistTournamentsCarouselSkeleton
        tournamentsNumber={tournamentsNumber}
        horizontal={horizontal}
        bgTransparent={bgTransparent}
      />
    ),
    twistMatchHeader: <TwistMatchHeader />,
    section: <SectionSkeleton />,
  };

  return skeletonsTypes[type];
}

SkeletonsElements.propTypes = {
  type: PropTypes.string,
  twoColumns: PropTypes.bool,
  horizontal: PropTypes.bool,
  rowsNumbers: PropTypes.number,
  tournamentsNumber: PropTypes.number,
  videoIcon: PropTypes.bool,
  bgTransparent: PropTypes.bool,
};

export default SkeletonsElements;
