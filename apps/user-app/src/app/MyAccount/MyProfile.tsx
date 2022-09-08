import { Box, Card, TextField, Typography } from '@mui/material';
import profile from './images/profile.svg';
import InputAdornment from '@mui/material/InputAdornment';
import EditIcon from '@mui/icons-material/Edit';
import { type } from 'os';
import { useEffect, useState } from 'react';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { setError } from '../../store/alertslice';
import { db } from '../../configs/firebaseConfig';
import { addProfile } from '../../store/myProfileSlice';
type UserInfo = {
  name: string;
  mobile: string | null;
  gender: 'Male' | 'Female';
  email: string;
};

export default function MyProfile() {
  const { myProfile } = useSelector((state: RootState) => state.myProfile);
  const { user } = useSelector((state: RootState) => state.User);
  console.log(myProfile);
  const dispatch = useDispatch();

  let phoneNumber: null | string = '';
  if (user) phoneNumber = user.phoneNumber;
  const [userInfo, setUserInfo] = useState({
    name: '',
    mobile: phoneNumber,
    gender: 'Female',
    email: '',
  });

  const [isEdit, setIsEdit] = useState({
    name: true,
    email: true,
    gender: true,
    mobile: true,
  });

  const update = async () => {
    if (!user) return;
    const profileRef = doc(
      db,
      'users',
      user.uid,
      'profile',
      'PhTNiBcCFLRNveBnNFfq'
    );
    try {
      await updateDoc(profileRef, {
        name: userInfo.name,
        email: userInfo.email,
        phoneNumber: userInfo.mobile,
        gender: userInfo.gender,
      });
      const data = await getDoc(profileRef);
      console.log(data);
    } catch (error) {
      console.log(error);
      dispatch(setError('Unable to upadte profile try again'));
    }
  };

  const getProfile = async () => {
    if (!user) return;
    try {
      const profileRef = collection(db, 'users', user.uid, 'profile');
      const collections = await getDocs(profileRef);
      const profileId = collections.docs[0].id;

      const profileDocRef = doc(db, 'users', user.uid, 'profile', profileId);
      const profile = await getDoc(profileDocRef);
      const profileData = profile.data();
      dispatch(addProfile({ ...profileData, profileId }));
    } catch (error) {}
  };

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (myProfile && myProfile.profileId) update();
  }, [userInfo]);
  useEffect(() => {
    if (myProfile) {
      setUserInfo({
        name: myProfile.name,
        email: myProfile.email,
        mobile: myProfile.phoneNumber,
        gender: myProfile.gender,
      });
    }
  }, [myProfile]);

  return (
    <div className="mt-10 md:mt-10  md:m-auto min-h-fit md:p-10">
      <Card className="px-5 ">
        <div className="flex justify-center align-middle mt-10">
          <img src={profile} alt="profile" />
          <Typography variant="h5" className="mx-4 font-semibold">
            Profile
          </Typography>
        </div>

        <div className="flex ">
          <Box className="my-10  m-auto ">
            <div className="flex align-middle items-center my-5">
              <div className="mr-7 font-semibold text-xl">Name:</div>

              <TextField
                id="input-with-icon-textfield"
                disabled={isEdit.name}
                value={userInfo?.name}
                onChange={(e) => {
                  setUserInfo({ ...userInfo, name: e.target.value });
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="start"
                      className="hover:cursor-pointer text-blue-600 "
                      onClick={() =>
                        setIsEdit((val) => ({ ...val, name: !val.name }))
                      }
                    >
                      <EditIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </div>{' '}
            <div className="flex align-middle items-center my-5">
              <div className="mr-8 font-semibold text-xl">Email:</div>

              <TextField
                id="input-with-icon-textfield"
                disabled={isEdit.email}
                value={userInfo?.email}
                onChange={(e) => {
                  setUserInfo({ ...userInfo, email: e.target.value });
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="start"
                      className="hover:cursor-pointer text-blue-600 "
                      onClick={() =>
                        setIsEdit((val) => ({ ...val, email: !val.email }))
                      }
                    >
                      <EditIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </div>{' '}
            <div className="flex align-middle items-center my-5">
              <div className="mr-6 font-semibold text-xl">Mobile:</div>

              <TextField
                id="input-with-icon-textfield"
                disabled={isEdit.mobile}
                value={userInfo?.mobile}
                onChange={(e) => {
                  setUserInfo({ ...userInfo, mobile: e.target.value });
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="start"
                      className="hover:cursor-pointer text-blue-600 "
                      onClick={() =>
                        setIsEdit((val) => ({ ...val, mobile: !val.mobile }))
                      }
                    >
                      <EditIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </div>{' '}
            <div className="flex align-middle items-center my-5">
              <div className="mr-5 font-semibold text-xl">Gender:</div>

              <TextField
                id="input-with-icon-textfield "
                disabled={isEdit.gender}
                value={userInfo?.gender || 'Female'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <span
                        className={`${
                          userInfo.gender === 'Female' ? 'text-blue-600' : ''
                        }  font-medium hover:cursor-pointer`}
                        onClick={() => {
                          setUserInfo({ ...userInfo, gender: 'Female' });
                        }}
                      >
                        F
                      </span>
                      /
                      <span
                        className={`${
                          userInfo.gender === 'Male' ? 'text-blue-600' : ''
                        }  font-medium hover:cursor-pointer`}
                        onClick={() => {
                          setUserInfo({ ...userInfo, gender: 'Male' });
                        }}
                      >
                        M
                      </span>
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </div>
          </Box>
        </div>
      </Card>
    </div>
  );
}
