import { Stage, Layer, Rect, Transformer } from 'react-konva';
import React from 'react';
import { KonvaEventObject } from 'konva/lib/Node';


type Props = {
  shapeProps:any , 
  isSelected?:boolean, 
  onSelect?:React.MouseEventHandler<HTMLButtonElement>, 
  onChange?: any,
  shapeRef:any,
  trRef:any
}

const RectangleObject =  ({ shapeProps, isSelected, onSelect, onChange,shapeRef,trRef }: Props) => {
  

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      // @ts-ignore
      trRef.current?.nodes([shapeRef.current]);
      // @ts-ignore
      trRef.current?.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e:KonvaEventObject<Event>) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          console.log(e);
          
          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      
    </React.Fragment>
  );
};

export default RectangleObject;