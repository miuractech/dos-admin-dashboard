import {
    EmojiEmotions,
    FileUpload,
    Folder,
    Gesture,
    Info,
    Interests,
    QrCode,
    SportsBasketball,
    TextFields
} from "@mui/icons-material";
import SelectProduct from "./selectProduct";
import { useLeftState } from "../states/states";
import ImageUpload from "../ui-components/imageUpload";
import { useEffect } from "react";
import { updateObject } from "../store/objects";
import { useAppSelector } from "../../../app/hooks";
import { useDispatch, useSelector } from "react-redux";
import useId from "@mui/material/utils/useId";
import { v4 as uuidv4 } from 'uuid';
import ArtInsert from "../ui-components/art";
import Qr from "../ui-components/qr";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { RootState } from "apps/reseller/src/redux-tool/store";
import { Button } from "@mui/material";

type leftProps = {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    selectedId: string | null,
    setSelectedId: React.Dispatch<React.SetStateAction<string | null>>
}
export const LeftPanelControls = ({ setLoading, setSelectedId }: leftProps) => {
    const {
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
        setArtModal,
        artModal
    } = useLeftState()
    const objects = useAppSelector(state => state.objects)
    const dispatch = useDispatch()
    const { selectedSide } = useSelector((state:RootState)=>state.designer)

    const leftPanel = [
        {
            name: 'product',
            icon: <EmojiEmotions />,
            text: 'Choose Product',
            onClick: () => setproductModal(true)
        },
        {
            name: 'image',
            icon: <FileUpload />,
            text: 'Upload Image',
            onClick: () => setImageModal(true)
        },
        {
            name: 'text',
            icon: <TextFields />,
            text: 'Add Text',
            onClick: () => {
                setLoading(true)
                // eslint-disable-next-line no-unsafe-optional-chaining
                dispatch(updateObject([...objects?.currentObjects, {
                    x: selectedSide.x+10,
                    y: selectedSide.x+25,
                    text: 'Simple Text',
                    fontFamily: 'Calibri',
                    fill: '#00ff00',
                    fontSize: 25,
                    align: 'center',
                    stroke:'#fff',
                    rotation:0,
                    strokeWidth:0,
                    keepRatio:true,
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    id: uuidv4(),
                    type: 'text'
                }]))
                setTimeout(() => {
                    setLoading(false)
                }, 50);;

            }

        },
        {
            name: 'art',
            icon: <Gesture />,
            text: 'Add Art',
            onClick: () => setArtModal(true)
        },
        // {
        //     name: 'shape',
        //     icon: <Interests />,
        //     text: 'Add Shape',
        //     onClick: () => console.log('shape')

        // },
        // {
        //     name: 'Jersy',
        //     icon: <SportsBasketball />,
        //     text: 'Jersy',
        //     onClick: () => setJersyModal(true)
        // },
        {
            name: 'QR',
            icon: <QrCode />,
            text: 'QR Code',
            onClick: () => setQrModal(true)
        },
        {
            name: 'saved',
            icon: <Folder />,
            text: 'Saved Design',
            onClick: () => setSavedDesignModal(true)
        },
    ]

    return (
        <div
            className="flex vertical-center justify-center"
            style={{ maxWidth: 300, margin: 'auto', flexDirection:'column' }}
            >
                <div
                className="flex full-width margin1"
                style={{justifyContent:'space-around',}}
                >
                    <Button
                    disableElevation
                    sx={{fontWeight:300}}
                    color='secondary'
                    variant="contained"
                    >
                       <Info fontSize="small" /> &nbsp; Product Info
                    </Button>
                    <Button
                    // sx={{fontWeight:300}}
                    color='inherit'
                    disableElevation
                    variant="contained"
                    >
                       size chart
                    </Button>
                </div>
            <div
                className="grey-bg full-width"
                >

                {leftPanel.map(({ text, icon, onClick }) => (
                    <div
                        key={text}
                        onClick={onClick}
                        className="white-bg margin1 flex vertical-center pointer-cursor paddingp5"
                        style={{ height: 40, borderRadius: 6, paddingLeft: 30 }}
                    >
                        <div
                            className="marginp5 "
                        >
                            {icon}
                        </div>
                        <div>
                            {text}
                        </div>
                    </div>
                ))}
            </div>

            <SelectProduct open={productModal} onClose={() => setproductModal(false)} setSelectedId={setSelectedId} />
            <ImageUpload open={imageModal} onClose={() => setImageModal(false)} setLoading={setLoading} loading={false} />
            <ArtInsert open={artModal} onClose={() => setArtModal(false)} setLoading={setLoading} loading={false} />
            <Qr open={qrModal} onClose={() => setQrModal(false)} setLoading={setLoading} loading={false} />
        </div>
    )
}