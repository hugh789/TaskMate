import { useEffect, useState } from "react";
import axios from "axios";

export default function MyTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/bookings/all', { withCredentials: true })  // Ensure cookies are sent
      .then(response => {
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
            <li key={task._id} className="p-4 border rounded-md shadow-md">
              <h3 className="font-semibold">{task.title}</h3>
              <p>{task.description}</p>
              <p><strong>Location:</strong> {task.location}</p>
              {task.neededBy && (
                <p><strong>Needed By:</strong> {new Date(task.neededBy).toLocaleDateString()}</p>
              )}
              <p><strong>Status:</strong> {task.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks available at the moment.</p>
      )}
    </div>
  );
}
