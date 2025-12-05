import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { Card, Typography, Space, message } from 'antd'
import { RechargeModal } from "./recharge_modal"
import { UserOutlined } from '@ant-design/icons'
import Raxios from "../../services/axiosHelper"
import { UserFilters } from "./user_filters"
import { UserTable } from "./user_table"

const { Title, Text } = Typography

export function UserListPage() {
    const navigate = useNavigate();
    const [page, setPage] = useState(1)
    const [size, setSize] = useState(10)
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [totalUsers, setTotalUsers] = useState(50)
    const [filter_value, setFilterValue] = useState("")
    const [filter_field, setFilterField] = useState("name")
    const [selectedUser, setSelectedUser] = useState(null)
    const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false)

    if (!localStorage.getItem('is_admin') || localStorage.getItem('is_admin') !== 'true') {
        navigate('/account');
    }

    const fetchUsers = async () => {
        setLoading(true)
        try {
            const response = await Raxios.get('/user', {
                params: { page, size, filter_field, filter_value }
            })
            if (response.status === 200) {
                setUsers(response.data.users)
                setTotalUsers(response.data.total)
            } else {
                message.error(response.msg || "Failed to fetch users")
            }
        } catch (error) {
            message.error("An error occurred while fetching users")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, size])

    const handleRecharge = (user) => {
        setSelectedUser(user)
        setIsRechargeModalOpen(true)
    }

    const handleRechargeSubmit = async (amount) => {
        try {
            const payload = {
                coins: amount,
                action: 'add',
                user_id: selectedUser._id,
                admin_id: localStorage.getItem('user_id'),
            }
            const response = await Raxios.post('/wallet', payload)
            if (response.status === 200) {
                message.success(`Successfully recharged ₹${amount} to ${selectedUser.name}`)
                fetchUsers()
            } else {
                message.error(response.msg || "Failed to recharge balance")
            }
        } catch (error) {
            message.error("An error occurred while recharging balance")
        }
        setIsRechargeModalOpen(false)
        setSelectedUser(null)
    }

    return (
        <div className="min-h-screen py-8 px-4 overflow-auto">
            <div className="max-w-7xl mx-auto">
                <Space direction="vertical" size="large" className="w-full mb-8">
                    <Space align="center" size="middle">
                        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-500/10">
                            <UserOutlined className="text-xl text-blue-500" />
                        </div>
                        <div>
                            <Title level={2} className="!m-0">Users</Title>
                            <Text type="secondary">Manage and view all registered users</Text>
                        </div>
                    </Space>
                </Space>

                <UserFilters
                    filterField={filter_field}
                    filterValue={filter_value}
                    onFilterFieldChange={setFilterField}
                    onFilterValueChange={setFilterValue}
                    onSubmit={fetchUsers}
                />

                <Card className="mt-6">
                    <UserTable users={users} onRecharge={handleRecharge} pagination={
                        {
                            current: page,
                            pageSize: size,
                            total: totalUsers,
                            onChange: (page, pageSize) => {
                                setPage(page)
                                setSize(pageSize)
                            }
                        }
                    }
                        loading={loading}
                    />
                </Card>

                <RechargeModal
                    isOpen={isRechargeModalOpen}
                    onClose={() => {
                        setIsRechargeModalOpen(false)
                        setSelectedUser(null)
                    }}
                    user={selectedUser}
                    onSubmit={handleRechargeSubmit}
                />
            </div>
        </div>
    )
}
