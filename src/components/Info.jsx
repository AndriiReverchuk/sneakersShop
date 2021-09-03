import React from 'react';
import AppContext from '../context';
import styles from './Drawer/Drawer.module.scss';

const Info = ({ img, title, description }) => {
   const { setCartOpened } = React.useContext(AppContext);
   return (
      <div>
         <div className={styles.cartNoItems}>
            <img
               className={styles.basket}
               width={120}
               heigth={120}
               src={img}
               alt='basket'
            />
            <h3>{title}</h3>
            <p>{description}</p>
            <button
               onClick={() => {
                  setCartOpened(false);
               }}
               className={styles.greenBtn}
            >
               <img
                  className={styles.arrowL}
                  src='/img/arrowL.svg'
                  alt='arrow'
               />
               Вернутся назад
            </button>
         </div>
      </div>
   );
};
export default Info;
