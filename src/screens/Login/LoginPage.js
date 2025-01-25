import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { AnimatedCharacters as AnimatedScene } from './AnimatedScene';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Alert, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const LoginPage = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const validateForm = ({ email, password }) => {
        const newErrors = {};
        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!password) {
            newErrors.password = 'Password is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (values) => {
        if (validateForm(values)) {
            setIsLoading(true);
            try {
                // Replace with actual API call
                await new Promise((resolve) => setTimeout(resolve, 1500));
                console.log('Login successful');
            } catch (error) {
                console.error('Login failed:', error);
                setErrors({ form: 'Login failed. Please try again.' });
            } finally {
                setIsLoading(false);
            }
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
                        <div className="absolute top-8 right-8">
                            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 24 24" className="text-gray-400">
                                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                        </div>
                        <div className="space-y-8">
                            <div>
                                <h1 className="text-2xl font-semibold mb-1">Welcome Back</h1>
                                <p className="text-gray-400">Please enter your details</p>
                            </div>
                            {errors.form && <Alert message={errors.form} type="error" showIcon />}
                            <Form className="space-y-6" onFinish={handleSubmit}>
                                <Form.Item
                                    validateStatus={errors.email ? 'error' : ''}
                                    help={errors.email}
                                    name="email"
                                >
                                    <Input
                                        prefix={<UserOutlined />}
                                        type="email"
                                        placeholder="Enter your email"
                                        className="bg-zinc-800 text-white"
                                        aria-invalid={errors.email ? 'true' : 'false'}
                                    />
                                </Form.Item>
                                <Form.Item
                                    validateStatus={errors.password ? 'error' : ''}
                                    help={errors.password}
                                    name="password"
                                >
                                    <Input.Password
                                        prefix={<LockOutlined />}
                                        type={isPasswordVisible ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        className="bg-zinc-800 text-white"
                                        iconRender={() =>
                                            <Button
                                                type="text"
                                                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                                icon={isPasswordVisible ? <EyeOff /> : <Eye />}
                                            />
                                        }
                                        aria-invalid={errors.password ? 'true' : 'false'}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Form.Item name="remember" valuePropName="checked" noStyle>
                                        <Checkbox className="text-gray-400">Remember for 30 days</Checkbox>
                                    </Form.Item>
                                    <Link to="/account" className="float-right text-gray-400">
                                        Forgot password?
                                    </Link>
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="w-full"
                                        disabled={isLoading}
                                        icon={isLoading ? <Spin /> : null}
                                    >
                                        {isLoading ? 'Logging in...' : 'Log in'}
                                    </Button>
                                </Form.Item>
                            </Form>
                            <p className="text-center text-sm text-gray-400">
                                Don't have an account?{' '}
                                <Link to="/signup" className="text-white hover:underline">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
