import React, { useEffect, useRef, useState } from 'react'
import { Head } from '@inertiajs/react';
import { useInView } from "framer-motion"
import NavBar from './Components/NavBar';
import Header from './Components/Header';
import Clients from './Components/Clients';
import About from './Components/About';
import Portfolio from './Components/Portfolio';
import Maps from './Components/Maps';
import Footer from './Components/Footer';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function HomePage() {
    const [switchTheme, setSwitchTheme] = useState(false);
    const [activeLink, setActiveLink] = useState('');
    const headerRef = useRef(null);
    const headerInView = useInView(headerRef);

    const midRef = useRef(null);
    const midInView = useInView(midRef);

    const footerRef = useRef(null);
    const footerInView = useInView(footerRef);    

    useEffect(() => {
        if (headerInView) {
            setSwitchTheme(false);
        } else if(midInView) {
            setSwitchTheme(true);
        } else if(footerInView) {
            setSwitchTheme(false)
        } else {
            setSwitchTheme(false)
        }
    }, [headerInView, midInView, footerInView]);

    const homeRef = useRef(null);
    const homeInView = useInView(homeRef);
    
    const clientRef = useRef(null);
    const clientInView = useInView(clientRef);
    
    const aboutRef = useRef(null);
    const aboutInView = useInView(aboutRef);
    
    const portfolioRef = useRef(null);
    const portfolioInView = useInView(portfolioRef);

    useEffect(() => {
        if (homeInView) {
            setActiveLink('Home');
        } else if(clientInView) {
            setActiveLink('Client');
        } else if(aboutInView) {
            setActiveLink('About')
        } else if([portfolioInView]) {
            setActiveLink('Portfolio')
        } else {
            setActiveLink('')
        }
    }, [homeInView, clientInView, portfolioInView]);
    
    document.body.classList.remove('font-sans', 'antialiased');

    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];

    const queryClient = new QueryClient();

    return(
        <>
            <Head>
                <title>Nusantara Tama</title>
                <meta name='description' content='Nusantara Tama'/>
                <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png" />
                <link rel="manifest" href="/assets/favicon/site.webmanifest" />
            </Head>
            <QueryClientProvider client={queryClient}>
                <NavBar switchTheme={switchTheme} setSwitchTheme={setSwitchTheme} activeLink={activeLink} setActiveLink={setActiveLink}/>
                <div className='bg-black'>
                    <div ref={headerRef}>
                        <Header activeLinkRef={homeRef} activeLinkView={homeInView}/>
                    </div>
                    
                    <div ref={midRef} className='mt-10'>
                        <Clients activeLinkRef={clientRef} activeLinkView={clientInView}/>
                        <About activeLinkRef={aboutRef} activeLinkView={aboutInView}/>
                    </div>
                    

                    <div ref={footerRef}>
                        <Portfolio activeLinkRef={portfolioRef} activeLinkView={portfolioInView}/>
                        <Maps />
                        <div className='bg-white'>
                            <Footer />
                        </div>
                        
                    </div>
                </div>
            </QueryClientProvider>
        </>
    );
}
