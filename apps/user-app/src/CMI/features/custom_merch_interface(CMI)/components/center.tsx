import React, { useEffect, useRef, useState } from 'react'
// import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
// import { useAppSelector } from '../../../app/hooks'
import { orderedSides, selectDesigner, setPreviewImagesToRedux, setSelectedSide, sideNameType } from '../store/designerSlice'
import { Stage, Layer, Rect, Circle, Group, Transformer, Arc } from 'react-konva';
import { changeSide, endExport, startExport, updateObject } from '../store/objects';
import GetShape from './getShape';
import ClickAwayListener from '@mui/base/ClickAwayListener'
import TopBar from './styleBar';
import StyleBar from './styleBar';
import { useDispatch, useSelector } from 'react-redux';
import { KonvaEventObject } from 'konva/lib/Node';
import { circleSide, rectSide, RootObject, sideType } from './selectProduct';
import { Button, Drawer, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import SimpleModal from '../ui-components/modal';
import { RootState } from '../../../../store/store';
import { useNavigate } from 'react-router-dom';
import ProgressiveImg from './imageLoad';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../../configs/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { storage } from '../../../../configs/firebaseConfig';
import { addCartProducts, addLocalCart } from '../../../../store/cartSlice';
import { setBackDrop, setError, setNotification } from '../../../../store/alertslice';

type Props = {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    loading: boolean,
    selectedId: string | null,
    setSelectedId: React.Dispatch<React.SetStateAction<string | null>>
    previews: boolean,
    setPreviews: React.Dispatch<React.SetStateAction<boolean>>
}


export default function Center({ selectedId, setSelectedId, previews, setPreviews }: Props) {
    const { sides, selectedSide, image, selectedSideName, sideNames, designPreviewImages, product, selectedColor, selectedSize } = useSelector((state: RootState) => state.designer)
    const { user } = useSelector((state: RootState) => state.User)

    const [previewImages, setPreviewImages] = useState<{ sideName: string, url: string }[]>([])
    const objects = useSelector((state: RootState) => state.objects)
    const dispatch = useDispatch()
    const stageRef = useRef<any>(null)
    const frontRef = useRef<any>()
    const backRef = useRef<any>()
    const leftRef = useRef<any>()
    const rightRef = useRef<any>()
    const topRef = useRef<any>()
    const bottomRef = useRef<any>()
    const allRefs = [frontRef, backRef, rightRef, topRef, bottomRef, leftRef]
    const navigate = useNavigate()
    const theme = useTheme()
    const media = useMediaQuery(theme.breakpoints.up('md'))
    const [modal, setModal] = useState(false)
    const [productName, setProductName] = useState<string|null>(null)

    const dataURLtoBlob = (dataURL: string, img: any, productId: string) => {
        return new Promise((resolve, reject) => {
            return fetch(dataURL)
                .then(res => res.blob())
                .then(blob => {
                    const storageRef = ref(storage, `userProducts/${productId}/${uuidv4()}`);
                    uploadBytes(storageRef, blob).then((snapshot) => {
                        getDownloadURL(snapshot.ref).then((downloadURL) => {
                            resolve({ sideName: img.sideName, url: downloadURL })
                        })
                            .catch(err => reject(err))
                    })
                })
                .catch(err => reject(err))
        })
    }

    return (
        <div>
            <div
            >
                <div className="flex justify-center m-auto" style={{ boxShadow: `0px 4px 9px rgba(244, 209, 209, 0.25)`, width: 'min-content' }}>
                    {sideNames.map((side) => {
                        return (
                            <div key={side}>
                                <Button
                                    sx={{ py: media ? 1.5 : 1, px: media ? 3 : 0, width: media ? 100 : 80, }}
                                    onClick={() => {
                                        if (selectedSideName) {
                                            dispatch(setSelectedSide(side))
                                            dispatch(changeSide({ current: selectedSideName, to: side }))
                                            setSelectedId(null)
                                        }
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
                    {sideNames.map((sideName: sideNameType, index: number) => {
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
                                selectedSide={sides ? sides[sideName] : null}
                                image={sides ? sides[sideName].imgUrl : ''}
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
                                    if (sides) {
                                        const allImg = sideNames.map((s, index) => ({ sideName: s, backgroundUrl: sides[s].imgUrl, photoUrl: allRefs[index]?.current?.toDataURL() }))
                                        for (const pre in allImg) {
                                            getPreviewImg(allImg[pre], setPreviewImages)
                                            if (parseInt(pre) === allImg.length - 1) {
                                                setTimeout(() => {
                                                    setModal(true)
                                                }, 100);
                                            }
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
            <SimpleModal open={modal} onClose={()=>setModal(true)}>
                <div className='mb-5'>
                    <Typography variant='h5' align='center' className='m-10'>Product Name</Typography>
                    <div className='flex items-baseline justify-center space-x-10'>
                        <Typography className=''>Name :</Typography>
                        <TextField color='secondary' size='small' onChange={(event) => setProductName(event.target.value)}/>
                    </div>
                    <div className='text-center space-x-10 m-10'>
                        <Button color='secondary'  variant='outlined'>cancel</Button>
                        <Button  color='secondary' variant='contained' onClick={async() => {
                          try {
                              if (!user) return
                              if (!product) return
                              dispatch(setBackDrop(true))
                              const productId = uuidv4()
                              const sideImages: { sideName: string, url: string }[] = []
                              for (const img of previewImages) {
                                  const targetImage = await dataURLtoBlob(img.url, img, productId) as { sideName: string, url: string }
                                  sideImages.push(targetImage)
                              }
                              const side = ["Front", "Back", "Left", "Right", "Top", "Bottom"]
                              const result = sideImages.map((a: any, index: number) => ({ sideName: side[index], url: sideImages.find(img => img.sideName === side[index])?.url }))
                              const data = {
                                  status: "active",
                                  sideImages: result,
                                  subCategoryId: product.subcategoryId,
                                  comparePrice: product.basePrice + 200,
                                  sku: product.sku,
                                  productName: productName,
                                  productId: productId,
                                  price: product.basePrice + 100,
                                  color: selectedColor,
                                  familyId: product.familyId,
                                  categoryId: product.categoryId,
                                  sizeAvailable: product.size,
                                  userId: user.uid
                              }
                              await setDoc(doc(db, "users", user.uid, "products", productId), data);
                              dispatch(addCartProducts({
                                  product: data,
                                  count: 1,
                                  id: productId,
                                  size: selectedSize
                              }))
                              dispatch(addLocalCart({
                                  productName: productName,
                                  productID: productId,
                                  size: selectedSize,
                                  count: 1,
                                  userId: user.uid,
                                  id: productId,
                                  img: sideImages.find(img => img.sideName === "Front"),
                                  price: product.basePrice + 100
                              }))
                              dispatch(setBackDrop(false))
                              dispatch(setNotification("Product added to cart successfully"))
                              setModal(false)
                              setPreviews(false)
                              navigate("/cart")
                          } catch (error) {
                              dispatch(setError("Somthing went wrong please try adding again"))
                              dispatch(setBackDrop(false))
                          }
                        }}> Add to cart </Button>
                    </div>
                </div>
            </SimpleModal>
        </div >
    )
}

type CMIstageProps = {
    previewMode: boolean,
    stageRef: any,
    selectedId: string | null,
    setSelectedId: React.Dispatch<React.SetStateAction<string | null>>,
    selectedSide: circleSide | rectSide | null,
    image: string | null,
    currentObjects: RootObject[]
}


const StageComponent = ({ previewMode, stageRef, selectedId, setSelectedId, selectedSide, image, currentObjects }: CMIstageProps) => {
    const shapeRef = React.useRef(currentObjects.map(() => React.createRef()));
    const trRef = React.useRef();
    const { x, y, width, height, radius, type } = selectedSide as any
    const dispatch = useDispatch()
    const deselect = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
        const clickedOnEmpty = e.target === e.target.getStage() || e.target.attrs.id === 'outerLayer'
        if (clickedOnEmpty) {
            setSelectedId(null);
        }
    }

    return (
        <div
            className='relative'
        >
            <div
                className='absolute z-0'
                style={{
                    left: 'calc(50% - 250px)',
                }}
            >
                {image && <ProgressiveImg src={image} alt="img" style={{ width: 500 }} skeletonDimension={{ width: 500, height: 500 }} />}
            </div>
            <div
                className='relative z-10'
                style={{ height: 520 }}
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
                                            key={stroke}
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
                            {/* {previewMode && <UrlImage
                                src={'https://firebasestorage.googleapis.com/v0/b/dropoutstore-8979d.appspot.com/o/uploads%2FAvBRhCfNeahixsRnKNYABVVl9jE2%2Fimages%2FLogo.png?alt=media&token=34387507-2b38-4c97-a034-f1d08f3fecec'}
                                props={{
                                    object: {
                                        type: 'img',
                                        // image:url,
                                        width: 20,
                                        height: 20,
                                        x: width ? x + 25 : x,
                                        y: height ? y + height - 25 : y + radius - 25,
                                        id: 'logo',
                                        keepRatio: true
                                    },
                                }}
                            />} */}
                        </Group>
                        {(selectedId) && !previewMode && (
                            <Transformer
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                ref={trRef}
                                enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
                                rotationSnaps={[90, 45, 180, 135, 0, -45, -90, -135]}
                                boundBoxFunc={(oldBox, newBox) => {
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
}