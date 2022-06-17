import { Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import WidgetStyle from './components/widgetStyle'
import ProfileInfo from './components/profileInfo'
import BannerImageUpload from './components/bannerImageUpload'

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

// eslint-disable-next-line no-empty-pattern
export default function StorefrontCreator({ }: Props) {
  const [profileUrl, setProfileUrl] = useState<string | null>(null)
  const [storeName, setStoreName] = useState<string | null>(null)
  const [bannerUrl, setBannerUrl] = useState<string | null>(null)
  const [selectedGrid, setSelectedGrid] = useState<number | null>(null)
  const onSubmit = (data: any) => {
    console.log({
      storeName,
      profileImg: profileUrl,
      bannerImg: bannerUrl,
      selectedGrid: selectedGrid
    });
  }

  console.log(selectedGrid);

  return (
    <div>
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
            setSelectedGrid={setSelectedGrid}
            selectedGrid={selectedGrid}
          />

          <Button
            onClick={onSubmit}
            variant='contained'
            color='primary'
          >
            SAVE
          </Button>

        </div>
      </div>
    </div>
  )
}