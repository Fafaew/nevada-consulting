/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React from 'react';
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CustomPrevArrow = ({ onClick }) => (
  <div
    className='absolute top-1/2 -left-12 transform -translate-y-1/2 z-10 cursor-pointer text-white bg-purple-secondary p-3 rounded-full hover:bg-indigo-400 transition'
    onClick={onClick}
  >
    ❮
  </div>
);

const CustomNextArrow = ({ onClick }) => (
  <div
    className='absolute top-1/2 -right-12 transform -translate-y-1/2 z-10 cursor-pointer text-white bg-purple-secondary p-3 rounded-full hover:bg-indigo-400 transition'
    onClick={onClick}
  >
    ❯
  </div>
);

// Configuração do slider
const settings = {
  accessibility: true,
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <CustomNextArrow />,
  prevArrow: <CustomPrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Testimonials = () => {
  const { t } = useTranslation();

  const data = [
    {
      subtitle: t('testimonials.first.subtitle'),
      review: t('testimonials.firstReview1'),
      review2: t('testimonials.firstReview2'),
      review3: t('testimonials.firstReview3'),
    },
    {
      subtitle: t('testimonials.second.subtitle'),
      review: t('testimonials.secondReview1'),
      review2: t('testimonials.secondReview2'),
      review3: t('testimonials.secondReview3'),
    },
    {
      subtitle: t('testimonials.third.subtitle'),
      review: t('testimonials.thirdReview1'),
      review2: t('testimonials.thirdReview2'),
      review3: t('testimonials.thirdReview3'),
    },
  ];

  return (
    <div className='py-10 '>
      <h2 className='flex justify-center text-4xl font-bold mt-12 mb-6 sm:mb-12 text-purple-secondary'>
        {' '}
        {t('testimonials.title')}
      </h2>
      <div className='w-3/4 m-auto'>
        <div className='mt-10 relative'>
          <Slider {...settings}>
            {data.map((item, index) => (
              <div key={index} className='bg-white text-black rounded-xl'>
                <div className='h-20 rounded-t-xl bg-indigo-500 flex justify-center items-center'>
                  <p className='font-bold'>{item.subtitle}</p>
                </div>
                <div className='flex flex-col justify-center items-center gap-4 p-4 rounded-b-lg border border-solid border-black border-t-transparent '>
                  <p>{item.review}</p>
                  <p>{item.review2}</p>
                  <p>{item.review3}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
