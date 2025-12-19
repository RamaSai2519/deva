import React, { useState } from 'react';
import { Form, Button, Select, Card, Image, message, Space } from 'antd';
import Raxios from '../../services/axiosHelper';
import { checkAccess } from '../../utils/auth';

const { Option } = Select;

const Notify = () => {
    checkAccess('admin', '/login');
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const handleImageUrlChange = (e) => {
        setImageUrl(e.target.value);
        form.setFieldsValue({ image_url: e.target.value });
    };

    const onFinish = async (values) => {
        if (Array.isArray(values.filter_value)) {
            if (values.filter_value.length > 1) {
                message.error('Please select only one filter value');
                setLoading(false);
                return;
            }
            values.filter_value = values.filter_value[0];
        }

        setLoading(true);
        try {
            const response = await Raxios.post('/notify', values);
            if (response.status !== 200) {
                message.error(response.msg || 'Failed to send notification');
            } else {
                message.success('Notification sent successfully!');
                form.resetFields();
                setImageUrl('');
            }
        } catch (error) {
            message.error(error.response?.data?.message || 'Failed to send notification');
            console.error('Error sending notification:', error);
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '8px 12px',
        fontSize: '14px',
        lineHeight: '1.5715',
        color: 'rgba(0, 0, 0, 0.85)',
        backgroundColor: '#fff',
        border: '1px solid #d9d9d9',
        borderRadius: '4px',
        transition: 'all 0.3s',
        outline: 'none',
    };

    const textareaStyle = {
        ...inputStyle,
        minHeight: '100px',
        resize: 'vertical',
        fontFamily: 'inherit',
    };

    return (
        <div style={{
            padding: '16px',
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
        }}>
            <Card
                title="Send Notification"
                bordered={false}
                style={{
                    width: '100%',
                    maxWidth: '800px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
                bodyStyle={{ padding: '16px' }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                        filter_field: 'user_type',
                        filter_value: 'admin'
                    }}
                >
                    <Form.Item
                        label="Filter Field"
                        name="filter_field"
                        rules={[{ required: true, message: 'Please enter filter field' }]}
                    >
                        <input
                            type="text"
                            placeholder="e.g., user_type"
                            style={inputStyle}
                            onFocus={(e) => e.target.style.borderColor = '#40a9ff'}
                            onBlur={(e) => e.target.style.borderColor = '#d9d9d9'}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Filter Value"
                        name="filter_value"
                        rules={[{ required: true, message: 'Please select or enter filter value' }]}
                    >
                        <Select
                            placeholder="Select only one value or enter custom value"
                            mode='tags'
                            style={{ width: '100%' }}
                        >
                            <Option value="user">User</Option>
                            <Option value="admin">Admin</Option>
                            <Option value="stall">Stall</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please enter notification title' }]}
                    >
                        <input
                            type="text"
                            placeholder="e.g., Congratulations!!!"
                            style={inputStyle}
                            onFocus={(e) => e.target.style.borderColor = '#40a9ff'}
                            onBlur={(e) => e.target.style.borderColor = '#d9d9d9'}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Body"
                        name="body"
                        rules={[{ required: true, message: 'Please enter notification body' }]}
                    >
                        <textarea
                            rows={4}
                            placeholder="e.g., 100 GitCoins have been credited to your account as a welcome bonus."
                            style={textareaStyle}
                            onFocus={(e) => e.target.style.borderColor = '#40a9ff'}
                            onBlur={(e) => e.target.style.borderColor = '#d9d9d9'}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Image URL"
                        name="image_url"
                        rules={[
                            { required: true, message: 'Please enter image URL' },
                            { type: 'url', message: 'Please enter a valid URL' }
                        ]}
                    >
                        <input
                            type="url"
                            placeholder="e.g., https://gitamepoch.vercel.app/Assets/gitcoin_notify.png"
                            onChange={handleImageUrlChange}
                            style={inputStyle}
                            onFocus={(e) => e.target.style.borderColor = '#40a9ff'}
                            onBlur={(e) => e.target.style.borderColor = '#d9d9d9'}
                        />
                    </Form.Item>

                    {imageUrl && (
                        <Form.Item label="Image Preview">
                            <Card
                                style={{
                                    width: '100%',
                                    maxWidth: '400px',
                                    margin: '0 auto'
                                }}
                                bodyStyle={{ padding: '12px' }}
                            >
                                <Image
                                    src={imageUrl}
                                    alt="Notification Preview"
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        display: 'block'
                                    }}
                                    fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                                    preview={true}
                                />
                            </Card>
                        </Form.Item>
                    )}

                    <Form.Item style={{ marginBottom: 0 }}>
                        <Space
                            style={{
                                width: '100%',
                                justifyContent: 'flex-start',
                                flexWrap: 'wrap',
                                gap: '8px'
                            }}
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                style={{ minWidth: '140px' }}
                            >
                                Send Notification
                            </Button>
                            <Button
                                onClick={() => {
                                    form.resetFields();
                                    setImageUrl('');
                                }}
                                style={{ minWidth: '100px' }}
                            >
                                Reset
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Notify;
