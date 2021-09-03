import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import Drawer from './components/Drawer';
import Header from './components/Header';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';
import AppContext from './context';
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
         try {
            const [cartResponse, favoritesResponse, itemsResponse] =
               await Promise.all([
                  axios.get('https://61143472cba40600170c1e67.mockapi.io/cart'),
                  axios.get(
                     'https://61143472cba40600170c1e67.mockapi.io/favorites'
                  ),
                  axios.get(
                     'https://61143472cba40600170c1e67.mockapi.io/items'
                  ),
               ]);
            setIsLoading(false);
            setCartItems(cartResponse.data);
            setFavorites(favoritesResponse.data);
            setItems(itemsResponse.data);
         } catch (error) {
            alert('Ошибка при запросе данных ;(');
            console.log(error);
         }
      }
      fetchData();
   }, []);
   const addToCard = async (obj) => {
      try {
         const findItem = cartItems.find(
            (item) => Number(item.parentId) === Number(obj.id)
         );
         if (findItem) {
            removeFromCard(findItem.id);
         } else {
            setCartItems((prev) => [...prev, obj]);
            const { data } = await axios.post(
               'https://61143472cba40600170c1e67.mockapi.io/cart',
               obj
            );
            setCartItems((prev) =>
               prev.map((item) => {
                  if (item.parentId === data.parentId) {
                     return {
                        ...item,
                        id: data.id,
                     };
                  }
                  return item;
               })
            );
         }
      } catch (error) {
         alert('Не удалось добавить корзину');
      }
   };
   const removeFromCard = async (id) => {
      try {
         setCartItems((prev) =>
            prev.filter((item) => Number(item.id) !== Number(id))
         );
         await axios.delete(
            `https://61143472cba40600170c1e67.mockapi.io/cart/${id}`
         );
      } catch (error) {
         alert('Не удалось удалить товар =(');
         console.log(error);
      }
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
   const isItemAdded = (id) => {
      return cartItems.some((obj) => Number(obj.parentId) === Number(id));
   };
   return (
      <AppContext.Provider
         value={{
            items,
            cartItems,
            favorites,
            isItemAdded,
            setCartOpened,
            setCartItems,
            onAddToFavorite,
            addToCard,
         }}
      >
         <div className='wrapper'>
            <Drawer
               items={cartItems}
               total={setTotalPrice}
               onClose={() => {
                  setCartOpened(false);
                  document.body.style.overflow = 'auto';
               }}
               onRemove={removeFromCard}
               opened={cartOpened}
            />
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
                  addToCard={addToCard}
                  onAddToFavorite={onAddToFavorite}
               />
            </Route>
            <Route path='/orders'>
               <Orders />
            </Route>
         </div>
      </AppContext.Provider>
   );
}

export default App;
