import './App.css';
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Loading from './pages/loading';
import Form from './pages/form';
import Menu from './pages/menu';
import Dicta from './components/dicta';
import Level_1 from './components/level_1';
import Level_2 from './components/level_2';
import Level_3 from './components/level_3';
import Level_4 from './components/level_4';
import Level_5 from './components/level_5';

function App() {

  const router = createBrowserRouter ([
    
    {path: '/', element: <Level_1 />},
    
    {path: '/loading', element: <Loading />},
    
    {path: '/form', element: <Form />},
    
    {path: '/menu', element: <Menu />},

    {path: '/dicta', element: <Dicta />},

    {path: '/level2', element: <Level_2 />},

    {path: '/level3', element: <Level_3 />},

    {path: '/level4', element: <Level_4 />},

    {path: '/level5', element: <Level_5 />},

  ])

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
