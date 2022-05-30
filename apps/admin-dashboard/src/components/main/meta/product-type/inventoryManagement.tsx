import React from 'react';
import { Grid, Typography } from '@mui/material';
import {  TRegister, TSetValue } from './shared';
import { stringSum } from '../../../../utils/helpers/chartoAsciiSum';
import Sku from './sku';

type Props = {
    basicInfo:any
    // color:{colorCode:string,colorName:string}[],
    // size:string[],
    setValue:TSetValue
    getValue:any
    register:TRegister
    errors:any
}

export default function InventoryManagement({basicInfo,setValue,getValue, register,errors}: Props) {
    const {color, size, name,familyId, categoryId, subcategoryId} = basicInfo;
    
    
  return (
    <div style={{width:'80%',margin:'auto'}} >
        <Grid container spacing={3}>
            {/* table headers */}
            <Grid item xs={4}>
                <Typography variant='h6'>
                    Item
                </Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography variant='h6'>
                    SKU
                </Typography>
            </Grid>
            {/* Values */}
            {color.map(({colorName}:{colorName:string})=>(
                <React.Fragment key={colorName}>
                {size.map((s:string)=>(
                    <React.Fragment key={s}>
                        <Grid item xs={4}>
                            {colorName}/{s}
                        </Grid>
                        <Grid item xs={8}>
                            <Sku 
                            register={register} 
                            colorName={colorName} 
                            size={s} 
                            setValue={setValue} 
                            errors={errors}
                            key={`${colorName}-${s}`} 
                            sku={getValue(`sku.${colorName}.${s}`)?getValue(`sku.${colorName}.${s}`):`${name}-${stringSum(familyId)+stringSum(categoryId)+stringSum(subcategoryId)}-${colorName}-${s}`} 
                            />
                            {/* <div>
                                {`${name}-${stringSum(familyId)+stringSum(categoryId)+stringSum(subcategoryId)}-${colorName}-${s}`} 
                            </div>
                            <DOSInput defaultValue={`${name}-${stringSum(familyId)+stringSum(categoryId)+stringSum(subcategoryId)}-${colorName}-${s}`} forminput={{...register(`sku.${colorName}.${s}`,{required:true,min:2})}} /> */}
                        </Grid>
                        {/* <Grid item xs={4}>
                            <DOSInput type={'number'} defaultValue={null} forminput={{...register(`inventory.${colorName}.${s}`,{required:true,min:1})}}  />
                        </Grid> */}
                    </React.Fragment>
                ))}
                </React.Fragment>
            ))}
        </Grid>
    </div>
  )
}