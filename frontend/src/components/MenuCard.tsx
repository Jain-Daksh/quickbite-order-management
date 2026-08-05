interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image_url: string;
  category: string;
  is_available: boolean;
}

interface Props {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
}

export default function MenuCard({ item, onAdd }: Props) {
  return (
    <div
      className='
      group
      bg-white
      rounded-2xl
      border
      border-zinc-100
      overflow-hidden
      shadow-sm
      hover:shadow-xl
      transition
      '
    >
      <div className='relative'>
        <img
          src={item.image_url}
          alt={item.name}
          className='
          w-full
          h-56
          object-cover
          group-hover:scale-105
          transition
          duration-500
          '
        />

        <span
          className='
          absolute
          top-3
          left-3
          bg-white
          px-3
          py-1
          rounded-full
          text-xs
          font-semibold
          text-orange-600
          '
        >
          {item.category}
        </span>
      </div>

      <div className='p-5'>
        <div
          className='
          flex
          justify-between
          gap-2
          '
        >
          <h3
            className='
            font-bold
            text-lg
            '
          >
            {item.name}
          </h3>

          <p
            className='
            font-bold
            text-orange-500
            '
          >
            ₹{Number(item.price).toFixed(0)}
          </p>
        </div>

        <p
          className='
          text-sm
          text-zinc-500
          mt-3
          line-clamp-2
          '
        >
          {item.description}
        </p>

        <button
          onClick={() => onAdd(item)}
          disabled={!item.is_available}
          className={`
            mt-5
            w-full
            btn-primary
            ${!item.is_available ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {item.is_available ? 'Add To Cart' : 'Sold Out'}
        </button>
      </div>
    </div>
  );
}
