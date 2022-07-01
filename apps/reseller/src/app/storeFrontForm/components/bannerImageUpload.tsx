import { MiuracImage } from '@miurac/image-upload'
import { Edit } from '@mui/icons-material'
import { Button, IconButton, Typography } from '@mui/material'
import { app } from 'apps/reseller/src/firebaseConfig/config'
import upload from "../../../assets/images/upload.svg"
import Login from '../../Auth/loginpage/login'


// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  setBannerUrl: React.Dispatch<React.SetStateAction<string | null>>
  bannerUrl: string | null
}

// eslint-disable-next-line no-empty-pattern
export default function BannerImageUpload({ setBannerUrl, bannerUrl }: Props) {
  return (
    <div>
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
    </div>
  )
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