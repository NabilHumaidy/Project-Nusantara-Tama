import NavBar from '@/Pages/Dashboard/Components/NavBar';
import SideBar from '@/Pages/Dashboard/Components/SideBar';
import SideBarMobile from '@/Pages/Dashboard/Components/SideBarMobile';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from 'react-query';

export default function DashboardLayout({ user, children, breadcrumb, title }) {
    document.body.classList.remove('font-sans', 'antialiased');
    
    const [toggleSideBar, setToggleSideBar] = useState(true);

    const queryClient = new QueryClient();

    return (
        <>
            <Head>
                <meta name='description' content='Nusantara Tama'/>
                <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png" />
                <link rel="manifest" href="/assets/favicon/site.webmanifest" />
            </Head>
            <QueryClientProvider client={queryClient}>
                <div className='flex'>
                    <div className='hidden lg:block'>
                        <motion.div animate={ toggleSideBar ? {width: '300px', x: 0} : {width: 0, x: -10}} transition={{ duration: .1, x: { duration: .2}}} className={`w-1/5 sticky top-0`}>
                            <SideBar toggleSideBar={toggleSideBar} setToggleSideBar={setToggleSideBar}/>
                        </motion.div>
                    </div>
                    
                    <div className='w-full h-full flex flex-col'>
                        <div className='h-16 sticky top-0 z-50'>
                            <NavBar toggleSideBar={toggleSideBar} setToggleSideBar={setToggleSideBar} userName={user.name}/>
                        </div>
                        <div className='flex w-full z-10'>
                            <div className='block lg:hidden relative'>
                                <motion.div animate={ toggleSideBar ? {x: -500} : {x: 0}} transition={{ duration: .1, x: { duration: .2}}} className=''>
                                    <SideBarMobile toggleSideBar={toggleSideBar} setToggleSideBar={setToggleSideBar}/>
                                </motion.div>
                                    {/* <SideBarMobile toggleSideBar={toggleSideBar} setToggleSideBar={setToggleSideBar}/> */}
                            </div>
                            
                            
                            <div className='w-full h-full min-h-screen bg-slate-100 px-8 py-5'>
                                <Breadcrumbs
                                separator="/"
                                itemClasses={{
                                    separator: "px-2",
                                    item: "text-primary data-[current=true]:text-gray-500 text-base"
                                }}
                                >
                                    <BreadcrumbItem><Link href='/'>Home</Link></BreadcrumbItem>
                                    <BreadcrumbItem><Link href='/dashboard'>Dashboard</Link></BreadcrumbItem>
                                    {breadcrumb && breadcrumb ? <BreadcrumbItem><Link href=''>{breadcrumb}</Link></BreadcrumbItem> : ''}
                                </Breadcrumbs>
                                <h2 className='text-xl my-8'>{title}</h2>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </QueryClientProvider>
        </>
    );
}
