import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {UserContext} from "../UserContext.jsx";
import { DatePicker,Form,Input, Button} from "antd";

export default function BookingServicePage() {
  const {id} = useParams();
  const {ready,user} = useContext(UserContext);
  const navigate = useNavigate();
  const [service,setService] = useState(null);
  const [error, setError] = useState(null);

  if (!ready) {
    return 'Loading...';
  }
  if (ready && !(user && user.name)) {
    return <Navigate to={'/login'} />
  }

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
    return 'Service not found!';
  }

  const onFinish = async (values) => {
    console.log('Success:', values);
    try {
      const { data } = await axios.post('/api/request-service', {
        service:service._id,
        provider:service.provider,
        category:service.category,
        price:service.price,

        title:values.title,
        location:values.location,
        description:values.description,
        neededBy:values.neededBy,
        notes:values.notes,
      });
      console.log('Service booking:', data);
      navigate('/account/tasks'); // Redirect after successful submission
    } catch (error) {
      console.error('Error adding service:', error.response ? error.response.data : error.message);
      setError('Error adding service. Please try again.');
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="container mx-auto py-4">
      <h1 className="text-2xl font-bold mb-4">Booking Service</h1>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-4">Your service information:</h2>
          <div>
            <div className="text-gray-500 my-2">Category : {service.categoryName}</div>
            <div className="text-gray-500 my-2">Location : {service.location}</div>
          </div>
          <div className="my-2 block text-gray-500">Description : {service.description}</div>
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl">
          <div>Total price</div>
          <div className="text-3xl">${service.price}</div>
        </div>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <Form
          name="basic"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
      >
        <Form.Item
            className="p-2 "
            label="What do you need?"
            name="title"
            rules={[
              {required: true, message: 'Please input your need!',},
            ]}
        >
          <Input className="!rounded-md" />
        </Form.Item>
        <Form.Item
            label="Where?"
            name="location"
            rules={[
              {required: true, message: 'Please input your location!',},
            ]}
        >
          <Input  className="!rounded-md" />
        </Form.Item>
        <Form.Item
            label="Job Description"
            name="description"
            rules={[
              {required: true, message: 'Please input job description!',},
            ]}
        >
          <Input.TextArea rows={4}  className="!rounded-md" />
        </Form.Item>
        <Form.Item
            label="When do you need the job done?"
            name="neededBy"
            rules={[
              {required: true, message: 'Please select date!',},
            ]}
        >
          <DatePicker
              className="w-full !rounded-md"
              size="large"
              format="MMM D, YYYY"
              onChange={(value, dateString) => {
                console.log('Selected Time: ', value);
                console.log('Formatted Selected Time: ', dateString);
                // setNeededBy(dateString)
              }}/>
        </Form.Item>
        <Form.Item
            label="Additional Notes"
            name="notes"
            rules={[
              {required: false, message: 'Please input your additional notes!',},
            ]}
        >
          <Input.TextArea rows={4}  className="!rounded-md" />
        </Form.Item>
        <Form.Item
            wrapperCol={{
              offset: 0,
              span: 16,
            }}
        >
          <Button type="primary" className="px-8 !rounded-md" htmlType="submit" size="large">
            Booking
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
