import { useState } from 'react';
import layout from './layout.module.css';
import { useNavigate } from 'react-router-dom';
import { CURRENT_USER } from '../../data/currentUser';

const Header = () => {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const logoHandler = () => {
        navigate("/");
    }

    return (
        <div className={layout.header}>
            <div className={layout.logoArea} onClick={logoHandler}>
                <span className={layout.logoText}>EXSIS</span>
            </div>
            <div className={layout.searchArea}>
                <input type='text' placeholder='Search here....🔎' 
                       value={keyword} className={layout.searchInput}
                       onChange={(e) => setKeyword(e.target.value)}/>
            </div>
            <div className={layout.rightArea}>
                <div className={layout.userInfo}>
                    <span>{CURRENT_USER.userId}님..</span>
                </div>
            </div>
        </div>
    );
};

export default Header;