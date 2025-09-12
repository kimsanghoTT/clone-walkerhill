import Link from "next/link";
import styles from "../header.module.css";
import { brands } from "../../data/gnb_sub_items";
import { useEffect, useRef, useState } from "react";

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
                <div></div>
            )}
            {selectedTab === "activity" && (
                <div></div>
            )}
            {selectedTab === "book" && (
                <div></div>
            )}
            {selectedTab === "login" && (
                <div></div>
            )}
        </>

    )
}
export default GnbSub;