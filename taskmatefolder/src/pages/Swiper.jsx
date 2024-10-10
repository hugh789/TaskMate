import { useEffect, useRef } from "react";
// import Swiper core and required modules
// import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { register } from 'swiper/element/bundle';
// import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Controller, Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import '../styles/swiper.css';

export function Swiper(props) {
  const swiperRef = useRef(null);
  const {
    children,
    ...rest
  } = props;
  useEffect(() => {
    // Register Swiper web component
    register();
    // Add event listener
    swiperRef.current.addEventListener('swiperslidechange', (e) => {
      console.log('swiperslidechange',e.detail);
    });

    // Object with parameters
    const params = {
      modules:[Controller, Navigation, Pagination, A11y, Autoplay],
      slidesPerView: 1,
      autoplay: {
        delay: 5000,
      },
      loop:true,
      pagination: { clickable: true },
      // scrollbar: { draggable: true },
      navigation: {
        nextEl: '.swb-next',
        prevEl: '.swb-prev',
      },
      on: {
        slideChange(s) {
          console.log('slideChange', s);
        },
      },
    };

    // Assign it to swiper element
    Object.assign(swiperRef.current, params);

    // initialize swiper
    swiperRef.current.initialize();
  }, []);
  return (
      <div className="relative">
        <swiper-container
            class="relative"
            init="false"
            ref={swiperRef}
        >
          {children}
        </swiper-container>
        <div className="swb-prev absolute left-4 top-1/2 -translate-y-2/4 z-10 text-white bg-gray-700 bg-opacity-25 hover:bg-opacity-40 rounded-full w-10 h-10 flex items-center justify-center">
          <div className="h-4 w-4 relative left-1 border-l-2 border-b-2 border-white rotate-45"></div>
        </div>
        <div className="swb-next absolute right-4 top-1/2 -translate-y-2/4 z-10 text-white bg-gray-700 bg-opacity-25 hover:bg-opacity-40 rounded-full w-10 h-10 flex items-center justify-center">
          <div className="h-4 w-4 relative right-1 border-t-2 border-r-2 border-white rotate-45"></div>
        </div>
      </div>

  );
}
export function SwiperSlide(props) {
  const {
    children,
    ...rest
  } = props;
  return (
      <swiper-slide {...rest}>
        {children}
      </swiper-slide>
  );
}
