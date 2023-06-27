import React, {FC, PropsWithChildren} from 'react';
import Header from "@/src/components/screens/header/Header";
import Footer from "@/src/components/screens/footer/footer";

const Layout:FC<PropsWithChildren> = ({children}) => {
    return (
        <div style={{display:"flex",flexDirection:"column", minHeight:"100vh"}}>
            <Header/>
            <main style={{flex: 1}}>
                {children}
            </main>
            <Footer/>
        </div>
    );
};

export default Layout;