import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import store from './redux/store';
import Body from './components/body';
import AddProduct from './components/addproducts';
import Checkout from './components/checkout';
import Navbar from './components/navbar';
import './App.css';

function App() {
  const router = createBrowserRouter([ {
    path: '/',
    element: <Navbar />,
    children: [
      { path: "", element: <Body /> },
      { path: "/CheckOut", element: <Checkout /> },
      {path: '/Addproduct1', element: <AddProduct />}
    ],},
  ]);
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>

  );
}

export default App;
