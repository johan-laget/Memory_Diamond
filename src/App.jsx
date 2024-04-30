import Menu from './components/menu';
import './App.css';
import {RouterProvider, createBrowserRouter } from 'react-router-dom';

function App() {

  const router = createBrowserRouter ([
    {path: '/',element: <Menu />,},
    
  ])

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;

