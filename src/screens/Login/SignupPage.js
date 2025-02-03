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
            const response = await fetch('https://jkgxi62nv3.execute-api.ap-south-1.amazonaws.com/dev', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'register',
                    name: values.name,
                    email: values.email,
                    reg_no: values.registrationNumber,
                    password: values.password,
                    phoneNumber: values.phoneNumber,
                    avatar: selectedAvatar?.name
                })
            });
            const data = await response.json();

            if (data.output_status === 'SUCCESS') {
                message.success('Signup successful!');
                navigate('/login');
            } else {
                message.error(data.output_message || 'Signup failed. Please try again.');
            }
        } catch (error) {
            console.error('Signup failed:', error);
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
                            <AnimatedScene mousePosition={mousePosition} />
                        </div>
                    </div>
                    <div className="p-12 relative bg-black text-white">
                        <div className="space-y-8">
                            <h1 className="text-2xl font-semibold mb-1">Create Account</h1>
                            <p className="text-gray-400">Please enter your details</p>
                            <Form name="signup" onFinish={onFinish} className="space-y-6">
                                <Form.Item name="name" rules={[{ required: true, message: 'Please input your full name!' }]}> <Input id="name" placeholder="Full Name" /> </Form.Item>
                                <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Invalid email!' }]}> <Input placeholder="Email" /> </Form.Item>
                                <Form.Item name="registrationNumber" rules={[{ required: true, message: 'Please input your registration number!' }]}> <Input placeholder="Registration Number" /> </Form.Item>
                                <Form.Item name="phoneNumber" rules={[{ required: true, message: 'Please input your phone number!' }]}> <Input placeholder="Phone Number" /> </Form.Item>
                                <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}> <Input.Password placeholder="Password" iconRender={(visible) => visible ? <EyeOff size={20} /> : <Eye size={20} />} /> </Form.Item>
                                <Form.Item name="confirmPassword" dependencies={['password']} rules={[{ required: true, message: 'Please confirm your password!' }, ({ getFieldValue }) => ({ validator(_, value) { return !value || getFieldValue('password') === value ? Promise.resolve() : Promise.reject(new Error('Passwords do not match!')); } })]}> <Input.Password placeholder="Confirm Password" /> </Form.Item>
                                <Form.Item name="avatar" rules={[{ required: true, message: 'Please select an avatar!' }]}> <Select placeholder="Select an avatar" onChange={(value) => setSelectedAvatar(avatars.find(avatar => avatar.name === value))}>{avatars.map(avatar => <Option key={avatar.name} value={avatar.name}>{avatar.name}</Option>)}</Select> </Form.Item>
                                <Form.Item name="agreeTerms" valuePropName="checked" rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('You must agree to the terms and conditions')) }]}> <Checkbox> I agree to the <Button type="link" onClick={() => setIsModalOpen(true)} className="p-0 text-[#3533cd] hover:underline">Terms and Conditions</Button></Checkbox> </Form.Item>
                                <Form.Item> <Button type="primary" htmlType="submit" loading={isLoading} className="w-full">{isLoading ? 'Signing up...' : 'Sign up'}</Button> </Form.Item>
                            </Form>
                            <p className="text-center text-sm text-gray-400"> Already have an account? <Link to="/login" className="text-white hover:underline">Log in</Link> </p>
                        </div>
                    </div>
                </div>
            </div>
            <TermsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default SignupPage;
