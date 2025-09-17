import Link from "next/link";
import styles from "./header_gnb_sub.module.css";
import { brands, dining } from "../../data/constant";
import { useState } from "react";
import GnbSubLogin from "./header_gnb_sub_login";

interface Prop{
    selectedTab:string | null;
    handleActiveGub: (type:string | null) => void
}

const GnbSub = ({selectedTab, handleActiveGub}:Prop) => {
    const [hovered, setHovered] = useState<number | null>(null);

    const onClose = () => {
        handleActiveGub(null);
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
                <GnbSubLogin selectedTab={selectedTab} onClose={onClose}/>
            )}
        </>

    )
}
export default GnbSub;