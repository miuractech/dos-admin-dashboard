import { Button, Typography, Grid, IconButton, Popover } from '@mui/material';
import './homepage.css';
import { auth, logoutUser } from '../../redux-tool/auth';
import { PersonOutlineOutlined, MoreVert, Edit } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';
import usePreviewImage from '../hooks/preview-image';
import { app } from '../../firebaseConfig/config';
import Footer from '../Auth/footer/footer';
import upload from "../../assets/images/upload.svg"
import { useForm } from 'react-hook-form';
import InputField from '../../UI/input-field/input-field';
import { grids, InnerGrid, RootObject, style2 } from './grid';
import { v4 as uuidv4 } from 'uuid';
import { MiuracImage } from '@miurac/image-upload';
import Login from '../Auth/loginpage/login';
/* eslint-disable-next-line */
export interface StoreFrontProps { }

export function StoreFront(props: StoreFrontProps) {
  const dispatch = useDispatch()
  
  const [profileUrl, setProfileUrl] = useState<string | null>(null)
  const [bannerUrl, setBannerUrl] = useState<string | null>(null)
  const [selectedGrid, setSelectedGrid] = useState<RootObject | null >(null)
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [aspectRatio, setAspectRatio] = useState<{
    aspectX: number
    aspectY: number
  } | null>(null)
  const [selectedInnerGrid, setSelectedInnerGrid] = useState<null | InnerGrid>(null)


  const onSubmit = (data: any) => {
    console.log({
      ...data,
      profileImg: profileUrl,
      bannerImg: bannerUrl,
      selectedGrid: selectedGrid
    });
  }

  // const gridImageUrl = (url: string) => {
  //   console.log(selectedInnerGrid);
  //   console.log(url);
  //   if (!selectedGrid) return
  //   if (!selectedInnerGrid) return
  //   const imgUrl = {
  //     img: url
  //   }
  // }

  // const innerGridFunc =

  console.log(selectedGrid);


  return (
    <>
      <div id="bg">
        <form onSubmit={handleSubmit(onSubmit)}>
          
        <Typography gutterBottom padding={5} variant='h4' align='center'>Customize Storefront</Typography>
          <div style={{ maxWidth: "800px", margin: "auto" }}>
            <div className='card'>
              <Typography>Upload store profile image :</Typography>
              {profileUrl ? (
                <div style={{ position: "relative", width: "140px", margin: "auto" }}>
                  {profileUrl && <img className='logoImage' src={profileUrl} alt="logo" />}
                  <MiuracImage app={app} authComponent={<Login />} updateFirestore={false} editConfig={{
                    aspectX: 1,
                    aspectY: 1,
                  }} setUrlFunc={(url) => setProfileUrl(url)} buttonComponent={<ProfileEditIcon />} />
                </div>
              ) : (
                <MiuracImage app={app} authComponent={<Login />} updateFirestore={false} editConfig={{
                  aspectX: 1,
                  aspectY: 1,
                }} setUrlFunc={(url) => setProfileUrl(url)} buttonComponent={<ProfileImage />} />
              )}
              <Typography gutterBottom>Name of the Storefront :</Typography>
              <InputField InputProps={{ style: { height: 40 } }} fullWidth color='primary' placeholder="Store name" forminput={{ ...register("storename") }} />
            </div >
            <div className='card'>
              <Typography>Upload banner image:</Typography>
              {bannerUrl ? (
                <div style={{ position: "relative" }}>
                  <MiuracImage app={app} authComponent={<Login />} updateFirestore={false} editConfig={{
                    aspectX: 3,
                    aspectY: 1,
                  }} setUrlFunc={(url) => setBannerUrl(url)} buttonComponent={<BannerEditIcon />} />
                  <img src={bannerUrl} alt="banner" width="100%" style={{ borderRadius: "5px" }} />
                </div>
              ) : (
                <MiuracImage app={app} authComponent={<Login />} updateFirestore={false} editConfig={{
                  aspectX: 3,
                  aspectY: 1,
                }} setUrlFunc={(url) => setBannerUrl(url)} buttonComponent={<BannerImage />} />
              )}
            </div>
            <div className='card'>
              <Typography gutterBottom>Select the widget style :</Typography>
              {selectedGrid ? (
                <div>
                  <div style={{
                    height: "80vh",
                    width: "97%",
                    border: "1px solid  #C5C5C5",
                    borderRadius: selectedGrid.borderRadius,
                    display: selectedGrid.display,
                    gridTemplate: selectedGrid.gridTemplate,
                    padding: selectedGrid.padding,
                    gap: selectedGrid.gap,
                    cursor: selectedGrid.cursor,
                  }} id={selectedGrid.gridId}>
                    {selectedGrid.innerGrid.map((grid: any) => <div onClick={(event) => {
                      const gridId = Number(event.currentTarget.id)
                      setSelectedInnerGrid(grid)
                      if (!selectedGrid) return
                      setAspectRatio(selectedGrid.innerGrid[gridId].aspectRatio)
                    }} id={grid.id} className='innerGrid' style={{
                      backgroundColor: grid.backgroundColor,
                      gridRow: grid.gridRow,
                      gridColumn: grid.gridColumn,
                      borderRadius: grid.borderRadius,
                      display: "grid",
                      justifyContent: "center",
                      alignContent: "center"
                    }}>
                      <MiuracImage app={app} authComponent={<Login />} updateFirestore={false} editConfig={aspectRatio} setUrlFunc={(url) => {




                        if (!selectedGrid) return
                        if (!selectedInnerGrid) return
                        const id = selectedInnerGrid.id
                        const imgUrl = {
                          img: url
                        }

                        const newGrid = { ...selectedInnerGrid, img: url }
                        console.log(selectedGrid);

                        // setSelectedGrid(prev => prev)

                      }} buttonComponent={<IconButton ><img src={upload} alt="upload" /></IconButton>} />
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
            <button>save</button>
          </div >
        </form >
      </div >
      <Footer />
    </>
  );
}

const BannerImage = () => {
  return (
    <div className='divcenter'>
      <Button id='banner' fullWidth style={{ height: "175px", display: "block" }}>
        <img src={upload} alt="upload" />
        <Typography display="block" variant='caption'>upload banner image here!</Typography>
      </Button>
    </div>
  )
}

const BannerEditIcon = () => {
  return (
    <IconButton id='profile' style={{ position: "absolute", right: "10px", top: "10px", backgroundColor: "white" }}>
      <Edit color='primary' style={{ color: "3f8cff" }} />
    </IconButton>
  )
}

const ProfileImage = () => {
  return (
    <div id='circle'>
      <label htmlFor="icon-button-file">
        <IconButton style={{ height: "100px", width: "100px" }} color="primary" aria-label="upload picture" component="span">
          <img src={upload} alt="upload" />
        </IconButton>
      </label>
    </div >
  )
}

const ProfileEditIcon = () => {
  return (
    <IconButton id='profile' style={{ position: "absolute", bottom: "15px", right: "0px", backgroundColor: "white" }}>
      <Edit color='primary' style={{ color: "3f8cff" }} />
    </IconButton>
  )
}



