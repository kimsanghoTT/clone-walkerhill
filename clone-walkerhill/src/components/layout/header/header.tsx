"use client"

import styles from "./header.module.css";
import Link from "next/link";

const Header = () => {
    const gnbList = [
        {name: "객실", value:"객실"},
        {name: "다이닝", value:"다이닝"},
        {name:"액티비티", value:"액티비티"},
        {name:"예약", value:"예약"},
        {name:"워커힐 스토어", value:"워커힐 스토어"},
        {name:"로그인", value:"로그인"},
    ]

    return (
        <header className={styles.headerContainer}>
            <div className={styles.logoBox}>
                <h1 className={styles.logo}>
                    <Link href="/"><span className="hidden">로고</span></Link>
                </h1>
            </div>
            <nav className={styles.gnbArea}>
                <menu className={styles.gnb}>
                    {gnbList.map((item, index) => (
                        <li key={index} value={item.value} className={styles.gnbItem}><span>{item.name}</span></li>
                    ))}
                </menu>
                <ul className={styles.util}>
                    <li className={styles.lang}>
                        <span className={styles.currentLang}>KOR</span>
                        <ul className={styles.langList}>
                            <li>ENG</li>
                            <li>CHI</li>
                            <li>JPN</li>
                        </ul>
                    </li>
                    <li className={styles.mainMenu}>
                        <button className={styles.mainMenuBtn}><span className="hidden">메인메뉴버튼</span></button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
export default Header;