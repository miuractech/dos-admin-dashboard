import { CircleOutlined, CropSquare } from '@mui/icons-material'
import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { Circle, Image, Layer, Rect, Stage, Transformer } from 'react-konva'
import ApplicationButton from '../../../global/buttons'

const fill = '#ffffff33'
const stroke = { strokeWidth: 1, stroke: "black", dash: [10, 10] }
const objects = [
  { x: 100, y: 100, type: 'rect', fill, width: 300, height: 300, icons: CropSquare, ...stroke },
  { x: 250, y: 250, type: 'circle', fill, radius: 100, icons: CircleOutlined, ...stroke },
] as const

export default function NewDesignArea({ setpreviewScreen, setPreviewURL, url, close, imageFile, setValue, color, side }: { setPreviewURL: any, imageFile: File, color: string, side: string, url: string, close: () => void, setValue: any, setpreviewScreen: any }) {
  const [selectedObject, setSelectedObject] = useState<any>(objects[0])
  const [selected, setSelected] = useState(false)
  const objRef = useRef()
  const transRef = useRef<any>()
  const stageRef = useRef<any>()

  return (
    <div>
      <div>
        <Typography variant='h5' gutterBottom align='center' >
          Print Area
        </Typography>
      </div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& > :not(style) + :not(style)': { mt: 2 },
        }}
      >
        <ToggleButtonGroup value={selectedObject.type} onChange={(_, v) => { setSelectedObject(objects.filter(obj => obj.type === v)[0]) }} exclusive={true}>
          {objects.map(obj => (
            <ToggleButton value={obj.type} key={obj.type} size='medium'>
              <obj.icons />
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
      <Stage width={500} height={500} ref={stageRef}>
        <Layer>
          <UrlImage src={url} props={bgImageProps} id="img" clicked={() => setSelected(false)} />
          <GetKonvaObject selectedObject={selectedObject} setSelectedObject={setSelectedObject} objRef={objRef} selected={selected} setSelected={setSelected} transRef={transRef} />
          {selected &&
            <Transformer ref={transRef} />
          }
        </Layer>

      </Stage>
      <div style={{ display: "flex", marginTop: "30px", justifyContent: "space-evenly", paddingLeft: "60px" }}>
        <div style={{ height: 40, width: 100 }}>
          <ApplicationButton
            variant="cancel"
            clickAction={close}
            dimension={{ height: '100%', width: '100%' }}
          >
            Cancel
          </ApplicationButton>
        </div>
        <div style={{ height: 40, width: 100 }}>
          <ApplicationButton
            clickAction={() => {
              setSelected(false)
              setTimeout(() => {
                setValue(`sideImages.${color}.${side}`, {
                  ...selectedObject, imageFile: imageFile, previewScreen: stageRef.current.toDataURL()
                })
                setpreviewScreen(stageRef.current.toDataURL())
                setPreviewURL(null)
              }, 500);
            }}
            variant="default"
            dimension={{ height: '100%', width: '100%' }}
          >
            Save
          </ApplicationButton>
        </div>
      </div>
    </div>
  )
}


const bgImageProps = {
  object: {
    x: 0,
    y: 0,
    id: "bgImage",
    width: 500,
    height: 500
  }
}



const GetKonvaObject = ({ selectedObject, setSelectedObject, objRef, selected, setSelected, transRef }: any) => {
  useEffect(() => {
    if (selected) {
      transRef.current.nodes([objRef.current]);
      transRef.current.getLayer().batchDraw();
    }
  }, [selected, selectedObject])

  const dragEnd = (e: any) => {
    setSelectedObject({
      ...selectedObject,
      x: e.target.x(),
      y: e.target.y(),
    })
  }

  switch (selectedObject.type) {
    case 'rect':
      return <Rect
        onClick={() => setSelected(true)}
        ref={objRef}
        draggable
        {...selectedObject}
        id="rect"
        onDragEnd={dragEnd}
        onTransformEnd={(e) => {
          const node = objRef.current
          const scaleX = node.scaleX()
          const scaleY = node.scaleY()
          node.scaleX(1)
          node.scaleY(1)
          setSelectedObject({
            ...selectedObject,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
            rotation: node.rotation(),
          })
        }}
      />;
    case 'circle':
      return <Circle
        onClick={() => setSelected(true)}
        ref={objRef}
        draggable
        {...selectedObject}
        id="circle"
        onDragEnd={dragEnd}
        onTransformEnd={(e) => {
          const node = objRef.current
          const scaleX = node.scaleX()
          node.scaleX(1)
          node.scaleY(1)
          setSelectedObject({
            ...selectedObject,
            x: node.x(),
            y: node.y(),
            radius: scaleX * node.radius()
          })
        }}
      />;
    default:
      return <Rect
        onClick={() => setSelected(true)}
        ref={objRef}
        draggable
        {...selectedObject}
        id="rectdef"
        onDragEnd={dragEnd}
        onTransformEnd={(e) => {
          const node = objRef.current
          const scaleX = node.scaleX()
          const scaleY = node.scaleY()
          node.scaleX(1)
          node.scaleY(1)
          setSelectedObject({
            ...selectedObject,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
            rotation: node.rotation(),
          })
        }}
      />;

  }
}

const UrlImage = ({ props, src, clicked }: any) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const { object, index } = props
  useEffect(() => {
    if (src) {
      const Timage = new window.Image();
      Timage.src = src;
      setImage(Timage)
    }

    return () => {
      setImage(null)
    }
  }, [src])

  return (
    <Image
      key={object.id}
      {...object}
      image={image}
      id={index}
      onClick={(e: any) => clicked(e)}
    />
  );
}
