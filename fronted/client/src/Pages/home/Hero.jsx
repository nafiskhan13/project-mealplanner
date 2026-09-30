import React from 'react';
import HeroImg from '../../assets/HeroImg.png';
import { Link } from 'react-router';

const Hero = () => {
    return (
        <section className='flex flex-col md:flex-row min-h-screen w-full bg-gradient-to-b from-white to-green-50 rounded-2xl overflow-hidden'>
            <div className='flex flex-col justify-center bg-white/80 backdrop-blur-md p-8 md:p-12 lg:p-16 text-center md:text-left md:w-1/2 mx-auto text-black'>
                <div className='space-y-6 max-w-xl mx-auto'>
                    <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900'>
                        Plan Your Meals Effortlessly
                    </h1>
                    <p className='text-lg sm:text-xl lg:text-2xl text-gray-600'>
                        Smart planning to save your time, money, and energy.
                    </p>
                    <div className='flex gap-4 justify-center md:justify-start'>
                        <Link to="/login">
                            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow hover:shadow-lg transition duration-300 text-base sm:text-lg">
                                Get Started
                            </button>
                        </Link>
                        <Link to="/messregister">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow hover:shadow-lg transition duration-300 text-base sm:text-lg">
                                Create Your Mess
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='relative bg-cover bg-center h-[50vh] md:h-screen w-full md:w-1/2 rounded-2xl shadow-inner' 
                 style={{backgroundImage:`url(${HeroImg})`}}>
                <div className='absolute inset-0 bg-black/30'></div>
            </div>
        </section>
    );
};

export default Hero;
