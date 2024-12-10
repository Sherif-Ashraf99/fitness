import PropTypes from "prop-types";
import sideAdsImage from "src/assets/images/Twist/ads-5.png";
import TwistAds from "src/components/Shared/TwistAds";

function SideInlineEndAds() {
  return (
    <aside className='twist-side-inline-end-ads'>
      <figure>
        {/* <img src={sideAdsImage} alt='twist-side-ads' /> */}
        <TwistAds adSlot={"7151064145"} isSideAds = {true}/>

      </figure>
    </aside>
  );
}

SideInlineEndAds.propTypes = {};

export default SideInlineEndAds;
