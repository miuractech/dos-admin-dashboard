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
import { useEffect, useState } from "react";
import { updateObject } from "../store/objects";
import { useDispatch, useSelector } from "react-redux";
import useId from "@mui/material/utils/useId";
import { v4 as uuidv4 } from 'uuid';
import ArtInsert from "../ui-components/art";
import Qr from "../ui-components/qr";
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { RootState } from '../../../../../redux-tool/store';
import { Button, Divider, Typography, useMediaQuery, useTheme } from "@mui/material";
import SimpleModal from "../ui-components/modal";

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
    const objects = useSelector((state:RootState) => state.objects)
    const dispatch = useDispatch()
    const { selectedSide, product } = useSelector((state:RootState)=>state.designer)
    const [descriptionOpen, setDescriptionOpen] = useState(false)
    const [sizeChartOpen, setSizeChartOpen] = useState(false)
    const theme = useTheme()
    const media = useMediaQuery(theme.breakpoints.up('md'))
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
                if(objects.currentObjects){
                    const centerX = selectedSide.type ==='rect'?(selectedSide.x+selectedSide.width/2):selectedSide.x
                    const centerY = selectedSide.type ==='rect'?(selectedSide.y+selectedSide.height/2):selectedSide.y
                    setLoading(true)
                    dispatch(updateObject([...objects.currentObjects, {
                        x: centerX-50,
                        y: centerY-10,
                        text: 'Simple Text',
                        fontFamily: 'Calibri',
                        fill: '#00ff00',
                        fontSize: 25,
                        align: 'center',
                        stroke:'#fff',
                        rotation:0,
                        strokeWidth:0,
                        keepRatio:true,
                        id: uuidv4(),
                        type: 'text'
                    }]))
                    setTimeout(() => {
                        setLoading(false)
                    }, 50);;
                }

            }

        },
        {
            name: 'art',
            icon: <Gesture />,
            text: 'Add Art',
            onClick: () => setArtModal(true)
        },
        {
            name: 'shape',
            icon: <Interests />,
            text: 'Add Shape',
            onClick: () => console.log('shape')

        },
        {
            name: 'Jersy',
            icon: <SportsBasketball />,
            text: 'Jersy',
            onClick: () => setJersyModal(true)
        },
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
            style={{ maxWidth:media? 300:'100%', margin: 'auto', flexDirection:'column' }}
            >
                <div
                className="flex full-width margin1"
                style={{justifyContent:'space-around',}}
                >
                    <Button
                    disableElevation
                    sx={{fontWeight:300}}
                    onClick={()=>setDescriptionOpen(true)}
                    color='secondary'
                    variant="contained"
                    >
                       <Info fontSize="small" /> &nbsp; Product Info
                    </Button>
                    <Button
                    // sx={{fontWeight:300}}
                    onClick={()=>setSizeChartOpen(true)}
                    color='inherit'
                    disableElevation
                    variant="contained"
                    >
                       size chart
                    </Button>
                </div>
            <div
                className={media?"grey-bg full-width":"flex full-width"}
                style={{justifyContent:'space-evenly'}}
                >

                {media?
                leftPanel.map(({ text, icon, onClick }) => (
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
                ))
                :
                leftPanel.map(({ text, icon, onClick }) => (
                    <div
                        key={text}
                        onClick={onClick}
                    >
                        <div
                            className="marginp1 "
                        >
                            {icon}
                        </div>
                    </div>
                ))
            }
            </div>

            <SelectProduct open={productModal} onClose={() => setproductModal(false)} setSelectedId={setSelectedId} />
            <ImageUpload open={imageModal} onClose={() => setImageModal(false)} setLoading={setLoading} loading={false} />
            <ArtInsert open={artModal} onClose={() => setArtModal(false)} setLoading={setLoading} loading={false} />
            <Qr open={qrModal} onClose={() => setQrModal(false)} setLoading={setLoading} loading={false} />
            <SimpleModal 
            open={descriptionOpen} 
            onClose={()=>setDescriptionOpen(false)} 
            >
                <div className="padding6 text-left" >
                    <Typography 
                    align="center"
                    variant='h5'
                    fontWeight={600}
                    >
                        Product Info
                    </Typography>
                    <br />
                    <Divider/>
                    { product?.description && <div dangerouslySetInnerHTML={{ __html: product?.description }} />}
                </div>
            </SimpleModal>
            <SimpleModal 
            open={sizeChartOpen} 
            onClose={()=>setSizeChartOpen(false)} 
            >
                <div className="padding6 text-left" >
                    <Typography 
                    align="center"
                    variant='h5'
                    fontWeight={600}
                    >
                        Size Chart
                    </Typography>
                    <br />
                    <Divider/>
                    { product?.sizeChart && 
                    <img src={product?.sizeChart} style={{maxWidth:600, maxHeight:600, width:'100%', height:'100%', display:'block', margin:'auto'}} alt="" />
                    }
                </div>
            </SimpleModal>
        </div>
    )
}