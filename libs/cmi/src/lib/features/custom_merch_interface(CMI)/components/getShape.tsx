import { KonvaEventObject } from 'konva/lib/Node';
import React from 'react'
import { Image, Rect, Text } from 'react-konva';
import URLImage from '../objects/urlImage';

type Props = {
  object: any,
  isSelected?: boolean,
  onSelect?: React.MouseEventHandler<HTMLButtonElement>,
  onChange?: any,
  shapeRef: any,
  trRef: any,
  index: number,
}

export default function GetShape({ object, isSelected, onSelect, onChange, shapeRef, trRef, index }: Props) {
  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      // @ts-ignore
      trRef.current?.nodes([shapeRef.current]);
      // @ts-ignore
      trRef.current?.getLayer().batchDraw();
    }
  }, [isSelected, shapeRef, trRef]);
  const renderComponent = () => {
    switch (object.type) {
      case 'rect':
        return <Rect
          key={object.id}
          onClick={onSelect}
          onTap={onSelect}
          ref={shapeRef}
          draggable
          {...object}
          onDragEnd={(e) => {
            onChange({
              ...object,
              x: Math.round(e.target.x()),
              y: Math.round(e.target.y()),
            });
          }}
          onTransformEnd={(e: KonvaEventObject<Event>) => {
            const node = shapeRef.current;

            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
            const width = node.width()
            const height = node.height()
            const rotation = Math.round(node.rotation());
            console.log(scaleX, scaleY, width, height);
            node.scaleX(1);
            node.scaleY(1);
            onChange({
              ...object,
              x: Math.round(node.x()),
              y: Math.round(node.y()),
              width: Math.round(width * scaleX),
              height: Math.round(height * scaleY),
              rotation,
            });
          }}
        />;
      case 'text':
        return <Text
          key={object.id}
          onClick={onSelect}
          onTap={onSelect}
          ref={shapeRef}
          draggable
          {...object}
          onDragEnd={(e) => {
            onChange({
              ...object,
              x: e.target.x(),
              y: e.target.y(),
            });
          }
          }
          onTransformEnd={(e: KonvaEventObject<Event>) => {
            // transformer is changing scale of the node
            // and NOT its width or height
            // but in the store we have only width and height
            // to match the data better we will reset scale on transform end
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
            console.log(Math.max(400, node.width() * scaleX));
            node.scaleX(1);
            node.scaleY(1);

            onChange({
              ...object,
              x: node.x(),
              y: node.y(),
              width: node.width() * scaleX,
              height: node.height() * scaleY,
              // fontSize: node.fontSize() * Math.min(scaleX, scaleY)

            });
          }}
        />;
      case 'img':
        return <URLImage
          props={{ object, onSelect, shapeRef, trRef, index, isSelected, onChange }}
          src={object.image}

        />;
      default:
        return <>foo</>;
    }
  }
  return (
    renderComponent()
  )
}