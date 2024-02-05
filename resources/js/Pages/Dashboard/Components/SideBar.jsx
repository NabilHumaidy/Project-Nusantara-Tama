import { Link } from '@inertiajs/react'
import { Button, Image } from '@nextui-org/react'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { RiAppsLine, RiChatSmile3Line } from "react-icons/ri";
import { LuFileStack } from "react-icons/lu";
import { BsQuestionCircle } from "react-icons/bs";

export default function SideBar({ toggleSideBar, setToggleSideBar }) {
    const navLink = [
        {name: 'Dashboard', link: '/dashboard', icon: MdOutlineDashboardCustomize, route: 'dashboard'},
        {name: 'Clients', link: '/dashboard/clients', icon: RiAppsLine, route: 'dashboardClients'},
        {name: 'About', link: '/dashboard/about', icon: BsQuestionCircle, route: 'dashboardAbout'},
        {name: 'Testimonies', link: '/dashboard/testimonies', icon: RiChatSmile3Line, route: 'dashboardTestimonies'},
        {name: 'Portfolios', link: '/dashboard/portfolios', icon: LuFileStack, route: 'dashboardPortfolios'},
    ]
    
    return(
        <>
            <nav className={`h-screen w-full bg-slate-100 transition border-r-5 border-white`}>
                <div className='h-full flex flex-col'>
                    <Link href='/' className='flex gap-2 items-center justify-center p-5 h-[10vh]'>
                        <Image src='/assets/images/NusantaraTamaLogo.PNG' radius='none' className='h-10'/>
                    </Link>
                    <div className='overflow-hidden hover:overflow-auto sidebar -mr-[5px] my-5'>
                        <div className='mx-5 border-1 rounded-2xl border-dashed '>
                            <p className='p-5 text-xl'>Menu</p>
                            <div className='p-5 pt-0 flex flex-col gap-2 *:border-t *:border-dashed first:border-t-0 first:border-none'>
                                {navLink.map((link, i) => (
                                    <div className='pt-2' key={i}>
                                        <Button as={Link} href={link.link} className={`w-full bg-transparent text-lg font-light justify-start hover:text-primary ${route().current(link.route) ? 'text-primary' : ''}`} startContent={<link.icon size={25}/>}>{link.name}</Button>
                                    </div>
                                ))}
                            </div>
                    </div>
                    
                    </div>
                    
                </div>
            </nav>
        </>
    )
}