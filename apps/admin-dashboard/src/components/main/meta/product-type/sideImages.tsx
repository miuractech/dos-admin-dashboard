import { UploadIcon } from '@admin/assets';
import { Clear } from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { UploadButton } from '../../../global/buttons';
import { TRegister, TSetValue, TWatch } from './shared'
import styles from '../styles/product-type.module.scss';
import SimpleModal from '../../../global/simpleModal/modal';
import AreYouSure from '../../../../UI/dosinput/AreYouSure';
import NewDesignArea from './newDesignArea';

type Props = {
  register: TRegister;
  colours: { colorName: string, colorCode: string }[];
  setValue: TSetValue;
  watch: TWatch;
  errors: any;
  getValues:any;
}
const sides = [{ side: "Front" }, { side: "Back" }, { side: "Left" }, { side: "Right" }, { side: "Top" }, { side: "Bottom" }]

export default function SideImages({ register, colours, setValue, watch, errors, getValues }: Props) {
  return (
    <div>
      {colours.map(({ colorCode, colorName }) => (
        <div>
          <Typography variant='h6' align='center' gutterBottom>{colorName}</Typography>
          <Grid container columnSpacing={2} justifyContent="center" marginBottom={10}>
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
  getValues:any;
  watch: TWatch;
  errors: any
  showLable: boolean
  side: string
  color: string
}> = ({ register, setValue, watch, errors, showLable, side, registerName, color,getValues  }) => {
  const [imageFile, setImageFile] = useState<any>(null)
  const [exit, setExit] = useState(false)
  const [previewURL, setPreviewURL] = useState<string | null>(null)
  // const { preview } = usePreviewImage();
  const [previewScreen, setpreviewScreen] = useState<string>('')
  const imageFieldRef = React.useRef<HTMLInputElement | null>();
  useEffect(() => {
    let url: string;
    if (imageFile) {
      url = URL.createObjectURL(imageFile)
      setPreviewURL(url)
    } else {
      setPreviewURL(null)
    }
    return () => {
      URL.revokeObjectURL(url)
    }
  }, [imageFile])
  useEffect(() => {
    setpreviewScreen(getValues(`sideImages.${color}.${side}.previewScreen`));
  }, [])
  


  return (
    <div>
      <div className={styles['field-container']}>
        {showLable && <label>Display Image:</label>}
        <div>
          <SimpleModal disableCloseButton open={Boolean(previewURL)} onClose={() => setExit(true)} >
            <div key={registerName} style={{ width: "31.2rem", margin: "auto" }}>
              <NewDesignArea setpreviewScreen={setpreviewScreen} setPreviewURL={setPreviewURL} imageFile={imageFile} url={previewURL ? previewURL : ''} close={() => setExit(true)} setValue={setValue} color={color} side={side} />
            </div>
          </SimpleModal>
          <AreYouSure open={exit} onClose={() => setExit(false)} discard={() => { setExit(false); setPreviewURL(null); setImageFile(null) }} text="discard the image?" />
          {
            previewScreen ? (
              <div style={{ position: "relative", maxHeight: "200px", maxWidth: "200px" }}>
                <IconButton
                  size="small"
                  style={{
                    backgroundColor: '#888',
                    color: 'white',
                    position: "absolute",
                    right: "0px"
                  }}
                  onClick={() => {
                    setValue(registerName, {})
                    setpreviewScreen('')
                  }}
                >
                  <Clear />
                </IconButton>
                < img
                  src={previewScreen}
                  style={{
                    objectFit: 'cover', maxHeight: "200px", maxWidth: "200px", display: "block"
                  }}
                  alt=""
                  height="170px"
                  width="170px"
                />
              </div>
            ) : (
              <div style={{ height: 100, width: 100 }}>
                <input
                  type="file"
                  style={{ display: 'none', }}
                  // {...register(registerName)}
                  onChange={(e) => {
                    if (e.target.files && e.target.files?.length > 0) {
                      setImageFile(e.target.files[0])
                    }
                  }}
                  ref={(e) => {
                    register(registerName).ref(e);
                    imageFieldRef.current = e;
                  }}
                />
                <UploadButton
                  dimension={{ height: '100%', width: '100%' }}
                  clickAction={() => {
                    imageFieldRef.current?.click();
                  }}
                >
                  <UploadIcon />
                </UploadButton>
              </div>
            )}
        </div>
      </div>
      {errors.displayImage && <Typography fontSize={12} variant='subtitle1' color='error' >
        {errors[registerName]?.message}
      </Typography>}
      {!showLable && <div style={{ marginTop: "15px", textAlign: "center" }}>{side}</div>}
    </div>
  );
};