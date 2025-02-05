import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { AnimatedCharacters as AnimatedScene } from './AnimatedScene';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Alert, Spin, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';

const LoginPage = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

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
            const response = await axios.post('/api/auth/login', values);
            localStorage.setItem('token', response.data.token);
            message.success('Login successful!');
            navigate('/Home'); 
        } catch (error) {
            console.error('Login failed:', error);
            setErrors({ form: error.response?.data?.message || 'Login failed. Please try again.' });
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
