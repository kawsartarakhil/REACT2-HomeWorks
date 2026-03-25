// import React, { useRef } from "react";

// const App = () => {
//   const inputRef = useRef(null);
//   return (
//     <div>
//       <button
//         onClick={()=> 
//           inputRef.current.scrollIntoView({
//             behavior: "smooth",
//             block: "start",
//           })
//         }
//         className="m-20 ml-0 text-3xl font-black "
//       >
//         Foscus
//       </button>
//       <div className="bg-black h-100"></div>
//       <div className="bg-black/50 flex pt-100" ref={inputRef}>
//         <p className="text-4xl font-bold h-100">Salom</p>
//       </div>
//       <div className="bg-black h-100"></div>
//     </div>
//   );
// };

// export default App;

// import React, { useEffect, useRef } from "react";
// import { useToDo } from "./store/todo";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";

// const App = () => {
//   const { data, getData } = useToDo();
//   const swiperRef = useRef(null);

//   useEffect(() => {
//     getData();
//   }, []);

//   return (
//     <div className="p-10">
//       <div className="relative flex items-center">
//         {/* Left arrow */}
//         <button
//           onClick={() => swiperRef.current && swiperRef.current.slidePrev()}
//           className="absolute left-0 z-10 text-3xl font-black p-2 bg-blue-500 text-white rounded-full"
//         >
//           ⬅️
//         </button>

//         {/* Swiper container */}
//         <div className="flex-1 mx-10">
//           <Swiper
//             slidesPerView={3}
//             spaceBetween={20}
//             onSwiper={(swiper) => (swiperRef.current = swiper)}
//           >
//             {data.map((user, idx) => (
//               <SwiperSlide
//                 key={idx}
//                 className="flex justify-center items-center"
//               >
//                 <img
//                   src={user.image}
//                 />
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>

//         {/* Right arrow */}
//         <button
//           onClick={() => swiperRef.current && swiperRef.current.slideNext()}
//           className="absolute right-0 z-10 text-3xl font-black p-2 bg-blue-500 text-white rounded-full"
//         >
//           ➡️
//         </button>
//       </div>
//     </div>
//   );
// };

// export default App;


import React, { Component, useRef } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

const AppContent = () => {
  const inputRef = useRef(null);
  return (
    <div>
      <button
        onClick={() =>
          inputRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
        className="m-20 ml-0 text-3xl font-black "
      >
        Focus
      </button>
      <div className="bg-black h-100"></div>
      <div className="bg-black/50 flex pt-100" ref={inputRef}>
        <p className="text-4xl font-bold h-100">Salom</p>
      </div>
      <div className="bg-black h-100"></div>
    </div>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
};

export default App;