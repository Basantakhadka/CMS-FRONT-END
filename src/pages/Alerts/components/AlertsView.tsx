// src/pages/Alerts/components/AlertsView.tsx
import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Switch, Select, Divider, Modal } from 'antd';
import { SaveOutlined, EyeOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';


const { Option } = Select;


interface AlertsViewProps {
  initialData: any;
  contracts?: any;
  onFinish: (values: any) => void; // callback to parent page
}

const AlertsView: React.FC<AlertsViewProps> = ({ onFinish, initialData = null, contracts = [] }) => {
  const [form] = Form.useForm();
  const { id } = useParams()
  const [selectedContract, setSelectedContract] = useState<string | null>(null);
  const [customReminder, setCustomReminder] = useState(false);

  // Enable/disable interval field
  const [intervalDisabled, setIntervalDisabled] = useState(true);

  useEffect(() => {
    setIntervalDisabled(!customReminder);
  }, [customReminder]);

  const handleSave = (values: any) => {
    onFinish(values); // send data to parent
  };


  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        ...initialData,
      });
      setSelectedContract(initialData.contractId);
      setCustomReminder(initialData.enableCustom);

    }
  }, [initialData, form]);

  return (
    <div>
      <h1 style={{ marginBottom: 24 }}>Alerts Configuration</h1>

      <Card title="Alert Settings" style={{ marginBottom: 16 }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}

          initialValues={initialData ? {
            ...initialData,
          } : {}}
        >
          {/* Select Contract */}
          <Form.Item
            label="Select Contract"
            name="contractId"

            rules={[{ required: true, message: 'Please select a contract' }]}
          >
            <Select
              placeholder="Select a contract"
              disabled={id ? true : false}
              onChange={(value) => setSelectedContract(value)}
            >
              {contracts?.data?.map((c: any) => (
                <Option key={c.value} value={c.value}>
                  {c.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Only show below fields if contract is selected */}
          {selectedContract && (
            <>
              {/* Trigger Expiry */}
              <Form.Item
                label="Trigger Expiry Alerts"
                name="triggerExpiry"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              {/* Custom Reminder */}
              <Form.Item
                label="Enable Custom Reminder"
                name="enableCustom"
                valuePropName="checked"
              >
                <Switch
                  onChange={(checked) => setCustomReminder(checked)}
                />
              </Form.Item>

              {/* Reminder Interval */}
              <Form.Item
                label="Reminder Interval (days)"
                name="reminderInterval"
                rules={[{ required: customReminder, message: 'Please enter interval' }]}
              >
                <Input
                  type="number"
                  placeholder="Enter interval"
                  disabled={intervalDisabled}
                />
              </Form.Item>

              {/* Communication Channels */}
              <Form.Item label="Communication Channels" name="communicationChannels">
                <Select mode="multiple" placeholder="Select channels">
                  <Option value="email">Email</Option>
                </Select>
              </Form.Item>

              {/* Stakeholders */}
              <Form.Item
                label="Stakeholder Email"
                name="stakeholders"
                rules={[
                  {
                    type: 'email',
                    message: 'Please enter a valid email address'
                  },
                  {
                    required: true,
                    message: 'Email is required'
                  },
                ]}
              >
                <Input type="email" placeholder="Enter stakeholder email" />
              </Form.Item>

              <Divider />

              <Form.Item style={{ float: 'right' }}>

                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                >
                  {id ? 'Update Alert' : 'Save Alert'}
                </Button>
              </Form.Item>
            </>
          )}
        </Form>
      </Card>
    </div>
  );
};

export default AlertsView;
