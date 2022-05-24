import { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Image, Rect, Transformer, Circle } from 'react-konva';

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
  radius: 50,
  x: 10,
  y: 10,
  fill: '#00000033',
  id: 'cir1',
}

export const DesignArea = ({url}:{url:string}) => {

  const [rectangale, setRectangale] = useState<any>(initialRectangle)
  const [circle, setCircle] = useState(initialcircle)



  const [isSelected, setIsSelected] = useState(false)
  const [circleSelected, setCircleSelected] = useState(false)


  //rectangle
  const rectRef = useRef<any>()
  const transRef = useRef<any>()

  //circle
  const circleRef = useRef<any>()
  // const transcircle = useRef<any>()

  useEffect(() => {
    if (circleSelected) {
      transRef.current.nodes([circleRef.current]);
      transRef.current.getLayer().batchDraw();
    }

  }, [circleSelected])

  useEffect(() => {
    if (isSelected) {
      transRef.current.nodes([rectRef.current]);
      transRef.current.getLayer().batchDraw();
    }

  }, [isSelected])

  const deselect = (e: any) => {
    setIsSelected(false)
    setCircleSelected(false)
  }

  console.log(url);


  return ( 
    <div>
      <Stage width={500} height={500} >
         <Layer>
           <UrlImage src={url} props={props} id="img" clicked={deselect} />
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
                // node.radius(1)
                setCircle({
                 ...circle,
                 x: node.x(),
                 y: node.y(),
                 radius: node.radius()
               })
             }}
             ref={circleRef}
             onClick={() => setCircleSelected(true)}
           />
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
           {isSelected &&
             <Transformer ref={transRef} />
           }
          </Layer>
      </Stage >
    </div>
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




