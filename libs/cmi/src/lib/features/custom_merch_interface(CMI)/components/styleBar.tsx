import { SketchPicker } from 'react-color'
import React, { useEffect, useState } from 'react'
import { circleStyle, topBarStyle } from '../setting/topStyles'
import { Rect, RectConfig } from 'konva/lib/shapes/Rect'
import { Grid, MenuItem, Popover, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { useAppSelector } from '../store/store'
import { useDispatch } from 'react-redux'
import { updateObject } from '../store/objects'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import CustomFonts from './customFonts'
import { Add, FormatAlignCenter, FormatAlignLeft, FormatAlignRight, Remove } from '@mui/icons-material'
type Props = {
  selectedId: string | null,
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>
}

type usechangesProps = {
  selectedId: string | null
  selectedObject: any
  objects: any
}
const useChanges = ({ selectedId, selectedObject, objects, }: usechangesProps) => {
  const dispatch = useDispatch()
  const handelChange = (value: any, property: any) => {
    var target = [...objects?.currentObjects]
    const index = target.findIndex((obj: any) => obj.id === selectedId);
    target[index] = { ...selectedObject, [property]: value };

    dispatch(updateObject(target));
  }
  return { handelChange }
}

export default function StyleBar({ selectedId, setSelectedId }: Props) {
  const [selectedComponent, setSelectedComponent] = useState<{ name: string | null, target: any } | null>(null)
  const objects = useAppSelector(state => state.objects)
  const selectedObject = objects?.currentObjects.filter((obj: any) => obj.id === selectedId)[0]
  const dispatch = useDispatch()

  const { handelChange } = useChanges({
    selectedId,
    selectedObject,
    objects
  })

  return (
    <Accordion variant='outlined' expanded={Boolean(selectedId)} onChange={() => setSelectedId(null)} style={{ marginBottom: -3 }} >
      <AccordionSummary
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography sx={{ flexFlow: 1 }}>
          Editor
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        style={{ maxHeight: 320, overflowY: 'scroll' }}
      >

        <div className="white-bg r5" style={{ ...topBarStyle, }}   >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <div className="flex margin1 grey-bg padding1 r5" style={{ alignSelf: 'flex-start' }}>
                <textarea
                  value={selectedObject?.text}
                  name="text"
                  id="text-id"
                  className='stylebar-input'
                  onChange={(event) => handelChange(event.target.value, "text")}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="flex margin1 grey-bg padding1 r5" style={{ alignSelf: 'flex-start' }}>
                <div>
                  Font:
                  &ensp;
                </div>
                <CustomFonts fontFamily={selectedObject?.fontFamily} />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="flex margin1 grey-bg padding1 r5" style={{ alignSelf: 'flex-start' }}>
                <div>
                  Font Size:
                  &ensp;
                </div>
                <TextField
                  onChange={(event) => handelChange(event.target.value, "fontSize")}
                  size="small"
                  type="number"
                  value={selectedObject?.fontSize}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="flex margin1 grey-bg padding1 r5" style={{ alignSelf: 'flex-start' }}>
                <div >
                  Align Text:
                  &ensp;
                </div>
                <ToggleButtonGroup
                  value={selectedObject?.align}
                  exclusive
                  onChange={(event, newAlignment) => handelChange(newAlignment, "align")}
                  aria-label="text alignment"
                >
                  <ToggleButton value="left" aria-label="left aligned">
                    <FormatAlignLeft />
                  </ToggleButton>
                  <ToggleButton value="center" aria-label="centered">
                    <FormatAlignCenter />
                  </ToggleButton>
                  <ToggleButton value="right" aria-label="right aligned">
                    <FormatAlignRight />
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            </Grid>
            <Grid item xs={12} xl={6}>
              <div className="flex margin1 grey-bg padding1 r5" style={{ alignSelf: 'flex-start' }}>
                <div
                >
                  X:
                  &ensp;
                </div>
                <div
                >
                  <input
                    value={selectedObject?.x}
                    type="number"
                    name="X"
                    id="x"
                    className='stylebar-input'
                    onChange={(event) => handelChange(Number(event.target.value), "x")}
                  />
                </div>
              </div>
            </Grid>
            <Grid item xs={12} xl={6}>
              <div className="flex margin1 grey-bg padding1" style={{ alignSelf: 'flex-start' }}>
                <div
                  style={{ alignSelf: 'center' }}
                >
                  Y:
                  &ensp;
                </div>
                <div
                >
                  <input
                    type="number"
                    name="Y"
                    id="y"
                    className='stylebar-input'
                    value={selectedObject?.y}
                    onChange={(event) => handelChange(Number(event.target.value), "y")}
                  />
                </div>
              </div>
            </Grid>
            <Grid item xs={12} xl={6}>
              <div className="flex margin1 grey-bg padding1 r5" style={{ alignSelf: 'flex-start' }}>
                <div
                  style={{ alignSelf: 'center' }}
                >
                  Width:
                  &ensp;
                </div>
                <div
                >
                  <input
                    type="number"
                    name="height"
                    id="x"
                    className='stylebar-input'
                    value={selectedObject?.width}
                    onChange={(event) => handelChange(Number(event.target.value), "width")}
                  />
                </div>
              </div>
            </Grid>
            <Grid item xs={12} xl={6}>
              <div className="flex margin1 grey-bg padding1 r5" style={{ alignSelf: 'flex-start' }}>
                <div
                  style={{ alignSelf: 'center' }}
                >
                  Height:
                  &ensp;
                </div>
                <div
                >
                  <input
                    type="number"
                    name="height"
                    id="y"
                    className='stylebar-input'
                    value={selectedObject?.height}
                    onChange={(event) => handelChange(Number(event.target.value), "height")}
                  />
                </div>
              </div>
            </Grid>
            <Grid item xs={12} >
              <div className="flex margin1 grey-bg padding1 r5" style={{ alignSelf: 'flex-start' }}>
                <div
                  style={{ alignSelf: 'center' }}
                >
                  Rotation:
                  &ensp;
                </div>
                <div
                >
                  <input
                    type="number"
                    name="Rot"
                    id="R"
                    className='stylebar-input'
                    value={selectedObject?.rotation}
                    onChange={(event) => handelChange(Number(event.target.value), "rotation")}
                  />
                </div>
              </div>
            </Grid>
            <Grid item xs={12} lg={6}>
              <div className="flex margin1 grey-bg padding1 r5" style={{ alignSelf: 'flex-start', justifyContent: 'space-between' }}>
                <div
                  style={{ alignSelf: 'center' }}
                >
                  color:
                  &ensp;
                </div>
                <div
                  style={{ ...circleStyle, backgroundColor: selectedObject?.color }}
                  className='pointer-cursor'
                  onClick={e => setSelectedComponent({ name: 'color', target: e.currentTarget })}
                />
              </div>
            </Grid>
            <Grid item xs={12} lg={6}>
              <div className="flex margin1 grey-bg padding1 r5" style={{ alignSelf: 'flex-start', justifyContent: 'space-between' }}>
                <div
                  style={{ alignSelf: 'center' }}
                >
                  Fill:
                  &ensp;
                </div>
                <div
                  style={{ ...circleStyle, backgroundColor: selectedObject?.fill }}
                  className='pointer-cursor'
                  onClick={e => setSelectedComponent({ name: 'fill', target: e.currentTarget })}
                />
              </div>
            </Grid>
            <Grid item xs={12} >
              <div className="flex margin1 grey-bg padding1 r5" style={{ alignSelf: 'flex-start' }}>
                <div
                  style={{ alignSelf: 'center' }}
                >
                  Stroke Width:
                  &ensp;
                </div>
                <div
                >
                  <input
                    type="number"
                    name="height"
                    id="x"
                    className='stylebar-input'
                    value={selectedObject?.strokeWidth}
                    onChange={(event) => handelChange(Number(event.target.value), "strokeWidth")}
                  />
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="flex margin1 grey-bg padding1 r5" style={{ alignSelf: 'flex-start', justifyContent: 'space-between' }}>
                <div
                  style={{ alignSelf: 'center' }}
                >
                  Stroke color:
                  &ensp;
                </div>
                <div
                  style={{ ...circleStyle, backgroundColor: selectedObject?.stroke }}
                  className='pointer-cursor'
                  onClick={e => setSelectedComponent({ name: 'stroke', target: e.currentTarget })}
                />
              </div>
            </Grid>

            <Grid item xs={12} >
              <div className="flex margin1 grey-bg padding1" style={{ alignSelf: 'flex-start' }}>
                <div
                  style={{ alignSelf: 'center' }}
                >
                  Corner:
                  &ensp;
                </div>
                <div
                >
                  <input
                    type="number"
                    name="height"
                    id="x"
                    className='stylebar-input'
                    value={selectedObject?.cornerRadius}
                    onChange={(e) => {
                      var target = [...objects?.currentObjects]
                      const index = target.findIndex((obj: any) => obj.id === selectedId);
                      const cr = Number(e.target.value)
                      if (cr >= 0) {
                        target[index] = { ...selectedObject, cornerRadius: cr };
                        dispatch(updateObject(target));
                      }
                    }}
                  />
                </div>
              </div>
            </Grid>
          </Grid>

          <Popover
            id={'color-popover'}
            open={Boolean(selectedComponent)}
            anchorEl={selectedComponent?.target}
            onClose={() => setSelectedComponent(null)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            {selectedComponent?.name && <SketchPicker
              color={selectedObject[selectedComponent?.name] ? selectedObject[selectedComponent?.name] : '#fff'}
              onChange={(color) => {
                // console.log(color.hex);

                var target = [...objects?.currentObjects]
                const index = target.findIndex((obj: any) => obj.id === selectedId);
                var temp = { ...selectedObject }
                if (selectedComponent?.name) {
                  temp[selectedComponent?.name] = color.hex
                  target[index] = temp;
                  dispatch(updateObject(target));
                }
              }}
            />
            }
          </Popover>
        </div>
      </AccordionDetails>
    </Accordion >

  )
}


// text?: string;
// fontFamily?: string;
// fontSize?: number;
// fontStyle?: string;
// fontVariant?: string;
// textDecoration?: string;
// align?: string;
// verticalAlign?: string;
// padding?: number;
// lineHeight?: number;
// letterSpacing?: number;
// wrap?: string;
// ellipsis?: boolean;
