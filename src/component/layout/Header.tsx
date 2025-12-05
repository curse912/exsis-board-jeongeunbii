import { useState } from 'react';
import layout from './layout.module.css';
// import {iconImg} from '../../assets/images';

const Header = () => {
    const [keyword, setKeyword] = useState('');

    return (
        <div className={layout.header}>
            <div className={layout.logoArea}>
                <span className={layout.logoText}>Board</span>
            </div>
            <div className={layout.searchArea}>
                {/* <img className={layout.searchbtn} src={iconImg.react} /> */}
                <input type='text' placeholder='Search here....🔎' 
                       value={keyword} className={layout.searchInput}
                       onChange={(e) => setKeyword(e.target.value)}/>
            </div>
            <div className={layout.rightArea}>
                <button className={layout.iconBtn}>🔔</button>
                <div className={layout.useInfo}>
                    <span className={layout.userName}>xxx님..</span>
                </div>
            </div>
        </div>
    );
};

export default Header;