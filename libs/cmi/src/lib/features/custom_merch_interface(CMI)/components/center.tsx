import React, { useEffect, useState } from 'react'
// import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import { useAppSelector } from '../../../app/hooks'
import { selectDesigner } from '../store/designerSlice'
import { Stage, Layer, Rect, Circle, Group, Transformer, Arc } from 'react-konva';
import { updateObject } from '../store/objects';
import GetShape from './getShape';
import ClickAwayListener from '@mui/base/ClickAwayListener'
import TopBar from './styleBar';
import StyleBar from './styleBar';
import { useDispatch } from 'react-redux';
import { KonvaEventObject } from 'konva/lib/Node';
import { RootObject } from './selectProduct';
import { Button } from '@mui/material';

type Props = {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    loading: boolean,
    selectedId: string | null,
    setSelectedId: React.Dispatch<React.SetStateAction<string | null>>
}

type colorProps = {
    colorName: string
    colorCode: string
}
const cornerRadius = 0;
export default function Center({ selectedId, setSelectedId }: Props) {
    const selectedProduct: RootObject = useAppSelector(state => state.designer.product)
    const selectedColor: colorProps = useAppSelector(state => state.selectSlice.selectedColor)
    // const products: RootObject[] = useAppSelector(state => state.designer.products)
    const objects = useAppSelector(state => state.objects)
    const dispatch = useDispatch()
    const shapeRef = React.useRef(objects?.currentObjects.map(() => React.createRef()));
    const trRef = React.useRef();
    const [sides, setSides] = useState<any>(null)
    const [image, setImage] = useState<null | string>(null)
    const [selectedSide, setSelectedSide] = useState<string | null>(null)
    const [selectedObj, setselectedObj] = useState<any>(null)

    const { x, y, width, height, radius } = selectedObj ?? {}

    // console.log('objects', objects?.currentObjects);

    const deselect = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            setSelectedId(null);
        }
    }

    useEffect(() => {
        if (selectedProduct) {
            setImage(selectedProduct.displayImage)
            setSides(selectedProduct.sideImages)
        }

    }, [selectedProduct])


    useEffect(() => {
        if (!selectedSide && selectedColor && sides) {
            // setSelectedSide(Object.keys(sides[selectedColor.colorName])[0])
            setSelectedSide(["Front", "Back", "Left", "Right", "Top", "Bottom"].filter(side => sides[selectedColor.colorName][side]?.imgUrl)[0])
        }
    }, [selectedColor, selectedSide, sides])

    useEffect(() => {
        if (selectedSide && selectedColor) {
            const img = sides[selectedColor.colorName][selectedSide].imgUrl
            const obj = sides[selectedColor.colorName][selectedSide]
            setselectedObj(obj)
            setImage(img)
        }

    }, [selectedColor, selectedSide, sides])

    console.log(selectedObj);

    return (
        <div>
            <div
                className=''
            >
                {/* <button onClick={onAddCircle}>Add circle</button>
                    <button onClick={onAddRectangle}>Add Rectangle</button> */}
                <div className="flex justify-center margin2" style={{ gap: "10px" }}>
                    {selectedColor && sides && ["Front", "Back", "Left", "Right", "Top", "Bottom"].map((side: string) => {
                        if (sides[selectedColor.colorName][side]?.imgUrl) {
                            return (
                                <div style={{ width: "90px" }}>
                                    <Button
                                        sx={{ mx: 1 }}
                                        onClick={() => setSelectedSide(side)}
                                        variant={selectedSide === side ? "contained" : "text"}
                                        disableElevation color={selectedSide === side ? 'primary' : 'inherit'}
                                    >{side}</Button>
                                </div>
                            )
                        } else return null
                    }
                    )}
                </div>
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
                        style={{ zIndex: 10 }}
                    >
                        <Stage
                            width={500}
                            height={500}
                            className="center-canvas"
                            onMouseDown={deselect}
                            onTouchStart={deselect}
                        >
                            <Layer>
                                {selectedObj &&
                                    <Group
                                        clipFunc={(ctx: any) => {
                                            if (selectedObj.type === "rect") {
                                                ctx.beginPath()
                                                ctx.moveTo(x + cornerRadius, y)
                                                ctx.lineTo(x + width - cornerRadius, y)
                                                ctx.quadraticCurveTo(x + width, y, x + width, y + cornerRadius)
                                                ctx.lineTo(x + width, y + height - cornerRadius)
                                                ctx.quadraticCurveTo(x + width, y + height, x + width - cornerRadius, y + height)
                                                ctx.lineTo(x + cornerRadius, y + height)
                                                ctx.quadraticCurveTo(x, y + height, x, y + height - cornerRadius)
                                                ctx.lineTo(x, y + cornerRadius)
                                                ctx.quadraticCurveTo(x, y, x + cornerRadius, y)
                                                ctx.closePath()
                                            } else if (selectedObj.type === "circle") {
                                                ctx.beginPath()
                                                ctx.arc(x, y, 100, 0, Math.PI * 2)
                                                ctx.closePath()
                                            }

                                        }}
                                    >
                                        {selectedObj.type === "rect" ? (
                                            <Rect
                                                x={x}
                                                y={y}
                                                stroke={'#222'}
                                                width={width}
                                                height={height}
                                                dash={[9, 9]}
                                            />
                                        ) : (
                                            <Circle
                                                x={x}
                                                y={y}
                                                stroke={'#222'}
                                                radius={radius}
                                                dash={[9, 9]}
                                            />
                                        )}
                                        {objects?.currentObjects.map((object: any, index: number) => (
                                            <React.Fragment key={object.id}>
                                                <GetShape
                                                    object={object}
                                                    index={index}
                                                    shapeRef={shapeRef.current[index]}
                                                    trRef={trRef}
                                                    isSelected={object.id === selectedId}
                                                    onSelect={() => {
                                                        setSelectedId(object.id);
                                                    }}
                                                    onChange={(newAttrs: any) => {
                                                        // eslint-disable-next-line no-unsafe-optional-chaining
                                                        const target = [...objects?.currentObjects]
                                                        const index = target.findIndex((obj: any) => obj.id === object.id);
                                                        console.log(newAttrs);

                                                        target[index] = newAttrs;
                                                        // console.log(target);

                                                        dispatch(updateObject(target));
                                                    }}
                                                />
                                            </React.Fragment>

                                        ))}
                                    </Group>}
                                {(selectedId) && (
                                    <Transformer
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-ignore
                                        ref={trRef}
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
            </div>
        </div >
    )
}


