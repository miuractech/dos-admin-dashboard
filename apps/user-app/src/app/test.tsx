import { MiuracImage } from '@miurac/image-upload';
import React, { useState } from 'react'
import { app } from '../configs/firebaseConfig';
import Auth from '../features/auth/auth';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

// eslint-disable-next-line no-empty-pattern
export default function Test({}: Props) {
    const [url, setUrl] = useState<null | string>(null)
  return (
    <div>
        <div>
            {url ?
            <>
            <img src={url} alt="" />
            <button onClick={()=>setUrl(null)} >
                remove image
            </button>
            </>
            :
                <MiuracImage 
                app={app} 
                authComponent={<Auth />} 
                updateFirestore={false} 
                editConfig={{
                    aspectX:1,
                    aspectY:1            
                }} setUrlFunc={(url)=>setUrl(url)} 

                />
            }
        </div>
    </div>
  )
}