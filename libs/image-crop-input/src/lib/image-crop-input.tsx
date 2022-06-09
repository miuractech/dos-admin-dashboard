import { UploadModal } from '@dropout-store/upload-modal';
import './image-crop-input.css'
import Cropper from 'react-easy-crop'
import { useCallback, useEffect, useState } from 'react';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import SimpleModal from '@dropout-store/simple-modal';
import { Button } from '@mui/material';
import getCroppedImg from './cropImage';
import { blobToFile } from './blobconvert';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { useStorage } from '@dropout-store/upload-modal';
import { getAuth } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';
/* eslint-disable-next-line */
export interface ImageCropInputProps {
  app: any,
  setEditModal: any,
  errorMessage: any,
}

export function ImageCropInput({ app,
  setEditModal,
  errorMessage,
}: ImageCropInputProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [url, setUrl] = useState(null)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState<null | string | undefined>(null)
  const [progress, setProgress] = useState(0)
  const { upload } = useStorage({ app })
  const user = getAuth(app).currentUser

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  useEffect(() => {

    const dataURLtoBlob = (dataURL: string | null | undefined) => {
      if (!dataURL) return
      fetch(dataURL)
        .then(res => res.blob())
        .then(blob => {
          const myBlob = blobToFile(blob, "")
          const file = new File([myBlob], 'image.jpeg', {
            type: myBlob.type,
          });
          // setModifiedImageFile(myFile);
          // console.log(myFile);
          const path = `uploads/${user?.uid}/modifiedImages`
          const fileName = file.name + uuidv4()

          upload({
            file,
            path,
            onsuccess: (url: string) => console.log(url),
            fileName,
            onFail: (error: any) => console.log(error),
            setProgress
          })
        })
        .catch(err => console.log(err))
    }

    return dataURLtoBlob(croppedImage)


  }, [croppedImage])



  const showCroppedImage = useCallback(async () => {
    try {


      const croppedImage = await getCroppedImg(url, croppedAreaPixels)
      setCroppedImage(croppedImage)





    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, url])

  return (
    <div>
      {url ? (
        <SimpleModal style={{ width: "50vw", height: "50vh" }} open={Boolean(url)} onClose={() => setEditModal(false)}>
          <div className="App">
            <div className="crop-container">
              <Cropper
                image={url}
                crop={crop}
                zoom={zoom}
                aspect={12 / 3}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}

              />
            </div>
            <div className="controls">
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e) => {
                  setZoom(Number(e.target.value))
                }}
                className="zoom-range"
              />
              <Button variant='contained' onClick={showCroppedImage}>Save</Button>
            </div>
          </div>

        </SimpleModal>
      ) : (
        <SimpleModal open={Boolean(!url)} onClose={() => setEditModal(false)}>
          <UploadModal
            app={app}
            setEditModal={setEditModal}
            setImageurl={setUrl}
            errorMessage={errorMessage}
          />
        </SimpleModal>
      )
      }
    </div >
  );
}

// export default ImageCropInput;
// function onFail(arg0: any, onsuccess: any, arg2: string, onFail: any, setProgress: any) {
//   throw new Error('Function not implemented.');
// }

// function setProgress(arg0: any, onsuccess: any, arg2: string, onFail: (arg0: any, onsuccess: any, arg2: string, onFail: any, setProgress: any) => void, setProgress: any) {
//   throw new Error('Function not implemented.');
// }


