import styles from "./header_all_menu.module.css"

interface Props{
    handleAllMenu:() => void
}

const AllMenu = ({handleAllMenu}:Props) => {

    return(
        <div className={styles.allMenuWrapper}>
            <div className={styles.closeBtn}>
                <button><span className={styles.ico} onClick={handleAllMenu}></span></button>
                <div className={styles.allMenuContainer}>
                    <div className={styles.linkBox}></div>
                    <div className={styles.menuBox}></div>
                </div>
            </div>
        </div>
    )
}
export default AllMenu;