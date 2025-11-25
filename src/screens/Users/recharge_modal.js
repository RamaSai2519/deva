import { useState, useEffect } from "react"
import { Modal, Button, InputNumber, Space, Typography, Card } from 'antd'
import { WalletOutlined } from '@ant-design/icons'

const { Text } = Typography

export function RechargeModal({ isOpen, onClose, user, onSubmit }) {
  const [amount, setAmount] = useState(null)

  // Reset amount when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setAmount(null)
    }
  }, [isOpen])

  const handleSubmit = () => {
    if (amount > 0) {
      onSubmit(amount)
    }
  }

  const quickAmounts = [10, 50, 100, 200, 500]

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      title={
        <Space align="center">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500/10">
            <WalletOutlined className="text-xl text-blue-500" />
          </div>
          <div>
            <div className="font-semibold">Recharge Balance</div>
            <Text type="secondary" className="text-xs">Add funds to user account</Text>
          </div>
        </Space>
      }
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleSubmit}
          disabled={!amount || amount <= 0}
        >
          Confirm Recharge
        </Button>,
      ]}
      width={500}
    >
      {user && (
        <Space direction="vertical" size="large" className="w-full">
          <Card size="small" className="bg-darkBlack">
            <Space direction="vertical" size="small" className="w-full">
              <div className="flex justify-between">
                <Text type="secondary">Name</Text>
                <Text strong>{user.name}</Text>
              </div>
              <div className="flex justify-between">
                <Text type="secondary">Email</Text>
                <Text>{user.email}</Text>
              </div>
              <div className="flex justify-between">
                <Text type="secondary">Current Balance</Text>
                <Text strong className="font-mono">
                  ₹{user.balance.toLocaleString()}
                </Text>
              </div>
            </Space>
          </Card>

          {/* Amount Input */}
          <Space direction="vertical" size="small" className="w-full">
            <Text>Recharge Amount</Text>
            <InputNumber
              className="w-full font-mono"
              placeholder="0"
              value={amount}
              onChange={setAmount}
              min={1}
              step={1}
              prefix="₹"
              size="large"
            />

            {/* Quick Amount Buttons */}
            <Space wrap>
              {quickAmounts.map((quickAmount) => (
                <Button
                  key={quickAmount}
                  onClick={() => setAmount(quickAmount)}
                  className="font-mono"
                >
                  ₹{quickAmount}
                </Button>
              ))}
            </Space>
          </Space>

          {/* New Balance Preview */}
          {amount && amount > 0 && (
            <Card size="small">
              <div className="flex justify-between">
                <Text type="secondary">New Balance</Text>
                <Text strong className="font-mono text-blue-500">
                  ₹{(user.balance + amount).toLocaleString()}
                </Text>
              </div>
            </Card>
          )}
        </Space>
      )}
    </Modal>
  )
}
