import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { Link } from "react-router";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNewArrivalProductAsync } from "../../feature/productSlice";

const NewArrival = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const dispatch=useDispatch();
 
  const {newArrival}=useSelector(state=>state.product)

  const getNewArrival=async()=>{
    try {
      const res=await dispatch(getNewArrivalProductAsync()).unwrap();
      console.log(res);
      
      
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(()=>{
     getNewArrival();
  },[])
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
          {newArrival.map((item) => {
            return (
              <SwiperSlide>
                <div className="relative">
                  <img src={item?.images[0]?.url} alt="rabbit" className="" />
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
