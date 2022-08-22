import { SketchPicker } from 'react-color'
import React, { useEffect, useState } from 'react'
import { circleStyle, topBarStyle } from '../setting/topStyles'
import { Rect, RectConfig } from 'konva/lib/shapes/Rect'
import { Card, Grid, IconButton, MenuItem, Paper, Popover, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
// import { useAppSelector } from '../store/store'
import { useDispatch, useSelector } from 'react-redux'
import { resetObjects, updateObject } from '../store/objects'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import CustomFonts from './customFonts'
import { Add, ChevronLeft, ChevronRight, FormatAlignCenter, FormatAlignLeft, FormatAlignRight, KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowRight, KeyboardArrowUp, Remove } from '@mui/icons-material'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { RootState } from '../../../../../../../apps/reseller/src/redux-tool/store';
import { Box } from '@mui/system'
import { setSelectedColor } from '../store/designerSlice';
import AreYouSure from './AreYouSure'
import { Color } from './selectProduct'
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
    // eslint-disable-next-line no-unsafe-optional-chaining
    const target = [...objects?.currentObjects]
    const index = target.findIndex((obj: any) => obj.id === selectedId);
    target[index] = { ...selectedObject, [property]: value };

    dispatch(updateObject(target));
  }
  return { handelChange }
}

type colorProps = {
  colorName: string
  colorCode: string
}

export default function StyleBar({ selectedId, setSelectedId }: Props) {
  const [selectedComponent, setSelectedComponent] = useState<{ name: string | null, target: any } | null>(null)
  const objects = useSelector((state:RootState) => state.objects)
  const selectedObject = objects?.currentObjects.filter((obj: any) => obj.id === selectedId)[0]
  const dispatch = useDispatch()
  const { product, image,selectedSide,selectedColor,sides, colors } = useSelector((state:RootState) => state.designer)
  const [sure, setSure] = useState<Color | null>(null)
  const { handelChange } = useChanges({
    selectedId,
    selectedObject,
    objects
  })

  // const [colors, setColors] = useState<colorProps[] | null>(null)
  // const [selectedColor, setSelectedColor] = useState<colorProps | null>(null)
  // const [sizes, setSizes] = useState<any>(null)

  // useEffect(() => {
  //   if (!colors) return
  //   setSelectedColor(colors[0])
  //   dispatch(setSelectedColor(colors[0]))
    

  // }, [colors])


  // useEffect(() => {
  //   if (selectedProduct) {
  //     setColors(selectedProduct.color)
  //     setSizes(selectedProduct.size)
  //   }
  // }, [selectedProduct])

  // useEffect(() => {
  //   if (selectedColor) { dispatch(setSelectedColor(selectedColor)) }
  // }, [selectedColor])



  // console.log(selectedObject);




  return (
    <div>
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
          style={{ maxHeight: 200, overflowY: 'scroll' }}
        >

          <div className="white-bg r5" style={{ ...topBarStyle, }}   >
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <div 
                className="padding1 r5 text-center" 
                style={{ alignSelf: 'flex-start', width:140, margin:'auto' }} 
                >
                  <IconButton 
                  style={{width:40}} 
                  className="auto-margin"
                  onMouseDown={() => handelChange(selectedObject.y-1, "y")}
                  >
                    <KeyboardArrowUp />
                  </IconButton>
                  <div className="flex" style={{justifyContent:'space-between'}} >
                    <IconButton>
                      <KeyboardArrowLeft />
                    </IconButton>
                    <IconButton>
                      <KeyboardArrowRight />
                    </IconButton>
                  </div>
                  <IconButton style={{width:40}} className="auto-margin" >
                    <KeyboardArrowDown />
                  </IconButton>
                </div>
              </Grid>
              {selectedObject?.type === 'text' ?
                <>
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
                  <Grid item xs={12} lg={6}>
                <div className="flex margin1 grey-bg padding1 r5" style={{ alignSelf: 'flex-start', justifyContent: 'space-between' }}>
                  <div
                    style={{ alignSelf: 'center' }}
                  >
                    color:
                    &ensp;
                  </div>
                  <div
                    style={{ ...circleStyle, backgroundColor: selectedObject?.fill }}
                    className='pointer-cursor'
                    onClick={e => setSelectedComponent({ name: 'fill', target: e.currentTarget })}
                  />
                </div>
              </Grid>
              
              
                </>
                :
                <>
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
              </>
              }
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
                      type="number"
                      name="X"
                      id="x"
                      className='stylebar-input'
                      value={selectedObject?.x}
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
             {selectedObject?.type === 'text' && <> <Grid item xs={12} >
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
              </>
              }
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

                  // eslint-disable-next-line no-unsafe-optional-chaining
                  const target = [...objects?.currentObjects]
                  const index = target.findIndex((obj: any) => obj.id === selectedId);
                  const temp = { ...selectedObject }
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
      <Accordion
      expanded={!selectedId}
      style={{marginTop:0}}
      variant='outlined'
      >
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Select</Typography>
        </AccordionSummary>
        <AccordionDetails>

          <div style={{ backgroundColor: "#E5E5E5", display: "flex", flexDirection: "column", gap: "15px", padding: "10px" }}>
            <Card style={{ padding: "10px" }}>
              <Typography align='center'>Choose Color</Typography>
              {colors && <div style={{ display: "flex", gap: "10px" }}>
                {colors.map((color: colorProps) =>
                  <div
                    key={color.colorName}
                    onClick={() => { setSure(color) }}
                    style={{
                      cursor: "pointer",
                      height: "25px", width: "25px",
                      borderRadius: "50%",
                      backgroundColor: color.colorCode,
                      border: selectedColor?.colorName === color.colorName ? "2px solid black" : "0px solid black"
                    }}></div>)}
              </div>}
            </Card>
            <Card style={{ padding: "10px" }}>
              <Typography gutterBottom align='center'>Choose size</Typography>
              {product?.size && <div style={{ display: "flex", gap: "20px" }}>
                {product.size.map((size) => <Paper key={size} style={{ padding: "5px", cursor: "pointer" }}><strong>{size}</strong></Paper>)}
              </div>}
            </Card>
          </div>
        </AccordionDetails>
      </Accordion>
      <AreYouSure
      open={Boolean(sure)} 
      onClose={()=>setSure(null)} 
      discard={()=>{
      // dispatch(setProduct(sure))
      if(sure){
        dispatch(setSelectedColor(sure)) 
        dispatch(resetObjects())
        setSelectedId(null)
        // onClose()
        setSure(null)
      }
      }} 
      text={'discard the Design?'} 
      />
    </div>


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
