interface Props {
  categories: string[];
  selected: string;
  onChange: (value: string) => void;
}

export default function CategoryFilter({
  categories,
  selected,
  onChange,
}: Props) {
  return (
    <div
      className='
flex
gap-3
overflow-x-auto
pb-2
'
    >
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`
px-5
py-2.5
rounded-full
font-medium
whitespace-nowrap
transition

${
  selected === category
    ? 'bg-orange-500 text-white shadow-md shadow-orange-200'
    : 'bg-white border border-zinc-200 hover:border-orange-400'
}

`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
