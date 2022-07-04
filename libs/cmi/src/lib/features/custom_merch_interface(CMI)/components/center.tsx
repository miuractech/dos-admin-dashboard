import React, { useEffect, useRef, useState } from 'react'
// import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
// import { useAppSelector } from '../../../app/hooks'
import { orderedSides, selectDesigner, setPreviewImagesToRedux, setSelectedSide, sideType } from '../store/designerSlice'
import { Stage, Layer, Rect, Circle, Group, Transformer, Arc } from 'react-konva';
import { changeSide, endExport, startExport, updateObject } from '../store/objects';
import GetShape from './getShape';
import ClickAwayListener from '@mui/base/ClickAwayListener'
import TopBar from './styleBar';
import StyleBar from './styleBar';
import { useDispatch, useSelector } from 'react-redux';
import { KonvaEventObject } from 'konva/lib/Node';
import { RootObject } from './selectProduct';
import { Button, Typography } from '@mui/material';
import SimpleModal from '../ui-components/modal';
import UrlImage from '../objects/urlImage';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { RootState } from 'apps/reseller/src/redux-tool/store';
import AreYouSure from './AreYouSure';
import { useNavigate } from 'react-router-dom';

type Props = {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    loading: boolean,
    selectedId: string | null,
    setSelectedId: React.Dispatch<React.SetStateAction<string | null>>
    previews: boolean,
    setPreviews: React.Dispatch<React.SetStateAction<boolean>>
}


export default function Center({ selectedId, setSelectedId, previews, setPreviews }: Props) {
    // const selectedProduct: RootObject = useSelector((state:RootState) => state.designer.product)
    const { sides, selectedSide, image, selectedSideName, sideNames, designPreviewImages } = useSelector((state: RootState) => state.designer)
    const [previewImages, setPreviewImages] = useState<string[]>([])
    // const products: RootObject[] = useAppSelector(state => state.designer.products)
    const [createProductConsent, setCreateProductConsent] = useState(false)
    const objects = useSelector((state: RootState) => state.objects)
    const dispatch = useDispatch()
    const stageRef = useRef<any>(null)
    const frontRef = useRef()
    const backRef = useRef()
    const leftRef = useRef()
    const rightRef = useRef()
    const topRef = useRef()
    const bottomRef = useRef()
    const allRefs = [frontRef, backRef, rightRef, topRef, bottomRef, leftRef]
    const navigate = useNavigate()
    return (
        <div>
            <div
            // className=''
            >
                <div className="flex justify-center margin2" style={{ width: 400, margin: 'auto', boxShadow: `0px 4px 9px rgba(244, 209, 209, 0.25)`, marginBottom: 25 }}>
                    {sideNames.map((side: string) => {
                        // if (selectedSide?.imgUrl) {
                        return (
                            <div key={side}>
                                <Button
                                    sx={{ py: 1.5, px: 3, width: 100, }}
                                    onClick={() => {
                                        dispatch(setSelectedSide(side))
                                        dispatch(changeSide({ current: selectedSideName, to: side }))
                                        setSelectedId(null)
                                    }}
                                    variant={selectedSideName === side ? "contained" : "text"}
                                    disableElevation color={selectedSideName === side ? 'primary' : 'inherit'}
                                >
                                    {side}
                                </Button>
                            </div>
                        )
                    }
                    )}
                </div>
                <StageComponent
                    previewMode={false}
                    stageRef={stageRef}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    selectedSide={selectedSide}
                    image={image}
                    currentObjects={objects.currentObjects}
                />
            </div>

            <SimpleModal
                open={previews}
                onClose={() => setPreviews(false)}
            >
                <div>
                    <Typography variant='h5' align='center' >
                        PREVIEW
                    </Typography>
                    {sideNames.map((sideName: string, index: number) => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        const current = (sideName === selectedSideName) ? objects.currentObjects : objects.sides[sideName]
                        return <div
                            key={sideName}
                        >
                            <StageComponent
                                previewMode={true}
                                stageRef={allRefs[index]}
                                selectedId={selectedId}
                                setSelectedId={setSelectedId}
                                selectedSide={sides[sideName]}
                                image={sides[sideName].imgUrl}
                                currentObjects={current}
                            />
                        </div>
                    })}
                    <div
                        className='flex'
                        style={{ width: 320, margin: 'auto', justifyContent: 'space-between' }}
                    >
                        <Button
                            variant='outlined'
                            color='secondary'
                            sx={{ width: 150 }}
                        >
                            Close
                        </Button>
                        <Button
                            variant='contained'
                            color='secondary'
                            sx={{ width: 150 }}
                            onClick={() => {
                                setPreviewImages([])
                                setTimeout(() => {
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    //@ts-ignore
                                    const allImg = sideNames.map((s, index) => ({ sideName: s, backgroundUrl: sides[s].imgUrl, photoUrl: allRefs[index]?.current?.toDataURL() }))

                                    for (const pre in allImg) {
                                        getPreviewImg(allImg[pre], setPreviewImages)
                                        if (parseInt(pre) === allImg.length - 1) {
                                            setTimeout(() => {
                                                setCreateProductConsent(true)
                                            }, 100);
                                        }
                                    }
                                }, 100);
                            }}
                        >
                            Add Product
                        </Button>
                    </div>
                </div>
            </SimpleModal>
            <AreYouSure open={createProductConsent} onClose={() => {
                setCreateProductConsent(false)
            }} discard={() => {

                dispatch(setPreviewImagesToRedux(previewImages))
                setCreateProductConsent(false)
                navigate("/designproduct/addproducts")
            }} text={'add this product?'} />
        </div >
    )
}

type CMIstageProps = {
    previewMode: boolean,
    stageRef: any,
    selectedId: string | null,
    setSelectedId: React.Dispatch<React.SetStateAction<string | null>>,
    selectedSide: sideType,
    image: string | null,
    // objects:any,
    currentObjects: RootObject[]
}


const StageComponent = ({ previewMode, stageRef, selectedId, setSelectedId, selectedSide, image, currentObjects }: CMIstageProps) => {
    // const  = useAppSelector(state => state.objects)
    const shapeRef = React.useRef(currentObjects.map(() => React.createRef()));
    const trRef = React.useRef();
    const { x, y, width, height, radius, type } = selectedSide
    const dispatch = useDispatch()
    const deselect = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
        const clickedOnEmpty = e.target === e.target.getStage() || e.target.attrs.id === 'outerLayer'
        if (clickedOnEmpty) {
            setSelectedId(null);
        }
    }
    // console.log(currentObjects);

    return (
        <div
            className='relative'
        >
            <div
                className='absolute'
                style={{
                    zIndex: 0,
                    left: 'calc(50% - 225px)',
                }}
            >
                {image && <img src={image} style={{ width: 500 }} alt="img" />}
            </div>
            <div
                className='relative'
                style={{ zIndex: 10, height: 520 }}
            >

                <Stage
                    width={500}
                    height={500}
                    className="center-canvas"
                    onMouseDown={deselect}
                    onTouchStart={deselect}
                    ref={stageRef}
                >
                    <Layer>

                        <Group
                            clipFunc={(ctx: any) => {
                                if (type === "rect" && width && height) {
                                    ctx.beginPath()
                                    ctx.moveTo(x, y)
                                    ctx.lineTo(x + width, y)
                                    ctx.quadraticCurveTo(x + width, y, x + width, y)
                                    ctx.lineTo(x + width, y + height)
                                    ctx.quadraticCurveTo(x + width, y + height, x + width, y + height)
                                    ctx.lineTo(x, y + height)
                                    ctx.quadraticCurveTo(x, y + height, x, y + height)
                                    ctx.lineTo(x, y)
                                    ctx.quadraticCurveTo(x, y, x, y)
                                    ctx.closePath()
                                } else if (type === "circle") {
                                    ctx.beginPath()
                                    ctx.arc(x, y, radius, 0, Math.PI * 2)
                                    ctx.closePath()
                                }

                            }}
                        >
                            {!previewMode && selectedId && ['#000', '#fff'].map((stroke, index) => {
                                if (type === "rect" && width && height) {
                                    return (
                                        <Rect
                                            x={x - index}
                                            y={y - index}
                                            id={'outerLayer'}
                                            strokeWidth={2}
                                            stroke={stroke}
                                            width={width + (2 * index)}
                                            height={height + (2 * index)}
                                            dash={[10, 5]}
                                        />
                                    )
                                } else {
                                    return (
                                        <Circle
                                            x={x}
                                            y={y}
                                            id={'outerLayer'}
                                            stroke={stroke}
                                            strokeWidth={2}
                                            radius={radius + index}
                                            dash={[10, 5]}
                                        />
                                    )
                                }
                            })
                            }

                            {currentObjects.map((object: any, index: number) => (
                                <React.Fragment key={object.id}>
                                    <GetShape
                                        object={{ ...object, draggable: !previewMode }}
                                        index={index}
                                        shapeRef={shapeRef.current[index]}
                                        trRef={trRef}
                                        isSelected={object.id === selectedId}
                                        onSelect={() => {
                                            if (!previewMode) setSelectedId(object.id);
                                        }}
                                        onChange={(newAttrs: any) => {
                                            // eslint-disable-next-line no-unsafe-optional-chaining
                                            const target = [...currentObjects]
                                            const index = target.findIndex((obj: any) => obj.id === object.id);

                                            target[index] = newAttrs;
                                            // console.log(target);

                                            dispatch(updateObject(target));
                                        }}
                                    />
                                </React.Fragment>

                            ))}
                            {previewMode && <UrlImage
                                src={'https://firebasestorage.googleapis.com/v0/b/dropoutstore-8979d.appspot.com/o/uploads%2FAvBRhCfNeahixsRnKNYABVVl9jE2%2Fimages%2FLogo.png?alt=media&token=34387507-2b38-4c97-a034-f1d08f3fecec'}
                                props={{
                                    object: {
                                        type: 'img',
                                        // image:url,
                                        width: 20,
                                        height: 20,
                                        x: selectedSide.width ? selectedSide.x + 25 : selectedSide.x,
                                        y: selectedSide.height ? selectedSide.y + selectedSide.height - 25 : selectedSide.y + selectedSide.radius - 25,
                                        id: 'logo',
                                        keepRatio: true
                                    },
                                }}
                            />}
                        </Group>
                        {(selectedId) && !previewMode && (
                            <Transformer
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                ref={trRef}
                                enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
                                rotationSnaps={[90, 45, 180, 135, 0, -45, -90, -135]}
                                boundBoxFunc={(oldBox, newBox) => {
                                    // limit resize
                                    if (newBox.width < 5 || newBox.height < 5) {
                                        return oldBox;
                                    }
                                    return newBox;
                                }}
                            />
                        )}
                    </Layer>
                </Stage>
            </div>
        </div>
    )
}


const getPreviewImg = async ({ backgroundUrl, photoUrl, sideName }: { backgroundUrl: string, photoUrl: string, sideName: string }, setPreviewImages: any) => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d");
    canvas.height = 500
    canvas.width = 500
    const background = new Image();
    background.height = 500
    background.width = 500
    const photo = new Image();
    photo.height = 500
    photo.width = 500

    background.crossOrigin = 'Anonymous'
    photo.crossOrigin = 'Anonymous'
    function counter() {
        count--;
        if (count === 0) drawImages();
    }

    /// is called when all images are loaded
    function drawImages() {

        const images = [background, photo]
        if (ctx) {
            for (let i = 0; i < images.length; i++) {
                ctx.drawImage(images[i], 0, 0, 500, 500);
            }
        }
        setPreviewImages((t: any) => [...t, { url: canvas.toDataURL(), sideName }])
    }
    let count = 2;

    background.onload = photo.onload = counter;
    background.src = backgroundUrl;
    photo.src = photoUrl

    /// common loader keeping track if loads



}