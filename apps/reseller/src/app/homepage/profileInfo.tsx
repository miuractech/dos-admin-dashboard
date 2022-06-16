import { MiuracImage } from '@miurac/image-upload'
import { Edit } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import React from 'react'
import Login from '../Auth/loginpage/login'
import upload from "../../assets/images/upload.svg"
import { app } from '../../firebaseConfig/config'
import InputField from '../../UI/input-field/input-field'

type Props = {
    setProfileUrl:React.Dispatch<React.SetStateAction<string | null>>
    setStoreName:React.Dispatch<React.SetStateAction<string | null>>
    profileUrl:string | null
    storeName:string| null
}


export default function ProfileInfo({
    setProfileUrl,
    setStoreName,
    profileUrl,
    storeName,
}: Props) {
  return (
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
    <InputField InputProps={{ style: { height: 40 } }} fullWidth color='primary' placeholder="Store name" value={storeName} onChange={e=>setStoreName(e.target.value)} />
  </div >
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