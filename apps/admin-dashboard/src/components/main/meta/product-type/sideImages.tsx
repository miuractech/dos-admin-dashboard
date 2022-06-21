import { UploadIcon } from '@admin/assets';
import { Clear, Delete } from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { UploadButton } from '../../../global/buttons';
import { TRegister, TSetValue, TWatch } from './shared'
import styles from '../styles/product-type.module.scss';
import SimpleModal from '../../../global/simpleModal/modal';
import AreYouSure from '../../../../UI/dosinput/AreYouSure';
import NewDesignArea, { UrlImage } from './newDesignArea';
import { Circle, Layer, Rect, Stage, Transformer } from 'react-konva'
import { MiuracImage } from '@miurac/image-upload';
import { app } from '../../../../config/firebase.config';

type Props = {
  register: TRegister;
  colours: { colorName: string, colorCode: string }[];
  setValue: TSetValue;
  watch: TWatch;
  errors: any;
  getValues: any;
}
const sides = [{ side: "Front" }, { side: "Back" }, { side: "Left" }, { side: "Right" }, { side: "Top" }, { side: "Bottom" }]

export default function SideImages({ register, colours, setValue, watch, errors, getValues }: Props) {
  return (
    <div>
      {colours.map(({ colorCode, colorName }) => (
        <div>
          <Typography variant='h6' align='center'>{colorName}</Typography>
          <Typography variant='subtitle2' align='center' color={'gray'} gutterBottom>(only square images with minimum 500px X 500px dimensions are accepted)</Typography>
          <Grid container columnSpacing={2} justifyContent="center" marginBottom={5}>
            {sides.map((element, index) => {
              return (
                <Grid item m={4}>
                  <ProductDisplayImage
                    register={register}
                    setValue={setValue}
                    watch={watch}
                    errors={errors}
                    showLable={false}
                    key={element.side}
                    side={element.side}
                    getValues={getValues}
                    color={colorName}
                    registerName={`sideImages.${colorName}.${element.side}`}
                  />
                </Grid>
              )
            })}
          </Grid>
          {errors?.sideImages && errors?.sideImages[colorName] && <Typography variant='subtitle1' color='error' > Atleast one Image required</Typography>}
        </div>
      ))}
    </div>
  )
}

const ProductDisplayImage: React.FC<{
  register: TRegister;
  registerName: string;
  setValue: TSetValue;
  getValues: any;
  watch: TWatch;
  errors: any
  showLable: boolean
  side: string
  color: string
}> = ({ register, setValue, watch, errors, showLable, side, registerName, color, getValues }) => {
  // const [imageFile, setImageFile] = useState<any>(null)
  const [imgUrl, setImgUrl] = useState<string | null>(null)
  const [exit, setExit] = useState(false)
  // const [previewURL, setPreviewURL] = useState<string | null>(null)
  // const { preview } = usePreviewImage();
  const [previewScreen, setpreviewScreen] = useState<string | null>(null)
  const imageFieldRef = React.useRef<HTMLInputElement | null>();
  const [error, setError] = useState("")
  // useEffect(() => {
  //   let url: string;
  //   if (imageFile) {
  //     url = URL.createObjectURL(imageFile)
  //     setPreviewURL(url)
  //   } else {
  //     setPreviewURL(null)
  //   }
  //   return () => {
  //     URL.revokeObjectURL(url)
  //   }
  // }, [imageFile])
  useEffect(() => {
    setpreviewScreen(getValues(`sideImages.${color}.${side}.imgUrl`));
  }, [])

  useEffect(() => {

    if (!error) return

    setTimeout(() => {
      setError("")
    }, 5000)

  }, [error])

  const bgImageProps = {
    object: {
      x: 0,
      y: 0,
      id: "bgImage",
      width: 170,
      height: 170
    }
  }

  const dimensions = getValues(`sideImages.${color}.${side}`)
  // console.log(dimensions);



  return (
    <div>
      <div className={styles['field-container']}>
        {showLable && <label>Display Image:</label>}
        <div>
          <SimpleModal disableCloseButton open={Boolean(imgUrl)} onClose={() => setExit(true)} >
            <div key={registerName} style={{ width: "31.2rem", margin: "auto" }}>
              <NewDesignArea
                // setpreviewScreen={setpreviewScreen}
                // setPreviewURL={setPreviewURL}
                imgUrl={imgUrl}
                setImgUrl={setImgUrl}
                // url={previewURL ? previewURL : ''}
                close={() => setExit(true)}
                setValue={setValue}
                color={color}
                side={side} />
            </div>
          </SimpleModal>
          <AreYouSure open={exit} onClose={() => setExit(false)} discard={() => { setExit(false); setImgUrl(null) }} text="discard the image?" />
          {
            watch(`sideImages.${color}.${side}.imgUrl`) ? (
              <div style={{ position: "relative", maxHeight: "200px", maxWidth: "200px" }}>
                <IconButton
                  size="small"
                  style={{
                    zIndex: "10",
                    backgroundColor: 'white',
                    color: 'red',
                    position: "absolute",
                    left: "140px"
                  }}
                  onClick={() => {
                    setValue(registerName, {})
                    setImgUrl(null)
                  }}
                >
                  <Delete fontSize='small' />
                </IconButton>
                {/* < img
                  src={getValues(`sideImages.${color}.${side}.imgUrl`)}
                  style={{
                    objectFit: 'cover', maxHeight: "200px", maxWidth: "200px", display: "block"
                  }}
                  alt=""
                  height="170px"
                  width="170px"
                /> */}
                <Stage Stage width={170} height={170}>
                  <Layer>
                    <UrlImage src={getValues(`sideImages.${color}.${side}.imgUrl`)} props={bgImageProps} id="img" />
                    {getValues(`sideImages.${color}.${side}.type`) === "rect" ? (
                      <Rect x={dimensions.x / 2.9} y={dimensions.y / 2.9} width={dimensions.width / 2.9} height={dimensions.height / 2.9} stroke="white" strokeWidth={1} dash={[5, 2]} />
                    ) : (
                      <Circle x={dimensions.x / 2.9} y={dimensions.y / 2.9} radius={dimensions.radius / 2.9} stroke="white" strokeWidth={2} dash={[5, 2]} />
                    )}
                  </Layer>
                </Stage>
              </div>
            ) : (
              <div style={{ height: 100, width: 100 }}>
                {/* <input
                  type="file"
                  style={{ display: 'none', }}
                  onChange={(e) => {
                    if (e.target.files && e.target.files?.length > 0) {
                      const img = new Image()
                      img.src = window.URL.createObjectURL(e.target.files[0])
                      img.onload = () => {
                        if (img.width === img.height) {
                          if (img.width > 500 && img.height > 500) {
                            if (e.target.files?.length !== 1) return
                            setImageFile(e.target.files[0])
                          } else setError("minimum of 500x500 pixel image requried")
                        } else setError("please upload a square image")
                      }
                    }
                  }}
                  ref={(e) => {
                    register(registerName).ref(e);
                    imageFieldRef.current = e;
                  }}
                /> */}
                <MiuracImage app={app} updateFirestore={false} editConfig={{ aspectX: 1, aspectY: 1 }} setUrlFunc={(url) => setImgUrl(url)}
                  buttonComponent={
                    < UploadButton
                      dimension={{ height: '100%', width: '100%' }}
                      clickAction={() => console.log("")}
                      style={{ border: error ? '1px solid red' : '1px solid #222' }}
                    >
                      <UploadIcon />
                    </UploadButton >
                  } />
              </div>
            )}
        </div>
      </div>
      {
        error && <Typography style={{ maxWidth: "100px" }} fontSize={11} variant='subtitle1' color='error' textAlign="center">
          {error}
        </Typography>
      }
      {!showLable && <div style={{ marginTop: "15px", textAlign: "center" }}>{side}</div>}
    </div >
  );
};