import { Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const CustomPopconfirm = ({ children, record, confirm, cancel,okText,cancelText, title, description }) => (
    <Popconfirm
        title={title}
        description={description}
        onConfirm={() => confirm(record)}
        onCancel={()=>cancel()}
        icon={
            <QuestionCircleOutlined
                style={{
                    color: 'red',
                }}
            />
        }
        placement="topLeft"
        okText={okText || "Delete"}
        cancelText={cancelText || "Cancel"}
    >
        {children}
    </Popconfirm>
);

export default CustomPopconfirm 