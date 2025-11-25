import { Table, Button, Tag, Empty } from 'antd'
import { WalletOutlined } from '@ant-design/icons'

export function UserTable({ users, onRecharge, pagination, loading }) {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <strong>{text}</strong>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Reg No',
            dataIndex: 'reg_no',
            key: 'reg_no',
            render: (text) => <span className="font-mono">{text}</span>,
        },
        {
            title: 'Role',
            dataIndex: 'is_admin',
            key: 'role',
            render: (is_admin) => (
                is_admin ? (
                    <Tag color="blue">Admin</Tag>
                ) : (
                    <Tag>User</Tag>
                )
            ),
        },
        {
            title: 'Balance',
            dataIndex: 'balance',
            key: 'balance',
            align: 'right',
            render: (balance) => (
                <span className="font-mono font-medium">
                    ₹{balance.toLocaleString()}
                </span>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            align: 'right',
            render: (_, record) => (
                <Button
                    type="default"
                    size="small"
                    icon={<WalletOutlined />}
                    onClick={() => onRecharge(record)}
                >
                    Recharge
                </Button>
            ),
        },
    ]

    return (
        <Table
            columns={columns}
            loading={loading}
            dataSource={users}
            rowKey="_id"
            pagination={pagination}
            locale={{
                emptyText: <Empty description="No users found" />,
            }}
        />
    )
}
