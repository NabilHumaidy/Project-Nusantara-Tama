import { motion } from 'framer-motion'
import React from 'react'

export default function Maps() {
    return (
        <>
            <div className='bg-white'>
                <div className='container mx-auto px-8 py-40'>
                    <motion.div initial={{opacity: 0, y: -50}} whileInView={{opacity: 1, y: 0}} transition={{delay: 0.2, duration: 1}} viewport={{ once: true}} className='w-full h-[460px] overflow-hidden'>
                        <iframe className='w-full h-full' loading='lazy' allowFullScreen={true} src="https://www.google.com/maps/embed/v1/place?q=CV+Nusantara+Tama,+Jalan+Nusantara,+Kaliwates+Kidul,+Kaliwates,+Jember+Regency,+East+Java,+Indonesia&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&zoom=14">
                        </iframe>
                    </motion.div>
                </div>
            </div>
            
        </>
    )
}
