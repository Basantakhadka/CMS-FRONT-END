import React, { useEffect, useState } from 'react';
import {
    Form, Input, Select, DatePicker, Button, Card, Space,
    Divider, Row, Col, message, Breadcrumb, Tooltip,
} from 'antd';
import {
    FileTextOutlined, UserOutlined, LinkOutlined,
    DollarOutlined, GlobalOutlined, SaveOutlined,
    HomeOutlined, PlusOutlined, MinusCircleOutlined
} from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import { useNavigate } from 'react-router-dom';


const { Option } = Select;

// Type for a single contract
export interface Contract {
    title: string;
    type: string;
    parties: string[];
    expiryDate: string; // ISO string
    contractDate: string; // ISO string
    documentLink?: string;
    contractValue?: string;
    scopeOfWork?:string,
    amendmentDate?:string,
    amendmentLink?:string,
    terminationNoticeDays?:any,
    renewalTerms?: string;
    governingLaw?: string;
    jurisdiction?: string
}

// Props type for AddContract
interface AddContractProps {
    onSave: (contract: any) => any;
    onCancel?: () => any;
    initialData?: Contract | null;
}

const AddContract: React.FC<AddContractProps> = ({ onSave, onCancel, initialData = null }) => {
    const [form] = Form.useForm();
    const [parties, setParties] = useState<string[]>(initialData?.parties || ['']);
    const navigate = useNavigate()

    const handleAddParty = () => setParties([...parties, '']);
    const handleRemoveParty = (index: number) => {
        const newParties = parties.filter((_, i) => i !== index);
        setParties(newParties.length > 0 ? newParties : ['']);
    };
    const handlePartyChange = (index: number, value: string) => {
        const newParties = [...parties];
        newParties[index] = value;
        setParties(newParties);
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const filteredParties = parties.filter(p => p.trim() !== '');
            if (filteredParties.length === 0) {
                message.error('Please add at least one party');
                return;
            }

            const contractData: Contract = {
                // id: initialData?.id || Date.now().toString(),
                title: values.title,
                type: values.type,
                parties: filteredParties,
                expiryDate: (values.expiryDate as Dayjs).toISOString(),
                contractDate: (values.contractDate as Dayjs).toISOString(),
                documentLink: values.documentLink || '',
                scopeOfWork:values.scopeOfWork,
                amendmentDate:values.amendmentDate,
                amendmentLink:values.amendmentLink,
                terminationNoticeDays:values.terminationNoticeDays,
                contractValue: values.contractValue || '',
                renewalTerms: values.renewalTerms || '',
                governingLaw: values.governingLaw || '',
                jurisdiction: values.jurisdiction || '',
            };
            console.log({ contractData });
            onSave(contractData);
        } catch (error) {
            message.error('Please fill in all required fields');
        }
    }

    return (
        <>
            <Breadcrumb>
                <Breadcrumb.Item >
                    <HomeOutlined />
                </Breadcrumb.Item>
                <Breadcrumb.Item onClick={() => navigate('/contracts')} >Contracts</Breadcrumb.Item>
                <Breadcrumb.Item>{initialData ? 'Edit Contract' : 'Add Contract'}</Breadcrumb.Item>
            </Breadcrumb>

            <Card style={{ height: '80vh', padding: '20px 20px 20px 0px', overflowY: 'auto' }}>
                <Form
                    form={form}
                    layout="vertical"
                    style={{ width: '60%' }}
                    initialValues={initialData ? {
                        ...initialData,
                        expiryDate: dayjs(initialData?.expiryDate),
                        contractDate: dayjs(initialData?.contractDate),
                        amendmentDate:dayjs(initialData?.amendmentDate),
                        documentLink: initialData?.documentLink || '',
                        amendmentLink:initialData?.amendmentLink
                    } : {}}
                    size="middle"
                >
                    {/* Contract Title */}
                    <Form.Item
                        label="Contract Title"
                        name="title"
                        rules={[
                            { required: true, message: 'Please enter contract title' },
                            { min: 5, message: 'Title must be at least 5 characters' }
                        ]}
                    >
                        <Input placeholder="e.g., Software License Agreement with TechCorp" prefix={<FileTextOutlined />} />
                    </Form.Item>

                    {/* Contract Type */}
                    <Form.Item
                        label="Contract Type"
                        name="type"
                        rules={[{ required: true, message: 'Please select contract type' }]}
                    >
                        <Select placeholder="Select contract type">
                            <Option value="Recurring">Recurring</Option>
                            <Option value="One-time">One-time</Option>
                            <Option value="Other">Other</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Scope of Work"
                        name="scopeOfWork"
                        rules={[{ required: true, message: "Please enter scope of work" }]}
                    >
                        <Input placeholder="Enter scope of work" />
                    </Form.Item>

                    {/* Parties */}
                    {parties.map((party, index) => (
                        <Form.Item key={index} label={`Party ${index + 1}`} required>
                            <Space.Compact style={{ width: '100%' }}>
                                <Input
                                    placeholder={`Enter party name (e.g., ${index === 0 ? 'TechCorp Inc.' : 'Global Solutions Ltd.'})`}
                                    value={party}
                                    onChange={(e) => handlePartyChange(index, e.target.value)}
                                    prefix={<UserOutlined />}
                                    style={{ width: 'calc(100% - 80px)' }}
                                />
                                {parties.length > 1 && (
                                    <Tooltip title="Remove party">
                                        <Button
                                            danger
                                            icon={<MinusCircleOutlined />}
                                            onClick={() => handleRemoveParty(index)}
                                        />
                                    </Tooltip>
                                )}
                            </Space.Compact>
                        </Form.Item>
                    ))}

                    <Form.Item>
                        <Button type="dashed" onClick={handleAddParty} block icon={<PlusOutlined />}>
                            Add Another Party
                        </Button>
                    </Form.Item>


                    <Form.Item
                        label="Contract Date"
                        name="contractDate"
                        rules={[
                            { required: true, message: 'Please select contract date' },
                            {
                                validator: (_, value) => {
                                    if (value && value.isAfter(dayjs(), 'day')) {
                                        return Promise.reject('Contract date cannot be in the future');
                                    }
                                    return Promise.resolve();
                                }
                            }
                        ]}
                    >
                        <DatePicker
                            style={{ width: '100%' }}
                            format="MMMM DD, YYYY"
                            disabledDate={(current) => current && current > dayjs().endOf('day')}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Expiry Date"
                        name="expiryDate"
                        rules={[
                            { required: true, message: 'Please select expiry date' },

                        ]}
                    >
                        <DatePicker
                            style={{ width: '100%' }}
                            format="MMMM DD, YYYY"
                            disabledDate={(current) => current && current < dayjs().startOf('day')}
                        />
                    </Form.Item>

                    {/* Single Document Link */}
                    <Form.Item
                        label="Document Link"
                        name="documentLink"
                        rules={[{ required: true, message: 'Please enter document link' }]}
                    >
                        <Input placeholder="https://drive.google.com/..." prefix={<LinkOutlined />} />
                    </Form.Item>


                    {/* Amendment Date */}
                    <Form.Item
                        label="Amendment Date"
                        name="amendmentDate"
                    >
                        <DatePicker style={{ width: '100%' }}
                            format="MMMM DD, YYYY" />
                    </Form.Item>


                    {/* Amendment Link */}
                    <Form.Item
                        label="Amendment Link"
                        name="amendmentLink"
                        rules={[
                            { type: "url", message: "Enter valid URL" }
                        ]}
                    >
                        <Input placeholder="https://example.com" />
                    </Form.Item>

                    {/* Contract Value & Jurisdiction */}
                    <Row gutter={16}>
                        <Col xs={24} md={12}>
                            <Form.Item label="Contract Value" name="contractValue">
                                <Input prefix={<DollarOutlined />} placeholder="e.g., 50,000" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item label="Jurisdiction" name="jurisdiction">
                                <Input prefix={<GlobalOutlined />} placeholder="e.g., New York, USA" />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Renewal Terms */}
                    <Form.Item label="Renewal Terms" name="renewalTerms">
                        <Select placeholder="Select renewal type">
                            <Select.Option value="Manual">Manual</Select.Option>
                            <Select.Option value="Auto">Auto</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Termination Policy (Prior Notice Days)"
                        name="terminationNoticeDays"
                        rules={[{ required: true, message: "Please enter notice period" }]}
                    >
                        <Input
                            
                            style={{ width: "100%" }}
                            placeholder="Enter number of days"
                        />
                    </Form.Item>
                    {/* Governing Law */}
                    <Form.Item label="Governing Law" name="governingLaw">
                        <Input placeholder="e.g., New York State Law" />
                    </Form.Item>

                    {/* Form Actions */}
                    <Divider />

                </Form>

                <Form.Item style={{ float: 'right' }}>
                    <Space>
                        <Button type="primary" icon={<SaveOutlined />} onClick={handleSubmit}>
                            {initialData ? 'Update Contract' : 'Create Contract'}
                        </Button>
                    </Space>
                </Form.Item>

            </Card>

        </>
    );
};

export default AddContract;
