import './App.css';
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Loading from './pages/loading';
import Form from './pages/form';
import Game from './components/game';
import RootLayout from './components/RootLayout';


function App() {

  const router = createBrowserRouter ([
    
    {
      path: "/",
      element: <Loading />,
    },
    {
      path: "/root",
      element: <RootLayout />,
      children: [
        {
          path: "game",
          element: <Game />,
        },
        {
          path: "form",
          element:<Form />
        }
      ],
    },
  ])

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
