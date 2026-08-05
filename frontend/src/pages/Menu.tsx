'use client';
import { useEffect, useState } from 'react';
import { getAllMenu } from '../api/index';
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image_url: string;
  category: string;
  is_available: boolean;
}

export default function MenuPage() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [filteredMenu, setFilteredMenu] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const loadMenu = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await getAllMenu();
        const menuData: MenuItem[] = response.data;
        setMenu(menuData);
        setFilteredMenu(menuData);
        const uniqueCategories = [
          'ALL',
          ...new Set(
            menuData.map(
              (item) => item.category
            )
          )
        ];
        setCategories(
          uniqueCategories as string[]
        );
      } catch (err) {
        console.log('err', err)
        setError('Unable to load menu.');
      } finally {
        setLoading(false);
      }
    };
    loadMenu();
  }, []);

  const handleCategory = (category: string) => {
    setActiveCategory(category);
    if (category === 'ALL') {
      setFilteredMenu(menu);
    }
    else {
      setFilteredMenu(
        menu.filter(
          item =>
            item.category === category
        )
      );

    }

  };

  if (loading) {
    return (
      <section className="py-20">
        <div className="container-page text-center">
          <p className="text-muted text-lg">
            Loading menu...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20">
        <div className="container-page text-center">
          <p className="text-red-500">
            {error}
          </p>
        </div>
      </section>
    );
  }

  return (

    <section
      className="
      relative
      overflow-hidden
      bg-gradient-to-br
      from-orange-50
      via-white
      to-orange-100
      py-20
      "
    >
      <div className="container-page">
        <div className="text-center mb-12">

          <span
            className="
            inline-block
            px-4
            py-2
            rounded-full
            bg-orange-100
            text-orange-600
            font-semibold
            text-sm
            "
          >

            Our Menu

          </span>
          <h1
            className="
            mt-5
            text-4xl
            font-bold
            text-zinc-900
            "
          >

            Fresh & Delicious Food
          </h1>
          <p
            className="
            mt-3
            text-muted
            max-w-xl
            mx-auto
            "
          >

            Explore our delicious pizzas,
            burgers, pasta and more.

          </p>

        </div>
        <div
          className="
          flex
          gap-3
          overflow-x-auto
          pb-5
          mb-8
          sm:justify-center
          "
        >

          {
            categories.map(category => (

              <button

                key={category}

                onClick={() =>
                  handleCategory(category)
                }


                className={`
                px-5
                py-2
                rounded-full
                whitespace-nowrap
                font-medium
                transition

                ${activeCategory === category

                    ?

                    `
                  bg-orange-500
                  text-white
                  `

                    :

                    `
                  bg-white
                  border
                  border-zinc-200
                  hover:bg-orange-50
                  `
                  }

                `}

              >

                {category}

              </button>

            ))
          }
        </div>
        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-6
          "
        >
          {
            filteredMenu.map(item => (
              <div
                key={item.id}
                className="
                card
                overflow-hidden
                bg-white
                group
                "
              >
                <div
                  className="
                  h-56
                  overflow-hidden
                  "
                >
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="
                    w-full
                    h-full
                    object-cover
                    group-hover:scale-105
                    transition
                    duration-300
                    "
                  />
                </div>
                <div
                  className="
                  p-5
                  "
                >
                  <div
                    className="
                    flex
                    justify-between
                    gap-3
                    "
                  >
                    <h3
                      className="
                      text-xl
                      font-bold
                      "
                    >
                      {item.name}
                    </h3>

                    <span
                      className="
                      text-orange-600
                      font-bold
                      whitespace-nowrap
                      "
                    >

                      ₹{Number(item.price).toFixed(0)}
                    </span>

                  </div>
                  <p
                    className="
                    text-muted
                    mt-3
                    text-sm
                    line-clamp-2
                    "
                  >

                    {item.description}

                  </p>

                  <div
                    className="
                    flex
                    justify-between
                    items-center
                    mt-5
                    "
                  >

                    <span
                      className="
                      bg-orange-100
                      text-orange-600
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-semibold
                      "
                    >

                      {item.category}

                    </span>

                    <button

                      disabled={!item.is_available}

                      className={`
                      btn-primary

                      ${!item.is_available
                        &&
                        'opacity-50 cursor-not-allowed'
                        }

                      `}

                    >

                      {
                        item.is_available
                          ?
                          'Add'
                          :
                          'Sold Out'
                      }

                    </button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        {
          filteredMenu.length === 0 && (

            <div
              className="
              text-center
              py-20
              text-muted
              "
            >
              No items found.
            </div>
          )
        }
      </div>
    </section>);

}