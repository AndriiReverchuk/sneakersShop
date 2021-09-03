import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context';
import Card from '../components/Card';

function Favorites({ addToCard, onAddToFavorite }) {
   const { favorites } = React.useContext(AppContext);
   console.log(favorites);
   return (
      <div className='content'>
         {favorites.length > 0 ? (
            <>
               <div className='favorites-header'>
                  <Link to='/'>
                     <img src='/img/SignLeft.svg' alt='Search' />
                  </Link>
                  <h1>Мои закладки</h1>
               </div>
               <div className='cards'>
                  {favorites.map((item, i) => (
                     <Card
                        key={i}
                        title={item.title}
                        price={item.price}
                        imgUrl={item.imgUrl}
                        onPlus={addToCard}
                        favorited={true}
                        id={item.id}
                        onFavorite={onAddToFavorite}
                     />
                  ))}
               </div>
            </>
         ) : (
            <div className='favorite-none'>
               <img width={70} height={70} src='/img/smile2.svg' alt='smile' />
               <h2>Закладок нет :(</h2>
               <p>Вы ничего не добавили в закладки</p>
               <Link to='/'>
                  <button className='btn-back'>
                     <img
                        className='arrowL'
                        src='/img/arrowL.svg'
                        alt='arrow'
                     />
                     Вернуться назад
                  </button>
               </Link>
            </div>
         )}
      </div>
   );
}
export default Favorites;
