import styled from "styled-components";
import backgroundImg from "../src/assets/background.jpg";
import logoImg from "../src/assets/logo.png";

/* ===== Page Wrapper ===== */
export const PageWrapper = styled.div`
  display: flex;
  gap: 20px;
  padding: 50px;
  justify-content: center;
`;

/* ===== Sidebar / Right Panel ===== */
export const Sidebar = styled.div`
  width: 516px;
  height: 1024px;
  background: #07126B99;
  padding: 42px 50px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: white;
  background-image: url(${backgroundImg});
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
`;

export const Logo = styled.img`
  width: 120px;
  height: auto;
`;

export const StatusText = styled.div`
  margin-top: 40px;
  font-family: 'Cairo', sans-serif;
  font-weight: 600;
  font-size: 24px;
`;

/* ===== Content / Left Wrapper ===== */
export const ContentWrapper = styled.div`
  width: 924px;
  height: 1024px;
  background: #FFFFFF;
  padding: 38px 50px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

/* ===== Stepper ===== */
export const StepperWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Step = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ active }) => (active ? "#07126B" : "#E1E1E1")};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
`;

/* ===== Cards ===== */
export const CardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Row = styled.div`
  display: flex;
  gap: 20px;
`;

export const CardWrapper = styled.div`
  width: 200px;
  min-height: 250px;
  border-radius: 15px;
  border: 2px solid ${({ selected }) => (selected ? "#07126B" : "#E1E1E1")};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: white;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s, border 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0,0,0,0.2);
  }
`;

export const CardImage = styled.img`
  width: 80px;
  height: 80px;
  margin: 0 auto;
`;

export const CardTitle = styled.h3`
  font-family: 'Cairo', sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #07126B;
  margin: 0;
`;

export const CardSubTitle = styled.div`
  font-family: 'Cairo', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #8E8E8E;
`;

/* ===== Buttons ===== */
export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
`;

export const Button = styled.button`
  padding: 12px 25px;
  background-color: #07126B;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
