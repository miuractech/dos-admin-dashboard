import { MiuracImage } from '@miurac/image-upload'
import { Login } from '@mui/icons-material'
import { IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { grids, style2 } from './grid'
import { RootObject as RootGrid } from './grid'
import upload from "../../assets/images/upload.svg"
import { app } from '../../firebaseConfig/config'

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
    setSelectedGrid:React.Dispatch<React.SetStateAction<RootGrid | null>>
    selectedGrid:RootGrid|null
}

// eslint-disable-next-line no-empty-pattern
export default function WidgetStyle({selectedGrid, setSelectedGrid}: Props) {
    const theme = useTheme()
    const media = useMediaQuery(theme.breakpoints.up('md'))
    const [aspectRatio, setAspectRatio] = useState<{
        aspectX: number
        aspectY: number
      } | null>(null)
      console.log('media',media)
  return (
    <div className='card'>
              <Typography gutterBottom>Select the widget style :</Typography>
              {selectedGrid ? (
                <div>
                  <div style={{
                    height: media?326:326*2,
                    width: media?836:326,
                    margin:'auto',
                    border: "1px solid  #C5C5C5",
                    borderRadius: selectedGrid.borderRadius,
                    display: selectedGrid.display,
                    gridTemplate: media?selectedGrid.gridTemplate:selectedGrid.gridTemplateMobile,
                    padding: selectedGrid.padding,
                    gap: selectedGrid.gap,
                    cursor: selectedGrid.cursor,
                  }} id={selectedGrid.gridId}>
                    {selectedGrid.innerGrid.map((grid: any,index) => <div onClick={(event) => {
                      const gridId = Number(event.currentTarget.id)
                    //   setSelectedInnerGrid(grid)
                      if (!selectedGrid) return
                      setAspectRatio(selectedGrid.innerGrid[gridId].aspectRatio)
                    }} id={grid.id} className='innerGrid' style={{
                      backgroundColor: grid.backgroundColor,
                      gridColumn: media?grid.gridColumn:grid.gridColumnMobile,
                      gridRow: media?grid.gridRow:grid.gridRowMobile,
                      borderRadius: grid.borderRadius,
                      display: "grid",
                      justifyContent: "center",
                      alignContent: "center"
                    }}>
                      <MiuracImage app={app} authComponent={<Login />} updateFirestore={false} editConfig={aspectRatio} setUrlFunc={(url)=>console.log(url)} buttonComponent={<IconButton ><img src={upload} alt="upload" /></IconButton>} />
                    </div>)}
                  </div>
                </div>
              ) : (
                <div style={style2}>
                  {grids.map((grid: any) => 
                  <div id={grid.id} 
                  // onClick={(e) => setSelectedGrid([grids[Number(e.currentTarget.id)]])} 
                  onClick={(e) => setSelectedGrid(grid)} 
                  className="styleDiv" style={
                    grid
                  }>
                    {grid.innerGrid.map((innerGrid: any) => <div style={innerGrid}></div>)}
                  </div>)}
                </div >
              )}
            </div>
  )
}