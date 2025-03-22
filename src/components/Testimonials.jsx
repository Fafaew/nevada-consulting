/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React from 'react';
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import redVentures from '../assets/imgs/rv-short.webp';
import Komuh from '../assets/imgs/komuh.webp';
import woman_talking from '../assets/imgs/woman_talking_table.webp';

const CustomPrevArrow = ({ onClick }) => (
  <div
    className='absolute top-[45%] left-36 transform -translate-y-1/2 z-10 cursor-pointer text-white bg-purple-secondary p-3 rounded-full hover:bg-indigo-400 transition'
    onClick={onClick}
  >
    ❮
  </div>
);

const CustomNextArrow = ({ onClick }) => (
  <div
    className='absolute top-[45%] right-44 transform -translate-y-1/2 z-10 cursor-pointer text-white bg-purple-secondary p-3 rounded-full hover:bg-indigo-400 transition'
    onClick={onClick}
  >
    ❯
  </div>
);

// Configuração do slider
const settings = {
  accessibility: true,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 10000,
  // nextArrow: <CustomNextArrow />,
  // prevArrow: <CustomPrevArrow />,
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
      image: redVentures,
      subtitle: t('testimonials.first.subtitle'),
      review: t('testimonials.firstReview1'),
      review2: t('testimonials.firstReview2'),
      review3: t('testimonials.firstReview3'),
      jobPosition: t('testimonials.firstJobPosition'),
      company: t('testimonials.firstCompany'),
    },
    {
      image: woman_talking,
      subtitle: t('testimonials.second.subtitle'),
      review: t('testimonials.secondReview1'),
      review2: t('testimonials.secondReview2'),
      review3: t('testimonials.secondReview3'),
      jobPosition: t('testimonials.secondJobPosition'),
      company: t('testimonials.secondCompany'),
    },
    {
      image: Komuh,
      subtitle: t('testimonials.third.subtitle'),
      review: t('testimonials.thirdReview1'),
      review2: t('testimonials.thirdReview2'),
      review3: t('testimonials.thirdReview3'),
      jobPosition: t('testimonials.thirdJobPosition'),
      company: t('testimonials.thirdCompany'),
    },
  ];

  return (
    <>
      <h2 className='flex justify-center text-center text-4xl font-bold mt-12 mb-6 sm:mb-8 text-purple-secondary px-2'>
        {' '}
        {t('testimonials.title')}
      </h2>
      <Slider {...settings}>
        {data.map((item, index) => (
          <div className='pt-0 pb-16' key={index}>
            <div className='flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg p-6 md:p-8 max-w-4xl mx-auto'>
              {/* Imagem */}
              <div className='w-full h-24 overflow-hidden flex justify-center'>
                <img
                  src={item.image}
                  className='w-1/2 h-full rounded-full object-cover'
                />
              </div>
              {/* Texto */}
              <div className='mt-6 md:mt-0 md:ml-8 text-center md:text-left'>
                <div className='text-gray-600 text-lg italic'>
                  <p>{item.review}</p>
                  <p className='mt-4'>{item.review2}</p>
                  <p className='mt-4'>{item.review3}</p>
                </div>
                <div className='mt-4'>
                  <h3 className='text-gray-900 font-semibold text-lg'>
                    {item.jobPosition}
                  </h3>
                  <p className='text-gray-500 text-sm'>{item.company}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default Testimonials;
