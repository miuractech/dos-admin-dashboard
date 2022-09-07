import { Box, Button, Card, Tab, Tabs, Typography } from '@mui/material';

import React, { useEffect, useState } from 'react';
import fav from './images/fav.svg';

import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../configs/firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { addWishListProducts } from '../../store/myProfileSlice';
import ProductsCard from '../components/ProductsCard';
import { produstsType } from '../../store/storeFrontslice';
import { setError } from '../../store/alertslice';

export default function WishList() {
  const { user } = useSelector((state: RootState) => state.User);
  const { whishListProducts } = useSelector(
    (state: RootState) => state.myProfile
  );
  const [yourOrders, setyourOrders] = React.useState<any>([]);
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('1');

  //   setValue(newValue);
  // };
  // useEffect(() => {
  //   const ordersRef = collection(db, 'orders');
  //   const q = query(
  //     ordersRef,
  //     where('status', '==', 'success'),
  //     where('userId', '==', `${user?.uid}`)
  //   );

  //   const unsub = onSnapshot(q, (doc) => {
  //     console.log(doc.docs);
  //     const data = doc.docs.map((order) => ({ ...order.data() }));
  //     console.log(data);
  //     setyourOrders(data[0]);
  //   });
  //   return () => unsub();
  // }, []);
  // console.log(yourOrders.items);
  useEffect(() => {
    if (whishListProducts.length === 0) {
      getDos();
    }
  }, []);

  const getDos = async () => {
    try {
      if (user) {
        console.log(user.uid);
        const wishlistRef = collection(db, 'users', user.uid, 'wishlist');
        const querySnapShot = await getDocs(wishlistRef);
        const docs = querySnapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        docs.forEach(async (pro: any) => {
          const docRef = doc(
            db,
            'reSellers',
            pro.resellerId,
            'products',
            pro.productId
          );
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            dispatch(
              addWishListProducts({ ...docSnap.data(), whishListId: pro.id })
            );
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(whishListProducts);

  const removefav = async (whishListId: string) => {
    try {
      if (!user) return;

      const deleteRef = doc(db, 'users', user.uid, 'wishlist', whishListId);
      await deleteDoc(deleteRef);
    } catch (error) {
      console.log(error);
      dispatch(setError('Unable to delete try again'));
      alert('error');
    }
  };

  return (
    <div className="mt-10 md:mt-10  md:m-auto min-h-fit p-10">
      <Card className="md:px-5">
        <div className="flex justify-center align-middle mt-10">
          <img src={fav} alt="order" />
          <Typography variant="h5" className="mx-4 font-semibold">
            WishList
          </Typography>
        </div>

        <Box className="my-10 w-100% m-atuo">
          <div className="grid md:grid-cols-3 gap-8 items-center align-middle justify-items-center ">
            {/* card  */}

            {whishListProducts.map((pro) => (
              <div>
                <ProductsCard
                  key={pro.whishListId}
                  comparedPrice={pro.comparePrice}
                  images={pro.sideImages}
                  price={pro.price}
                  productName={pro.productName}
                  sizeArray={pro.sizeAvailable}
                />
                <Button onClick={() => removefav(pro.whishListId)}>
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </Box>
      </Card>
    </div>
  );
}
