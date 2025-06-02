// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import "swiper/css";
// import Image from "next/image";

// const images = ["/hero1.jpg", "/hero2.jpg", "/hero3.jpg", "/hero4.jpg"];

// export default function ImageSlider() {
//   return (
//     <Swiper
//       modules={[Autoplay]}
//       autoplay={{ delay: 3000, disableOnInteraction: false }}
//       loop={true}
//       spaceBetween={20}
//       slidesPerView={1}
//     >
//       {images.map((src, index) => (
//         <SwiperSlide key={index}>
//           <div className="relative w-full h-[200px]">
//             <Image
//               src={src}
//               alt={`Slide ${index + 1}`}
//               layout="fill"
//               objectFit="cover"
//               className="rounded-lg"
//             />
//           </div>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// }
