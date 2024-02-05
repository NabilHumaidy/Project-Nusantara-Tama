import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, Link } from '@inertiajs/react'
import React from 'react'
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { RiAppsLine, RiChatSmile3Line } from "react-icons/ri";
import { LuFileStack } from "react-icons/lu";
import { BsQuestionCircle } from "react-icons/bs";
import { motion } from 'framer-motion';

export default function DashboardPage({ auth }) {
    return(
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <DashboardLayout 
            user={auth.user}
            breadcrumb=''
            title='Dashboard'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                    <Link href='/dashboard/clients' className='col-span-1'>
                        <motion.div initial={{scale: 1}} whileHover={{scale: 1.05, boxShadow: '3px 3px rgba(30, 143, 180, 0.4), 5px 5px rgba(30, 143, 180, 0.3), 7px 7px rgba(30, 143, 180, 0.2), 9px 9px rgba(30, 143, 180, 0.1), 11px 11px rgba(30, 143, 180, 0.05)'}} transition={{duration: .5}} className='rounded-xl bg-white p-5 border border-dashed flex gap-5 items-center overflow-hidden'>
                            <div className='flex justify-center items-center bg-primary bg-opacity-25 rounded-full p-3'>
                                <RiAppsLine size={25} className='text-primary'/>
                            </div>
                            <div className='flex flex-col font-light'>
                                <p className='text-lg'>Clients</p>
                                <p className='text-2xl'>51</p>
                            </div>
                        </motion.div>
                    </Link>
                    <Link href='/dashboard/testimonies' className='col-span-1'>
                        <motion.div initial={{scale: 1}} whileHover={{scale: 1.05, boxShadow: '3px 3px rgba(30, 143, 180, 0.4), 5px 5px rgba(30, 143, 180, 0.3), 7px 7px rgba(30, 143, 180, 0.2), 9px 9px rgba(30, 143, 180, 0.1), 11px 11px rgba(30, 143, 180, 0.05)'}} transition={{duration: .5}} className='rounded-xl bg-white p-5 border border-dashed flex gap-5 items-center overflow-hidden'>
                            <div className='flex justify-center items-center bg-primary bg-opacity-25 rounded-full p-3'>
                                <RiAppsLine size={25} className='text-primary'/>
                            </div>
                            <div className='flex flex-col font-light'>
                                <p className='text-lg'>Testimonies</p>
                                <p className='text-2xl'>51</p>
                            </div>
                        </motion.div>
                    </Link>
                    <Link href='/dashboard/portfolios' className='col-span-1'>
                        <motion.div initial={{scale: 1}} whileHover={{scale: 1.05, boxShadow: '3px 3px rgba(30, 143, 180, 0.4), 5px 5px rgba(30, 143, 180, 0.3), 7px 7px rgba(30, 143, 180, 0.2), 9px 9px rgba(30, 143, 180, 0.1), 11px 11px rgba(30, 143, 180, 0.05)'}} transition={{duration: .5}} className='rounded-xl bg-white p-5 border border-dashed flex gap-5 items-center overflow-hidden'>
                            <div className='flex justify-center items-center bg-primary bg-opacity-25 rounded-full p-3'>
                                <RiAppsLine size={25} className='text-primary'/>
                            </div>
                            <div className='flex flex-col font-light'>
                                <p className='text-lg'>Portfolios</p>
                                <p className='text-2xl'>51</p>
                            </div>
                        </motion.div>
                    </Link>
                </div>
            </DashboardLayout>
        </>
    )
}