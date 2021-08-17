import React, { useState } from 'react';
import styles from './Card.module.scss';
import ContentLoader from 'react-content-loader';
function Card({
   id,
   imgUrl,
   title,
   price,
   onPlus,
   onFavorite,
   favorited = false,
   added = false,
   loading = false,
}) {
   const [isAdded, setIsAdded] = useState(added);
   const [isFavorite, setIsFavorite] = useState(favorited);
   const onClickPlus = () => {
      setIsAdded(!isAdded);
      onPlus({ imgUrl, title, price, id });
   };
   const onClickFavorite = () => {
      setIsFavorite(!isFavorite);
      onFavorite({ imgUrl, title, price, id });
      console.log(id);
   };
   return (
      <div className={styles.card}>
         {loading ? (
            <ContentLoader
               speed={2}
               width={210}
               height={245}
               viewBox='0 0 210 245'
               backgroundColor='#f3f3f3'
               foregroundColor='#ecebeb'
            >
               <rect x='251' y='-12' rx='10' ry='10' width='150' height='112' />
               <rect x='15' y='131' rx='5' ry='5' width='150' height='15' />
               <rect x='15' y='212' rx='5' ry='5' width='80' height='30' />
               <rect x='136' y='211' rx='10' ry='10' width='32' height='32' />
               <rect x='58' y='58' rx='0' ry='0' width='30' height='0' />
               <rect x='15' y='0' rx='10' ry='10' width='150' height='112' />
               <rect x='15' y='160' rx='5' ry='5' width='150' height='15' />
            </ContentLoader>
         ) : (
            <>
               <div className={styles.favorite} onClick={onClickFavorite}>
                  <img
                     src={
                        !isFavorite
                           ? '/img/HeartGrey.svg'
                           : '/img/HeartPink.svg'
                     }
                     alt='Heart'
                  />
               </div>
               <img width={'100%'} height={112} src={imgUrl} alt='shoes' />
               <h5>{title}</h5>
               <div className={styles.cardBottom}>
                  <div className={styles.cardPrice}>
                     <span>Цена:</span>
                     <b>
                        {price[0]} {price.slice(1)} грн.
                     </b>
                  </div>
                  {!isAdded ? (
                     <button className={styles.btnB} onClick={onClickPlus}>
                        <img
                           width={11}
                           height={11}
                           src='/img/plus.svg'
                           alt='plus'
                        />
                     </button>
                  ) : (
                     <img
                        className={styles.btnB}
                        onClick={onClickPlus}
                        width={11}
                        height={11}
                        src='/img/btn-checked.svg'
                        alt='plus'
                     />
                  )}
               </div>
            </>
         )}
      </div>
   );
}
export default Card;
