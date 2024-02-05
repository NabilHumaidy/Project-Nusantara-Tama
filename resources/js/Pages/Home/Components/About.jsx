import React, { useRef, useState, useEffect } from 'react';
import { EffectCards, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { Avatar, Image, Button } from '@nextui-org/react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useQuery } from 'react-query';

export default function About({ activeLinkRef, activeLinkView }) {
    const { isLoading, data, isError, error } = useQuery('testimonies', () => {
        return axios.get(route('testimoniesShowApi'), {
            headers : {
                'X-API-Key' : 'v4CEEVgIH4YD2FNMSn7dC7GWH4jdEQNM',
            },
        })
    },
    {
        refetchInterval: 2000
    })

    // const clientsTestimonies = [
    //     {name: 'Joe', jobTitle: 'Ceo Of 1', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut placerat orci nulla pellentesque dignissim. Tincidunt augue interdum velit euismod. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Eget nunc lobortis mattis aliquam faucibus. Mattis ullamcorper velit sed ullamcorper.', rating: 5},
    //     {name: 'Joe', jobTitle: 'Ceo Of 2', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut placerat orci nulla pellentesque dignissim. Tincidunt augue interdum velit euismod. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Eget nunc lobortis mattis aliquam faucibus. Mattis ullamcorper velit sed ullamcorper.', rating: 5},
    //     {name: 'Joe', jobTitle: 'Ceo Of 3', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut placerat orci nulla pellentesque dignissim. Tincidunt augue interdum velit euismod. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Eget nunc lobortis mattis aliquam faucibus. Mattis ullamcorper velit sed ullamcorper.', rating: 5},
    //     {name: 'Joe', jobTitle: 'Ceo Of 4', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut placerat orci nulla pellentesque dignissim. Tincidunt augue interdum velit euismod. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Eget nunc lobortis mattis aliquam faucibus. Mattis ullamcorper velit sed ullamcorper.', rating: 5},
    //     {name: 'Joe', jobTitle: 'Ceo Of 5', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut placerat orci nulla pellentesque dignissim. Tincidunt augue interdum velit euismod. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Eget nunc lobortis mattis aliquam faucibus. Mattis ullamcorper velit sed ullamcorper.', rating: 5},
    //     {name: 'Joe', jobTitle: 'Ceo Of 6', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut placerat orci nulla pellentesque dignissim. Tincidunt augue interdum velit euismod. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Eget nunc lobortis mattis aliquam faucibus. Mattis ullamcorper velit sed ullamcorper.', rating: 5},
    //     {name: 'Joe', jobTitle: 'Ceo Of 7', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut placerat orci nulla pellentesque dignissim. Tincidunt augue interdum velit euismod. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Eget nunc lobortis mattis aliquam faucibus. Mattis ullamcorper velit sed ullamcorper.', rating: 5},
    //     {name: 'Joe', jobTitle: 'Ceo Of 8', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut placerat orci nulla pellentesque dignissim. Tincidunt augue interdum velit euismod. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Eget nunc lobortis mattis aliquam faucibus. Mattis ullamcorper velit sed ullamcorper.', rating: 5},
    //     {name: 'Joe', jobTitle: 'Ceo Of 9', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut placerat orci nulla pellentesque dignissim. Tincidunt augue interdum velit euismod. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Eget nunc lobortis mattis aliquam faucibus. Mattis ullamcorper velit sed ullamcorper.', rating: 5},
    //     {name: 'Joe', jobTitle: 'Ceo Of 10', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut placerat orci nulla pellentesque dignissim. Tincidunt augue interdum velit euismod. Blandit volutpat maecenas volutpat blandit aliquam etiam erat. Eget nunc lobortis mattis aliquam faucibus. Mattis ullamcorper velit sed ullamcorper.', rating: 5},
    // ]

    // useEffect( async () => {
    //     axios.get(route('testimoniesShowApi'))
    //     .then(res => setClientTestimonies(res.data.data))
    //     .catch(err => console.log(err))
    // }, [])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(route('testimoniesShowApi'));
    //             setClientTestimonies(response.data.data);
    //         } catch (error) {
    //             console.log('Error Fetching API', error);
    //         }
    //     }

    //     fetchData();

    //     const intervalId = setInterval(fetchData, 5000);

    //     return () => clearInterval(intervalId);
    // }, [])

    return(
        <>
            <motion.div className='container mx-auto pt-20 xl:pt-40 overflow-hidden' >
                <div className='flex flex-col gap-4 md:gap-6 lg:gap-8 xl:gap-10 text-center items-center text-white mb-52 xl:mb-72' id='about' ref={activeLinkRef}>
                    <motion.p initial={{opacity: 0, y: -50}} whileInView={{opacity: 1, y: 0}} transition={{delay: 0.2, duration: 1}} viewport={{ once: true}} className='font-semibold text-[33px] md:text-4xl 2xl:text-6xl'>Who We Are?</motion.p>
                    <motion.p initial={{opacity: 0, y: -50}} whileInView={{opacity: 1, y: 0}} transition={{delay: 0.4, duration: 1}} viewport={{ once: true}} className='text-base md:text-xl 2xl:text-2xl w-11/12 lg:w-3/5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet massa vitae tortor condimentum lacinia. Ultrices in iaculis nunc sed augue.</motion.p>
                    <motion.div initial={{opacity: 0, y: -50}} whileInView={{opacity: 1, y: 0}} transition={{delay: 0.6, duration: 1}} viewport={{ once: true}}>
                        <Image className='h-[250px] md:h-[300px] lg:h-[450px] rounded-3xl w-[95vw] lg:w-screen object-center object-cover' src='/assets/images/BannerAbout.JPEG'/>
                    </motion.div>
                    
                </div>
                <div className='grid grid-cols-5 pb-[400px]'>
                    <div className='col-span-5 xl:col-span-2 flex justify-center items-center'>
                        <motion.p initial={{opacity: 0, y: -50}} whileInView={{opacity: 1, y: 0}} transition={{delay: 0.2, duration: 1}} viewport={{ once: true}} className='text-white text-center xl:text-left text-4xl md:text-[50px] 2xl:text-6xl leading-none w-11/12 xl:w-1/2 mb-10'>What Our Client Says</motion.p>
                    </div>
                    <motion.div initial={{opacity: 0, y: -50}} whileInView={{opacity: 1, y: 0}} transition={{delay: 0.4, duration: 1}} viewport={{ once: true}} className='col-span-5 xl:col-span-3 h-full'>
                        <Swiper effect={'cards'} grabCursor={true} loop={true} autoplay={{delay: 3000, disableOnInteraction: false}} modules={[EffectCards, Autoplay]} className="text-black w-10/12 md:w-2/4" >
                            {data ? data.data.data.map((testimony, i) => {
                                const ratingApproved = testimony.rating;
                                const ratingMax = 5;
                                const ratingNotApproved = ratingMax - ratingApproved;

                                const ratingResult = () => {
                                    const stars = [];
                                    
                                    for (let i = 1; i <= ratingApproved; i++) {
                                        if(i <= ratingMax) {
                                            stars.push(
                                                <object key={i} data="/assets/svg/StarYellow.svg" alt={`Approved Star ${i}`} className="w-4 h-4 md:w-5 md:h-5 2xl:w-7 2xl:h-7" />
                                            );
                                        }
                                    }
                                    
                                    for (let i = 1; i <= ratingNotApproved; i++) {
                                        stars.push(
                                            <object key={i + ratingApproved} data="/assets/svg/StarWhite.svg" alt={`Not Approved Star ${i}`} className="w-4 h-4 md:w-5 md:h-5 2xl:w-7 2xl:h-7" /> 
                                        );
                                    }
                                    
                                    return stars;
                                };
                                return (
                                    <SwiperSlide key={i} className='bg-zinc-300 rounded-[20px] border border-[#0000004D]'>
                                        <div className='flex flex-col xl:w-[400px] w-full h-[520px]'>
                                            <div className='px-5 lg:px-8 py-12 lg:py-16 h-[408px] overflow-hidden'>
                                                <object data="/assets/svg/clientsTitikDua.svg" className='w-[50px] lg:w-[70px] h-[40px] lg:h-[50px]'></object>
                                                <p className='tracking-wide mt-3 text-black text-opacity-50 text-lg xl:text-base 2xl:text-lg 2xl:leading-[26px]'>{testimony.message}</p>
                                            </div>
                                            <div className='h-[112px] border-t border-[#0000004D] py-6 px-7 grid grid-cols-4 gap-4'>
                                                <div className='col-span-1'>
                                                    <Avatar size='lg' src={testimony.photo} />
                                                </div>
                                                
                                                <div className='col-span-3'>
                                                    <div className='overflow-hidden w-full'>
                                                        <p className='text-lg md:text-xl text-opacity-70 font-medium text-black text-nowrap w-full'>{testimony.name}</p>
                                                        <p className='text-black text-sm md:text-base text-opacity-50 tracking-wider text-nowrap w-full'>{testimony.jobtitle}</p>
                                                    </div>
                                                    
                                                    
                                                    <div className='flex gap-1'>
                                                        {ratingResult()}
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            }) : isLoading ? <p className='text-xl text-white'>Loading...</p> : isError ? <p className='text-xl text-red-600'>{error.message}</p> : ''}
                        </Swiper>
                    </motion.div>
                </div>
            </motion.div>
            
        </>
    )
}
