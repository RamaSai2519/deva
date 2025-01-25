import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Checkbox, message } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { AnimatedCharacters as AnimatedScene } from './AnimatedScene';
import TermsModal from './TermsModal';
import avatars from './avatar.json';

const { Option } = Select;

const SignupPage = () => {
    const navigate = useNavigate();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        document.getElementById('name').focus();
    }, []);

    const onFinish = async (values) => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log("Form submitted successfully", {
                ...values,
                avatar: selectedAvatar?.name
            });
            message.success('Signup successful!');
            navigate('/login');
        } catch (error) {
            console.error("Signup failed:", error);
            message.error('Signup failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="bg-white rounded-[32px] w-full max-w-[1000px] overflow-hidden">
                <div className="grid md:grid-cols-2">
                    <div className="bg-gray-50 p-12 flex items-center justify-center">
                        <div className="w-full max-w-[400px]">
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
                                <h1 className="text-2xl font-semibold mb-1">Create Account</h1>
                                <p className="text-gray-400">Please enter your details</p>
                            </div>
                            <Form
                                name="signup"
                                onFinish={onFinish}
                                initialValues={{ remember: true }}
                                className="space-y-6"
                            >
                                <Form.Item
                                    name="name"
                                    rules={[{ required: true, message: 'Please input your full name!' }]}
                                >
                                    <Input id="name" placeholder="Full Name" className="input-style rounded" />
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    rules={[
                                        { required: true, message: 'Please input your email!' },
                                        { type: 'email', message: 'Please enter a valid email!' }
                                    ]}
                                >
                                    <Input placeholder="Email" className="input-style rounded" />
                                </Form.Item>
                                <Form.Item
                                    name="registrationNumber"
                                    rules={[{ required: true, message: 'Please input your registration number!' }]}
                                >
                                    <Input placeholder="Registration Number" className="input-style rounded"/>
                                </Form.Item>

                                <Form.Item
                                    name="phoneNumber"
                                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                                >
                                    <Input placeholder="Phone Number" className="input-style rounded" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input.Password
                                        placeholder="Password"
                                        className="input-style rounded"
                                        iconRender={(visible) => (visible ? <EyeOff size={20} /> : <Eye size={20} />)}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="confirmPassword"
                                    dependencies={['password']}
                                    rules={[
                                        { required: true, message: 'Please confirm your password!' },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('The two passwords do not match!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password placeholder="Confirm Password" className="input-style rounded" />
                                </Form.Item>
                                <Form.Item
                                    name="avatar"
                                    rules={[{ required: true, message: 'Please select an avatar!' }]}
                                >
                                    <Select
                                        placeholder="Select an avatar"
                                        onChange={(value) => setSelectedAvatar(avatars.find(avatar => avatar.name === value))}
                                        className="select-style rounded"
                                    >
                                        {avatars.map((avatar) => (
                                            <Option key={avatar.name} value={avatar.name}>
                                                {avatar.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="agreeTerms"
                                    valuePropName="checked"
                                    rules={[
                                        { validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('You must agree to the terms and conditions')) },
                                    ]}
                                >
                                    <Checkbox className="text-gray-300">
                                        I agree to the{' '}
                                        <Button type="link" onClick={() => setIsModalOpen(true)} className="p-0 text-[#3533cd] hover:underline">
                                            Terms and Conditions
                                        </Button>
                                    </Checkbox>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" loading={isLoading} className="w-full">
                                        {isLoading ? 'Signing up...' : 'Sign up'}
                                    </Button>
                                </Form.Item>
                            </Form>
                            <p className="text-center text-sm text-gray-400">
                                Already have an account?{" "}
                                <Link to="/login" className="text-white hover:underline">
                                    Log in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <TermsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default SignupPage;
