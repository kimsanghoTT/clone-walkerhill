"use client"

import { useEffect, useRef, useState } from "react";
import { gnbList } from "../data/constant";
import styles from "./css/header.module.css";
import Link from "next/link";
import GnbSub from "./sub_components/header_gnb_sub";
import AllMenu from "./sub_components/header_all_menu";

const Header = () => {
    const langRef = useRef<HTMLLIElement>(null);
    const [activeGnb, setActiveGnb] = useState<string | null>(null);
    const [openLangList, setOpenLangList] = useState(false);
    const [selectedLang, setSelectedLang] = useState<string>("KOR");
    const [openAllMenu, setOpenAllMenu] = useState(false);
    const language = ["KOR", "ENG", "CHI", "JPN"];

    useEffect(() => {
        const clickOutSide = (e:MouseEvent) => {
            if(langRef.current && !langRef.current.contains(e.target as Node)){
                setOpenLangList(false);
            }
        }
        const handleGnbScrollEvent = () => setActiveGnb(null);

        document.addEventListener("mousedown", clickOutSide);
        window.addEventListener("scroll", handleGnbScrollEvent);
        return () => {
            document.removeEventListener("mousedown", clickOutSide);
            window.removeEventListener("scroll", handleGnbScrollEvent);
        }
    },[])

    useEffect(() => {
        if (openAllMenu) document.documentElement.classList.add("block");
        else document.documentElement.classList.remove("block");
    }, [openAllMenu]);

    const handleActiveGub = (type:string | null) => {
        setActiveGnb(prev => (prev === type ? null : type));
    }

    const changeLang = (e:React.MouseEvent<HTMLLIElement>) => {
        const value = e.currentTarget.dataset.value;
        if(value) setSelectedLang(value);
        setOpenLangList(prev => !prev);
    }

    const handleAllMenu = () => {
        setOpenAllMenu(prev => !prev);
    }

    return (
        <header className={`${styles.headerContainer} ${activeGnb !== null ? styles.active : ""}`}>
            <div className={styles.logoBox}>
                <h1 className={styles.logo}>
                    <Link href="/"><span className="hidden">로고</span></Link>
                </h1>
            </div>
            <nav className={styles.gnbArea}>
                <menu className={styles.gnb}>
                    {gnbList.map((gnb, index) => (
                        <li 
                        key={index} 
                        data-value={gnb.value} 
                        className={`${styles.gnbItem} ${activeGnb === gnb.value ? styles.active : ""}`} 
                        >
                            <span className={styles.gnbBtn} onClick={() => handleActiveGub(gnb.value)}>{gnb.name}</span>
                            {activeGnb === gnb.value && <GnbSub selectedTab={activeGnb} handleActiveGub={handleActiveGub}/>}
                        </li>
                    ))}
                </menu>
                <ul className={styles.util}>
                    <li className={styles.lang} ref={langRef}>
                        <span className={styles.currentLang} onClick={() => setOpenLangList(prev => !prev)}>{selectedLang}</span>
                        {openLangList && (
                        <ul className={styles.langList}>
                            {language.filter(lang => lang !== selectedLang).map((lang, index) => (
                                <li key={index} onClick={(e) => changeLang(e)} data-value={lang}>{lang}</li>
                            ))}
                        </ul>
                        )}
                    </li>
                    <li className={styles.mainMenu}>
                        <button className={styles.mainMenuBtn} onClick={handleAllMenu}><span className="hidden">메인메뉴버튼</span></button>
                    </li>
                </ul>
            </nav>
            {openAllMenu && <AllMenu handleAllMenu={handleAllMenu}/>}
        </header>
    )
}
export default Header;