import { Alert, Button, Snackbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import WidgetStyle from './components/widgetStyle'
import ProfileInfo from './components/profileInfo'
import BannerImageUpload from './components/bannerImageUpload'
import { doc, updateDoc } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux-tool/store'
import { db } from '../../firebaseConfig/config'
import { useNavigate } from 'react-router-dom'
import Header from '../sideNav/header'

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

// eslint-disable-next-line no-empty-pattern
export default function StorefrontCreator({ }: Props) {
  const [profileUrl, setProfileUrl] = useState<string | null>(null)
  const [storeName, setStoreName] = useState<string | null>(null)
  const [bannerUrl, setBannerUrl] = useState<string | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [error, setError] = useState<null | string>(null)
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate()
  const { User } = useSelector((state: RootState) => state.User)
  const onSubmit = async (data: any) => {
    const undefinedImgs = selectedTemplate.map((obj: any) => obj.img).includes(undefined)
    if (!profileUrl) return setError("Plese select logo")
    if (!storeName) return setError("Store name is mandatory")
    if (!bannerUrl) return setError("Plese select banner image")
    if (undefinedImgs) return setError("Plese select all the images in the widget")
    if (!User) return

    const resellerRef = doc(db, "reSellers", User.uid);
    try {
      await updateDoc(resellerRef, {
        storeName,
        profileUrl,
        bannerUrl,
        selectedTemplate
      })
      navigate("/verification")
    } catch (error) {
      setError("failed to save, please try again")
      console.log("error");
    }
  }

  const handleClose = () => {
    setOpen(false)
    setError(null)
  }


  return (
    <div>
      <Snackbar open={Boolean(error)} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      <Header />
      <div id="bg">
        <Typography gutterBottom padding={5} variant='h4' align='center'>Customize Storefront</Typography>
        <div style={{ maxWidth: "800px", margin: "auto" }}>

          {/* profile info */}
          <ProfileInfo
            setProfileUrl={setProfileUrl}
            setStoreName={setStoreName}
            profileUrl={profileUrl}
            storeName={storeName}
          />

          {/* top banner info */}
          <BannerImageUpload
            setBannerUrl={setBannerUrl}
            bannerUrl={bannerUrl}
          />
          <WidgetStyle
            setSelectedTemplate={setSelectedTemplate}
            selectedTemplate={selectedTemplate}
            error={error}
          />

          <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginBottom: "10px" }}>
            <Button variant='outlined'>Cancel</Button><Button
              onClick={onSubmit}
              variant='contained'
              color='primary'
              disabled={!selectedTemplate}
            >
              SAVE
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}