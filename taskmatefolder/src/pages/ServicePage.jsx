import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import House1 from '../assets/house/1.jpeg';
import House2 from '../assets/house/2.jpeg';
import House3 from '../assets/house/3.jpeg';
import House4 from '../assets/house/4.jpeg';


export default function ServicePage() {
  const servicePhotos = [House1, House2, House3, House4];
  const {id} = useParams();
  const [service,setService] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get('/api/service/'+id).then(response => {
        const res = response.data;
        if (res) {
          setService(res);
        }
      });
    }
  }, [id]);

  if (!service) {
    return '';
  }

  function loadServiceImg(img) {
    let idx = Math.round(Math.random()*10)%servicePhotos.length;
    return img ? img : servicePhotos[idx];
  }

  return (
    <div className="my-8">
      <h1 className="text-3xl">{service.title}</h1>
      <img src={loadServiceImg(service.photos?.[0])} alt={service.title} className=" w-full my-5"/>
      <div className="my-2 block">{service.description}</div>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-4">Your service information:</h2>
          <div>
            <div className="text-gray-500 my-2">Category:{service.categoryName}</div>
            <div className="text-gray-500 my-2">Location:{service.location}</div>
          </div>
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl">
          <div>Total price</div>
          <div className="text-3xl">${service.price}</div>
        </div>
      </div>
      <div place={service.location} />
    </div>
  );
}