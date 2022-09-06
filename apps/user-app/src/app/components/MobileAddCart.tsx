import React, { useState } from 'react';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ShareIcon from '@mui/icons-material/Share';
import { Drawer, IconButton, Typography } from '@mui/material';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
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
import { setError } from '../../store/alertslice';
import { GetOTP } from './cart/GetOTP';
import { GetPhoneNumber } from './cart/GetPhoneNumber';

export const MobileAddCart = ({ AddToCard }: { AddToCard: () => void }) => {
  const { user, step } = useSelector((state: RootState) => state.User);
  const { product } = useSelector((state: RootState) => state.product);
  // const { productid, resellerid } = useParams();
  const [authModal, setAuthModal] = useState(false)
  const dispatch =useDispatch()
  console.log(user);
  

  const [isFavorite, setFavorite] = useState(false);
  // const handelFavorite = async () => {
  //   const dbRef = collection(db, 'wishlist');
  //   if (isFavorite) {
  //     // remove it from doc
  //     const q = query(
  //       dbRef,
  //       where('productid', '==', `${productid}`),
  //       where('userId', '==', `${user?.uid}`)
  //     );
  //     const unsb = onSnapshot(q, (doc) => {
  //       console.log('run');
  //       console.log(doc.docs);
  //       const data = doc.docs.map((order) => ({ ...order.data() }));
  //       console.log(data);
  //     });
  //   await  unsb();

  //   } else {
  //     // add it
  //     await addDoc(dbRef, {
  //       productid: productid,
  //       resellerid: resellerid,
  //       userid: user?.uid,
  //     }).then(() => {
  //       console.log('data added successfully');
  //     });
  //   }
  //   setFavorite(!isFavorite);
  // };

  const handelFavorite = async () => {
    if (user) {
      const favRef = collection(db, "users", user.uid, "wishlist")
      try {
        if (!product)return
        await addDoc(favRef, {
          productId: product.productId,
          resellerId: product.resellerId,
          userId: user.uid,
        })
      } catch (error) {
        console.log(error);
        dispatch(setError("Unable to add to whishlist try again"))
      }
    } else {
      setAuthModal(true)
    }
   }
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
      <Drawer anchor='left' open={authModal} onClose={() => setAuthModal(false)}>
        {step === 'phone' ? (<GetPhoneNumber />) : (<GetOTP />)}
      </Drawer>
    </div>
  );
};
