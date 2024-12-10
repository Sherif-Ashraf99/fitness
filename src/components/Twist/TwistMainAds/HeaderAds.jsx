import PropTypes from "prop-types";
import headerAdsImage from "src/assets/images/Twist/ads-1.png";
function HeaderAds() {
  return (
    <figure className='twist-header-main-ads'>
      <img src={headerAdsImage} alt='twist-header-main-ads' />
    </figure>
  );
}

HeaderAds.propTypes = {};

export default HeaderAds;
