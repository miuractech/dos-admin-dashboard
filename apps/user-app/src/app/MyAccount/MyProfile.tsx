import { Box, Card, TextField, Typography } from '@mui/material';
import profile from './images/profile.svg';
import InputAdornment from '@mui/material/InputAdornment';
import EditIcon from '@mui/icons-material/Edit';
import { type } from 'os';
import { useEffect, useState } from 'react';
type UserInfo = {
  name: string;
  mobile: string;
  gender: 'Male' | 'Female';
  email: string;
};

export default function MyProfile() {
  const [user, setUser] = useState<UserInfo>({
    name: '',
    mobile: '',
    gender: 'Female',
    email: '',
  });
  const [isEdit, setIsEdit] = useState({
    name: true,
    email: true,
    gender: true,
    mobile: true,
  });
  useEffect(() => {
    console.log(user);
  }, [user]);
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
                value={user?.name}
                onChange={(e) => {
                  setUser({ ...user, name: e.target.value });
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
                value={user?.email}
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
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
                value={user?.mobile}
                onChange={(e) => {
                  setUser({ ...user, mobile: e.target.value });
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
                value={user?.gender || 'Female'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <span
                        className={`${
                          user.gender === 'Female' ? 'text-blue-600' : ''
                        }  font-medium hover:cursor-pointer`}
                        onClick={() => {
                          setUser({ ...user, gender: 'Female' });
                        }}
                      >
                        F
                      </span>
                      /
                      <span
                        className={`${
                          user.gender === 'Male' ? 'text-blue-600' : ''
                        }  font-medium hover:cursor-pointer`}
                        onClick={() => {
                          setUser({ ...user, gender: 'Male' });
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
