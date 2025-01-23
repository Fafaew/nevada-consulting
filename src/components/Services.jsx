import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  PiBuildingOfficeThin,
  PiPresentationChart,
  PiStrategy,
} from 'react-icons/pi';
import { FaChartLine } from 'react-icons/fa';
import { RiTeamLine } from 'react-icons/ri';
import { LiaChalkboardTeacherSolid } from 'react-icons/lia';
import { IoReaderOutline } from 'react-icons/io5';

import { FaUsersViewfinder, FaPeopleRoof } from 'react-icons/fa6';

const Services = () => {
  const { t } = useTranslation();

  const items = [
    {
      id: 1,
      icon: <PiBuildingOfficeThin />,
      subtitle: t('services.first.subtitle'),
      description: t('services.first.description'),
    },
    {
      id: 2,
      icon: <FaUsersViewfinder />,
      subtitle: t('services.second.subtitle'),
      description: t('services.second.description'),
    },
    {
      id: 3,
      icon: <FaChartLine />,
      subtitle: t('services.third.subtitle'),
      description: t('services.third.description'),
    },
    {
      id: 4,
      icon: <RiTeamLine />,
      subtitle: t('services.fourth.subtitle'),
      description: t('services.fourth.description'),
    },
    {
      id: 5,
      icon: <PiStrategy />,
      subtitle: t('services.fifth.subtitle'),
      description: t('services.fifth.description'),
    },
    {
      id: 6,
      icon: <PiPresentationChart />,
      subtitle: t('services.sixth.subtitle'),
      description: t('services.sixth.description'),
    },
    {
      id: 7,
      icon: <FaPeopleRoof />,
      subtitle: t('services.seventh.subtitle'),
      description: t('services.seventh.description'),
    },
    {
      id: 8,
      icon: <LiaChalkboardTeacherSolid />,
      subtitle: t('services.eigthth.subtitle'),
      description: t('services.eigthth.description'),
    },
    {
      id: 9,
      icon: <IoReaderOutline />,
      subtitle: t('services.nineth.subtitle'),
      description: t('services.nineth.description'),
    },
  ];

  return (
    <>
      <div
        name=''
        className='bg-gradient-to-b from-black to-gray-800 w-full text-white text-center pb-6'
      >
        <div className='max-w-full mx-auto flex flex-col w-full h-full'>
          <h2 className='flex justify-center text-4xl font-bold my-12 text-[antiquewhite]'>
            {t('services.title')}
          </h2>

          <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:px-5'>
            {items.map(({ id, icon, subtitle, description }) => (
              <div
                key={id}
                className='mx-6 lg:mx-0 px-8 pt-4 shadow-md shadow-purple-secondary
                 rounded-lg overflow-hidden duration-200 hover:scale-105'
              >
                <div className='text-purple-primary'>
                  {React.cloneElement(icon, { className: 'w-10 h-10 m-auto' })}
                </div>
                <div className='font-bold text-center mt-2'>{subtitle}</div>
                <div className='flex text-center my-6'>{description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
