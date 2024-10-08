import { useEffect, useState } from "react";
import axios from "axios";

export default function FindTask() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/request-service', { withCredentials: true }) 
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

  const handleAccept = async (taskId) => {
    try {
      await axios.put(`/api/request-service/${taskId}/accept`, {}, { withCredentials: true });
      setTasks(prevTasks => prevTasks.map(task =>
        task._id === taskId ? { ...task, status: 'Accepted' } : task
      ));
    } catch (error) {
      console.error('Error accepting task:', error);
    }
  };

  const handleReject = async (taskId) => {
    try {
      await axios.put(`/api/request-service/${taskId}/reject`, {}, { withCredentials: true });
      setTasks(prevTasks => prevTasks.map(task =>
        task._id === taskId ? { ...task, status: 'Rejected' } : task
      ));
    } catch (error) {
      console.error('Error rejecting task:', error);
    }
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {tasks.map(task => (
        <div key={task._id} className="card shadow-lg bg-base-100">
          <div className="card-body">
            <h2 className="card-title">{task.title}</h2>
            <p><strong>Location:</strong> {task.location}</p>
            <p><strong>Description:</strong> {task.description}</p>
            {task.neededBy && (
              <p><strong>Needed By:</strong> {new Date(task.neededBy).toLocaleDateString()}</p>
            )}
            <p><strong>Status:</strong> {task.status}</p>
            <div className="card-actions justify-end">
              <button 
                className="btn btn-success" 
                onClick={() => handleAccept(task._id)} 
                disabled={task.status !== 'Pending'}
              >
                Accept
              </button>
              <button 
                className="btn btn-error" 
                onClick={() => handleReject(task._id)} 
                disabled={task.status !== 'Pending'}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
