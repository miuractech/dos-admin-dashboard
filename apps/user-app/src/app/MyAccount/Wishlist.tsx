import { Box, Button, Card, Tab, Tabs, Typography } from '@mui/material';

import React, { useEffect, useState } from 'react';
import fav from './images/fav.svg';
<<<<<<< HEAD

import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
=======
import tshirt from './images/t-shirt.png';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
>>>>>>> 148c4c17dbc00a3644d5f797415061216911eddc
import { db } from '../../configs/firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { addWishListProducts } from '../../store/myProfileSlice';
import ProductsCard from '../components/ProductsCard';
import { produstsType } from '../../store/storeFrontslice';
import { setError } from '../../store/alertslice';

export default function WishList() {
  const { user } = useSelector((state: RootState) => state.User);
  const { whishListProducts } = useSelector((state: RootState) => state.myProfile);
  const [yourOrders, setyourOrders] = React.useState<any>([]);
  const dispatch = useDispatch()
  const [value, setValue] = React.useState('1');

  // const handleChange = (event: React.SyntheticEvent, newValue: string) => {
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
    if (whishListProducts.length===0) {
      getDos()
    }
  }, [])
  
  const getDos = async() => {
    try {
      if (user) {
        console.log(user.uid);
        const wishlistRef = collection(db, "users", user.uid, "wishlist")
        const querySnapShot = await getDocs(wishlistRef)
        const docs = querySnapShot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        docs.forEach(async(pro:any) => {
          const docRef = doc(
            db,
            'reSellers',
            pro.resellerId,
            'products',
            pro.productId
          );
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            dispatch(addWishListProducts({ ...docSnap.data(), whishListId:pro.id }))
          }
        })
    }
    } catch (error) {
      console.log(error);
    }
  }

  console.log(whishListProducts);

  return (
<<<<<<< HEAD
    // <div className="mt-10 md:mt-10  md:m-auto min-h-fit p-10">
    //   <Card className="md:px-5">
    //     <div className="flex justify-center align-middle mt-10">
    //       <img src={fav} alt="order" />
    //       <Typography variant="h5" className="mx-4 font-semibold">
    //         WishList
    //       </Typography>
    //     </div>

    //     <Box className="my-10 w-100% m-atuo">
    //       <div className="grid md:grid-cols-3 gap-8 items-center align-middle justify-items-center ">
    //         {/* card  */}
    //         <div className="flex justify-center  px-10">
    //           <Card className="p-5 text-center">
    //             <img
    //               src="https://firebasestorage.googleapis.com/v0/b/dropoutstore-8979d.appspot.com/o/resellerProducts%2F129ed9d5-5772-4f7a-9071-85067a392d40%2F1d7666f6-5f53-4e3a-b8d7-2b3a0fb13bd4?alt=media&token=3f86e7a4-0f41-48ff-832d-0682ddd2c265"
    //               alt=""
    //               className="object-cov w-60 h-60   "
    //             />
    //             <div className="flex  my-3">
    //               <div className="flex-1">
    //                 <Typography variant="h6">Pengiven Tshirt</Typography>
    //                 <div className="flex my-2">
    //                   <div className="mx-3 flex">
    //                     <div className="w-8 h-8 mr-2 bg-red-700 rounded-full"></div>
    //                     <div className="w-8 h-8 mr-2 bg-green-700 rounded-full"></div>
    //                     <div className="w-8 h-8 mr-2 bg-black rounded-full"></div>
    //                   </div>
    //                 </div>
    //               </div>
    //               <Typography variant="h6">₹ 99</Typography>
    //             </div>
    //           </Card>
    //         </div>
    //       </div>
    //     </Box>
    //   </Card>
    // </div>
    <div className='grid grid-cols-4 gap-5'>
      {whishListProducts.map((pro) =>(
        <div>
          <ProductsCard
            key={pro.whishListId}
            comparedPrice={pro.comparePrice}
            images={pro.sideImages}
            price={pro.price}
            productName={pro.productName}
            sizeArray={pro.sizeAvailable}
          />
          <Button onClick={async() => {
            try {
              if (!user) return
              alert(user.uid)
              const deleteRef = doc(db, "users", user.uid, "wishlist", pro.whishListId)
              await deleteDoc(deleteRef)
              alert(pro.whishListId)
            } catch (error) {
              console.log(error);
              dispatch(setError("Unable to delete try again"))
              alert("error")
            }
            
          }}>Delete</Button>
      </div>))}
=======
    <div className="mt-10 md:mt-10  md:m-auto min-h-fit  md:p-10 ">
      <Card className="md:px-5">
        <div className="flex justify-center align-middle mt-10">
          <img src={fav} alt="heart" />
          <Typography variant="h5" className="mx-4 font-semibold">
            My Designs
          </Typography>
        </div>

        <Box className="my-10 ">
          <div className="w-4/5 flex-wrap m-auto grid lg:grid-cols-3 md:grid-cols-2 gap-8 items-center align-middle justify-items-center ">
            {/* card  */}
            <div className="w-72  ">
              <div className="text-center w-full h-72">
                <img
                  src={tshirt}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <Card className="rounded-none px-8 shadow-md">
                <div className="flex  my-3">
                  <div className="flex-1">
                    <Typography variant="h6">Pengiven Tshirt</Typography>
                    <div className="flex my-2">
                      <div className="mx-3 flex">
                        <div className="w-8 h-8 mr-2 bg-red-700 rounded-full"></div>
                        <div className="w-8 h-8 mr-2 bg-green-700 rounded-full"></div>
                        <div className="w-8 h-8 mr-2 bg-black rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <Typography variant="h6">₹ 99</Typography>
                </div>
              </Card>
            </div>{' '}
            <div className="w-72  ">
              <div className="text-center w-full h-72">
                <img
                  src={tshirt}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <Card className="rounded-none px-8 shadow-md">
                <div className="flex  my-3">
                  <div className="flex-1">
                    <Typography variant="h6">Pengiven Tshirt</Typography>
                    <div className="flex my-2">
                      <div className="mx-3 flex">
                        <div className="w-8 h-8 mr-2 bg-red-700 rounded-full"></div>
                        <div className="w-8 h-8 mr-2 bg-green-700 rounded-full"></div>
                        <div className="w-8 h-8 mr-2 bg-black rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <Typography variant="h6">₹ 99</Typography>
                </div>
              </Card>
            </div>{' '}
            <div className="w-72  ">
              <div className="text-center w-full h-72">
                <img
                  src={tshirt}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <Card className="rounded-none px-8 shadow-md">
                <div className="flex  my-3">
                  <div className="flex-1">
                    <Typography variant="h6">Pengiven Tshirt</Typography>
                    <div className="flex my-2">
                      <div className="mx-3 flex">
                        <div className="w-8 h-8 mr-2 bg-red-700 rounded-full"></div>
                        <div className="w-8 h-8 mr-2 bg-green-700 rounded-full"></div>
                        <div className="w-8 h-8 mr-2 bg-black rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <Typography variant="h6">₹ 99</Typography>
                </div>
              </Card>
            </div>{' '}
            <div className="w-72  ">
              <div className="text-center w-full h-72">
                <img
                  src={tshirt}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <Card className="rounded-none px-8 shadow-md">
                <div className="flex  my-3">
                  <div className="flex-1">
                    <Typography variant="h6">Pengiven Tshirt</Typography>
                    <div className="flex my-2">
                      <div className="mx-3 flex">
                        <div className="w-8 h-8 mr-2 bg-red-700 rounded-full"></div>
                        <div className="w-8 h-8 mr-2 bg-green-700 rounded-full"></div>
                        <div className="w-8 h-8 mr-2 bg-black rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <Typography variant="h6">₹ 99</Typography>
                </div>
              </Card>
            </div>
          </div>
        </Box>
      </Card>
>>>>>>> 148c4c17dbc00a3644d5f797415061216911eddc
    </div>
  );
}
