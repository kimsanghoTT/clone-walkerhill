import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { errMsg } from "../../data/constant";
import styles from "../css/header_phone_auth_modal.module.css"
import useAuthTimer from "../../_hook/useAuthTimer";

interface LoginState{
    name?: string;
    id?: string;
    pw?: string;
    phone?: string;
    authCode?: number;
}

interface Props {
    login: LoginState;
    handleLoginInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    requestAuthCode: (setModalError?:Dispatch<SetStateAction<string>>) => boolean;
    setOpenPhoneAuthModal: Dispatch<SetStateAction<boolean>>;
    setAuthCode: Dispatch<SetStateAction<number | null>>;
}

const PhoneAuthModal = ({login, handleLoginInput, requestAuthCode, setOpenPhoneAuthModal, setAuthCode}: Props) => {
    const modalRef = useRef<HTMLDivElement | null>(null);
    const [blockInput, setBlockInput] = useState(false);
    const [modalError, setModalError] = useState<string>("");

    const { min, sec, isTimerActive, resendEnabled, startTimer, timerExpired } = useAuthTimer();

    useEffect(() => {
        const clickOutSide = (e:MouseEvent) => {
            if(modalRef.current && !modalRef.current.contains(e.target as Node)){
                setOpenPhoneAuthModal(false);
            }
        }

        document.addEventListener("mousedown", clickOutSide);
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
        }
    },[setOpenPhoneAuthModal])

    useEffect(() => {
        if(timerExpired){
            setAuthCode(null);
            alert("인증 유효시간이 만료되었습니다.");
        }
    },[setAuthCode, timerExpired])

    const handleAuthCode = () => {
        const generateAuthCode = requestAuthCode(setModalError);

        console.log(generateAuthCode);
        

        if (generateAuthCode) {
            alert("인증번호가 발송되었습니다.");
            startTimer();
            setBlockInput(true);
        }
    };

    return(
        <div className={styles.modalWrapper}>
            <div className={styles.modalContainer} ref={modalRef}>
                <button className={styles.closeBtn} type="button" onClick={() => setOpenPhoneAuthModal(false)}><span className={styles.ico}></span></button>
                <div className={styles.authForm}>
                    <h2>워커힐 휴대폰 본인인증</h2>
                    <p>워커힐 휴대폰 본인인증은 휴대폰 로그인을 위한 본인인증 서비스입니다.</p>
                    <ul>
                        <li>
                            <input 
                                type="text" 
                                name="name" 
                                id="name" 
                                placeholder="이름"
                                className={modalError === errMsg.REQUIRED ? `${styles.error}` : ""}
                                />
                            <p className={styles.loginError}>{modalError === errMsg.REQUIRED ? modalError : ""}</p>
                        </li>
                        <li>
                            <div>
                                <input 
                                    type="text" 
                                    id="modal_phone" 
                                    name="phone" 
                                    value={login.phone || ''} 
                                    onChange={(e) => handleLoginInput(e)} 
                                    placeholder="- 없이 입력해 주세요"
                                    disabled={blockInput ? true : false}
                                    className={modalError === errMsg.REQUIRE_PHONE || modalError === errMsg.NOT_NUMBER ? `${styles.error}` : ""}
                                />
                                <button type="button" onClick={handleAuthCode} disabled={resendEnabled}>인증번호 받기</button>
                            </div>
                            <p className={styles.loginError}>{modalError !== errMsg.REQUIRED ? modalError : ""}</p>
                        </li>
                        <li>
                            <div>
                                <input 
                                    type="text" 
                                    id="modal_authCode" 
                                    name="authCode" 
                                    value={login.authCode || ''}
                                    onChange={(e) => handleLoginInput(e)} 
                                    placeholder="인증번호"
                                />
                                {isTimerActive && <span className={styles.authTimer}>{min}:{sec}</span>}
                                <button type="button" onClick={handleAuthCode} disabled={!resendEnabled}>재발송</button>
                            </div>
                            <p className={styles.loginError}></p>
                        </li>
                        <li>
                            <button className={styles.modalSubmitBtn}><span>확인</span></button>
                        </li>
                        <li className={styles.modalNotice}>
                            <ul>
                                <li>워커힐 계정에 등록된 이름 및 휴대폰번호를 입력해주세요.</li>
                                <li>휴대폰 로그인 유효기간은 1년입니다.</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default PhoneAuthModal;