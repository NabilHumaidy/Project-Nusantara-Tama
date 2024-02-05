"use client"
import React, { useEffect, useState, useRef, Fragment } from 'react'
import axios from 'axios';
import { useQuery } from 'react-query';
import { useReactTable, flexRender, getCoreRowModel } from '@tanstack/react-table';
import { Input, Select, SelectItem, Table as NextTable, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Avatar, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Image } from '@nextui-org/react';
import { format, set } from 'date-fns';
import { IoSearchOutline } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FaUser, FaCheckCircle } from "react-icons/fa";
import { IoMdClose, IoMdStar } from "react-icons/io";
import { MdOutlineEdit, MdOutlineDeleteOutline } from "react-icons/md";
import EditClients from './EditClients';
import DeleteClients from './DeleteClients';

export default function TableClients() {
    const [ search, setSearch] = useState();
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [ dataPerPage, setDataPerPage] = useState('5');
    const [ dataPagination, setDataPagination ] = useState(false);

    const [ modalAddOpen, setModalAddOpen ] = useState();

    const [ photo, setPhoto ] = useState('');
    const photoRef = useRef(null);
    const [ name, setName ] = useState('');
    const [ jobtitle, setJobtitle ] = useState('');
    const [ rating, setRating ] = useState('');
    const [ message, setMessage ] = useState('');

    const arrayRating = [
        {rating: 1},
        {rating: 2},
        {rating: 3},
        {rating: 4},
        {rating: 5},
    ]
    const handlePhoto = (files, setState) => {
        if (files.length === 0) return;
        
        // Must be image
        if (files[0].type.split('/')[0] !== 'image') return;

        setState([
            {
                file: files,
                name: files[0].name,
                size: files[0].size,
                url: URL.createObjectURL(files[0]),
            },
        ]);
    };

    const onPhotoChange = (event, setState) => {
        const files = event.target.files;

        handlePhoto(files, setState);
    };

    const [ response, setResponse ] = useState([]);
    const [ responseEdit, setResponseEdit ] = useState([]);
    const [ responseDelete, setResponseDelete ] = useState([]);

    const [ handleStoreLoading, setHandleStoreLoading ] = useState(false)
    const handleStoreData = async () => {
        try {
            setHandleStoreLoading(true);

            const storeData = {
                name: name,
                jobtitle: jobtitle,
                photo: photo && photo[0].file[0],
                message: message,
                rating: rating,
            };

            const response = await axios.post(
                route('testimoniesStoreApi'),
                storeData,
                {
                    headers: {
                        'X-API-Key': 'v4CEEVgIH4YD2FNMSn7dC7GWH4jdEQNM',
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            return setResponse(response.data)
        } catch (error) {
            setHandleStoreLoading(false)
            if (error.response) {
              // Respons diterima dengan status yang tidak berhasil (misalnya 4xx atau 5xx)
                setResponse(error.response.data)
            }
        } finally {
            setHandleStoreLoading(false)
        }
    }

    useEffect(() => {
        if(response.message) {
            const timer = setTimeout(() => {
                setResponse([]);
            }, 5000)

            return () => clearTimeout(timer)
        }
    }, response.message)

    useEffect(() => {
        response.message && setModalAddOpen(false)
    }, response.message)

    const { isLoading, data, isError, error,  } = useQuery('testimonies', () => {
        return axios.get(route('testimoniesShowApi'), {
            headers : {
                'X-API-Key' : 'v4CEEVgIH4YD2FNMSn7dC7GWH4jdEQNM',
            },
            params : {
                ...(search ? { 'search': search } : dataPagination && { 'page': dataPagination }),
                ...(dataPerPage && { 'per_page': dataPerPage }),
            },
        })
    },
    {
        refetchInterval: 1000
    })

    const dataTable = data && data.data.data;
    const meta = data && data.data.meta;

    const formatTime = (date) => {
        return format(new Date(date), "d MMMM',' yyyy | HH:mm:ss");
    }

    const numberPerPage = [
        {number: '5'},
        {number: '10'},
        {number: '25'},
        {number: '50'},
        {number: '100'},
    ]

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setSearch(debouncedSearch)
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [debouncedSearch])

    const convertToRating = (rating) => {
        const ratingApproved = rating;
        const ratingMax = 5;
        const ratingNotApproved = ratingMax - ratingApproved;

        const ratingResult = () => {
            const stars = [];
            
            for (let i = 1; i <= ratingApproved; i++) {
                if(i <= ratingMax) {
                    stars.push(
                        <object key={i} data="/assets/svg/StarYellow.svg" alt={`Approved Star ${i}`} className="w-4 h-4 md:w-5 md:h-5 2xl:w-7 2xl:h-7 " />
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
        return ratingResult();
    }

    return (
        <>  
            {response.message || responseEdit.message || responseDelete.message && 
                <div className='py-3 px-5 w-full bg-green-400 bg-opacity-20 rounded-lg mb-5 flex justify-between items-center'>
                    <div className='flex items-center gap-4'>
                        <FaCheckCircle size={20} className='text-green-400'/>
                        <p className='text-bold text-lg text-green-800'>{response.message || responseEdit.message || responseDelete.message}</p>
                    </div>
                    <Button size='sm' onClick={() => {
                        setResponse([])
                        setResponseEdit({})
                        setResponseDelete([])
                        }} isIconOnly radius='full' className='bg-transparent text-foreground-500 hover:bg-green-200 active:bg-green-300 tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 select-none'>
                        <svg className='size-4' aria-hidden="true" fill="none" focusable="false" height="1em" role="presentation" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="1em"><path d="M18 6L6 18M6 6l12 12"></path></svg>
                    </Button>
                </div>
            }
            
            <div className='flex flex-col md:flex-row gap-3 justify-between pb-5'>
                <input type="search" id='search' className='rounded-xl border-0 bg-default-100 hover:bg-default-200 focus:bg-default-200 focus:ring-2' placeholder='Search...' onChange={(e) => setDebouncedSearch(e.target.value)}/>
                <div className='flex justify-between gap-2'>
                    <Button className='bg-primary text-white h-auto md:h-full text-base' onClick={() => setModalAddOpen(true)}>Create</Button>
                    <Select label="Data Per Page" placeholder="5" className="w-32 z-0" defaultSelectedKeys={['5']} onChange={(e) => setDataPerPage(e.target.value)}>
                        {numberPerPage.map(perPage => (
                            <SelectItem key={perPage.number} value={perPage.number}>{perPage.number}</SelectItem>
                        ))}
                    </Select>
                </div>
                
            </div>

            {/* Table for Desktop */}
            <NextTable removeWrapper aria-label="Example static collection table" className='hidden md:block'>
                <TableHeader>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>IMAGE</TableColumn>
                    <TableColumn>LINK</TableColumn>
                    <TableColumn>CREATED AT</TableColumn>
                    <TableColumn>ACTION</TableColumn>
                </TableHeader>
                {dataTable && dataTable.length > 0 ? 
                    <TableBody>
                        {dataTable.map((row, i) => (
                            <TableRow key={i} className='hover:bg-default-100 transition'>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.image}</TableCell>
                                <TableCell>{row.link}</TableCell>
                                <TableCell>{formatTime(row.created_at)}</TableCell>
                                <TableCell className='flex gap-1'><EditClients dataId={row.id} dataName={row.name} dataJobtitle={row.jobtitle} dataPhoto={row.photo} dataRating={row.rating} dataMessage={row.message} setResponse={setResponseEdit} response={responseEdit}/> <DeleteClients dataId={row.id} dataName={row.name} setResponse={setResponseDelete} response={responseDelete}/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                :
                <TableBody emptyContent={"No data to display."}>{[]}</TableBody>
                }
                {isLoading && <TableBody emptyContent={"Loading..."}>{[]}</TableBody>}
            </NextTable>

            {/* Table for Mobile */}
            <div className='flex flex-col gap-5 md:hidden'>
                {data && dataTable.map((row, i) => (
                    <div className='w-full border rounded-xl p-3' key={i}>
                        <div className='flex justify-between pb-3 border-b'>
                            <div className='flex items-center gap-3'>
                                <Avatar src={row.photo} size="md" />
                                <div className=''>
                                    <p>{row.name}</p>
                                    <p className='text-xs'>{row.jobtitle}</p>
                                </div>
                            </div>
                            <div>
                                
                            <div className='flex gap-1'>
                                <EditClients dataId={row.id} dataName={row.name} dataJobtitle={row.jobtitle} dataPhoto={row.photo} dataRating={row.rating} dataMessage={row.message} setResponse={setResponseEdit} response={responseEdit}/> <DeleteClients dataId={row.id} dataName={row.name} setResponse={setResponseDelete} response={responseDelete}/>
                            </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-3 pt-3'>
                            <div className='flex justify-between'>
                                <div className='flex'>
                                    {convertToRating(row.rating)}
                                </div>
                                <p className='text-xs'>{formatTime(row.created_at)}</p>
                            </div>
                            <p className='text-sm'>{row.message}</p>
                        </div>
                    </div>
                ))}
                
            </div>


            {/* Pagination */}
            <div className='flex gap-5 justify-center my-5'>
                {dataTable && 
                    <Pagination
                        showControls
                        total={meta && meta.last_page}
                        color="secondary"
                        onChange={setDataPagination}
                        classNames={{
                            wrapper: "",
                            item: "",
                            cursor: "bg-primary",
                        }}
                    />
                }
            </div>

            <Modal scrollBehavior='inside' backdrop='opaque' size='4xl' isOpen={modalAddOpen} isDismissable={false} hideCloseButton>
                <ModalContent className='p-5'>
                    <Button size='sm' onClick={() => setModalAddOpen(false)} isIconOnly radius='full' className='absolute top-1 right-1 bg-transparent text-foreground-500 hover:bg-default-100 active:bg-default-200 tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 select-none'>
                        <svg className='size-4' aria-hidden="true" fill="none" focusable="false" height="1em" role="presentation" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="1em"><path d="M18 6L6 18M6 6l12 12"></path></svg>
                    </Button>
                    <ModalHeader className="flex flex-col gap-1"><p className='text-xl font-normal'>Create <span className='text-primary'>Client</span></p></ModalHeader>
                    <ModalBody className='sidebar'>
                        <div className='grid grid-cols-4 lg:grid-cols-5 gap-5'>
                            <div className='col-span-4 lg:col-span-1 flex flex-col items-center justify-center relative'>
                                <div className="size-32 rounded-full bg-gray-100 flex justify-center items-center cursor-pointer" onClick={() => photoRef.current.click()}>
                                    {photo ? 
                                        <Image radius='full' src={photo[0].url} className='size-32 object-center object-cover'/>
                                    : 
                                        <FaUser size={70} className="text-gray-500"/>
                                    }
                                    <input type="file" className='hidden' ref={photoRef} onChange={(event) => onPhotoChange(event, setPhoto)}/>
                                </div>
                                {photo ? 
                                    <>
                                        <div className='p-1 absolute right-16 md:right-56 lg:right-0 -top-2 rounded-full bg-red-600 hover:bg-red-500 cursor-pointer hover:scale-105 z-10' onClick={() => setPhoto()}>
                                            <IoMdClose size={20} className='text-white'/>
                                        </div>
                                        <p className='mt-3'>{maxText(photo[0].name, 40)} | {formatFileSize(photo[0].size)}</p>
                                    </>
                                :
                                    <>
                                        <div className={`size-36 border-2 border-dashed ${response.errors &&  response.errors.photo ? 'border-red-600' : 'border-primary'} rounded-full absolute -top-2 animate-[spin_20s_linear_infinite] -z-10`} />
                                        <p className='mt-3'>No image selected<span className='text-red-600'>*</span></p>
                                    </>
                                    
                                }
                                {
                                    response.errors ? <p className='text-sm text-red-500'>{response.errors.photo}</p> : ''
                                }
                            </div>
                            <div className='col-span-4 grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-x-10'>
                                <div className="bg-white col-span-1">
                                    <div className="relative bg-inherit">
                                        <input type="text" id="name" name="name" placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} className="w-full border-0 p-4 peer text-gray-900 rounded-md placeholder-transparent ring-1 ring-gray-300 focus:ring-primary focus:ring-2 focus:outline-none" />
                                        <label htmlFor="name" className="absolute cursor-text left-4 -top-3 text-sm text-primary bg-inherit peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-sm transition-all">Name<span className='text-red-600'>*</span></label>
                                    </div>
                                    {
                                        response.errors ? <p className='text-sm text-red-500'>{response.errors.name}</p> : ''
                                    }
                                </div>
                                <div className="bg-white col-span-1">
                                    <div className="relative bg-inherit">
                                        <input type="text" id="jobtitle" name="jobtitle" placeholder="jobtitle" onChange={(e) => setJobtitle(e.target.value)} value={jobtitle} className="w-full border-0 p-4 peer text-gray-900 rounded-md placeholder-transparent ring-1 ring-gray-300 focus:ring-primary focus:ring-2 focus:outline-none" />
                                        <label htmlFor="jobtitle" className="absolute cursor-text left-4 -top-3 text-sm text-primary bg-inherit peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-sm transition-all">Job Title<span className='text-red-600'>*</span></label>
                                    </div>
                                    {
                                        response.errors ? <p className='text-sm text-red-500'>{response.errors.jobtitle}</p> : ''
                                    }
                                </div>
                                <div className='col-span-1 md:col-span-2 text-center'>
                                    <p className='text-lg md:text-xl'>Rating<span className='text-red-600'>*</span></p>
                                    <div className='flex gap-2 justify-center items-center'>
                                        {arrayRating.map((star, i) => (
                                            <IoMdStar key={i} size={30} className={`hover:scale-110 transition cursor-pointer ${rating >= star.rating ? 'text-yellow-600' : 'text-gray-400'}`} onClick={() => setRating(star.rating)}/>
                                        ))}
                                    </div>
                                    {
                                        response.errors ? <p className='text-sm text-red-500'>{response.errors.rating}</p> : ''
                                    }
                                </div>
                            </div>
                            <div className='col-span-full'>
                                <div className="bg-white">
                                    <div className="relative bg-inherit">
                                        <textarea type="text" id="message" name="message" placeholder="Message" onChange={(e) => setMessage(e.target.value)} value={message} className="w-full border-0 p-4 peer text-gray-900 rounded-md placeholder-transparent ring-1 ring-gray-300 focus:ring-primary focus:ring-2 focus:outline-none"></textarea>
                                        <label htmlFor="message" className="absolute cursor-text left-4 -top-3 text-sm text-primary bg-inherit peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-sm transition-all">Message<span className='text-red-600'>*</span></label>
                                    </div>
                                    {
                                        response.errors ? <p className='text-sm text-red-500'>{response.errors.message}</p> : ''
                                    }
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={() => setModalAddOpen(false)}>
                        Close
                        </Button>
                        <Button color="primary" radius='sm' variant='flat' isLoading={handleStoreLoading ? true : false} className='text-primary p-5' onClick={() => handleStoreData()}>
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )
}

function formatFileSize(sizeInBytes) {
    const kilobyte = 1024;
    const megabyte = kilobyte * 1024;

    if (sizeInBytes < kilobyte) {
        return sizeInBytes + ' B';
    } else if (sizeInBytes < megabyte) {
        return (sizeInBytes / kilobyte).toFixed(2) + ' KB';
    } else {
        return (sizeInBytes / megabyte).toFixed(2) + ' MB';
    }
}

function maxText(text, count){
    return text.slice(0, count) + (text.length > count ? "..." : "");
}