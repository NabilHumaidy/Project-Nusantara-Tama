import { Link } from '@inertiajs/react'
import { Image, toggle } from '@nextui-org/react'
import React, { useEffect, useState, Fragment, useRef } from 'react'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { IoSettings } from "react-icons/io5";

export default function NavBar({ toggleSideBar, setToggleSideBar, userName }) {
    const [greeting, setGreeting] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const getGreeting = () => {
            const currentGreeting = new Date().getHours();

            if(currentGreeting >= 5 && currentGreeting < 12) {
                setGreeting('Morning');
            } else if(currentGreeting >= 12 && currentGreeting < 18) {
                setGreeting('Afternoon');
            } else {
                setGreeting('Evening');
            }
        }

        getGreeting();
        const interval = setInterval(getGreeting, 60000);

        return () => clearInterval(interval)
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
    
        return () => clearInterval(interval);
    }, []);

    const formatTime = (time) => {
        const hours = time.getHours().toString().padStart(2, '0');
        const minutes = time.getMinutes().toString().padStart(2, '0');
        const seconds = time.getSeconds().toString().padStart(2, '0');
        const date = time.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    
        return `${hours}:${minutes}:${seconds} | ${date}`;
    };
    
    return(
        <>
            <header className={` sticky top-0 right-0 w-full h-full border-b-5 bg-slate-100 border-white flex items-center px-8 py-8 transition ${toggleSideBar ? ' lg:shadow-none shadow-[0px_5px_15px_0px_#00000024]' : 'lg:shadow-[0px_5px_15px_0px_#00000024]'}`}>
                <div className='flex items-center justify-between w-full'>
                    <div className='flex gap-5 items-center'>
                        <button className={`relative cursor-pointer flex justify-center items-center size-10 transition`} onClick={() => setToggleSideBar(!toggleSideBar)}>
                            <div className={`bg-primary w-9 h-[2px] transition ${toggleSideBar ? 'rotate-180' : 'rotate-0' }`}/>
                            <div className={`absolute border-t-[2px] border-r-[2px] border-primary size-5 transition ${toggleSideBar ? 'rotate-[225deg] left-1' : 'rotate-45 right-1'}`}/>
                        </button>
                        <p className='text-lg border-b-2 border-primary select-none'>Good {greeting}</p>
                    </div>
                    <div className='flex items-center gap-5'>
                        <p className='text-lg border-b-2 border-primary select-none hidden md:block'>{formatTime(currentTime)}</p>
                        <Dropdown backdrop="blur">
                            <DropdownTrigger>
                                <Button endContent={<IoSettings size={25}  className='group-hover:animate-spin text-primary'/>} className='bg-slate-200 group'>
                                    <p className='text-lg'>{userName}</p>
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu variant="faded" aria-label="Static Actions">
                                <DropdownItem as={Link} href='/profile' key="new">Profile</DropdownItem>
                                <DropdownItem key="delete" className="text-danger" color="danger">
                                Delete file
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </header>
        </>
    )
}