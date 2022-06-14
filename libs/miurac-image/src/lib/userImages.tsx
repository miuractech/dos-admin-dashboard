import { ImageList, ImageListItem } from '@mui/material'
import { FirebaseApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'


type Props = {
    app: FirebaseApp,
    getUrl:(url:string)=>void
}


export default function UserImages({app,getUrl}: Props) {

    const [imagesList, setImagesList] = useState<any>([])

    const db = getFirestore(app)
    const user = getAuth(app).currentUser

    useEffect(() => {
        getRecentlyUploaded()
      }, [])

    const getRecentlyUploaded = async () => {
        const q = query(collection(db, `uploads/${user?.uid}/images`), orderBy("createdAt", 'desc'));
        const querySnapshot = await getDocs(q);
        setImagesList(querySnapshot.docs.map((data) => ({ ...data.data(), id: data.id })))
      }
      console.log(imagesList);
      

  return (
    <ImageList sx={{ width: "100%", height: 400 }} cols={6} rowHeight={150}>
    {imagesList.map((item: any) => (
      <ImageListItem
        key={item.id}
        style={{ cursor: "pointer" }}
        onClick={() => getUrl(item.url)}
      >
        <img
          className='images'
          loading="lazy"
          src={item.url}
          alt="recent upload"
        />
      </ImageListItem>
    ))}
  </ImageList>
  )
}