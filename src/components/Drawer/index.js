import React, { useState } from 'react';
import Info from '../Info';
import styles from './Drawer.module.scss';
import axios from 'axios';
import { useCart } from '../../hooks/useCart';
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function Drawer({ onClose, onRemove, opened, items = [] }) {
   const { cartItems, setCartItems, totalPrice } = useCart();
   const [orderId, setOrderId] = useState(null);
   const [isOrderComplete, setIsOrderComplete] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   const onClickOrder = async () => {
      try {
         setIsLoading(true);
         const { data } = await axios.post(
            'https://61143472cba40600170c1e67.mockapi.io/orders',
            { items: cartItems }
         );
         setOrderId(data.id);
         setIsOrderComplete(true);
         setCartItems([]);
         cartItems.forEach(async (element) => {
            await axios.delete(
               'https://61143472cba40600170c1e67.mockapi.io/cart/' + element.id
            );
            await delay(1000);
         });
      } catch (err) {
         alert('Ошибка при создании заказа :(');
      }
      setIsLoading(false);
   };
   return (
      <div
         className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}
      >
         <div className={styles.drawer}>
            <h2 className={styles.drawerHeader}>
               Корзина
               <img
                  onClick={onClose}
                  className={styles.removeBtn}
                  src='/img/btn-remove.svg'
                  alt='Remove'
               />
            </h2>
            {items.length === 0 ? (
               <Info
                  title={isOrderComplete ? 'Заказ оформлен' : 'Корзина пустая'}
                  img={isOrderComplete ? '/img/Done.svg' : '/img/basket.svg'}
                  description={
                     isOrderComplete
                        ? `Ваш заказ №${orderId} передан в курьерскую доставку`
                        : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
                  }
               />
            ) : (
               <>
                  <div className={styles.items}>
                     {items.map((item, i) => {
                        return (
                           <div className={styles.cartItem} key={i}>
                              <div
                                 style={{
                                    backgroundImage: `url(${item.imgUrl})`,
                                 }}
                                 className={styles.cartItemImg}
                              ></div>
                              <div>
                                 <p>{item.title}</p>
                                 <b>{item.price} грн.</b>
                              </div>
                              <img
                                 onClick={() => {
                                    onRemove(item.id);
                                 }}
                                 className={styles.removeBtn}
                                 src='/img/btn-remove.svg'
                                 alt='Remove'
                              />
                           </div>
                        );
                     })}
                  </div>
                  <ul>
                     <li>
                        <span>Итого:</span>
                        <div></div>
                        <b>{totalPrice} грн.</b>
                     </li>
                     <li>
                        <span>Налог 5%:</span>
                        <div></div>
                        <b>{Math.round(totalPrice * 0.05)} грн.</b>
                     </li>
                  </ul>
                  <button
                     disabled={isLoading}
                     onClick={onClickOrder}
                     className={styles.greenBtn}
                  >
                     Оформить заказ{' '}
                     <img
                        className={styles.arrowR}
                        src='/img/arrow.svg'
                        alt='Arrow'
                     />
                  </button>
               </>
            )}
         </div>
      </div>
   );
}
export default Drawer;
