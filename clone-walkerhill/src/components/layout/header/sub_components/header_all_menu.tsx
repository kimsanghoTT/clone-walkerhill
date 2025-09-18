import Link from "next/link";
import styles from "../css/header_all_menu.module.css"
import { allMenuLinks, allMenuGridItems } from "../../data/constant";
import Image from "next/image";
import { useState } from "react";

interface Props{
    handleAllMenu:() => void
}

const AllMenu = ({handleAllMenu}:Props) => {
    const [hovered, setHovered] = useState<number | null>(null);
    const activeLink = allMenuLinks.find(link => link.id === hovered) ?? allMenuLinks[0];

    return(
        <div className={styles.allMenuWrapper}>
            <div className={styles.closeBtn}>
                <button><span className={styles.ico} onClick={handleAllMenu}></span></button>
            </div>
            <div className={styles.allMenuContainer}>
                <div className={styles.linkBox}>
                    <figure className={styles.imgBox}>
                        <Image src={activeLink.image} fill unoptimized alt={activeLink.image}/>
                    </figure>
                    <ul className={styles.branches}>
                        {allMenuLinks.map(link => (
                            <li key={link.id}>
                                <Link href={link.link} 
                                onMouseEnter={() => setHovered(link.id)}
                                onMouseLeave={() => setHovered(null)}>
                                    {hovered === link.id ? link.korTitle : link.engTitle}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.menuBox}>
                    <ul className={styles.allMenuGrid}>
                        {allMenuGridItems.map(item => (
                            <li key={item.id}>
                                <h3>{item.title}</h3>
                                <ul className={styles.subMenu}>
                                    {item.links.map((link, index) => (
                                        <li key={index}><Link href={link.link}>{link.name}</Link></li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                    <div className={styles.menuLowerUtil}>
                        <div className={styles.utilBox}>
                            <div className={styles.upper}>
                                <Link href={"#"}>로그인</Link>
                                <span>|</span>
                                <Link href={"#"}>워커힐 멤버십 가입</Link>
                                <span>|</span>
                                <Link href={"#"}>고객의 소리</Link>
                                <span>|</span>
                                <Link href={"#"}>오시는 길</Link>
                            </div>
                            <div className={styles.lower}>
                                <Link href={"#"}>ANDROID DOWNLOAD</Link>
                                <Link href={"#"}>APPLE DOWNLOAD</Link>
                            </div>
                        </div>
                        <div className={styles.mark}>
                            <span>WALKERHILL HOTELS & RESORTS</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AllMenu;