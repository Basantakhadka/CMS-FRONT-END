import React, { useState } from 'react';
import { Modal, Transfer } from 'antd';
import type { TransferProps } from 'antd';
import type { User } from '../../../../store/slices/usersSlice';

interface AssignUsersModalProps {
  visible: boolean;
  roleName: string;
  allUsers: User[];
  assignedUserIds: string[];
  onAssign: (userIds: string[]) => void;
  onCancel: () => void;
  loading: boolean;
}

const AssignUsersModal: React.FC<AssignUsersModalProps> = ({
  visible,
  roleName,
  allUsers,
  assignedUserIds,
  onAssign,
  onCancel,
  loading,
}) => {
  const [targetKeys, setTargetKeys] = useState<string[]>(assignedUserIds);

  const handleChange: TransferProps['onChange'] = (newTargetKeys) => {
    setTargetKeys(newTargetKeys as string[]);
  };

  const handleSubmit = () => {
    onAssign(targetKeys);
  };

  return (
    <Modal
      title={`Assign Users to ${roleName}`}
      open={visible}
      onOk={handleSubmit}
      onCancel={onCancel}
      confirmLoading={loading}
      width={800}
    >
      <Transfer
        dataSource={allUsers.map((user) => ({
          key: user.id,
          title: `${user.firstName} ${user.lastName} (${user.email})`,
          description: user.username,
        }))}
        titles={['Available Users', 'Assigned Users']}
        targetKeys={targetKeys}
        onChange={handleChange}
        render={(item) => item.title}
        listStyle={{
          width: 350,
          height: 400,
        }}
        showSearch
        filterOption={(inputValue, item) =>
          item.title.toLowerCase().includes(inputValue.toLowerCase())
        }
      />
    </Modal>
  );
};

export default AssignUsersModal;
