import { MiuracImage } from '@miurac/image-upload'
import { Delete, Edit, Login } from '@mui/icons-material'
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
  error: string | null
}

const widgets = [widget1, widget2, widget3, widget4, widget5, widget6, widget7]

export default function WidgetStyle({ error, selectedTemplate, setSelectedTemplate }: Props) {
  const theme = useTheme()
  const media = useMediaQuery(theme.breakpoints.up('md'))


  function extended(url: string, id: number) {
    setSelectedTemplate((prev: any) => {
      const target = { ...prev[id], img: url }
      const copy = [...prev]
      copy.splice(id, 1, target)
      return copy
    })
  }


  return (
    <div className='card'>
      <Typography>Select the widget style :</Typography>
      {selectedTemplate && <div style={{ textAlign: "right" }}>
        <IconButton onClick={() => setSelectedTemplate(null)}><Edit /></IconButton>
      </div>}
      {selectedTemplate ? (
        <div>
          <div style={{
            display: "grid", padding: "10px", gap: "10px", borderRadius: "5px", border: error ? "2px solid red" : "2px solid #C5C5C5", gridTemplate: media ? "repeat(2, 1fr)/repeat(2, 1fr)" : "1fr/1fr", justifyContent: "center", justifyItems: "center"
          }}>
            {selectedTemplate.map((innerGrid: any, id: number) => <div
              className='innerGrid' style={{
                backgroundColor: innerGrid.backgroundColor,
                borderRadius: innerGrid.borderRadius,
                gridRow: media ? innerGrid.gridRow : innerGrid.gridRowMobile,
                gridColumn: media ? innerGrid.gridColumn : innerGrid.gridColumnMobile,
                width: media ? innerGrid.width : innerGrid.mobileWidth,
                height: media ? innerGrid.height : innerGrid.mobileHeight,
              }}>
              {innerGrid.img ? (<Image setSelectedTemplate={setSelectedTemplate} media={media} id={id} innerGrid={innerGrid} />) : (
                <MiuracImage app={app} authComponent={<Login />} updateFirestore={false} editConfig={{
                  aspectX: innerGrid.aspectX,
                  aspectY: innerGrid.aspectY
                }} setUrlFunc={(url) => {
                  extended(url, id)
                }} buttonComponent={<img src={upload} alt="upload" />} />
              )}
            </div>)}
          </div>
          {error && <Typography color="red" display="block" align='center' variant='caption'>{error}</Typography>}
        </div>
      ) : (
        <Grid container gap={2} xs={12} justifyContent="center">
          {widgets.map((widget: string, id: number) => <Grid item ><img onClick={() => setSelectedTemplate(grids[id])} className='widget' src={widget} alt="widgets" /></Grid>)}
        </Grid>
      )
      }
    </div >
  )
}

const Image = ({ media, innerGrid, id, setSelectedTemplate }: any) => {

  const deleteImg = (id: number) => {
    setSelectedTemplate((prev: any) => {

      const newObj = prev[id]
      delete newObj["img"]
      const copy = [...prev]
      copy.splice(id, 1, newObj)
      return copy
    })

  }

  return (
    <div style={{ position: "relative" }}>
      <IconButton onClick={() => deleteImg(id)} style={{ position: "absolute", right: "10px", backgroundColor: "white", top: "10px" }}>
        <Delete color='error' />
      </IconButton>
      <img height={media ? innerGrid.height : innerGrid.mobileHeight} width={media ? innerGrid.width : innerGrid.mobileWidth} src={innerGrid.img} alt="img" />
    </div>
  )
}