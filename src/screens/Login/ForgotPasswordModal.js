import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Raxios from '../../services/axiosHelper';
import { Modal, Form, Input, Button, message } from 'antd';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        setIsLoading(true);
        try {
            const response = await Raxios.post('/forgot', { reg_no: values.reg_no });

            if (response.status !== 200 && response.msg === 'User not found') {
                message.warning('User not found. Please sign up first.');
                onClose();
                setTimeout(() => {
                    navigate('/signup');
                }, 1000);
            } else if (response.status === 200) {
                message.success(response.msg);
                onClose();
                form.resetFields();
            } else {
                message.error(response.msg || 'An error occurred');
            }
        } catch (error) {
            console.error('Forgot password error:', error);
            message.error('Failed to process request. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        onClose();
    };

    return (
        <Modal
            title={<span className="text-lg font-semibold">Forgot Password</span>}
            open={isOpen}
            onCancel={handleCancel}
            footer={null}
            centered
            className="forgot-password-modal"
        >
            <div className="py-4">
                <p className="text-mutedWhite mb-6">
                    Enter your registration number to reset your password
                </p>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    requiredMark={false}
                >
                    <Form.Item
                        label="Registration Number"
                        name="reg_no"
                        rules={[
                            { required: true, message: 'Please enter your registration number' }
                        ]}
                    >
                        <Input
                            placeholder="Enter your registration number"
                            className="px-4 py-2 rounded-lg"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item className="mb-0">
                        <div className="flex gap-3 justify-end">
                            <Button
                                onClick={handleCancel}
                                className="px-6"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={isLoading}
                                className="px-6 bg-[#3533cd] hover:bg-[#2826a3]"
                            >
                                Submit
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default ForgotPasswordModal;
