import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { Link } from "react-router";
import { useRef } from "react";

const NewArrival = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const mockNewArrival = [
    {
      title: "Classic T-Shirt",
      image: "https://picsum.photos/500/600?random=1",
      price: 499,
    },
    {
      title: "Denim Jacket",
      image: "https://picsum.photos/500/600?random=2",
      price: 1499,
    },
    {
      title: "Casual Shoes",
      image: "https://picsum.photos/500/600?random=3",
      price: 1999,
    },
    {
      title: "Leather Bag",
      image: "https://picsum.photos/500/600?random=4",
      price: 2499,
    },
    {
      title: "Summer Shirt",
      image: "https://picsum.photos/500/600?random=5",
      price: 699,
    },
    {
      title: "Sports Watch",
      image: "https://picsum.photos/500/600?random=6",
      price: 2999,
    },
    {
      title: "Hoodie",
      image: "https://picsum.photos/500/600?random=7",
      price: 899,
    },
    {
      title: "Sneakers",
      image: "https://picsum.photos/500/600?random=8",
      price: 1799,
    },
    {
      title: "Cap",
      image: "https://picsum.photos/500/600?random=9",
      price: 299,
    },
    {
      title: "Backpack",
      image: "https://picsum.photos/500/600?random=10",
      price: 1299,
    },
  ];
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrival</h2>
        <div className="md:absolute right-0 -top-2 flex gap-3 justify-center  py-4">
          <button
            ref={prevRef}
            className="custom-prev bg-black text-white px-4 py-2 rounded"
          >
            Prev
          </button>

          <button
            ref={nextRef}
            className="custom-next bg-black text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div>

        <Swiper
           breakpoints={{
        320: {
          slidesPerView: 1
        },
        640: {
          slidesPerView: 2
        },
        768: {
          slidesPerView: 3
        },
        1024: {
          slidesPerView: 4
        }
      }}
          spaceBetween={20}
          modules={[Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onSwiper={(swiper) => {
            setTimeout(() => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            });
          }}
        >
          {mockNewArrival.map((item) => {
            return (
              <SwiperSlide>
                <div className="relative">
                  <img src={item?.image} alt="rabbit" className="" />
                  <div className="absolute  left-0 right-0 bottom-0  backdrop-blur-xl rounded-b-lg text-white p-4 rounded-b-ld">
                    <Link className="">
                      <h2 className=" text-white font-medium">{item?.title}</h2>
                      <p className="text-sm text-white font-medium">
                        {item?.price}
                      </p>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};
export default NewArrival;
