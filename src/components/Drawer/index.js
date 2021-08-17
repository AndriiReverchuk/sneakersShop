import React from 'react';
import styles from './Drawer.module.scss';
function Drawer({ total, onClose, onRemove, items = [] }) {
   const totalPrice = () => {
      let money = 0;
      items.length !== 0 &&
         items.forEach((item) => {
            money += Number(item.price);
         });
      total(money);
      return money;
   };
   return (
      <div className={styles.overlay}>
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
               <div className={styles.cartNoItems}>
                  <img
                     className={styles.basket}
                     width={120}
                     heigth={120}
                     src='/img/basket.svg'
                     alt='basket'
                  />
                  <h3>Корзина пустая</h3>
                  <p>
                     Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.
                  </p>
                  <button onClick={onClose} className={styles.greenBtn}>
                     <img
                        className={styles.arrowL}
                        src='/img/arrowL.svg'
                        alt='arrow'
                     />
                     Вернутся назад
                  </button>
               </div>
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
                        <b>грн.</b>
                     </li>
                     <li>
                        <span>Налог 5%:</span>
                        <div></div>
                        <b> грн.</b>
                     </li>
                  </ul>
                  <button className={styles.greenBtn}>
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
