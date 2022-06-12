import { Button, Typography, TextField, Grid, IconButton, Popover } from '@mui/material';
import './homepage.css';
import { auth, logoutUser } from '../../redux-tool/auth';
import { PersonOutlineOutlined, CloudUploadOutlined, MoreVert, Edit } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';
import usePreviewImage from '../hooks/preview-image';
import { app } from '../../firebaseConfig/config';
import { ImageCropInput } from '@dropout-store/image-crop-input';
import Footer from '../Auth/footer/footer';
import upload from "../../assets/images/upload.svg"
import SimpleModal from '@dropout-store/simple-modal';
import { useForm } from 'react-hook-form';
import InputField from '../../UI/input-field/input-field';
import { GRID, Style1, Style2, Style3, Style4, Style5, Style6, Style7 } from './grid';
/* eslint-disable-next-line */
export interface StoreFrontProps { }

export function StoreFront(props: StoreFrontProps) {
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [imageurl, setImageurl] = useState("")
  const [profileUrl, setProfileUrl] = useState("")
  const [bannerUrl, setBannerUrl] = useState("")
  const [editModal, setEditModal] = useState(false)
  const [aspect, setAspect] = useState(1 / 1)
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const selectedAreaRef = useRef("")
  const gridRef = useRef<any>()
  const [selectedGrid, setSelectedGrid] = useState<any>("")

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);

  const user = auth.currentUser


  useEffect(() => {
    if (selectedAreaRef.current === "profile") {
      setProfileUrl(imageurl)
    } else if (selectedAreaRef.current === "banner") {
      setBannerUrl(imageurl)
    }
  }, [imageurl])

  const onSubmit = (data: any) => {
    console.log({
      ...data,
      profileImg: profileUrl,
      bannerImg: bannerUrl
    });
  }

  // const Gridstyle = (event: any) => {
  //   // setSelectedGrid(event.currentTarget.id);
  //   switch (event.currentTarget.id) {
  //     case "style1":
  //       return setSelectedGrid(<Style1 Gridstyle={Gridstyle} />)
  //       break;
  //     default: null
  //     // code block
  //   }
  // }


  return (
    <>
      <div id="bg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <SimpleModal open={editModal} onClose={() => setEditModal(false)}>
            <ImageCropInput app={app} setEditModal={setEditModal} aspect={aspect} setImageurl={setImageurl} />
          </SimpleModal>
          <div className='header'>
            <PersonOutlineOutlined fontSize='large' />
            <Typography variant='h6'>{user?.email}</Typography>
            <IconButton onClick={handleClick}>
              <MoreVert />
            </IconButton>
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
            >
              <Box sx={{ p: 2 }} onClick={() => dispatch(logoutUser())} style={{ cursor: "pointer" }}>Logout</Box>
            </Popover>
          </div>
          <Typography gutterBottom padding={5} variant='h4' align='center'>Customize Storefront</Typography>
          <div style={{ maxWidth: "60%", margin: "auto" }}>
            <div className='card'>
              <Typography>Upload store profile image :</Typography>
              {profileUrl !== "" ? (
                <div style={{ position: "relative", width: "140px", margin: "auto" }}>
                  <img className='logoImage' src={profileUrl} {...register("profileImg")} alt="logo" />
                  <IconButton id='profile' onClick={() => {
                    setEditModal(true)
                    setAspect(1 / 1)
                    selectedAreaRef.current = "profile"
                  }} style={{ position: "absolute", bottom: "15px", right: "0px", backgroundColor: "white" }}>
                    <Edit color='primary' style={{ color: "3f8cff" }} />
                  </IconButton>
                </div>
              ) : (
                <div id='circle'>
                  <label htmlFor="icon-button-file">
                    <IconButton style={{ height: "100px", width: "100px" }} color="primary" aria-label="upload picture" component="span" onClick={() => {
                      setEditModal(true)
                      setAspect(1 / 1)
                      selectedAreaRef.current = "profile"
                    }}>
                      <img src={upload} alt="upload" />
                    </IconButton>
                  </label>
                </div>
              )}
              <Typography gutterBottom>Name of the Storefront :</Typography>
              <InputField InputProps={{ style: { height: 40 } }} fullWidth color='primary' placeholder="Store name" forminput={{ ...register("storename") }} />
            </div >
            <div className='card'>
              <Typography>Upload banner image:</Typography>
              {bannerUrl !== "" ? (
                <div style={{ position: "relative" }}>
                  <IconButton id='profile' onClick={() => {
                    setEditModal(true)
                    setAspect(1 / 1)
                    selectedAreaRef.current = "profile"
                  }} style={{ position: "absolute", right: "10px", top: "10px", backgroundColor: "white" }}>
                    <Edit color='primary' style={{ color: "3f8cff" }} />
                  </IconButton>
                  <img src={bannerUrl} alt="banner" width="100%" style={{ borderRadius: "5px" }} {...register("bannerImg")} />
                </div>
              ) : (
                <div className='divcenter'>
                  <Button id='banner' fullWidth style={{ height: "175px", display: "block" }} onClick={() => {
                    setEditModal(true)
                    setAspect(3.5 / 1)
                    selectedAreaRef.current = "banner"
                  }}>
                    <img src={upload} alt="upload" />
                    <Typography display="block" variant='caption'>upload banner image here!</Typography>
                  </Button>
                </div>
              )}
            </div>
            <div className='card'>
              <Typography>Select the widget style :</Typography>
              {selectedGrid ? (
                <div style={{ width: "70%", height: "100%", margin: "auto" }}>
                  {GRID[selectedGrid]}
                </div>
              ) : (
                <Grid container gap={2.5} justifyContent="center" className='parent'>
                  {/* <Style1 Gridstyle={Gridstyle} />
                  <Style2 Gridstyle={Gridstyle} />
                  <Style3 Gridstyle={Gridstyle} />
                  <Style4 Gridstyle={Gridstyle} />
                  <Style5 Gridstyle={Gridstyle} />
                  <Style6 Gridstyle={Gridstyle} />
                  <Style7 Gridstyle={Gridstyle} /> */}
                  {GRID.map((grid, index) => <div key={index} onClick={() => setSelectedGrid(index)}>{grid}</div>)}
                </Grid>
              )}

              <button>save</button>
            </div>
          </div >
        </form >
      </div >
      <Footer />
    </>
  );
}