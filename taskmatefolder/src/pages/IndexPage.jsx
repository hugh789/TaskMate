import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import House1 from '../assets/house/1.jpeg';
import House2 from '../assets/house/2.jpeg';
import House3 from '../assets/house/3.jpeg';
import House4 from '../assets/house/4.jpeg';
import Banner1 from '../assets/banner/hero01.jpg';
import Banner2 from '../assets/banner/hero02.png';
import Banner3 from '../assets/banner/hero03.jpg';
import { Swiper, SwiperSlide } from './Swiper.jsx';
// Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
// import 'swiper/css';
export default function IndexPage() {
	const servicePhotos = [House1, House2, House3, House4];
	const [banners, setBanners] = useState([Banner1, Banner2, Banner3]);
	const [currentCategoryId, setCurrentCategoryId] = useState(null);
	const [services, setServices] = useState([]);
	const [searchServices, setSearchServices] = useState([]);
	const [categories, setCategories] = useState([]);
	const [loadingServices, setLoadingServices] = useState(true);  // Added loading states
	const [loadingCategories, setLoadingCategories] = useState(true);
	const [errorServices, setErrorServices] = useState(null);  // Added error states
	const [errorCategories, setErrorCategories] = useState(null);
	// Fetch services
	useEffect(() => {
		axios.get('/api/services')
			.then(response => {
				setServices(response.data);
				setSearchServices(response.data);
				setLoadingServices(false);
			})
			.catch(error => {
				console.error('Error fetching services:', error);
				setErrorServices('Error fetching services');
				setLoadingServices(false);
			});
	}, []);

	// Fetch categories
	useEffect(() => {
		axios.get('/api/categories')
			.then(response => {
				setCategories(response.data);
				setLoadingCategories(false);
			})
			.catch(error => {
				console.error('Error fetching categories:', error);
				setErrorCategories('Error fetching categories');
				setLoadingCategories(false);
			});
	}, []);

	function onCategoryChange(id) {
        setLoadingServices(true);
        let res = services.filter(function (service) {
            return id !== currentCategoryId ? service.category === id : true;
        });
        setSearchServices(res);
        setCurrentCategoryId(id !== currentCategoryId ? id : null);
        setTimeout(function () {
            setLoadingServices(false);
        },700)
	}
	
	function loadServiceImg(img) {
		let idx = Math.round(Math.random()*10)%servicePhotos.length;
		return img ? img : servicePhotos[idx];
	}

	return (
		<div className="mt-8">
			{banners ? (
				<div className="mb-8">
				<Swiper >
				{banners.length > 0 ? (
						banners.map(banner => (
							<SwiperSlide key={banner}>
								<div className="flex flex-row ">
									<div className="basis-1/2">
										<img src={banner} alt="test" className="h-72 w-full object-cover transition-all duration-300"/>
									</div>
									<div className="basis-1/2 flex items-center justify-center bg-green-700 text-white">
										<div className="mx-12">
											<h1 className="text-2xl font-bold mb-2">Local Service</h1>
											<div className="text-gray-300">TaskMate offers a variety of services like plumbing,electrical, and cleaning, helping you quickly connect withtrusted professionals</div>
											<button className="text-white py-3 px-5 rounded shadow-md text-center cursor-pointer hover:bg-teal-400 bg-teal-500 mt-4">Booking Now</button>
										</div>

									</div>
								</div>


							</SwiperSlide>
						))
					) : (
						<p>No categories available at the moment.</p>
					)}
				</Swiper>
				</div>
				) : (
				<p> &nbsp; </p>
			)}

			{/* Display Categories */}
			<div className="mb-8">
				<h2 className="text-2xl font-bold mb-4">Categories</h2>
				{loadingCategories ? (
					<p>Loading categories...</p>
				) : errorCategories ? (
					<p className="text-red-500">{errorCategories}</p>
				) : (
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{categories.length > 0 ? (
							categories.map(category => (
								<div onClick={() => onCategoryChange(category._id)} key={category._id}
									 className={["text-white p-4 rounded-lg shadow-md text-center cursor-pointer hover:bg-red-500", category._id === currentCategoryId ? 'bg-red-500' : 'bg-blue-500'].join(' ')}>
									<p className="font-semibold">{category.name}</p>
								</div>
							))
						) : (
							<p>No categories available at the moment.</p>
						)}
					</div>
				)}
			</div>

			{/* Display Services */}
			<div className="grid gap-x-4 gap-y-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
				{loadingServices ? (
					<p>Loading services...</p>
				) : errorServices ? (
					<p className="text-red-500">{errorServices}</p>
				) : (
					searchServices.length > 0 ? (
						searchServices.map(service => (
							<Link to={'/service/' + service._id} key={service._id}>
								<div className="group border-2 border-transparent rounded-lg overflow-hidden cursor-pointer shadow-lg hover:border-blue-600">
                                    <div className="h-52 overflow-hidden">
                                        <img src={loadServiceImg(service.photos?.[0])} alt={service.title} className="h-52 w-full object-cover transition-all duration-300 hover:scale-125"/>
                                    </div>
									<div className="px-5 pb-5 pt-2">
										<h2 className="font-bold h-6 truncate">{service.title}</h2>
										<h3 className="text-sm text-gray-500 h-10 overflow-hidden " >{service.description}</h3>
										<div className="mt-1">
											<span className="font-bold group-hover:text-red-500">${service.price}</span>
										</div>
									</div>
								</div>

							</Link>
						))
					) : (
						<p>No services available at the moment.</p>
					)
				)}
			</div>
		</div>
	);
}
