import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Loader from './components/Loader';
import store from './Redux/store';

function App() {
  return (
    <Suspense
      fallback={
        <Loader
          fullScreen
          size='large'
          content='Zəhmət olmasa gözləyin.'
          bg='1'
          color='6'
        />
      }
    >
      <BrowserRouter>
        <Provider store={store}>
          <Layout />
        </Provider>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
