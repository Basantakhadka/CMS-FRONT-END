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
  console.log({newPassword})
  const passwordPolicy = useAppSelector(
    (state) => state.general.passwordPolicy
  );

  console.log({passwordPolicy})
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
        message.error("Invalid username or password");
      }

    } catch (error) {
      console.error(error);
      message.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* CHANGE PASSWORD SUBMIT */
  const handleChangePassword = async (values: any) => {
    console.log("Change Password Payload:", values);
    // call API here later
  };

  /* SHOW LOADER WHILE PASSWORD POLICY LOADS */
  // if (newPassword ) {
  //   return (
  //     <div
  //       style={{
  //         height: "80vh",
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //       }}
  //     >
  //       <Spin size="large" tip="Preparing password setup..." />
  //     </div>
  //   );
  // }

  /* MAIN RENDER */

   /* FETCH POLICY ONLY ONCE */
  useEffect(() => {
    if (newPassword) dispatch(fetchPasswordPolicy());
  }, [dispatch]);


  return (
    <>
      {newPassword ? (
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
