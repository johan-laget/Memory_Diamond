import './App.css';
import {RouterProvider, createBrowserRouter } from 'react-router-dom';
import Loading from './pages/loading';
import Form from './pages/form';
import Menu from './pages/menu';

function App() {

  const router = createBrowserRouter ([
    
    {path: '/',element: <Menu />,},

    {path: 'loading',element: <Loading />,},

    {path: 'form',element: <Form />,},


    
  ])

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;

