import styles from "../css/header_phone_auth_modal.module.css"

const PhoneAuthModal = () => {

    return(
        <div className={styles.modalWrapper}>
            <div className={styles.modalContainer}>
                <button className={styles.closeBtn} type="button"><span className={styles.ico}></span></button>
                <div className={styles.authForm}>
                    <h2>워커힐 휴대폰 본인인증</h2>
                    <p>워커힐 휴대폰 본인인증은 휴대폰 로그인을 위한 본인인증 서비스입니다.</p>
                    <ul>
                        <li><input type="text" name="name" id="name" placeholder="이름"/></li>
                        <li>
                            <input type="text" name="phone" id="phone" placeholder="- 없이 입력해 주세요"/>
                            <button type="button">인증번호 받기</button>
                        </li>
                        <li>
                            
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default PhoneAuthModal;