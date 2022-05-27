import { Button } from '@mui/material';
import DOSInput from '../../../../UI/dosinput/dosinput';
import React, { useEffect, useState } from 'react'
import { Done, Edit } from '@mui/icons-material';
import { TRegister } from './shared';

type Props = {
    sku:string;
    setValue:any
    colorName:string
    size:string
    key:string
    register:TRegister
}

export default function Sku({sku, setValue,colorName, size, key,register }: Props) {
    const [edit, setEdit] = useState(false)
    // const [value, setValues] = useState<string>('')
    // useEffect(() => {
    //     if(sku){
    //         setValues(sku)
    //     }
    // }, [sku])
    
  return (
    <div key={key} >
        <DOSInput 
        defaultValue={sku} 
        fullWidth
        forminput={{...register(`sku.${colorName}.${size}`,{required:true,min:2})}} 
        /> 
    </div>
  )
}