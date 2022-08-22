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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      trRef.current?.nodes([shapeRef.current]);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
          {...object}
          onDragEnd={(e) => {
            onChange({
              ...object,
              x: Math.trunc(e.target.x()),
              y: Math.trunc(e.target.y()),
            });
          }}
          onTransformEnd={(e: KonvaEventObject<Event>) => {
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
            const width = node.width()
            const height = node.height()
            const rotation = Math.trunc(node.rotation());
            node.scaleX(1);
            node.scaleY(1);
            onChange({
              ...object,
              x: Math.trunc(node.x()),
              y: Math.trunc(node.y()),
              width: Math.trunc(width * scaleX),
              height: Math.trunc(height * scaleY),
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
          {...object}
          onDragEnd={(e) => {
            onChange({
              ...object,
              x: Math.trunc(e.target.x()),
              y: Math.trunc(e.target.y()),
            });
          }
          }
          onTransformEnd={(e: KonvaEventObject<Event>) => {
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
            node.scaleX(1);
            node.scaleY(1);

            onChange({
              ...object,
              x: Math.trunc(node.x()),
              y: Math.trunc(node.y()),
              width: Math.trunc(node.width() * scaleX),
              height: Math.trunc(node.height() * scaleY),
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
        return <>default export from render component</>;
    }
  }
  return (
    renderComponent()
  )
}