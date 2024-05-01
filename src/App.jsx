import Menu from './components/menu';
import Loading from './components/loading';
import './App.css';
import {RouterProvider, createBrowserRouter } from 'react-router-dom';

function App() {

  const router = createBrowserRouter ([
    {path: '/',element: <Loading />,},

    {path: '/',element: <Menu />,},
    
  ])

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;

