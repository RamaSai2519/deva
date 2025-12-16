import { Table, Button, Empty } from 'antd'
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
            dataIndex: 'user_type',
            key: 'role',
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
            fixed: 'right',
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
            className='overflow-x-scroll'
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
