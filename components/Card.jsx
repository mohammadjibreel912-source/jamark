import React from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
  width: 200px;
  min-height: 100px;
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
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
  }
`;

const CardImage = styled.img`
  width: 80px;
  height: 80px;
  margin: 0 auto;
  object-fit: contain;
`;

const CardTitle = styled.h3`
  font-family: 'Cairo', sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #07126B;
  margin: 0;
`;

const CardSubTitle = styled.div`
  font-family: 'Cairo', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #8E8E8E;
`;

const Card = ({ title, subtitle, image, selected, onClick }) => {
  return (
    <CardWrapper onClick={onClick} selected={selected}>
      {image && <CardImage src={image} alt={title} />}
      <CardTitle>{title}</CardTitle>
      <CardSubTitle>{subtitle}</CardSubTitle>
    </CardWrapper>
  );
};

export default Card;
