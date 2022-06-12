import { Grid } from '@mui/material'
import React from 'react'


export const Style1 = () => {
    return (
        <Grid item container xs={5.8} className="child" id="style1" >
            <Grid className='inside' item xs={5.8} ></Grid>
            <Grid item xs={5.8} container gap={1.3}>
                <Grid className='inside' item xs={11.8}></Grid>
                <Grid className='inside' item xs={11.8}></Grid>
            </Grid>
        </Grid>
    )
}

export const Style2 = () => {
    return (
        <Grid item container xs={5.8} className="child" id="style2">
            <Grid item xs={5.8} container gap={1.3}>
                <Grid className='inside' item xs={11.8}></Grid>
                <Grid className='inside' item xs={11.8}></Grid>
            </Grid>
            <Grid className='inside' item xs={5.8} ></Grid>
        </Grid>
    )
}

export const Style3 = () => {
    return (
        <Grid item container xs={5.8} className="child" id="style3" >
            <Grid className='inside' item xs={5.8}></Grid>
            <Grid className='inside' item xs={5.8}></Grid>
            <Grid className='inside' item xs={12}></Grid>
        </Grid>
    )
}

export const Style4 = () => {
    return (
        <Grid item container xs={5.8} className="child" id="style4" >
            <Grid className='inside' item xs={5.8}></Grid>
            <Grid className='inside' item xs={5.8}></Grid>
            <Grid className='inside' item xs={5.8}></Grid>
        </Grid>
    )
}

export const Style5 = () => {
    return (
        <Grid container item xs={5.8} className="child" id="style5" >
            <Grid className='inside' item xs={12}></Grid>
            <Grid className='inside' item xs={12}></Grid>
        </Grid>
    )
}

export const Style6 = () => {
    return (
        <Grid container item xs={5.8} className="child" id="style6" >
            <Grid className='inside' item xs={5.8}></Grid>
            <Grid className='inside' item xs={5.8}></Grid>
        </Grid>
    )
}

export const Style7 = () => {
    return (
        <Grid container item xs={5.8} className="child" id="style7">
            <Grid className='inside' item xs={5.8}></Grid>
            <Grid className='inside' item xs={5.8}></Grid>
            <Grid className='inside' item xs={5.8}></Grid>
            <Grid className='inside' item xs={5.8}></Grid>
        </Grid>
    )
}

export const GRID = [<Style1 />, <Style2 />, <Style3 />, <Style4 />, <Style5 />, <Style6 />, <Style7 />]
