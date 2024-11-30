import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Loading from './components/Loading';
import { login } from '../store/slices/authSlice';
import { startLoading, stopLoading } from '../store/slices/loadingSlice';
import { RootState } from '../store/store';

export default function Home() {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.loading);

  useEffect(() => {
    dispatch(startLoading());
    const token = localStorage.getItem('authToken');
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      const payload = JSON.parse(jsonPayload);
      const userId = payload.user_id;

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      fetch(`${apiUrl}/api/v1/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          const user = { id: userId, name: data.name, email: data.email };
          console.log(user);
          dispatch(login(user));
          dispatch(stopLoading());
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          dispatch(stopLoading());
        });
    } else {
      dispatch(stopLoading());
    }
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="min-h-screen pt-16">
        {loading ? (
          <Loading />
        ) : (
          <HomePage />
        )}
      </div>
    </>
  );
}
