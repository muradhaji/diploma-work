import { Suspense } from 'react';
import './App.css';
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
    ></Suspense>
  );
}

export default App;
