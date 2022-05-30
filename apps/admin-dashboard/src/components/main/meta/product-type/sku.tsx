import { Button } from '@mui/material';
import DOSInput from '../../../../UI/dosinput/dosinput';
import React, { useEffect, useState } from 'react'
import { Done, Edit } from '@mui/icons-material';
import { TRegister } from './shared';

type Props = {
    sku:string;
    setValue:any
    colorName:string;
    size:string;
    key:string;
    register:TRegister;
    errors:any;
}

export default function Sku({sku, setValue,colorName, size, key,register,errors }: Props) {
  return (
    <div key={key} >
        <DOSInput 
        defaultValue={sku} 
        error = {Boolean(errors && errors['sku'] && errors['sku'][colorName] && errors['sku'][colorName][size])}
        helperText={errors && errors['sku'] && errors['sku'][colorName] && errors['sku'][colorName][size]?.message}
        fullWidth
        forminput={{...register(`sku.${colorName}.${size}`,{required:true,min:2})}} 
        /> 
    </div>
  )
}