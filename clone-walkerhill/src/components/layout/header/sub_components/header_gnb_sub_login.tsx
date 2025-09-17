import { useRef, useState } from "react";
import styles from "./header_gnb_sub.module.css";
import Link from "next/link";
import useMemorizeId from "../../_hook/useMemorizeId";
import useLogin from "../../_hook/useLogin";

interface Props{
    selectedTab: string;
    onClose:() => void
}

const GnbSubLogin = ({selectedTab, onClose }:Props) => {
    const [loginMethod, setLoginMethod] = useState<string>("email");
    const [checkMemorize, setCheckMemorize] = useState<boolean>(false);
    const errMsgRef = useRef<HTMLParagraphElement | null>(null);

    const {login, setLogin, handleLogin, handleLoginInput, openPhoneAuthModal, requestAuthCode} = useLogin({errMsgRef, checkMemorize});
    const {handleIdMemorize} = useMemorizeId({login, setLogin, setCheckMemorize});

    const handleLoginTab = (type:string) => {
        setLoginMethod(type);
        if(errMsgRef.current) errMsgRef.current.textContent = "";
    }

    return(
        <div className={`${styles.gnbSub} ${styles[selectedTab]}`}>
            <button className={styles.closeBtn} onClick={onClose}><span className={styles.ico}></span></button>
            <div className={styles.gnbLoginContainer}>
                <div className={styles.benefit}>
                    <h4><strong>아직 워커힐 회원이 아니신가요?</strong></h4>
                    <ul>
                        <li>포인트 적립 및 사용</li>
                        <li>멤버 전용 할인 프로모션</li>
                        <li>사용할수록 커지는 혜택</li>
                    </ul>
                    <Link href="#">워커힐 멤버 혜택 만나보기</Link>
                    <Link href="#">워커힐 멤버십 가입하기</Link>
                </div>
                <div className={styles.loginBox}>
                    <div className={styles.loginTab}>
                        <span className={loginMethod === "email" ? `${styles.on}` : ""} onClick={() => handleLoginTab("email")}>
                            이메일 로그인
                        </span>
                        <span className={loginMethod === "phone" ? `${styles.on}` : ""} onClick={() => handleLoginTab("phone")}>
                            휴대폰번호 로그인
                        </span>
                    </div>
                    <form className={styles.loginForm} onSubmit={handleLogin}>
                        <div className={styles.inputBox}>
                            {loginMethod === "email" ? (
                                <>
                                    <label htmlFor="id">아이디</label>
                                    <input type="text" id="id" name="id" value={login.id || ''} 
                                    onChange={(e) => handleLoginInput(e)} placeholder="아이디 또는 이메일"/>

                                    <label htmlFor="pw">비밀번호</label>
                                    <input type="password" id="pw" name="pw" value={login.pw || ''} 
                                    onChange={(e) => handleLoginInput(e)} placeholder="비밀번호"/>                                    
                                </>
                            ) : (
                                <>
                                    <ul>
                                        <li>
                                            <input type="text" id="phone" name="phone" value={login.phone || ''} 
                                            onChange={(e) => handleLoginInput(e)} placeholder="- 없이 입력해 주세요"/>
                                            <button type="button" onClick={requestAuthCode}>인증번호 받기</button>
                                        </li>
                                        <li>
                                            <input type="text" id="phoneAuth" name="phoneAuth" value={login.phoneAuth || ''}
                                            onChange={(e) => handleLoginInput(e)} placeholder="인증번호"/>
                                            <button type="button" onClick={requestAuthCode}>재발송</button>
                                        </li>
                                    </ul>
                                    
                                </>
                            )}

                            <button className={styles.loginBtn}><span>로그인</span></button>
                        </div>
                    </form>
                    <p ref={errMsgRef} className={`${styles.loginError}`}></p>
                    {loginMethod === "email" && (
                        <div className={styles.loginUtil}>
                            <div className={styles.memorizeId}>
                                <input type="checkbox" id="memorizeId" checked={checkMemorize} onChange={(e) => handleIdMemorize(e)}/>
                                <label htmlFor="memorizeId" className={checkMemorize ? `${styles.checked}` : ""}>아이디 기억하기</label>
                            </div>
                            <div className={styles.findLogin}>
                                <Link href="#">아이디/비밀번호 찾기</Link>
                            </div>
                        </div>
                    )}
                    <div className={styles.snsLogin}>
                        <button className={`${styles.snsLoginBtn} ${styles.naver}`}><span className={styles.ico}></span></button>
                        <button className={`${styles.snsLoginBtn} ${styles.kakao}`}><span className={styles.ico}></span></button>
                        <button className={`${styles.snsLoginBtn} ${styles.google}`}><span className={styles.ico}></span></button>
                        <button className={`${styles.snsLoginBtn} ${styles.apple}`}><span className={styles.ico}></span></button>
                    </div>
                </div>
                <div className={styles.blank}></div>
            </div>
        </div>
    )
}
export default GnbSubLogin;