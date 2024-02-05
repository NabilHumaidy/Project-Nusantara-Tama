import React, { useRef } from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Image } from "@nextui-org/react";
import { Link } from '@inertiajs/react';

export default function NavBar({ switchTheme, setSwitchTheme, activeLink, setActiveLink }) {
    const menuItems = [
        {name: 'Home'},
        {name: 'Client'},
        {name: 'About'},
        {name: 'Portfolio'},
    ];

    const handleSmoothScroll = (id) => {
        if (id === 'home') {
        document.body.scrollIntoView({ behavior: 'smooth' });
        } else {
            const targetElement = document.getElementById(id);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <>
            <Navbar maxWidth='2xl' isBlurred className={`transition h-[60px] md:h-[80px] ${switchTheme ? 'bg-background/5' : 'bg-background/70'}`} >
                <NavbarContent className="sm:hidden" justify="start">
                    <NavbarMenuToggle className={`${switchTheme ? 'text-white' : 'text-black'}`}/>
                </NavbarContent>

                <NavbarContent className="sm:hidden pr-3" justify="center">
                    <NavbarBrand>
                        <Link src="/">
                            <Image src="/assets/images/NusantaraTamaLogo.PNG" alt="Nusantara Tama Logo" width={110} height={30} radius='none'/>
                        </Link>
                        
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent className="hidden sm:flex gap-4" justify="start">
                    <NavbarBrand>
                        <Link src="/">
                            <Image src="/assets/images/NusantaraTamaLogo.PNG" alt="Nusantara Tama Logo" width={110} height={30} radius='none'/>
                        </Link>
                    </NavbarBrand>
                </NavbarContent>
                <NavbarContent className='hidden sm:flex gap-11' justify='center'>
                    {menuItems.map((item, index) => (
                        <NavbarItem key={index}>
                            <Button onClick={() => {
                                handleSmoothScroll(item.name.toLowerCase())
                                setActiveLink(item.name)
                                } } className={`font-semibold text-base transition ${switchTheme ? 'text-white' : 'text-black'} ${activeLink === item.name ? 'bg-primary text-white' : 'bg-transparent'}`}>
                                {item.name}
                            </Button>
                        </NavbarItem>
                    ))}
                </NavbarContent>

                <NavbarContent justify="end">
                    <NavbarItem>
                        <Button onClick={() => handleSmoothScroll('contact')} radius='full' className={`text-xs md:text-base bg-primary ${switchTheme ? 'text-black' : 'text-white'}`}>
                            Contact Us
                        </Button>
                    </NavbarItem>
                </NavbarContent>

                <NavbarMenu className={`transition ${switchTheme ? 'bg-background/10' : 'bg-background/70'} d`}>
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <button onClick={() => {
                                handleSmoothScroll(item.name.toLowerCase())
                                setActiveLink(item.name)
                            }}
                                className={`w-full text-left ${switchTheme ? 'text-white' : 'text-black'}`}
                                href="#"
                                size="lg"
                            >
                                {item.name}
                            </button>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </Navbar>
        </>
    );
}