import { MiuracImage } from '@miurac/image-upload'
import { Login } from '@mui/icons-material'
import { Grid, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import upload from "../../../assets/images/upload.svg"
import { app } from '../../../firebaseConfig/config'
import widget1 from "./widgetImages/widget-1.svg"
import widget2 from "./widgetImages/widget-2.svg"
import widget3 from "./widgetImages/widget-3.svg"
import widget4 from "./widgetImages/widget-4.svg"
import widget5 from "./widgetImages/widget-5.svg"
import widget6 from "./widgetImages/widget-6.svg"
import widget7 from "./widgetImages/widget-7.svg"
import { grids } from '../grid'
type Props = {
  setSelectedTemplate: React.Dispatch<React.SetStateAction<any>>
  selectedTemplate: any
  selectedInnerGridID: number | null
  setSelectedInnerGridID: React.Dispatch<React.SetStateAction<number | null>>
}

const widgets = [widget1, widget2, widget3, widget4, widget5, widget6, widget7]

export default function WidgetStyle({ selectedTemplate, setSelectedTemplate, selectedInnerGridID, setSelectedInnerGridID }: Props) {
  const theme = useTheme()
  const media = useMediaQuery(theme.breakpoints.up('md'))
  const [template, setTemplate] = useState<any>([])


  function toSetSelectedGrid(id: number | null, url: string) {
    if (!id) return
    const selectedGridStyles = selectedTemplate[id]
    const selectedInnerGrid = {
      ...selectedGridStyles,
      imageURL: url
    }

    setTemplate([...template, selectedInnerGrid])

  }


  console.log(template);



  return (
    <div className='card'>
      <Typography gutterBottom>Select the widget style :</Typography>
      {selectedTemplate ? (
        <div style={{
          display: "grid", padding: "10px", gap: "10px", borderRadius: "5px", border: "2px solid #C5C5C5", gridTemplate: media ? "repeat(2, 1fr)/repeat(2, 1fr)" : "1fr/1fr", justifyContent: "center", justifyItems: "center"
        }}>
          {selectedTemplate.map((innerGrid: any, id: number) => <div onClick={() => setSelectedInnerGridID(id)
          } className='innerGrid' style={{
            backgroundColor: innerGrid.backgroundColor,
            borderRadius: innerGrid.borderRadius,
            gridRow: media ? innerGrid.gridRow : innerGrid.gridRowMobile,
            gridColumn: media ? innerGrid.gridColumn : innerGrid.gridColumnMobile,
            width: media ? innerGrid.width : innerGrid.mobileWidth,
            height: media ? innerGrid.height : innerGrid.mobileHeight,
          }}>
            {innerGrid.img ? (<img src={innerGrid.img} alt="img" />) : (
              <MiuracImage app={app} authComponent={<Login />} updateFirestore={false} editConfig={{
                aspectX: innerGrid.aspectX,
                aspectY: innerGrid.aspectY
              }} setUrlFunc={(url) => {
                toSetSelectedGrid(selectedInnerGridID, url)
              }} buttonComponent={<img src={upload} alt="upload" />} />
            )}
          </div>)}

        </div>
      ) : (
        <Grid container gap={2} xs={12} justifyContent="center">
          {widgets.map((widget: string, id: number) => <Grid item ><img onClick={() => setSelectedTemplate(grids[id])} className='img' src={widget} alt="widgets" /></Grid>)}
        </Grid>
      )
      }
    </div >
  )
}