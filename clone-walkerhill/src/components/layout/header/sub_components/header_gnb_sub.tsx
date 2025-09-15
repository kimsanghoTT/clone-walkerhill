import Link from "next/link";
import styles from "./header_gnb_sub.module.css";
import { brands, dining } from "../../data/gnb_sub_items";
import { useState } from "react";

interface Prop{
    selectedTab:string | null;
    handleActiveGub: (type:string | null) => void
}

const GnbSub = ({selectedTab, handleActiveGub}:Prop) => {
    const [hovered, setHovered] = useState<number | null>(null);
    const [loginMethod, setLoginMethod] = useState<string>("email");
    const [login, setLogin] = useState<{id:string; pw:string}>({id:"", pw:""});
    const [checkMemorize, setCheckMemorize] = useState<boolean>(false);

    const onClose = () => {
        handleActiveGub(null);
    }

    const handleLoginTab = (type:string) => {
        setLoginMethod(type);
    }

    const handleLoginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value });
    };

    const handleIdMemorize = () => {
        setCheckMemorize(prev => !prev);
    }

    return(
        <>
            {selectedTab === "brand" && (
                <div className={`${styles.gnbSub} ${styles[selectedTab]}`}>
                    <button className={styles.closeBtn} onClick={onClose}><span className={styles.ico}></span></button>
                    <div className={styles.gnbBrandContainer}>
                        <ul className={styles.brandList}>
                            {brands.map(brand => (
                                <li key={brand.id} onMouseEnter={() => setHovered(brand.id)} onMouseLeave={() => setHovered(null)}>
                                    <Link href={brand.link}>
                                        <img src={hovered === brand.id ? brand.img[1] :brand.img[0]} alt={brand.alt}/>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div>
                            <span className={styles.brandBook}>객실 예약하기</span>
                        </div>
                    </div>
                </div>
            )}      

            {selectedTab === "dining" && (
                <div className={`${styles.gnbSub} ${styles[selectedTab]}`}>
                    <button className={styles.closeBtn} onClick={onClose}><span className={styles.ico}></span></button>
                    <div className={styles.gnbDiningContainer}>
                        <ul className={styles.diningList}>
                            {dining.map(dining => (
                                <li key={dining.id} onMouseEnter={() => setHovered(dining.id)} onMouseLeave={() => setHovered(null)}>
                                    <Link href={dining.link}>
                                        <img src={hovered === dining.id ? dining.img[1] : dining.img[0]} alt={dining.alt} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div>
                            <span className={styles.diningBook}>다이닝 예약하기</span>
                            <Link href="#"><span className="hidden">마티나라운지</span></Link>
                        </div>
                    </div>
                </div>
            )}

            {selectedTab === "activity" && (
                <div className={`${styles.gnbSub} ${styles[selectedTab]}`}>
                    <button className={styles.closeBtn} onClick={onClose}><span className={styles.ico}></span></button>
                    <div className={styles.gnbActivityContainer}>
                        <div className={styles.activityNote}>
                            <Link href="#">액티비티 예약하기</Link>
                            <p>
                                워커힐 홈페이지에서 객실을 예약하시면 워커힐의 다양한 액티비티 프로그램을 예약하실 수 있습니다.
                            </p>
                        </div>
                        <div className={styles.activityLink}>
                            <Link href="#">워커힐 편의시설</Link>
                            <Link href="#">워커힐 가이드맵</Link>
                            <Link href="#">워키 프로그램</Link>
                            <Link href="#">워커힐 골프클럽</Link>
                        </div>
                        <div className={styles.blank}></div>
                    </div>
                </div>
            )}

            {selectedTab === "book" && (
                <div className={`${styles.gnbSub} ${styles[selectedTab]}`}>
                    <button className={styles.closeBtn} onClick={onClose}><span className={styles.ico}></span></button>
                    <div className={styles.gnbBookContainer}>
                        <div className={styles.bookLink}>
                            <ul>
                                <li><Link href="#">객실 검색/예약</Link></li>
                                <li><Link href="#">다이닝 검색/예약</Link></li>
                                <li><Link href="#">액티비티 검색/예약</Link></li>
                                <li><Link href="#">예약확인</Link></li>
                            </ul>
                            <p className={styles.bookNote}>
                                워커힐 홈페이지에서 객실 예약 시, 3% 할인된 가격이 제공됩니다.
                            </p>
                        </div>
                        <div className={styles.bookPromotion}>
                            <ul>
                                <li><Link href="#">패키지 & 프로모션</Link></li>
                                <li className={styles.PromotionTagList}>
                                    <Link href="#">#패키지</Link>
                                    <Link href="#">#고메</Link>
                                    <Link href="#">#액티비티</Link>
                                    <Link href="#">#가족</Link>
                                    <Link href="#">#연인</Link>
                                    <Link href="#">#친구</Link>
                                </li>
                                <li><Link href="#">워커힐 기획전</Link></li>
                                <li><Link href={"#"}>워키 프로그램</Link></li>
                            </ul>
                        </div>
                        <div className={styles.blank}></div>
                    </div>
                </div>
            )}

            {selectedTab === "myInfo" && (
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
                            <form className={styles.loginForm}>
                                <div className={styles.inputBox}>
                                    {loginMethod === "email" ? (
                                        <>
                                            <label htmlFor="id">아이디</label>
                                            <input type="text" id="id" name="id" value={login.id} 
                                            onChange={handleLoginInput} placeholder="아이디 또는 이메일"/>

                                            <label htmlFor="pw">비밀번호</label>
                                            <input type="password" id="pw" name="pw" value={login.pw} 
                                            onChange={handleLoginInput} placeholder="비밀번호"/>                                    
                                        </>
                                    ) : (
                                        <>
                                            <ul>
                                                <li>
                                                    <input type="text" id="phone" name="phone" placeholder="- 없이 입력해 주세요"/>
                                                    <button>인증번호 받기</button>
                                                </li>
                                                <li>
                                                    <input type="text" id="phoneAuth" name="phoneAuth" placeholder="인증번호"/>
                                                    <button>재발송</button>
                                                </li>
                                            </ul>
                                            
                                        </>
                                    )}

                                    <button className={styles.loginBtn}><span>로그인</span></button>
                                </div>
                            </form>
                            <p className={styles.loginError}></p>
                            {loginMethod === "email" && (
                                <div className={styles.loginUtil}>
                                    <div className={styles.memorizeId}>
                                        <input type="checkbox" id="memorizeId" onChange={handleIdMemorize}/>
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
            )}
        </>

    )
}
export default GnbSub;