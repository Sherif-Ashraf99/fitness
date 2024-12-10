import styles from './index.module.css'
import instagramLogo from 'src/assets/images/Twist/Instagram-logo.png'
import fbLogo from 'src/assets/images/Twist/fb-logo.png'
import twitterLogo from 'src/assets/images/Twist/Twitter-logo.png'
import shearIcon from 'src/assets/images/Twist/Share-icon.svg'
import { FacebookShareButton, TwitterShareButton, WhatsappIcon } from 'react-share';


const SocialMediaShear = ({ title }) => {
    const currentMediaDetailsURL = window.location.href
    return (
        <div className={`${styles['social-media-shear']} d-flex justify-content-end my-3 gap-2`}>
            <FacebookShareButton url={currentMediaDetailsURL} quote={title}>
                <img src={fbLogo} alt="facebookLogo" width={40} />
            </FacebookShareButton>

            <TwitterShareButton url={currentMediaDetailsURL} quote={title}>
                <img src={twitterLogo} alt="twitterLogo" width={40} />
            </TwitterShareButton>

        </div>
    )
}

export default SocialMediaShear
