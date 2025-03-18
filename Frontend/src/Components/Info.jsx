import styles from "../Styles/landing.module.css";
import  image1 from "../Images/274_147.png";
import image2 from "../Images/offertile..png";
import image3 from "../Images/APSRTC_1.png";
function Info() {
    return (
        <>
            <div className={styles.infogrid}>
                <div className={styles.coupon}>
                    <span>save upto rs 150</span>
                    <span className={styles.offerImage}>
                        <img src={image1} alt="coupon-1" />
                    </span>
                    <span>Use code FIRST</span>
                </div>
                <div className={styles.coupon}>
                    <span>save upto rs 150</span>
                    <span className={styles.offerImage}>
                        <img src={image2} alt="coupon-1" />
                    </span>
                    <span>Use code FIRST</span>
                </div>
                <div className={styles.coupon}>
                    <span>save upto rs 150</span>
                    <span className={styles.offerImage}>
                        <img src={image3} alt="coupon-1" />
                    </span>
                    <span>Use code FIRST</span>
                </div>
            </div>
        </>
    );
}

export default Info;
