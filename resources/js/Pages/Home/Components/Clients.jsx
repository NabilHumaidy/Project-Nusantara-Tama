import { Image } from '@nextui-org/react';
import { motion } from 'framer-motion';
import React from 'react'
import Marquee from 'react-fast-marquee';

export default function Clients({ activeLinkRef, activeLinkView }) {
    const listClients = [
        {src: '/assets/images/TelkomLogo.PNG', alt: 'Telkom Indonesia'},
        {src: '/assets/images/PertaminaLogo.PNG', alt: 'Pertamina'},
        {src: '/assets/images/UnejLogo.PNG', alt: 'Universitas Jember'},
        {src: '/assets/images/JawaPosLogo.PNG', alt: 'Jawa Pos'},
        {src: '/assets/images/AngkasaPuraLogo.PNG', alt: 'Angkasa Pura II'},
        {src: '/assets/images/PUPRLogo.PNG', alt: 'Kementerian Pekerjaan Umum dan Perumahan Rakyat Republik Indonesia'},
        {src: '/assets/images/TelkomUnivLogo.PNG', alt: 'Telkom Universitas'},
    ]
    return(
        <>
            <motion.div initial={{opacity: 0, y: -50}} whileInView={{opacity: 1, y: 0}} transition={{delay: 1, duration: 1}} viewport={{ once: true}} className='container mx-auto block w-full pb-56 pt-32' id='client' ref={activeLinkRef}>
                <Marquee pauseOnHover className='flex items-center gap-16 2xl:gap-28'>
                    <div className='flex items-center gap-10 md:gap-16 2xl:gap-28'>
                        {listClients.map((clients, i) => (
                            <Image key={i} src={clients.src} alt={clients.alt} radius='none' className='h-16 md:h-20 hover:scale-105'/>
                        ))}
                    </div>
                </Marquee>
            </motion.div>
        </>
    );
}