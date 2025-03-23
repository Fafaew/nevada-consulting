/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { React, useRef } from 'react';
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import redVentures from '../assets/imgs/testimonialsRV.png';
import Komuh from '../assets/imgs/testimonialsKomuh.png';
import woman_talking from '../assets/imgs/woman_talking_table.webp';

const CustomArrow = ({ direction, onClick }) => {
  const arrowIcon = direction === 'prev' ? '❮' : '❯';

  return (
    <button
      className={`
        hidden
        md:block
        text-white 
        bg-purple-secondary 
        p-3 
        rounded-full 
        hover:bg-indigo-400 
        transition
        focus:outline-none
      `}
      onClick={onClick}
      aria-label={direction === 'prev' ? 'Previous slide' : 'Next slide'}
    >
      {arrowIcon}
    </button>
  );
};

const Testimonials = () => {
  const { t } = useTranslation();

  const settings = {
    accessibility: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    pauseOnHover: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
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

  const sliderRef = useRef(null);

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
    <div className='relative max-w-6xl mx-auto px-4'>
      <h2 className='flex justify-center text-center text-4xl font-bold mt-12 mb-6 sm:mb-8 text-purple-secondary'>
        {t('testimonials.title')}
      </h2>

      <div className='relative'>
        <div className='flex justify-between w-full absolute top-1/2 -translate-y-1/2 z-10 px-4 md:px-8 pointer-events-none'>
          <div className='pointer-events-auto'>
            <CustomArrow
              direction='prev'
              onClick={() => sliderRef.current.slickPrev()}
            />
          </div>
          <div className='pointer-events-auto'>
            <CustomArrow
              direction='next'
              onClick={() => sliderRef.current.slickNext()}
            />
          </div>
        </div>

        <Slider ref={sliderRef} {...settings}>
          {data.map((item, index) => (
            <div className='pt-0 pb-16' key={index}>
              <div className='flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg p-6 md:p-8 max-w-4xl mx-auto'>
                <div className='w-full h-24 overflow-hidden flex justify-center'>
                  <img
                    src={item.image}
                    alt={item.company}
                    className='w-24 h-24 rounded-full object-cover object-center'
                  />
                </div>
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
      </div>
    </div>
  );
};

export default Testimonials;
