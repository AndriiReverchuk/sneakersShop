import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
function Header(props) {
   return (
      <header>
         <Link to='/'>
            <div className={styles.headerLeft}>
               <img width={40} height={40} src='/img/logo.png' alt='logo' />
               <div>
                  <h3>Sneakers Shop</h3>
                  <p>Машазин лучших кросовок</p>
               </div>
            </div>
         </Link>
         <ul className={styles.headerRight}>
            <li onClick={props.onClickCart}>
               <img width={18} height={18} src='/img/busket.svg' alt='basket' />
               <span>{props.total} грн.</span>
            </li>
            <li>
               <Link to='/favorites'>
                  <img
                     width={18}
                     height={18}
                     src='/img/heart.png'
                     alt='favorite'
                  />
               </Link>
            </li>
            <li>
               <img width={18} height={18} src='/img/User.svg' alt='' />
            </li>
         </ul>
      </header>
   );
}
export default Header;
