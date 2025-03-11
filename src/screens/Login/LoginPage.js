import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Checkbox, message, Alert } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { AnimatedCharacters as AnimatedScene } from './AnimatedScene';

const LoginPage = () => {
    const navigate = useNavigate();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleSubmit = async (values) => {
        setIsLoading(true);
        setErrors({});

        try {
            const response = await axios.post('https://7iox8huibl.execute-api.ap-south-1.amazonaws.com/main/actions/user_auth', {
                action: "login",
                reg_no: values.reg_no,
                password: values.password,
                email: values.email
            });
            localStorage.setItem('token', response.data.output_details.access_token);
            message.success('Login successful!');
            navigate('/Intro'); // Redirect to dashboard or home
        } catch (error) {
            console.error('Login failed:', error);
            setErrors({ form: error.response?.data?.output_message || 'Login failed. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-4xl overflow-hidden">
                <div className="grid md:grid-cols-2">
                    <div className="bg-gray-50 p-12 flex items-center justify-center">
                        <div className="w-full max-w-md">
                            <AnimatedScene mousePosition={mousePosition} isPasswordVisible={isPasswordVisible} />
                        </div>
                    </div>
                    <div className="p-12 relative bg-black text-white">
                        <div className="space-y-8">
                            <div>
                                <h1 className="text-2xl font-semibold mb-1">Welcome Back</h1>
                                <p className="text-gray-400">Please enter your details</p>
                            </div>
                            {errors.form && <Alert message={errors.form} type="error" showIcon />}
                            <Form className="space-y-6" onFinish={handleSubmit}>
                                <Form.Item name="email" rules={[{ required: true, message: 'Email is required' }]}>
                                    <Input prefix={<UserOutlined />} type="email" placeholder="Enter your email" />
                                </Form.Item>
                                <Form.Item name="password" rules={[{ required: true, message: 'Password is required' }]}>
                                    <Input.Password
                                        prefix={<LockOutlined />}
                                        type={isPasswordVisible ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        iconRender={(visible) => (visible ? <EyeOff /> : <Eye />)}
                                    />
                                </Form.Item>
                                <Form.Item name="reg_no" rules={[{ required: true, message: 'Registration number is required' }]}>
                                    <Input placeholder="Enter your registration number" />
                                </Form.Item>
                                <Form.Item>
                                    <Checkbox className="text-gray-400">Remember for 30 days</Checkbox>
                                    <Link to="/forgot-password" className="float-right text-gray-400">Forgot password?</Link>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="w-full" loading={isLoading}>
                                        {isLoading ? 'Logging in...' : 'Log in'}
                                    </Button>
                                </Form.Item>
                            </Form>
                            <p className="text-center text-sm text-gray-400">
                                Don't have an account?{' '}
                                <Link to="/signup" className="text-white hover:underline">Sign up</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;