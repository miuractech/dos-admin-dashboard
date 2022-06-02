import React, { useEffect, useState } from 'react'
// import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import { useAppSelector } from '../../../app/hooks'
import { selectDesigner } from '../store/designerSlice'
import { Stage, Layer, Rect, Circle, Group, Transformer } from 'react-konva';
import { updateObject } from '../store/objects';
import GetShape from './getShape';
import ClickAwayListener from '@mui/base/ClickAwayListener'
import TopBar from './styleBar';
import StyleBar from './styleBar';
import { useDispatch } from 'react-redux';
import { KonvaEventObject } from 'konva/lib/Node';
const [x, y, width, height, cornerRadius] = [135, 75, 190, 350, 0];

type Props = {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    loading: boolean,
    selectedId: string | null,
    setSelectedId: React.Dispatch<React.SetStateAction<string | null>>
}

export default function Center({ selectedId, setSelectedId }: Props) {
    const product = useAppSelector(state => state.designer)
    const objects = useAppSelector(state => state.objects)
    const dispatch = useDispatch()
    const shapeRef = React.useRef(objects?.currentObjects.map(() => React.createRef()));
    const trRef = React.useRef();

    // console.log('objects',objects?.currentObjects);

    const deselect = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            setSelectedId(null);
        }
    }

    return (
        <div>
            <div
                className=''
            >
                {/* <button onClick={onAddCircle}>Add circle</button>
                    <button onClick={onAddRectangle}>Add Rectangle</button> */}
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
                        <img src={product?.bgImage} style={{ width: 450 }} alt="" />
                    </div>
                    <div
                        className='relative'
                        style={{ zIndex: 10 }}
                    >
                        <Stage
                            width={450}
                            height={450}
                            className="center-canvas"
                            onMouseDown={deselect}
                            onTouchStart={deselect}
                        >
                            <Layer>
                                <Group
                                    clipFunc={(ctx: any) => {
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
                                    }}
                                >

                                    <Rect
                                        x={x}
                                        y={y}
                                        stroke={'#222'}
                                        width={width}
                                        height={height}
                                        dash={[9, 9]}
                                    />
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
                                </Group>
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
        </div>
    )
}


