import React, { useEffect, useState } from 'react';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ShareIcon from '@mui/icons-material/Share';
import { IconButton, Typography } from '@mui/material';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { db } from '../../configs/firebaseConfig';
import { setDoc, doc, updateDoc } from 'firebase/firestore';

export const MobileAddCart = ({ AddToCard }: { AddToCard: () => void }) => {
  const { user } = useSelector((state: RootState) => state.User);
  const { wishlist } = useSelector((state: RootState) => state.wishlist);
  const state = useSelector((state: RootState) => state);

  const [cureentItems, setCureentItems] = useState([...wishlist]);
  const { productid, resellerid } = useParams();
  console.log(cureentItems);
  const [isFavorite, setFavorite] = useState(false);

  useEffect(() => {
    if (
      cureentItems.some(
        (item) => item.productid === productid && item.resellerid === resellerid
      )
    ) {
      setFavorite(true);
      if (user) {
        const wishlistRef = doc(db, 'users', user.uid, 'wishlist', 'wishlist');
        console.log(cureentItems);
        setDoc(wishlistRef, {
          wishlists:cureentItems,
        });
      }
    }
  }, [cureentItems, productid, resellerid, user]);

  const handelFavorite = async () => {
    const obj = {
      productid,
      resellerid,
    };
    if (isFavorite) {
      // remove it
      setCureentItems(
        cureentItems.filter(
          (item) =>
            !(item.resellerid === resellerid && item.productid === productid)
        )
      );
    } else {
      // add
      cureentItems.push(obj);
    }
    localStorage.setItem('wishlist', JSON.stringify(cureentItems));

    setFavorite(!isFavorite);
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
