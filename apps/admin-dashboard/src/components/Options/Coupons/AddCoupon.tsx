import { Button, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { RichTextEditor } from '@mantine/rte';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { firestore } from '../../../config/firebase.config';
import { setBackDrop, seterror, setNotification } from '../../../store/alert';

 export type Inputs = {
    target: string,
    amount: number,
    percentage: number,
    percentageupto:number,
    couponCode: string,
    couponName: string,
    description: string,
    minOrderValue: number,
    numUsage: number,
     couponType: "Flat" | "Flat Percentage" | "Percentage Upto",
     userPhone: number,
     expiryDate: any,
     enabled: boolean,
     id:string
};

const schema = yup.object({
    couponName: yup.string().min(3).required('Coupon name is required').required('Coupon name is required'),
    target: yup.string().required('Target is required'),
    amount: yup.number().typeError("Only digits").positive().integer(),
    percentage: yup.number().typeError("Only digits").min(1).max(100).positive().integer(),
    percentageupto: yup.number().typeError("Only digits").positive().integer(),
    couponCode: yup.string().min(3).max(20).required('Coupon code is required'),
    description: yup.string().min(20).max(200).required('Description is required'),
    minOrderValue: yup.number().typeError("Only digits").required('Amount is required').positive().integer(),
    numUsage: yup.number().typeError("Only digits").min(1).required('Is required').positive().integer(),
    couponType: yup.string().required('Type is required'),
    userPhone: yup.number().typeError('enter only numbers').positive('cannot contain special characters').integer('cannot contain special characters').min(6000000000, 'enter valid phone number').max(9999999999, 'enter valid phone number')

});

export const AddCoupon = ({ setModal }: { setModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const { register, setValue, handleSubmit,setError, unregister, watch, formState: { errors }, reset } = useForm<Inputs>({
        resolver: yupResolver(schema),
    });
    const [type, setType] = useState<"Flat" | "Flat Percentage" | "Percentage Upto">("Flat")
    const [date, setDate] = React.useState<Date | null>(new Date());
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(setBackDrop(true))
        setType(watch("couponType"));
        if (watch("couponType") === "Flat") {
            unregister("percentage")
            unregister("percentageupto")
        } else if (watch("couponType") === "Flat Percentage") {
            unregister("amount")
            unregister("percentageupto")
        } else if (watch("couponType") === "Percentage Upto") {
            unregister("amount")
        }
        if (watch("target") !== "Target User") {
            unregister("userPhone")
        }
        dispatch(setBackDrop(false))
    }, [watch("couponType"), watch("target")])

    const onSubmit = async(data: Inputs) => {
            if (data.amount > data.minOrderValue) {
                setError("amount", { message: "Discount cannot be more than minimum order" })
            } else {
                try {
                    dispatch(setBackDrop(true))
                   await addDoc(collection(firestore, "coupons"), {
                       ...data,
                       expiryDate: date,
                       enabled:false
                   });
                   dispatch(setNotification("Successfully added coupon"))
                    dispatch(setBackDrop(false))
                    reset()
                    setModal(false)
               } catch (error) {
                   console.log(error);
                    dispatch(seterror("Error adding coupon try again"))
                    dispatch(setBackDrop(false))
               }

            }
    }
console.log(errors);

    return (
        <div className='p-5'>
            <Typography variant='h5' fontWeight={500}>ADD COUPONS</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-2 m-5 gap-5 items-center justify-items-start'>
                    <Typography>Target :</Typography>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        inputProps={{ ...register("target") }}
                        size="small"
                        defaultValue="All Users"
                        error={Boolean(errors.target)}
                    >
                        <MenuItem value={"All Users"}>All Users</MenuItem>
                        <MenuItem value={"Target User"}>Target User</MenuItem>
                        <MenuItem value={"New User"}>New User</MenuItem>
                    </Select>
                    {watch("target") === "Target User" &&
                        <Typography>User Number :</Typography>
                    }
                    {watch("target") === "Target User" &&
                        <TextField
                            size='small'
                            placeholder='Phone Number'
                        inputProps={{ ...register("userPhone") }}
                        error={Boolean(errors.userPhone)}
                        helperText={errors.userPhone?.message}
                        />
                    }
                    <Typography>Type :</Typography>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        inputProps={{ ...register("couponType") }}
                        size="small"
                        defaultValue="Flat"
                        error={Boolean(errors.couponType)}
                    >
                        <MenuItem value={"Flat"}>Flat</MenuItem>
                        <MenuItem value={"Flat Percentage"}>Flat Percentage</MenuItem>
                        <MenuItem value={"Percentage Upto"}>Percentage Upto</MenuItem>
                    </Select>
                    {type === "Flat" && 
                            <Typography>Amount :</Typography>
                    }
                    {type === "Flat" && 
                            <TextField
                                size='small'
                        placeholder='Amount'
                        inputProps={{ ...register("amount") }}
                        error={Boolean(errors.amount)}
                        helperText={errors.amount?.message}
                            />
                    }
                    {type === "Flat Percentage" &&
                            <Typography>Percentage :</Typography>
                    }
                    {type === "Flat Percentage" &&
                            <TextField
                                size='small'
                        placeholder='Percentage'
                        inputProps={{ ...register("percentage") }}
                        error={Boolean(errors.percentage)}
                        helperText={errors.percentage?.message}
                            />
                    }
                    {type === "Percentage Upto" &&
                            <Typography>Percentage :</Typography>
                    }
                    {type === "Percentage Upto" &&
                            <TextField
                                size='small'
                        placeholder='Percentage'
                        inputProps={{ ...register("percentage") }}
                        error={Boolean(errors.percentage)}
                        helperText={errors.percentage?.message}
                            />
                    }
                    {type === "Percentage Upto" &&
                            <Typography>Discount Upto :</Typography>
                    }
                    {type === "Percentage Upto" &&
                            <TextField
                                size='small'
                        placeholder='Amount'
                        inputProps={{ ...register("percentageupto") }}
                        error={Boolean(errors.percentageupto)}
                        helperText={errors.percentageupto?.message}
                            />
                    }
                    <Typography>Minimum order value :</Typography>
                    <TextField
                        size='small'
                        placeholder='Minimum order value'
                        inputProps={{ ...register("minOrderValue") }}
                        error={Boolean(errors.minOrderValue)}
                        helperText={errors.minOrderValue?.message}
                    />
                    <Typography>Max Usage / user :</Typography>
                    <TextField
                        size='small'
                        placeholder='Max Usage'
                        inputProps={{ ...register("numUsage") }}
                        error={Boolean(errors.numUsage)}
                        helperText={errors.numUsage?.message}
                    />
                    <Typography>Coupon Code :</Typography>
                    <TextField
                        size='small'
                        placeholder='Coupon Code'
                        inputProps={{ ...register("couponCode") }}
                        error={Boolean(errors.couponCode)}
                        helperText={errors.couponCode?.message}
                    />
                    <Typography>Coupon Name :</Typography>
                    <TextField
                        size='small'
                        placeholder='Coupon Name'
                        inputProps={{ ...register("couponName") }}
                        error={Boolean(errors.couponName)}
                        helperText={errors.couponName?.message}
                    />
                    <Typography>Expiry Date :</Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            value={date}
                            onChange={(newValue) => setDate(newValue)}
                            renderInput={(params) => <TextField size='small' {...params} />}
                        />
                    </LocalizationProvider>
                </div>
                <div style={{border:errors.description?.message?"1px solid red":"0px solid red"}}>
                    <RichTextEditor
                        value={watch('description')}
                        onChange={value => setValue('description', value)}
                        className="w-full"
                        controls={[
                            ['bold', 'italic', 'underline', 'link', 'image'],
                            ['unorderedList', 'h1', 'h2', 'h3'],
                            ['alignLeft', 'alignCenter', 'alignRight'],
                        ]}
                    />
                </div>
                <Typography color="red" variant='caption'>{errors.description?.message}</Typography>
                <div className='mt-10 flex gap-10 justify-center'>
                    <Button variant='outlined'>Cancel</Button>
                    <Button type='submit' variant='contained'>Save</Button>
                </div>
           </form>
    </div>
  )
}
