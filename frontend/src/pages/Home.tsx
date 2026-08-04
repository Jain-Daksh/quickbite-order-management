export default function Home() {
  return (
    <div>
      <section
        className='
relative
overflow-hidden
bg-gradient-to-br
from-orange-50
via-white
to-orange-100
'
      >
        <div className='container-page py-20'>
          <div
            className='
max-w-3xl
mx-auto
text-center
'
          >
            <span
              className='
inline-block
px-4
py-2
rounded-full
bg-orange-100
text-orange-600
font-semibold
text-sm
'
            >
              🔥 Fresh Food Everyday
            </span>

            <h1
              className='
mt-6
text-4xl
sm:text-5xl
font-extrabold
tracking-tight
text-zinc-900
'
            >
              Delicious Food
              <br />
              Delivered To Your Door
            </h1>

            <p
              className='
mt-5
text-sm
sm:text-lg
max-w-xl
mx-auto
'
            >
              Order your favourite pizzas, burgers and more. Fast delivery with
              QuickBite.
            </p>

            <div
              className='
mt-8
flex
justify-center
gap-4
'
            >
              <button
                className=' mt-8
flex
justify-center
gap-4
btn-primary'
              >
                Explore Menu
              </button>

              <button
                className='mt-8
flex
justify-center
gap-4
btn-secondary'
              >
                Track Order
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
