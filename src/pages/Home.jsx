import Card from '../components/Card';

function Home({
   items,
   searchValue,
   onChangeSearchInput,
   setSearchValue,
   addToCard,
   onAddToFavorite,
   cartItems,
   isLoading,
}) {
   const renderItems = () => {
      const filteredItems = items.filter((item) =>
         item.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      return (isLoading ? [...Array(12)] : filteredItems).map((item, i) => {
         return (
            <Card
               key={i}
               onFavorite={onAddToFavorite}
               onPlus={addToCard}
               added={cartItems.some(
                  (obj) => Number(obj.id) === Number(item.id)
               )}
               loading={isLoading}
               {...item}
            />
         );
      });
   };
   return (
      <div className='content'>
         <div className='content-header'>
            <h1>
               {searchValue
                  ? `Поиск по запросу: "${searchValue}"`
                  : 'Все кроссовки'}
            </h1>
            <div className='search-block'>
               <img src='/img/search.svg' alt='Search' />
               <input
                  onChange={onChangeSearchInput}
                  placeholder='Поиск...'
                  value={searchValue}
               />
               {searchValue && (
                  <img
                     className='clear'
                     src='/img/btn-remove.svg'
                     alt='clear'
                     onClick={() => setSearchValue('')}
                  />
               )}
            </div>
         </div>
         <div className='cards'>{renderItems()}</div>
      </div>
   );
}
export default Home;
