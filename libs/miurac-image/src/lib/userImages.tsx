import { ArrowBackIosNew, ArrowForwardIos, Forward } from '@mui/icons-material'
import { Button, CircularProgress, IconButton, ImageList, ImageListItem } from '@mui/material'
import { FirebaseApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { collection, getDocs, getFirestore, limit, orderBy, query, startAfter } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { usePagination } from './hooks/pagination'
import { stateUrl } from './miurac-image'


type Props = {
  app: FirebaseApp,
  getUrl: (url: string) => void
  setUrl: React.Dispatch<React.SetStateAction<stateUrl | null>>,
  editMode: boolean
}


export default function UserImages({ app, getUrl, setUrl, editMode }: Props) {

  const { loadMore } = usePagination(app)

  const [lastVisibleRecord, setLastVisibleRecord] = useState<any>(null)
  const [imagesList, setImagesList] = useState<any>([])
  const [dosExists, setDosExists] = useState(false)
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  const db = getFirestore(app)
  const user = getAuth(app).currentUser


  useEffect(() => {
    getRecentlyUploaded()
  }, [])

  const getRecentlyUploaded = async () => {
    const q = query(collection(db, `uploads/${user?.uid}/images`), orderBy("createdAt", 'desc'), limit(12));
    const querySnapshot = await getDocs(q);
    setImagesList(querySnapshot.docs.map((data) => ({ ...data.data(), id: data.id })))
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]
    setLastVisibleRecord(lastVisible)
  }


  return (
    <div>
      <ImageList sx={{ width: "100%", height: 400 }} cols={6} rowHeight={150}>
        {imagesList.map((item: any) => (
          <ImageListItem
            key={item.id}
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (editMode) {
                console.log('edit mode');

                setUrl({ url: item.url, fileName: item.name })
              } else {
                getUrl(item.url)
              }
            }}
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
      <div ref={endRef} />
      <div style={{ display: "flex", gap: "50px", justifyContent: "center" }}>
        <Button
          variant='outlined'
          onClick={() => loadMore({
            lastVisibleRecord, setLastVisibleRecord, setDosExists, setImagesList
          })}
          disabled={dosExists}>Load More</Button>
      </div>
    </div >
  )
}