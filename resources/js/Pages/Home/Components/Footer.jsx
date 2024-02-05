import { Link } from '@inertiajs/react'
import { Button, Image } from '@nextui-org/react'
import { motion } from 'framer-motion'
import React from 'react'

export default function Footer() {
    return(
        <>
            <motion.div initial={{opacity: 0, y: 200}} whileInView={{opacity: 1, y: 0}} transition={{delay: 0.1, duration: 1}} viewport={{ once: true}} className='bg-white rounded-t-[50px] border border-black border-opacity-20' id='contact'>
                <div className='container mx-auto px-8 py-14'>
                    <div className='grid grid-cols-1 lg:grid-cols-2'>
                        <div className='col-span-1 flex justify-center mb-10'>
                            <div className='text-black flex flex-col gap-9'>
                                <div className='flex flex-col gap-4'>
                                    <p className='text-xl font-semibold'>Contact Us</p>
                                    <p className='text-4xl font-semibold w-full md:w-[350px]'>Start Digitalizing Your Business</p>
                                    {/* <p className='text-4xl font-semibold w-[350px]'>Mulailah Digitalisasi Bisnis Anda</p> */}
                                </div>
                                <div>
                                    <p className='text-xl font-semibold'>Chat to us</p>
                                    <p>Our team is here to help</p>
                                    <a href='mailto:nusantaratama@gmail.com' className='underline'>nusantaratama@gmail.com</a>
                                </div>
                                <div>
                                    <p className='text-xl font-semibold'>Call Us</p>
                                    <p>+ 62331-4350050</p>
                                    <p>+ 628233-55255</p>
                                </div>
                                <div>
                                    <p className='text-xl font-semibold'>Social Media</p>
                                    <div className='flex gap-3 items-center'>
                                        <a href="https://instagram.com/tamaramanagement" target='_blank'><img src="/assets/svg/Instagram.svg"/></a>
                                        <a href="https://linkedin.com/tamaramanagement" target='_blank'><img src="/assets/svg/Linkedin.svg"/></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-1 flex justify-center'>
                            <div className='text-black flex items-center flex-col gap-6'>
                                <div className='w-[85vw] md:w-[368px] lg:w-full'>
                                    <label htmlFor="Name" className='text-xl font-semibold block'>Name <span className='text-red-600'>*</span></label>
                                    <input type="text" id='Name' name='Name' className='rounded-lg border-[#00000059] placeholder:text-[#00000059] w-[85vw] md:w-[368px]  placeholder:font-medium focus:ring-primary focus:ring-2 focus:border-primary' placeholder='Enter Your Name'/>
                                    {/* <label htmlFor="nama" className='text-xl font-semibold block'>Nama <span className='text-red-600'>*</span></label>
                                    <input type="text" id='nama' name='nama' className='rounded-lg border-[#00000059] placeholder:text-[#00000059] w-[85vw] md:w-[368px]  placeholder:font-medium focus:ring-primary focus:ring-2 focus:border-primary' placeholder='Enter Your Name'/> */}
                                </div>
                                <div className='w-[85vw] md:w-[368px] lg:w-full'>
                                    <label htmlFor="Email" className='text-xl font-semibold block'>Email <span className='text-red-600'>*</span></label>
                                    <input type="text" id='Email' name='Email' className='rounded-lg border-[#00000059] placeholder:text-[#00000059] w-[85vw] md:w-[368px]  placeholder:font-medium focus:ring-primary focus:ring-2 focus:border-primary' placeholder='Enter Your Email'/>
                                </div>
                                <div className='w-[85vw] md:w-[368px] lg:w-full'>
                                    <label htmlFor="company" className='text-xl font-semibold block'>Company Name <span className='text-red-600'>*</span></label>
                                    <input type="text" id='company' name='company' className='rounded-lg border-[#00000059] placeholder:text-[#00000059] w-[85vw] md:w-[368px]  placeholder:font-medium focus:ring-primary focus:ring-2 focus:border-primary' placeholder='Enter Your Company Name'/>
                                </div>
                                <div className='w-[85vw] md:w-[368px] lg:w-full'>
                                    <label htmlFor="Message" className='text-xl font-semibold block'>Message <span className='text-red-600'>*</span></label>
                                    <textarea type="text" rows={4} id='Message' name='Message' className='rounded-lg border-[#00000059] placeholder:text-[#00000059] w-[85vw] md:w-[368px]  placeholder:font-medium focus:ring-primary focus:ring-2 focus:border-primary' placeholder='Enter Your Message'></textarea>
                                </div>
                                <div className='w-[85vw] md:w-[368px] lg:w-full'>
                                    <Button className='bg-primary text-white text-xl font-medium py-2 px-6' radius='full'>Send</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center mt-20'>
                        <Link href='/'>
                            <Image radius='none' src='/assets/images/NusantaraTamaLogo.PNG' className='h-10'/>
                        </Link>
                        
                    </div>
                </div>
            </motion.div>
        </>
    )
}