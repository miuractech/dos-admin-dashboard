import React, { useEffect, useState } from "react";
import { Image } from "react-konva";



 const UrlImage = ({props,src})=> {
  const [image, setImage] = useState(null)
  const {object, isSelected, onSelect, onChange,shapeRef,trRef,index} = props
  useEffect(() => {
    if(src){
      var Timage = new window.Image();
      Timage.src = src;
      setImage(Timage)
    }
  
    return () => {
      setImage(null)
    }
  }, [src])
   React.useEffect(() => {
        if (isSelected) {
          // we need to attach transformer manually
          // @ts-ignore
          trRef.current?.nodes([shapeRef.current]);
          // @ts-ignore
          trRef.current?.getLayer().batchDraw();
        }
      }, [isSelected, shapeRef, trRef]);
   
      return (
        <Image
        draggable
        key={object.id}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...object}
        image={image}
          onDragEnd={(e) => {
            onChange({
              ...object,
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
          onTransformEnd={() => {
            const node = shapeRef.current;
              
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
            const width = node.width()
            const height = node.height()
            const rotation = Math.round(node.rotation());
            console.log(scaleX,scaleY,width,height);
            node.scaleX(1);
            node.scaleY(1);
            onChange({
              ...object,
              x: Math.round(node.x()),
              y: Math.round(node.y()),
              width: Math.round(width * scaleX ),
              height: Math.round(height * scaleY ),
              rotation,
            });
          }}
        />
      );
  }


  export default UrlImage