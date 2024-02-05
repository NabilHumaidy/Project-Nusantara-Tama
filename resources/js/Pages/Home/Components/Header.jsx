import { Button, Image } from '@nextui-org/react';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react'

export default function Header({ activeLinkRef, activeLinkView }){
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

    return(
        <>
            <motion.header className='bg-white rounded-b-[50px]' id='home' ref={activeLinkRef}>
                <motion.div initial={{y: 50, opacity: 0}} whileInView={{y: 0, opacity: 1}} transition={{duration: 1}} viewport={{ once: true}} className='container mx-auto pt-6 2xl:pt-24 pb-32 2xl:pb-56'>
                    <div className='px-8 flex flex-col-reverse lg:flex-row items-center gap-11 lg:gap-32 xl:gap-52 justify-between overflow-hidden'>
                        <div className='basis-full flex items-center lg:items-start flex-col gap-4 xl:gap-6 2xl:gap-10'>
                            <span className='border rounded-full border-black font-medium text-[14px] xl:text-[15px] 2xl:text-xl py-1 xl:py-2 w-[240px] xl:w-[270px] 2xl:w-80 text-center'>Welcome to Nusantara Tama</span>
                            <motion.p initial={{opacity: 0, y: -50}} whileInView={{opacity: 1, y: 0}} transition={{delay: 0.1, duration: 1}} viewport={{ once: true}} className='font-semibold text-[40px] xl:text-[56px] 2xl:text-7xl leading-none text-center lg:text-left'><span className='text-primary'>Digitalization</span> Solutions for Your Business</motion.p>
                            {/* <p className='font-semibold text-5xl xl:text-[56px] 2xl:text-7xl leading-none text-center lg:text-left'>Solusi <span className='text-primary'>Digitalisasi</span> Untuk Bisnis Anda</p> */}
                            <motion.p initial={{opacity: 0, y: -50}} whileInView={{opacity: 1, y: 0}} transition={{delay: 0.2, duration: 1}} viewport={{ once: true}} className='text-lg xl:text-xl 2xl:text-2xl text-center lg:text-left'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</motion.p>
                            <ul className='ms-5 list-disc lg:text-xs xl:text-base 2xl:text-xl flex gap-x-10 justify-center flex-wrap'>
                                <motion.li initial={{opacity: 0, y: -50}} whileInView={{opacity: 1, y: 0}} transition={{delay: 0.3, duration: 1}} viewport={{ once: true}}>UI/UX Design</motion.li>
                                <motion.li initial={{opacity: 0, y: -50}} whileInView={{opacity: 1, y: 0}} transition={{delay: 0.4, duration: 1}} viewport={{ once: true}}>Android</motion.li>
                                <motion.li initial={{opacity: 0, y: -50}} whileInView={{opacity: 1, y: 0}} transition={{delay: 0.5, duration: 1}} viewport={{ once: true}}>Web Design</motion.li>
                                <motion.li initial={{opacity: 0, y: -50}} whileInView={{opacity: 1, y: 0}} transition={{delay: 0.6, duration: 1}} viewport={{ once: true}}>Landing Page</motion.li>
                            </ul>
                            <motion.div initial={{opacity: 0, y: -50}} whileInView={{opacity: 1, y: 0}} transition={{delay: 0.7, duration: 1}} viewport={{ once: true}}>
                                <Button onClick={() => handleSmoothScroll('contact')} className='text-white bg-primary font-semibold text-center w-44 xl:w-48 2xl:w-64 rounded-2xl py-4 text-base 2xl:text-xl xl:py-[22px] 2xl:py-6'>Consult Now</Button>
                            </motion.div>
                            
                            {/* <Button className='text-white bg-primary font-semibold text-center w-44 xl:w-48 2xl:w-64 rounded-2xl py-4 text-base 2xl:text-xl xl:py-[22px] 2xl:py-6'>Konsultasi Sekarang</Button> */}
                        </div>
                        <div className='basis-full relative'>
                            <div className='flex justify-center'>
                                <Image src='/assets/images/HeaderImage.JPEG' alt='Header Image (Man See Laptop and think)' className='object-center object-cover w-[202px] h-[316px] md:w-[260px] md:h-[370px] lg:w-[300px] lg:h-[460px] xl:w-[316px] xl:h-[488px] 2xl:w-[380px] 2xl:h-[570px] rounded-[100px]' width={1000} height={1000}/>
                                <AnimatePresence>
                                    <motion.div initial={{rotate: '-48deg'}} animate={{rotate: '-100deg', borderColor: '#1E8FB4'}} transition={{duration: 5, repeat: Infinity, repeatType:'mirror', repeatDelay: 0.7 }} className='absolute rounded-full border border-black w-[203px] h-[324px] md:w-[260px] md:h-[380px] lg:w-[300px] lg:h-[480px] xl:w-[316px] xl:h-[504px] 2xl:w-[380px] 2xl:h-[600px]'>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.header>
            
        </>
    );
}