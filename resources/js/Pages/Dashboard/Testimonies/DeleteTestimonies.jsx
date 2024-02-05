import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Image } from "@nextui-org/react";
import React, { useEffect, useState } from 'react';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { FaTriangleExclamation } from "react-icons/fa6";
import { useQuery } from "react-query";
import axios from "axios";

export default function DeleteTestimonies({ dataId, dataName, setResponse, response }) {
    const [ modalDeleteOpen, setModalDeleteOpen ] = useState(false);

    const [ handleStoreLoading, setHandleStoreLoading ] = useState(false)
    const handleDeleteData = async () => {
        try {
            setHandleStoreLoading(true);

            const response = await axios.delete(
                `/api/testimonies/${dataId}/delete`,
                {
                    headers: {
                        'X-API-Key': 'v4CEEVgIH4YD2FNMSn7dC7GWH4jdEQNM',
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
        response.message && setModalDeleteOpen(false)
    }, response.message)
    return(
        <>
            <Button onClick={() => setModalDeleteOpen(true)} isIconOnly radius='sm' size='sm' className='bg-red-500 text-white'><MdOutlineDeleteOutline size={20}/></Button>

            <Modal scrollBehavior='inside' backdrop='opaque' size='sm' isOpen={modalDeleteOpen} isDismissable={false} hideCloseButton>
                <ModalContent className='p-5'>
                    <Button size='sm' onClick={() => setModalDeleteOpen(false)} isIconOnly radius='full' className='absolute top-1 right-1 bg-transparent text-foreground-500 hover:bg-default-100 active:bg-default-200 tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 select-none'>
                        <svg className='size-4' aria-hidden="true" fill="none" focusable="false" height="1em" role="presentation" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="1em"><path d="M18 6L6 18M6 6l12 12"></path></svg>
                    </Button>
                    <ModalHeader className="flex flex-col gap-1">
                        <div className="flex p-5 mx-auto justify-center items-center rounded-full bg-red-500 text-red-500 bg-opacity-10">
                            <FaTriangleExclamation size={35}/>
                        </div>
                    </ModalHeader>
                    <ModalBody className='sidebar'>
                        <div className="flex gap-3 justify-center flex-col items-center">
                            
                            <p className="text-xl font-bold">Delete Data</p>
                            <p className="text-center">You're going to delete Data with ID <span className="text-red-500 text-lg font-bold">{dataId}</span> and name <span className="text-red-500 text-lg font-bold">{dataName}</span> </p>
                        </div>
                    </ModalBody>
                    <ModalFooter className="w-full">
                        <Button color="default" variant="light" onPress={() => setModalDeleteOpen(false)} className="w-full">
                            No, keep it
                        </Button>
                        <Button color="danger" radius='sm' variant='flat' className='p-5 w-full' isLoading={handleStoreLoading ? true : false} onClick={() => handleDeleteData()}>
                            Yes, Delete!
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}