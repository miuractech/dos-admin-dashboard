// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import NewsLetter from './news-letter/news-letter';
import { Route, Routes } from 'react-router-dom';
import Home from './regHomePage/home';
import Registration1 from './registration/registration';
import RegistrationPassword from './confrimPassword/registration-password';
import { Provider } from 'react-redux'
import { store } from '../redux-tool/store';
import { ProtectedRoute } from './protected';
import Homepage from './homepage/homepage';
import Login from './loginpage/login';

export function App() {

  return (
    <Provider store={store}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/singup" element={<Registration1 />} />
        <Route path="/password" element={<RegistrationPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
      </Routes>
      <NewsLetter />
    </Provider>
  );
}

export default App;
