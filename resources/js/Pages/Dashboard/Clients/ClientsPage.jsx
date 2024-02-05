import DashboardLayout from '@/Layouts/DashboardLayout'
import { Head, Link } from '@inertiajs/react'
import React, { useRef, useState, useEffect } from 'react';
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { RiAppsLine, RiChatSmile3Line } from "react-icons/ri";
import { LuFileStack } from "react-icons/lu";
import { BsQuestionCircle } from "react-icons/bs";
import { motion } from 'framer-motion';
import { useReactTable, flexRender } from '@tanstack/react-table';
import axios from 'axios';
import { useQuery } from 'react-query';

export default function ClientsPage({ auth }) {
    return(
        <>
            <Head>
                <title>Clients</title>
            </Head>
            <DashboardLayout  
            user={auth.user}
            breadcrumb='Clients'
            title='Clients'>
                <div className='w-full border border-dashed rounded-xl bg-white p-4'>
                    
                </div>
            </DashboardLayout>
        </>
    )
}