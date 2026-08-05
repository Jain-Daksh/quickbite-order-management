interface Props {
  item: any;
  onAdd: (item: any) => void;
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
          src={item.image}
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
            ₹{item.price}
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
          className='
mt-5
w-full
btn-primary
'
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
