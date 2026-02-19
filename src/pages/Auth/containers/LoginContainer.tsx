import React, { useEffect, useState } from "react";
import { message, Spin } from "antd";
import { useAuth } from "../../../context/AuthContext";
import LoginForm from "../components/LoginForm";
import "../Auth.css";
import { useNavigate } from "react-router-dom";
import { setNewPassword } from "../../../store/slices/newPasswordSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import ChangePassword from "../components/ChangePassword";
import { fetchPasswordPolicy } from "../../../store/slices/generalSlice";
import { authService } from "../services/authService";

interface LoginFormValues {
  username: string;
  password: string;
}

const LoginContainer: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const { newPassword } = useAppSelector((state) => state.newPassword);
  const passwordPolicy = useAppSelector(
    (state) => state.general.passwordPolicy
  );
  /* LOGIN SUBMIT */
  const handleSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      const response = await login(values);

      const loginInfo = response?.data?.loginInfo;

      if (loginInfo?.accessToken && !loginInfo?.enforcePasswordChange) {
        message.success("Login successful!");
        navigate("/dashboard");
      }
      else if (loginInfo?.enforcePasswordChange) {
        dispatch(setNewPassword(true));
      }
      else {
        console.log("Invalid username or password");
      }

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /* CHANGE PASSWORD SUBMIT */
  const handleChangePassword = async (values: any) => {
    setLoading(true);

    try {
      await authService.changePassword(values);
      navigate("/login"); 

    } catch (error: any) {
      console.error("Change password error:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (newPassword) dispatch(fetchPasswordPolicy());
  }, [dispatch]);


  return (
    <>
      {newPassword && passwordPolicy? (
        <ChangePassword
          changePassword={handleChangePassword}
          passwordPolicyPayload={passwordPolicy}
        />
      ) : (
        <LoginForm onSubmit={handleSubmit} loading={loading} />
      )}
    </>
  );
};

export default LoginContainer;
