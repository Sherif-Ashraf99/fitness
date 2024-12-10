import PropTypes from 'prop-types';
import styles from './index.module.css';
import HeaderAds from './HeaderAds';
import SideInlineStartAds from './SideInlineStartAds';
import SideInlineEndAds from './SideInlineEndAds';
import SectionAds from './SectionAds';
import TwistMobileAds from './TwistMobileAds';
import { isStaticAds } from 'src/utils/globalData';
function TwistMainAds({ children ,isSide}) {
	if (isSide) return <div className={styles['twist-main-ads']}>{children}</div>
	if (!isStaticAds) return null;
	return <div className={styles['twist-main-ads']}>{children}</div>;
}

TwistMainAds.propTypes = {
	children: PropTypes.node,
};

TwistMainAds.Header = HeaderAds;
TwistMainAds.SideInlineStart = SideInlineStartAds;
TwistMainAds.SideInlineEnd = SideInlineEndAds;
TwistMainAds.Section = SectionAds;
TwistMainAds.Mobile = TwistMobileAds;

export default TwistMainAds;
