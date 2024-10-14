import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import dayjs from 'dayjs';
export default function MyTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/request-service', { withCredentials: true })  // Ensure cookies are sent
      .then(response => {
        console.log(response.data);
        setTasks(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch tasks:', err);
        setError('Failed to fetch tasks.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">My Tasks</h2>
      {tasks.length > 0 ? (
        <ul className="space-y-4">
          {tasks.map(task => (
            <li key={task._id} className="border rounded-md shadow-md ">
              <div className="border-b px-4 py-3 flex justify-between items-center">
                <Link to={'/service/' + task.service._id} >
                  <h3 className="font-semibold text-blue-600 cursor-pointer">{task.service.title}({task.category.name})</h3>
                </Link>
                <div className="text-red-500">
                  {task.status}
                </div>
              </div>
              <div className="p-4 text-black font-light">
                <p ><strong className="">Job:</strong>{task.title}</p>
                <p><strong>Description:</strong>{task.description}</p>
                <p><strong>Location:</strong> {task.location}</p>
                {task.neededBy && (
                    <p><strong>Needed By:</strong> {dayjs(new Date(task.neededBy)).format('MMM D, YYYY')}</p>
                )}
                <p><strong>Status:</strong> {task.status}</p>
                {task.notes && (
                    <p><strong>Additional Notes:</strong> {task.notes}</p>
                )}
              </div>
              <div className="border-t  px-4 py-3 flex text-right items-center text-gray-600">
                {dayjs(new Date(task.createdAt)).format('dddd, MMMM D, YYYY h:mm A')}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks available at the moment.</p>
      )}
    </div>
  );
}
