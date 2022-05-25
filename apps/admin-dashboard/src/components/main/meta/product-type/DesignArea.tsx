import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Image, Rect, Transformer, Circle } from 'react-konva';
import ApplicationButton from '../../../global/buttons';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { Box } from '@mui/system';

const props = {
  object: {
    x: 0,
    y: 0,
    id: "bgImage",
    width: 500,
    height: 500
  }
}

const initialRectangle =
{
  x: 10,
  y: 10,
  width: 100,
  height: 100,
  fill: '#00000033',
  id: 'rect1',
  rotation: 0
}



const initialcircle =
{
  radius: 162,
  x: 110,
  y: 73,
  fill: '#00000033',
  id: 'cir1',
}

export const DesignArea = ({ url, close, save }: { url: string, close: () => void, save: (data: any) => void }) => {

  const [rectangale, setRectangale] = useState<any>(initialRectangle)
  const [circle, setCircle] = useState(initialcircle)


  const [selectedSide, setSelectedSide] = useState('left');
  const [isSelected, setIsSelected] = useState(false)
  const [circleSelected, setCircleSelected] = useState(false)


  //rectangle
  const rectRef = useRef<any>()
  const transRef = useRef<any>()

  //circle
  const circleRef = useRef<any>()
  const transcircle = useRef<any>()

  useEffect(() => {
    if (circleSelected) {
      transcircle.current.nodes([circleRef.current]);
      transcircle.current.getLayer().batchDraw();
    }

  }, [circleSelected])

  useEffect(() => {
    if (isSelected) {
      transRef.current.nodes([rectRef.current]);
      transRef.current.getLayer().batchDraw();
    }

  }, [isSelected])

  useEffect(() => {
    if (selectedSide === "right") {
      setIsSelected(false)
    } else if (selectedSide === "left") {
      setCircleSelected(false)
    }

  }, [selectedSide])


  const deselect = (e: any) => {
    setIsSelected(false)
    setCircleSelected(false)
  }

  const children = [
    <ToggleButton value="left" key="left">
      <CropSquareIcon fontSize='large' />
    </ToggleButton>,
    <ToggleButton value="right" key="center">
      <CircleOutlinedIcon fontSize='large' />
    </ToggleButton>
  ];



  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setSelectedSide(newAlignment);
  };

  const control = {
    value: selectedSide,
    onChange: handleChange,
    exclusive: true,
  };

  return (
    <div>
      <div>
        <Typography variant='h4' align='center' gutterBottom>Print Area</Typography>
        <div style={{ padding: "10px 0 30px" }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              // TODO Replace with Stack
              '& > :not(style) + :not(style)': { mt: 2 },
            }}
          >
            <ToggleButtonGroup {...control}>
              {children}
            </ToggleButtonGroup>
          </Box>
        </div>
      </div>
      <Stage width={500} height={500} >
        <Layer>
          <UrlImage src={url} props={props} id="img" clicked={deselect} />
          {selectedSide === "right" ? (
            <Circle
              {...circle}
              draggable
              onDragEnd={(e) => {
                setCircle({
                  ...circle,
                  x: e.target.x(),
                  y: e.target.y(),
                })
              }}
              onTransformEnd={(e) => {
                const node = circleRef.current
                const scaleX = node.scaleX()
                node.scaleX(1)
                node.scaleY(1)
                setCircle({
                  ...circle,
                  x: e.target.x(),
                  y: e.target.y(),
                  radius: node.radius() * scaleX
                })
              }}
              ref={circleRef}
              onClick={() => setCircleSelected(true)}
            />
          ) : (
            <Rect
              onClick={() => setIsSelected(true)}
              ref={rectRef}
              draggable
              {...rectangale}
              id="rect"
              onDragEnd={(e) => {
                setRectangale({
                  ...rectangale,
                  x: e.target.x(),
                  y: e.target.y(),
                })
              }}
              onTransformEnd={(e) => {
                const node = rectRef.current
                const scaleX = node.scaleX()
                const scaleY = node.scaleY()
                node.scaleX(1)
                node.scaleY(1)
                setRectangale({
                  ...rectangale,
                  x: node.x(),
                  y: node.y(),
                  width: Math.max(5, node.width() * scaleX),
                  height: Math.max(5, node.height() * scaleY),
                  rotation: node.rotation()
                })
              }}
            />
          )}
          {isSelected &&
            <Transformer ref={transRef} />
          }
          {circleSelected &&
            <Transformer ref={transcircle} />
          }
        </Layer>
      </Stage >
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
              selectedSide === "right" ? save(circle) : save(rectangale)
            }}
            variant="default"
            dimension={{ height: '100%', width: '100%' }}
          >
            Save
          </ApplicationButton>
        </div>
      </div>
    </div >
  )

};

export const UrlImage = ({ props, src, clicked }: any) => {
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




