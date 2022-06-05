import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Loader from './components/Loader';

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
        <Layout />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
