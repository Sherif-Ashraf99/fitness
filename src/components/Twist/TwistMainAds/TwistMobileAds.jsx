import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import mobileAdsImage from "src/assets/images/Twist/ads-2.png";

import PropTypes from "prop-types";

function TwistMobileAds() {
  const [show, setShow] = useState(true);

  return (
    <>
      <Modal
        show={show}
        backdrop='static'
        onHide={() => setShow(false)}
        dialogClassName='modal-twist-mobile-ads'>
        <Modal.Header closeButton />
        <Modal.Body>
          <figure>
            <img src={mobileAdsImage} alt='twist-mobile-ads' />
          </figure>
        </Modal.Body>
      </Modal>
    </>
  );
}

TwistMobileAds.propTypes = {};

export default TwistMobileAds;
