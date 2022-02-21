import './App.css';
import React, {lazy, Suspense} from 'react';
import Homepage from './pages/Homepage';
import MainMenu from './components/MainMenu/MainMenu';
import NavItem from './components/MainMenu/NavItem';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShirt, faTv} from '@fortawesome/free-solid-svg-icons';
import {Route, Routes} from 'react-router-dom';
import ToastManager from './components/notifications/ToastManager';
import {useToastContext} from './providers/ToastsProvider';

const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const AddProduct = lazy(() => import('./pages/AddProduct/AddProduct'));

function App() {
  const [toasts, ,] = useToastContext();

  return (
    <div className="container p-3">

      <section className="mb-5">
        <MainMenu>
          <NavItem navText={'Home'} to="/"/>
          <NavItem navText={'Clothes'} to="/products" navIcon={<FontAwesomeIcon icon={faShirt}/>}/>
          <NavItem navText={'Electronics'} to="/electronics" navIcon={<FontAwesomeIcon icon={faTv}/>}/>
        </MainMenu>
      </section>

      <Routes>
        <Route exact path="/" element={<Homepage department={'all'}/>}/>
        <Route exact path="/products" element={<Homepage department={'Clothes'}/>}/>
        <Route exact path="/electronics" element={<Homepage department={'Electronics'}/>}/>

        <Route path="/add-Product" element={
          <Suspense fallback={<p>... loading</p>}>
            <AddProduct/>
          </Suspense>
        }/>
        <Route path="/products/:id" element={
          <Suspense fallback={<p>... loading</p>}>
            <ProductDetails/>
          </Suspense>
        }/>

        <Route path="*" element={<main><h1>There is nothing here. Sorry</h1></main>}/>
      </Routes>

      <ToastManager
        toastList={toasts}/>
    </div>
  );
}

export default App;
