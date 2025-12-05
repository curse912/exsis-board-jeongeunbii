import type React from "react";
import Header from "./Header";
import layout from './layout.module.css';

interface AppLayoutProps{
    children: React.ReactNode;
}

const Layout : React.FC<AppLayoutProps> = ({children}) => {
    return (
        <div className={layout.wrapper}>
            <Header />
            <main className={layout.main}>
                <div className={layout.container}>
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;