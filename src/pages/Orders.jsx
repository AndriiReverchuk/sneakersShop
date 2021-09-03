import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from '../components/Card';

function Orders() {
   const [orders, setOrders] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   useEffect(() => {
      (async () => {
         try {
            const { data } = await axios.get(
               'https://61143472cba40600170c1e67.mockapi.io/orders'
            );
            setOrders(data.map((obj) => obj.items).flat());
            setIsLoading(false);
         } catch (error) {
            alert('Ошибка при запросе на заказ');
            console.log(error);
         }
      })();
   }, []);
   return (
      <div className='content'>
         {orders.length > 0 ? (
            <>
               <div className='favorites-header'>
                  <Link to='/'>
                     <img src='/img/SignLeft.svg' alt='back' />
                  </Link>
                  <h1>Мои Заказы</h1>
               </div>
               <div className='cards'>
                  {(isLoading ? [...Array(8)] : orders).map((item, i) => {
                     return <Card key={i} loading={isLoading} {...item} />;
                  })}
               </div>
            </>
         ) : (
            <div className='favorite-none'>
               <img width={70} height={70} src='/img/smile1.svg' alt='smile' />
               <h2>У вас нет заказов </h2>
               <p>Оформите хотя бы один заказ.</p>
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
export default Orders;
