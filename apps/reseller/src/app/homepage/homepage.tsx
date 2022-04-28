import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux-tool/auth';
import { RootState } from '../../redux-tool/store';
import './homepage.css';

/* eslint-disable-next-line */
export interface HomepageProps { }

export function Homepage(props: HomepageProps) {

  const dispatch = useDispatch()

  const logout = () => {
    dispatch(logoutUser())
  }

  const User = useSelector((state: RootState) => state.User.User)
  console.log(User?.uid);


  return (
    <div style={{ textAlign: "center" }}>
      <h1>logged in</h1>
      <Button onClick={logout} variant='contained' color='primary'>Log Out</Button>
    </div>
  );
}

export default Homepage;
