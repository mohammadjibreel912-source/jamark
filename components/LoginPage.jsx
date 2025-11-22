import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logoImg from "../src/assets/logo.png";
import backgroundImg from "../src/assets/7d9b9ef5-7dca-4d13-861a-57702efa2f45.jpg";

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${backgroundImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: rgba(7, 18, 107, 0.6);
  background-blend-mode: overlay;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-family: 'Cairo', sans-serif;
  padding: 20px;
`;

const Logo = styled.img`
  width: 150px;
  margin-bottom: 25px;
`;

const Card = styled.div`
  width: 521px;
  background: #ffffff;
  border-radius: 20px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
  text-align: right;
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: 700;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
`;

const Label = styled.label`
  font-size: 15px;
`;

const Input = styled.input`
  padding: 12px 14px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  outline: none;
  transition: 0.25s;
  width: 100%;

  &:focus {
    border-color: #07126B;
    box-shadow: 0 0 5px rgba(7, 18, 107, 0.4);
  }
`;

const PasswordWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const TogglePassword = styled.span`
  position: absolute;
  left: 10px;
  cursor: pointer;
  font-size: 18px;
`;

const Button = styled.button`
  width: 100%;
  padding: 14px 0;
  background: #07126B;
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: 0.25s;

  &:hover {
    opacity: 0.85;
  }
`;

const BottomText = styled.div`
  font-size: 15px;
  text-align: center;
`;

const StyledLink = styled(Link)`
  color: #07126B;
  margin-left: 6px;
`;

const RequiredStar = styled.span`
  color: red;
  margin-left: 3px;
`;

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(prev => !prev);

  return (
    <PageWrapper>
      <Logo src={logoImg} alt="Logo" />
      <Card dir="rtl">
        <Title>تسجيل الدخول</Title>

        <FormGroup>
          <Label>
            البريد الإلكتروني <RequiredStar>*</RequiredStar>
          </Label>
          <Input type="email" placeholder="example@mail.com" />
        </FormGroup>

        <FormGroup>
          <Label>
            كلمة المرور <RequiredStar>*</RequiredStar>
          </Label>
          <PasswordWrapper>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="*******"
            />
            <TogglePassword onClick={togglePassword}>
              {showPassword ? "🙈" : "👁️"}
            </TogglePassword>
          </PasswordWrapper>
        </FormGroup>

        <Button>تسجيل الدخول</Button>

        <BottomText>
          لا تملك حساب؟
          <StyledLink to="/register">إنشاء حساب</StyledLink>
        </BottomText>
      </Card>
    </PageWrapper>
  );
};

export default LoginPage;
