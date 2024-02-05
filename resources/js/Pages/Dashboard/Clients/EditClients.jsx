import { Input, Select, SelectItem, Table as NextTable, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Avatar, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Image } from '@nextui-org/react';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { IoMdClose, IoMdStar } from 'react-icons/io';
import { MdOutlineEdit, MdOutlineDeleteOutline } from "react-icons/md";
import { useQuery } from 'react-query';

export default function EditTestimonies({ dataId, dataName, dataJobtitle, dataPhoto, dataRating, dataMessage, setResponse, response}) {
    const [ modalEditOpen, setModalEditOpen ] = useState(false);

    const [ photo, setPhoto ] = useState('');
    const photoRef = useRef(null);
    const [ name, setName ] = useState('');
    const [ jobtitle, setJobtitle ] = useState('');
    const [ rating, setRating ] = useState('');
    const [ message, setMessage ] = useState('');

    useEffect(() => {
        setName(dataName);
        setPhoto(dataPhoto);
        setJobtitle(dataJobtitle);
        setRating(dataRating);
        setMessage(dataMessage);
    }, [dataName, dataPhoto, dataJobtitle, dataRating, dataMessage])
    

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

    const [ handleStoreLoading, setHandleStoreLoading ] = useState(false)
    const handleUpdateData = async () => {
        try {
            setHandleStoreLoading(true);

            const storeData = {
                name: name,
                jobtitle: jobtitle,
                photo: Array.isArray(photo) ? photo[0].file[0] : photo,
                message: message,
                rating: rating,
            };

            const response = await axios.post(
                `/api/testimonies/${dataId}/update`,
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
        response.message && setModalEditOpen(false)
    }, response.message)

    return(
        <>
            <Button onClick={() => {
                setModalEditOpen(true)
            }} isIconOnly radius='sm' size='sm' className='bg-yellow-500 text-white'><MdOutlineEdit size={20}/></Button>

            <Modal scrollBehavior='inside' backdrop='opaque' size='4xl' isOpen={modalEditOpen} isDismissable={false} hideCloseButton>
                <ModalContent className='p-5'>
                    <Button size='sm' onClick={() => setModalEditOpen(false)} isIconOnly radius='full' className='absolute top-1 right-1 bg-transparent text-foreground-500 hover:bg-default-100 active:bg-default-200 tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 select-none'>
                        <svg className='size-4' aria-hidden="true" fill="none" focusable="false" height="1em" role="presentation" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="1em"><path d="M18 6L6 18M6 6l12 12"></path></svg>
                    </Button>
                    <ModalHeader className="flex flex-col gap-1"><p className='text-xl font-normal'>Edit <span className='text-yellow-500'>Testimony</span></p></ModalHeader>
                    <ModalBody className='sidebar'>
                        <div className='grid grid-cols-4 lg:grid-cols-5 gap-5'>
                            <div className='col-span-4 lg:col-span-1 flex flex-col items-center justify-center relative'>
                                <div className="size-32 rounded-full bg-gray-100 flex justify-center items-center cursor-pointer" onClick={() => photoRef.current.click()}>
                                    {photo ? 
                                        <Image radius='full' src={photo[0].url || photo} className='size-32 object-center object-cover'/>
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
                                        {photo[0].name &&
                                            <p className='mt-3'>{maxText(photo[0].name, 40)} | {formatFileSize(photo[0].size)}</p>
                                        }
                                        
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
                                        <input type="text" id="name" name="name" placeholder="Name" onChange={(e) => setName(e.target.value)} defaultValue={name} className="w-full border-0 p-4 peer text-gray-900 rounded-md placeholder-transparent ring-1 ring-gray-300 focus:ring-primary focus:ring-2 focus:outline-none" />
                                        <label htmlFor="name" className="absolute cursor-text left-4 -top-3 text-sm text-primary bg-inherit peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-sm transition-all">Name<span className='text-red-600'>*</span></label>
                                    </div>
                                    {
                                        response.errors ? <p className='text-sm text-red-500'>{response.errors.name}</p> : ''
                                    }
                                </div>
                                <div className="bg-white col-span-1">
                                    <div className="relative bg-inherit">
                                        <input type="text" id="jobtitle" name="jobtitle" placeholder="jobtitle" onChange={(e) => setJobtitle(e.target.value)} defaultValue={jobtitle} className="w-full border-0 p-4 peer text-gray-900 rounded-md placeholder-transparent ring-1 ring-gray-300 focus:ring-primary focus:ring-2 focus:outline-none" />
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
                                        <textarea type="text" id="message" name="message" placeholder="Message" onChange={(e) => setMessage(e.target.value)} defaultValue={dataMessage} className="w-full border-0 p-4 peer text-gray-900 rounded-md placeholder-transparent ring-1 ring-gray-300 focus:ring-primary focus:ring-2 focus:outline-none"></textarea>
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
                        <Button color="danger" variant="light" onPress={() => setModalEditOpen(false)}>
                        Close
                        </Button>
                        <Button color="primary" radius='sm' variant='flat' isLoading={handleStoreLoading ? true : false} className='text-primary p-5' onClick={() => handleUpdateData()}>
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
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