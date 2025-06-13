import React, { useState } from 'react';
import "../assets/cssFolder/Home.css";
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../pages/Navbar';

const Home = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/services');
    };

    const handleLearnmoreButton = () => {
        navigate('/aboutus');
    };

    const handleProductButton = () => {
        navigate('/product');
    };

    return (
        <div>
            <Navbar />

            <main className="bg-gray-100 p-8">
                <div className="max-w-md mx-auto lg:mx-0 content">
                    <div className="text-left bg-transparent">
                        <b className="text-xl font-bold text-rose-600">Hong Kong Registered Clothing brand</b>
                        <h1 className="text-4xl font-bold mt-4 custom-font">Best Quality Modern Fashion Wears with Affordability</h1>
                        <p className="mt-4 custom-font">
                            We provide you the best and affordable wears you desire. Fashion wears designed and manufactured in China now available all around Nepal.
                        </p>
                        <button className="custom-button mt-4" onClick={handleProductButton}>View Products</button>
                    </div>
                </div>
            </main>

            <footer className="p-8 bg-gray-200">
                <div className="text-center">
                    <b className="text-xl font-bold text-green-600">A Competitive Fashion World</b>
                    <h3 className="text-2xl font-bold mt-2 text-blue-600">Why Choose Denim and Devils for Your Style?</h3>
                </div>
                <div className="diagonal-container">
                    <div className="diagonal-item"></div>
                    <div className="diagonal-item"></div>
                    <div className="diagonal-item"></div>
                </div>
                <div className="flex flex-col md:flex-row mt-8">
                    <div className="w-full md:w-1/3 p-4">
                        <b className="text-xl font-bold text-gray-600">Who We Are?</b>
                        <h3 className="text-2xl font-bold mt-2 text-green-600">Professionals with Years of Experience in This Field</h3>
                        <p className="mt-4 text-gray-700">
                            Discover the Ultimate in Style and Comfort at Denim and Devils. At Denim and Devils, we pride ourselves on offering high-quality, stylish clothing that sets you apart. Experience the perfect blend of fashion and function with our carefully crafted designs.
                        </p>
                        <p className="mt-2 text-gray-700"><i className="fa fa-check-circle text-green-500"></i> High Quality</p>
                        <p className="mt-2 text-gray-700"><i className="fa fa-check-circle text-green-500"></i> Affordable Price</p>
                        <p className="mt-2 text-gray-700"><i className="fa fa-check-circle text-green-500"></i> Durability</p>
                        <button className="custom-button mt-4" onClick={handleLearnmoreButton}>Learn More</button>
                    </div>
                    <div className="new-container">
                        <b className="text-xl font-bold text-gray-600">Our Services</b>
                        <h3 className="text-2xl font-bold mt-2 text-green-600">Comprehensive Fabric Care Services</h3>
                        <p className="mt-4 text-gray-700">
                            Unmatched Quality and Design. Our commitment to excellence ensures that every piece you wear is not only fashionable but also durable and comfortable. Embrace your unique style with confidence, knowing that Denim and Devils has you covered.
                        </p>
                        <p className="mt-2 text-gray-700"><i className="fa fa-check-circle text-green-500"></i> Experienced Designing Staff</p>
                        <p className="mt-2 text-gray-700"><i className="fa fa-check-circle text-green-500"></i> Collaboration with Best Manufacturers in China</p>
                        <p className="mt-2 text-gray-700"><i className="fa fa-check-circle text-green-500"></i> Customer Satisfaction First</p>
                        <button className="custom-button mt-4" onClick={handleButtonClick}>Explore Services</button>
                    </div>
                </div>
            </footer>

            {/* Additional Footer Integration */}
            <footer className="blue-footer rounded-lg shadow dark:bg-gray-900 m-4">
                <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <a href="https://www.facebook.com/denimanddevils/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Denim and Devils</span>
                        </a>
                        <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                            <li>
                                <a href="#" className="hover:underline me-4 md:me-6 text-black">About</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline me-4 md:me-6 text-black">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline me-4 md:me-6 text-black">Licensing</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline text-black">Contact</a>
                            </li>
                        </ul>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <span className="block text-sm sm:text-center dark:text-gray-400 text-black">© 2023 <a href="https://www.facebook.com/denimanddevils/" className="hover:underline text-black">Denim and Devils™</a>. All Rights Reserved.</span>
                </div>
            </footer>
        </div>
    );
};

export default Home;
