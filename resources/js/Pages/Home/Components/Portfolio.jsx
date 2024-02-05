import { Link } from '@inertiajs/react';
import { Button, Image } from '@nextui-org/react'
import { motion } from 'framer-motion';
import React, { useState } from 'react'

export default function Portfolio({ activeLinkRef, activeLinkView }) {
    const [allPortfolio, setAllPortfolio] = useState(true);
    const [websitePortfolio, setWebsitePortfolio] = useState(false);
    const [designPortfolio, setDesignPortfolio] = useState(false);
    const [androidPortfolio, setAndroidPortfolio] = useState(false);

    const handlePortfolio = (setState) => {
        setAllPortfolio(false);
        setWebsitePortfolio(false);
        setDesignPortfolio(false);
        setAndroidPortfolio(false);

        setState(true);
    }

    const portfolioButton = [
        {name: 'All', setState: setAllPortfolio, getState: allPortfolio},
        {name: 'Website', setState: setWebsitePortfolio, getState: websitePortfolio},
        {name: 'Design', setState: setDesignPortfolio, getState: designPortfolio},
        {name: 'Android', setState: setAndroidPortfolio, getState: androidPortfolio},
    ]

    const portfolioList = [
        {name: 'Yes This is Portfolio', category: 'Website', image: '/assets/images/testPortfolio.JPG'},
        {name: 'Yes This is Portfolio', category: 'Website', image: '/assets/images/testPortfolio.JPG'},
        {name: 'Yes This is Portfolio', category: 'Website', image: '/assets/images/testPortfolio.JPG'},
        {name: 'Yes This is Portfolio', category: 'Website', image: '/assets/images/testPortfolio.JPG'},
        {name: 'Yes This is Portfolio', category: 'Website', image: '/assets/images/testPortfolio.JPG'},
        {name: 'Yes This is Portfolio', category: 'Website', image: '/assets/images/testPortfolio.JPG'},
        {name: 'Yes This is Portfolio', category: 'Website', image: '/assets/images/testPortfolio.JPG'},
        {name: 'Yes This is Portfolio', category: 'Website', image: '/assets/images/testPortfolio.JPG'},
        {name: 'Yes This is Portfolio', category: 'Website', image: '/assets/images/testPortfolio.JPG'},
    ]

    return(
        <>
            <div className='bg-white rounded-t-[50px] pt-5' >
                <div className='container mx-auto pt-32 px-8' id='portfolio' ref={activeLinkRef}>
                    <motion.h1 initial={{opacity: 0, y: -50}} whileInView={{opacity: 1, y: 0}} transition={{delay: 0.2, duration: 1}} viewport={{ once: true}} className='text-[40px] font-semibold mb-12'>Portfolio</motion.h1>
                    <div className='flex flex-col gap-9'>
                        <motion.div initial={{opacity: 0, y: -50}} whileInView={{opacity: 1, y: 0}} transition={{delay: 0.4, duration: 1}} viewport={{ once: true}} className='flex flex-wrap gap-2'>
                            {portfolioButton.map((portfolio, i) => (
                                <Button key={i} className={`py-2 w-[100px] transition ${portfolio.getState ? 'bg-primary text-white' : 'text-black bg-transparent'}`} onClick={() => handlePortfolio(portfolio.setState)}>{portfolio.name}</Button>
                            ))}
                        </motion.div>
                        <div className='flex gap-y-10 flex-wrap justify-evenly'>
                            {portfolioList.map((portfolio, i) => (
                                
                                <Link key={i} className='group rounded-3xl overflow-hidden'>
                                    <motion.div initial={{opacity: 0, y: 50}} whileInView={{opacity: 1, y: 0}} transition={{delay: `0.${i}`, duration: 1}} viewport={{ once: true}} className='relative'>
                                        <img src={portfolio.image} radius='none' alt='Image' className='scale-100 group-hover:scale-110 duration-1000 rounded-3xl object-center object-cover size-[350px] '/>
                                        
                                        <div className='translate-y-[110%] scale-85 group-hover:translate-y-0 group-hover:scale-100 duration-1000 absolute rounded-3xl bottom-0 z-10 w-full h-1/3 backdrop-blur-sm'>
                                            <div className='bg-primary w-full h-full opacity-80 rounded-3xl flex items-center ps-10'>
                                                <div className='text-white flex flex-col gap-3'>
                                                    <p className='text-xl font-extrabold'>{portfolio.name}</p>
                                                    <p className='text-base font-semibold'>{portfolio.category}</p>
                                                </div>  
                                            </div>
                                        </div>
                                    </motion.div>
                                    
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}