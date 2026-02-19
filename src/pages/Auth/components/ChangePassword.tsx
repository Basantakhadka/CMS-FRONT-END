import React, { useEffect, useState } from "react";
import { Form, Input, Button, Typography, Space, message, Card } from "antd";
import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { JWT_TOKEN } from "../../../constants";
import { setNewPassword } from "../../../store/slices/newPasswordSlice";
import { clearLocalStorage, getLocalStorage } from "../../../utils/storageUtils";
import { fetchPasswordPolicy } from "../../../store/slices/generalSlice";

const { Title, Text } = Typography;

interface Props {
  changePassword: any;
  passwordPolicyPayload: any;
}

const ChangePassword: React.FC<Props> = ({
  changePassword,
  passwordPolicyPayload,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const policy = passwordPolicyPayload;
  const username = getLocalStorage("username");

  /* PASSWORD REGEX */
 const passwordRegex = () => {
  if (!policy) return /.*/;

  let pattern = `^`;

  if (policy.requireUppercase)
    pattern += `(?=.*[A-Z])`;
  if (policy.requireLowercase)
    pattern += `(?=.*[a-z])`;
  if (policy.requireNumbers)
    pattern += `(?=.*\\d)`;
  if (policy.requireSpecialChars)
    pattern += `(?=.*[!@#$%^&*()_+\\-=[\\]{};':"\\|,.<>/?])`;

  pattern += `.{${policy.minLength},${policy.maxLength}}$`;

  return new RegExp(pattern);
};

  /* SUBMIT */
  const handleSubmit = async (values: any) => {
    console.log("Change Password Payload:", values);
    if (values.password !== values.confirmPassword) {
      return message.error("Passwords do not match");
    }

    setLoading(true);
    try {
      await changePassword({ ...values, username });

      dispatch(setNewPassword(false));
      clearLocalStorage(JWT_TOKEN);

      message.success("Password changed successfully. Please login.");
      navigate("/");
    } catch (e: any) {
      message.error(
        e?.response?.data?.data?.message || "Failed to change password"
      );
    } finally {
      setLoading(false);
    }
  };

  /* LIVE PASSWORD CHECKS */
 const checks = [
  { ok: password.length >= policy?.minLength, text: `Minimum ${policy?.minLength} characters` },
  { ok: password.length <= policy?.maxLength, text: `Maximum ${policy?.maxLength} characters` },
  { ok: !policy?.requireUppercase || /[A-Z]/.test(password), text: `At least ${policy?.requireUppercase ? 1 : 0} uppercase letter` },
  { ok: !policy?.requireLowercase || /[a-z]/.test(password), text: `At least ${policy?.requireLowercase ? 1 : 0} lowercase letter` },
  { ok: !policy?.requireNumbers || /\d/.test(password), text: `At least ${policy?.requireNumbers ? 1 : 0} number` },
  { ok: !policy?.requireSpecialChars || /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password), text: `At least ${policy?.requireSpecialChars ? 1 : 0} special character` },
];



  useEffect(() => {
    if (!passwordPolicyPayload) dispatch(fetchPasswordPolicy());
  }, [dispatch]);



  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f7fa",
      }}
    >
      <Card
        style={{
          width: 420,
          borderRadius: 12,
          boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
        }}
        bodyStyle={{ padding: 28 }}
      >
        {/* BACK BUTTON */}
        <ArrowLeftOutlined
          style={{
            fontSize: 18,
            marginBottom: 10,
            cursor: "pointer",
            color: "#555",
          }}
          onClick={() => {
            dispatch(setNewPassword(false));
            navigate("/");
          }}
        />

        {/* TITLE */}
        <Title level={4} style={{ marginBottom: 5 }}>
          Change Password
        </Title>

        <Text type="secondary">
          Please change your password before entering Dashboard.
        </Text>

        {/* FORM */}
        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
          style={{ marginTop: 25 }}
        >
          <Form.Item
            label="Current Password"
            name="oldPassword"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="password"
            rules={[
              { required: true, message: "Required" },
              { pattern: passwordRegex(), message: "Password does not match policy" },
            ]}
          >
            <Input.Password
              size="large"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Required" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value)
                    return Promise.resolve();
                  return Promise.reject("Passwords do not match");
                },
              }),
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>

          {/* RULE CHECKLIST */}
          <div style={{ marginTop: 10 }}>
            {checks.map((rule, i) => (
              <div key={i} style={{ marginBottom: 4 }}>
                <Space>
                  {rule.ok ? (
                    <CheckCircleOutlined style={{ color: "green" }} />
                  ) : (
                    <CloseCircleOutlined style={{ color: "red" }} />
                  )}
                  <Text>{rule.text}</Text>
                </Space>
              </div>
            ))}
          </div>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
            style={{ marginTop: 25 }}
          >
            Change Password
          </Button>
        </Form>

        {/* BOTTOM INFO TEXT */}
        <Text
          type="secondary"
          style={{
            display: "block",
            marginTop: 20,
            textAlign: "center",
            fontSize: 12,
          }}
        >
          Your password must meet all security requirements before continuing.
        </Text>
      </Card>
    </div>
  );
};

export default ChangePassword;
