import React, { useState } from 'react'

export const useLeftState = (): {
    productModal: boolean,
    setproductModal: React.Dispatch<React.SetStateAction<boolean>>,
    artModal: boolean,
    setArtModal: React.Dispatch<React.SetStateAction<boolean>>,
    imageModal: boolean,
    setImageModal: React.Dispatch<React.SetStateAction<boolean>>,
    jersyModal: boolean,
    setJersyModal: React.Dispatch<React.SetStateAction<boolean>>,
    qrModal: boolean,
    setQrModal: React.Dispatch<React.SetStateAction<boolean>>,
    savedDesignModal: boolean,
    setSavedDesignModal: React.Dispatch<React.SetStateAction<boolean>>,
} => {
    const [productModal, setproductModal] = useState<boolean>(false)
    const [artModal, setArtModal] = useState<boolean>(false)
    const [imageModal, setImageModal] = useState<boolean>(false)
    const [jersyModal, setJersyModal] = useState<boolean>(false)
    const [qrModal, setQrModal] = useState<boolean>(false)
    const [savedDesignModal, setSavedDesignModal] = useState<boolean>(false)
    return {
        ...{
            productModal,
            setproductModal,
            imageModal,
            setImageModal,
            jersyModal,
            setJersyModal,
            qrModal,
            setQrModal,
            savedDesignModal,
            setSavedDesignModal,
            artModal,
            setArtModal
        }
    }
}