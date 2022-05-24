import { UploadIcon } from '@admin/assets';
import { Clear } from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';
import usePreviewImage from '../../../../hooks/preview-image';
import React, { useEffect, useState } from 'react'
import { UploadButton } from '../../../global/buttons';
import { TRegister, TSetValue, TWatch } from './shared'
import styles from '../styles/product-type.module.scss';
import SimpleModal from '../../../global/simpleModal/modal';
import { DesignArea } from './DesignArea';
import AreYouSure from '../../../../UI/dosinput/AreYouSure';
type Props = {
    register:TRegister;
    colours:{colorName:string,colorCode:string}[];
    setValue:TSetValue;
    watch:TWatch;
    errors:any;
}
const sides = [{side:"Front"},{side:"Back"} ,{side:"Left"} ,{side:"Right"} ,{side:"Top"}, {side:"Bottom"}]  

export default function SideImages({register,colours, setValue,watch,errors}: Props) {
    console.log(colours);
  return (
    <div>
        {colours.map(({colorCode,colorName})=>(
            <div>
                <Typography variant='h6' align='center' gutterBottom>{colorName}</Typography>
                <Grid  container columnSpacing={2} justifyContent="center" marginBottom={10}>
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
                            registerName={`sideImages.${colorName}.${element.side}`}
                            />
                    </Grid>
                )
                })}
                </Grid>
        </div>
        ))}
    </div>
  )
}

export const ProductDisplayImage: React.FC<{
    register: TRegister;
    registerName:string;
    setValue: TSetValue;
    watch: TWatch;
    errors: any
    showLable: boolean
    side?:string
  }> = ({ register, setValue, watch, errors, showLable, side, registerName }) => {
    const [imageFile, setImageFile] = useState<any>(null)
    const [exit, setExit] = useState(false)
    const [preview, setPreview] = useState<string | null>(null)
    // const { preview } = usePreviewImage(watch(registerName));
    const imageFieldRef = React.useRef<HTMLInputElement | null>();
    useEffect(() => {
      let url: string;
      if(imageFile){
        url = URL.createObjectURL(imageFile)
        setPreview(url)
      }else{
        setPreview(null)
      }
      return () => {
        URL.revokeObjectURL(url)
        // setImageFile(null)
        // setPreview(null)
      }
    }, [imageFile])
    console.log(
      'imageFile',imageFile,preview
    );
    
    return (
      <div>
         <div className={styles['field-container']}>
        {showLable && <label>Display Image:</label>}
        <div>
          <SimpleModal disableCloseButton open={Boolean(preview)} onClose={()=>setExit(true)} >
            <div key={registerName}>
              <DesignArea url={preview?preview:''} />
            </div>
          </SimpleModal>
          <AreYouSure open={exit} onClose={()=>setExit(false)} discard={()=>{setExit(false);setPreview(null);setImageFile(null)}} text="discard the image?" />
          {/* {
          preview.length > 0 ? (
            <div style={{ position: "relative", maxHeight: "200px", maxWidth: "200px" }}>
              <IconButton
                size="small"
                style={{
                  backgroundColor: '#888',
                  color: 'white',
                  position: "absolute",
                  right: "0px"
                }}
                onClick={() => setValue(registerName, undefined)}
              >
                <Clear />
              </IconButton>
              < img
                src={preview}
                style={{
                  objectFit: 'cover', maxHeight: "200px", maxWidth: "200px", display: "block"
                }}
                alt=""
              />
            </div>
          ) : ( */}
            <div style={{ height: 100, width: 100 }}>
              <input
                type="file"
                style={{ display: 'none', }}
                // {...register(registerName)}
                onChange={(e)=>{
                  console.log(e.target.files)
                  if(e.target.files && e.target.files?.length>0) {
                    setImageFile(e.target.files[0])
                  }}
                }
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
          {/* )} */}
        </div>
        </div>
        {errors.displayImage && <Typography fontSize={12} variant='subtitle1' color='error' >
            {errors[registerName]?.message}
          </Typography>}
      {!showLable && <div style={{marginTop:"15px", textAlign:"center"}}>{ side}</div>}
     </div>
    );
  };