import React, { useState } from "react";
import styled from "styled-components";
import Card from "./CardComponent";
import iraqiIcon from "../assets/iraqi.png";
import foreignIcon from "../assets/foreign.png";
import companyIcon from "../assets/company.png";
import factoryIcon from "../assets/factory.png";

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const CardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-start;
`;

const CardsSection = () => {
  const [topSelected, setTopSelected] = useState([]);
  const [bottomSelected, setBottomSelected] = useState([]);

  const handleSelect = (section, index) => {
    if (section === "top") {
      if (topSelected.includes(index)) {
        setTopSelected(topSelected.filter((i) => i !== index));
      } else if (topSelected.length < 2) {
        setTopSelected([...topSelected, index]);
      }
    } else {
      if (bottomSelected.includes(index)) {
        setBottomSelected(bottomSelected.filter((i) => i !== index));
      } else if (bottomSelected.length < 2) {
        setBottomSelected([...bottomSelected, index]);
      }
    }
  };

  return (
    <SectionWrapper>
      {/* القسم العلوي */}
      <CardsWrapper>
        <Row>
          <Card
            title="منشأة عراقية"
            subtitle=""
            image={iraqiIcon}
            selected={topSelected.includes(0)}
            onClick={() => handleSelect("top", 0)}
          />
          <Card
            title="منشأة أجنبية"
            subtitle=""
            image={foreignIcon}
            selected={topSelected.includes(1)}
            onClick={() => handleSelect("top", 1)}
          />
        </Row>
      </CardsWrapper>

      {/* القسم السفلي */}
      <CardsWrapper>
        <Row>
          <Card
            title="منشأة غير صناعية"
            subtitle="شركة"
            image={companyIcon}
            selected={bottomSelected.includes(0)}
            onClick={() => handleSelect("bottom", 0)}
          />
          <Card
            title="منشأة صناعية"
            subtitle="مصنع"
            image={factoryIcon}
            selected={bottomSelected.includes(1)}
            onClick={() => handleSelect("bottom", 1)}
          />
        </Row>
      </CardsWrapper>
    </SectionWrapper>
  );
};

export default CardsSection;
