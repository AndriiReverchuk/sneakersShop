import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import Drawer from './components/Drawer';
import Header from './components/Header';
import Favorites from './pages/Favorites';
function App() {
   const [items, setItems] = useState([]);
   const [cartItems, setCartItems] = useState([]);
   const [favorites, setFavorites] = useState([]);
   const [searchValue, setSearchValue] = useState('');
   const [cartOpened, setCartOpened] = useState(false);
   const [totalPrice, setTotalPrice] = useState(0);
   const [isLoading, setIsLoading] = useState(true);
   useEffect(() => {
      async function fetchData() {
         const cartResponse = await axios.get(
            'https://61143472cba40600170c1e67.mockapi.io/cart'
         );
         const favoritesResponse = await axios.get(
            'https://61143472cba40600170c1e67.mockapi.io/favorites'
         );
         const itemsResponse = await axios.get(
            'https://61143472cba40600170c1e67.mockapi.io/items'
         );
         setIsLoading(false);
         setCartItems(cartResponse.data);
         setFavorites(favoritesResponse.data);
         setItems(itemsResponse.data);
      }
      fetchData();
   }, []);
   const addToCard = (obj) => {
      console.log(obj);
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
         removeFromCard(obj.id);
      } else {
         setCartItems((prev) => [...prev, obj]);
         axios.post('https://61143472cba40600170c1e67.mockapi.io/cart', obj);
      }
   };
   const removeFromCard = (id) => {
      axios.delete(`https://61143472cba40600170c1e67.mockapi.io/cart/${id}`);
      setCartItems((prev) =>
         prev.filter((item) => Number(item.id) !== Number(id))
      );

      console.log(id);
   };
   const onAddToFavorite = async (obj) => {
      try {
         if (favorites.find((item) => item.id === obj.id)) {
            axios.delete(
               `https://61143472cba40600170c1e67.mockapi.io/favorites/${obj.id}`
            );
            setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
         } else {
            const { data } = await axios.post(
               'https://61143472cba40600170c1e67.mockapi.io/favorites',
               obj
            );
            setFavorites((prev) => [...prev, data]);
         }
      } catch (error) {
         alert('Не удалось добавить фавориты');
      }
   };

   const onChangeSearchInput = (event) => {
      setSearchValue(event.target.value);
   };
   return (
      <div className='wrapper'>
         {cartOpened && (
            <Drawer
               items={cartItems}
               total={setTotalPrice}
               onClose={() => {
                  setCartOpened(false);
                  document.body.style.overflow = 'auto';
               }}
               onRemove={removeFromCard}
            />
         )}
         <Header
            onClickCart={() => {
               setCartOpened(true);
            }}
            total={totalPrice}
         />
         <Route exact path='/'>
            <Home
               items={items}
               cartItems={cartItems}
               searchValue={searchValue}
               onChangeSearchInput={onChangeSearchInput}
               setSearchValue={setSearchValue}
               addToCard={addToCard}
               onAddToFavorite={onAddToFavorite}
               isLoading={isLoading}
            />
         </Route>
         <Route path='/favorites'>
            <Favorites
               favorites={favorites}
               addToCard={addToCard}
               onAddToFavorite={onAddToFavorite}
            />
         </Route>
      </div>
   );
}

export default App;
