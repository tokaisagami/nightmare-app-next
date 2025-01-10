import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import dynamic from 'next/dynamic';

const DisplayNightmare = dynamic(() => import('./components/DisplayNightmare'), { ssr: false });

const ModifiedNightmarePage: React.FC = () => {
  return (
    <Provider store={store}>
      <DisplayNightmare />
    </Provider>
  );
};

export default ModifiedNightmarePage;
