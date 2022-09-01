import React, { useState } from 'react';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ShareIcon from '@mui/icons-material/Share';
import { IconButton, Typography } from '@mui/material';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { db } from '../../configs/firebaseConfig';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import SimpleModal from '@dropout-store/simple-modal';

export const MobileAddCart = ({ AddToCard }: { AddToCard: () => void }) => {
  const { user } = useSelector((state: RootState) => state.User);
  const { productid, resellerid } = useParams();
  const [modal, setmodal] = useState(false);

  const [isFavorite, setFavorite] = useState(false);
  const handelFavorite = async () => {
    // const dbRef = collection(db, 'wishlist');
    // if (isFavorite) {
    //   // remove it from doc
    //   const q = query(
    //     dbRef,
    //     where('productid', '==', `${productid}`),
    //     where('userId', '==', `${user?.uid}`)
    //   );
    //   const unsb = onSnapshot(q, (doc) => {
    //     console.log('run');
    //     console.log(doc.docs);
    //     const data = doc.docs.map((order) => ({ ...order.data() }));
    //     console.log(data);
    //   });
    // await  unsb();
    // } else {
    //   // add it
    //   await addDoc(dbRef, {
    //     productid: productid,
    //     resellerid: resellerid,
    //     userid: user?.uid,
    //   }).then(() => {
    //     console.log('data added successfully');
    //   });
    // }
    // setFavorite(!isFavorite);
  };
  return (
    <div className="grid grid-cols-4 h-14 border-solid border-gray-300 bottom-0 fixed bg-white w-screen z-10">
      <div className="flex justify-center items-center">
        <IconButton>
          <FavoriteOutlinedIcon
            color={`${isFavorite ? 'error' : 'disabled'}`}
            onClick={handelFavorite}
          />
        </IconButton>
      </div>
      <div className="flex justify-center items-center">
        <IconButton>
          <ShareIcon />
        </IconButton>
      </div>
      <div
        className="col-span-2 text-white flex justify-center items-center"
        style={{ backgroundColor: '#FF002E' }}
        onClick={AddToCard}
      >
        <Typography fontWeight={500}>ADD TO CART</Typography>
      </div>
    </div>
  );
};
