import PropTypes from "prop-types";
import sideAdsImage from "src/assets/images/Twist/ads-5.png";
import TwistAds from "src/components/Shared/TwistAds";

function SideInlineStartAds() {
  return (
    <aside className='twist-side-inline-start-ads'>
      <figure>
        {/* <img src={sideAdsImage} alt='twist-side-ads' /> */}
        <TwistAds adSlot={"7151064145"} isSideAds = {true}/>
      </figure>
    </aside>
  );
}

SideInlineStartAds.propTypes = {};

export default SideInlineStartAds;
