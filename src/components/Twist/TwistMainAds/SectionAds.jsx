import sectionImg1 from "src/assets/images/Twist/ads-2.png";
import sectionImg2 from "src/assets/images/Twist/ads-3.png";
import sectionImg3 from "src/assets/images/Twist/ads-4.png";
import PropTypes from "prop-types";

function SectionAds({ adsImageNumber }) {
  const images = {
    1: sectionImg1,
    2: sectionImg2,
    3: sectionImg3,
  };
  return (
    <section className='twist-section-ads'>
      <figure>
        <img src={images[adsImageNumber]} alt='twist-section-ads' />
      </figure>
    </section>
  );
}

SectionAds.propTypes = {
  adsImageNumber: PropTypes.number.isRequired,
};

export default SectionAds;
