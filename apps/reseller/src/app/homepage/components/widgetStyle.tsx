import { MiuracImage } from '@miurac/image-upload'
import { Login } from '@mui/icons-material'
import { Grid, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import upload from "../../assets/images/upload.svg"
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
  setSelectedGrid: React.Dispatch<React.SetStateAction<number | null>>
  selectedGrid: number | null
}

const widgets = [widget1, widget2, widget3, widget4, widget5, widget6, widget7]

export default function WidgetStyle({ selectedGrid, setSelectedGrid }: Props) {
  const theme = useTheme()
  const media = useMediaQuery(theme.breakpoints.up('md'))
  const [aspectRatio, setAspectRatio] = useState<{
    aspectX: number
    aspectY: number
  } | null>(null)

  console.log(media);


  // const targetGrid = selectedGrid && grids[selectedGrid]

  return (
    <div className='card'>
      <Typography gutterBottom>Select the widget style :</Typography>
      {selectedGrid ? (
        <div style={{
          display: "grid", border: "1px solid black", gridTemplate: "repeat(2, 1fr)/repeat(2, 1fr)"
        }}>
          {grids[selectedGrid - 1].map((innerGrid: any) => <div style={{
            backgroundColor: innerGrid.backgroundColor,
            borderRadius: innerGrid.borderRadius,
            gridRow: media ? innerGrid.gridRow : innerGrid.gridRowMobile,
            gridColumn: media ? innerGrid.gridColumn : innerGrid.gridColumnMobile,
            width: media ? innerGrid.width : innerGrid.mobileWidth,
            height: media ? innerGrid.height : innerGrid.mobileHeight,

          }}>dghdfighdfi</div>)}

        </div>
      ) : (
        <Grid container gap={2} xs={12} justifyContent="center">
          {widgets.map((widget: string, id: number) => <Grid item ><img onClick={() => setSelectedGrid(id + 1)} className='img' src={widget} alt="widgets" /></Grid>)}
        </Grid>
      )
      }
    </div >
  )
}