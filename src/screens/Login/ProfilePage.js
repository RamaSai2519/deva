import React, { useState, useEffect } from 'react';
import { EyeOutlined, EyeInvisibleOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Input, Button, Spin, message, Card, Row, Col } from 'antd';
import { AnimatedCharacters as AnimatedScene } from './AnimatedScene';

export function ProfilePage() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                const userData = await new Promise(resolve =>
                    setTimeout(() => resolve({
                        name: 'user',
                        email: 'gmail',
                    }), 1000)
                );
                form.setFieldsValue({
                    name: userData.name,
                    email: userData.email,
                });
            } catch {
                message.error("Failed to load user data.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserData();
    }, [form]);

    const handleSubmit = async (values) => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            message.success("Profile updated successfully");
        } catch (error) {
            message.error("Profile update failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
            <Card style={{ borderRadius: '32px', width: '100%', maxWidth: '1000px', overflow: 'hidden' }}>
                <Row gutter={[0, 0]}>
                    <Col xs={24} md={12} style={{ backgroundColor: '#f5f5f5', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: '100%', maxWidth: '400px' }}>
                            <AnimatedScene mousePosition={mousePosition} isPasswordVisible={isPasswordVisible} />
                        </div>
                    </Col>
                    <Col xs={24} md={12} style={{ padding: '24px', position: 'relative', backgroundColor: '#000', color: '#fff' }}>
                        <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#2f2f2f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <PlusOutlined style={{ color: '#a1a1a1' }} />
                            </div>
                        </div>
                        <div style={{ marginTop: '16px' }}>
                            <h1 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>Your Profile</h1>
                            <p style={{ color: '#a1a1a1' }}>Manage your account details</p>
                        </div>
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleSubmit}
                            style={{ marginTop: '16px' }}
                        >
                            <Form.Item
                                label="Full Name"
                                name="name"
                                rules={[{ required: true, message: 'Name is required' }]}
                            >
                                <Input style={{ borderRadius: '8px' }} />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    { required: true, message: 'Email is required' },
                                    { type: 'email', message: 'Email is invalid' }
                                ]}
                            >
                                <Input style={{ borderRadius: '8px' }} />
                            </Form.Item>
                            <Form.Item
                                label="New Password"
                                name="newPassword"
                                rules={[
                                    { min: 8, message: 'Password must be at least 8 characters' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('confirmPassword') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Passwords do not match'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    style={{ borderRadius: '8px' }}
                                    iconRender={visible => (visible ? <EyeInvisibleOutlined /> : <EyeOutlined />)}
                                    visibilityToggle
                                />
                            </Form.Item>
                            <Form.Item
                                label="Confirm New Password"
                                name="confirmPassword"
                                dependencies={['newPassword']}
                                rules={[
                                    { required: true, message: 'Please confirm your password' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('newPassword') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Passwords do not match'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    style={{ borderRadius: '8px' }}
                                    iconRender={visible => (visible ? <EyeInvisibleOutlined /> : <EyeOutlined />)}
                                    visibilityToggle
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" block disabled={isLoading} style={{ borderRadius: '8px' }}>
                                    {isLoading ? <Spin /> : 'Update Profile'}
                                </Button>
                            </Form.Item>
                        </Form>
                        <div style={{ marginTop: '16px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#fff' }}>Account Activity</h3>
                            <p style={{ fontSize: '14px', color: '#a1a1a1' }}>Last login: December 7, 2024, 7:30 PM</p>
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

export default ProfilePage;
