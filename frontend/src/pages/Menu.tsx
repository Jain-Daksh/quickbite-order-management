import { useState } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import MenuCard from '../components/MenuCard';
import CategoryFilter from '../components/CategoryFilter';

import { menuItems } from '../data/menu';

export default function Menu() {
  const [category, setCategory] = useState('All');

  const [search, setSearch] = useState('');

  const categories = ['All', 'Pizza', 'Burger', 'Fries', 'Pasta'];

  const filteredMenu = menuItems.filter((item) => {
    const categoryMatch = category === 'All' || item.category === category;

    const searchMatch = item.name.toLowerCase().includes(search.toLowerCase());

    return categoryMatch && searchMatch;
  });

  const addToCart = (item: any) => {
    console.log('Added', item);
  };

  return (
    <div>
      <section
        className='
bg-gradient-to-br
from-orange-50
to-white
py-12
'
      >
        <div
          className='
container-page
'
        >
          <h1
            className='
text-4xl
font-extrabold
text-center
'
          >
            Explore Our Menu
          </h1>

          <p
            className='
text-center
text-zinc-500
mt-3
'
          >
            Fresh food prepared with love
          </p>

          <div
            className='
mt-8
max-w-xl
mx-auto
'
          >
            <input
              className='
input
'
              placeholder='
Search your favourite food...
'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className='mt-8'>
            <CategoryFilter
              categories={categories}
              selected={category}
              onChange={setCategory}
            />
          </div>
        </div>
      </section>

      <section
        className='
container-page
py-12
'
      >
        <div
          className='
flex
justify-between
items-center
mb-8
'
        >
          <h2
            className='
title
'
          >
            Menu Items
          </h2>

          <p
            className='
text-muted
'
          >
            {filteredMenu.length} items
          </p>
        </div>

        <div
          className='
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
gap-7
'
        >
          {filteredMenu.length ? (
            filteredMenu.map((item) => (
              <MenuCard key={item.id} item={item} onAdd={addToCart} />
            ))
          ) : (
            <div
              className='
col-span-full
text-center
py-20
text-zinc-500
'
            >
              No food found 🍽️
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
