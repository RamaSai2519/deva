import { Button, Input, Select, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const filterOptions = [
    { value: "name", label: "Name" },
    { value: "email", label: "Email" },
    { value: "reg_no", label: "Registration No" },
]

export function UserFilters({ filterField, filterValue, onFilterFieldChange, onFilterValueChange, onSubmit }) {
    return (
        <Space.Compact className="w-full">
            <Select
                value={filterField}
                onChange={onFilterFieldChange}
                className="w-[180px]"
                options={filterOptions}
            />
            <Input
                placeholder={`Search by ${filterOptions.find((o) => o.value === filterField)?.label.toLowerCase()}...`}
                value={filterValue}
                onChange={(e) => onFilterValueChange(e.target.value)}
                prefix={<SearchOutlined />}
                className="flex-1"
                onPressEnter={onSubmit}
            />
            <Button type="primary" onClick={onSubmit}>
                Search
            </Button>
        </Space.Compact>
    )
}
