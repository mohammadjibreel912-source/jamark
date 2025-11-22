import React from "react";
import styled from "styled-components";
import backgroundImg from "../src/assets/background.jpg";
import logoImg from "../src/assets/logo.png";

const PanelWrapper = styled.div`
  width: 516px;
  min-height: 1024px;
  background: #07126B99;
  padding: 42px 50px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  color: white;
`;

const Logo = styled.img`
  width: 120px;
  height: auto;
`;

const StatusText = styled.div`
  margin-top: 40px;
  font-family: 'Cairo', sans-serif;
  font-weight: 600;
  font-size: 24px;
`;

const RightPanel = ({ selectedTop, selectedBottom }) => {
  let status = "اختر نوع المنشأة";

  if (selectedBottom.includes(0)) {
    status = "تسجيل شركة جديدة";
  }
  if (selectedBottom.includes(1)) {
    status = "تسجيل مصنع جديد";
  }

  return (
    <PanelWrapper style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Logo src={logoImg} alt="Logo" />
      <StatusText>{status}</StatusText>
    </PanelWrapper>
  );
};

export default RightPanel;
