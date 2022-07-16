import { MiuracImage } from '@miurac/image-upload'
import { Upload } from '@mui/icons-material'
import React, { useState } from 'react'
import { app } from '../../firebaseConfig/config'

export const BankStatement = () => {
    const [bankStatement, setbankStatement] = useState<string | null>(null)
    return (
        <div className='my-10 mx-2 space-y-5 md:max-w-2xl md:m-auto md:shadow-2xl md:p-10'>
            {/* <MiuracImage app={app} updateFirestore={true} editConfig={null} setUrlFunc={(url: string) => setbankStatement(url)} /> */}
            <div className='w-3/4 m-auto  border-dashed border-gray-300 h-24 rounded-md flex justify-center items-center'>
                <Upload />
            </div>
        </div>
    )
}
