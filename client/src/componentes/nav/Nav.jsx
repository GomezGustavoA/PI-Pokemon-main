import { Link } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import styles from "./nav.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";

function Nav({ logout, onSearch }) {
    const user = useSelector(state => state.userName.userName);
    const pokeClose = '../../public/close.png';
    const pokeOpen = '../../public/open.png';
    const logo = '../../public/logoPoke.png';

    const [view, setView] = useState(false);

    const handleLogout = () => {
        logout();
    }

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src={logo} alt="" />
            </div>
            <div >
                <Link to='/home' className={styles.home}><h3>Home</h3></Link>
            </div>

            <div>
                <SearchBar onSearch={onSearch} />
            </div>

            <div className={styles.user}>
                <h3>Bienvenido {user}!</h3>
            </div>

            <div className={styles.containerBtnLogout} onMouseEnter={()=> setView(true)} onMouseLeave={()=> setView(false)}>
                {view   ?  <div className={styles.btnLogout}>
                                <div className={styles.logout}>
                                    <h4>Logout</h4>
                                </div>
                                <div className={styles.image}>
                                 <img src={pokeOpen} alt="" onClick={handleLogout}/>
                                </div>
                            </div>
                        :
                        <div className={styles.btnLogout}>
                                <div>
                                    <span></span>
                                </div>
                            <img src={pokeClose} alt=""/>
                        </div>}
            </div>
        </div>
    );
}

export default Nav;