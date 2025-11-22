import React, { useState } from "react";
import {
  PageWrapper, Sidebar, Logo, StatusText, ContentWrapper,
  StepperWrapper, Step, CardsWrapper, Row, CardWrapper, CardImage,
  CardTitle, CardSubTitle, ButtonsWrapper, Button
} from "./StepperStyles";

import iraqiIcon from "../src/assets/iraqi.png";
import foreignIcon from "../src/assets/foreign.png";
import companyIcon from "../src/assets/company.png";
import factoryIcon from "../src/assets/factory.png";
import logoImg from "../src/assets/logo.png";
import building from "../src/assets/building.png";
import industry from "../src/assets/industry.png";

const StepperPage = () => {
  const [step, setStep] = useState(1);
  const [topSelected, setTopSelected] = useState([]);
  const [bottomSelected, setBottomSelected] = useState([]);

  const handleNext = () => setStep(prev => Math.min(prev + 1, 5));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSelect = (section, index) => {
    if(section === "top") {
      if(topSelected.includes(index)) setTopSelected(topSelected.filter(i => i !== index));
      else if(topSelected.length < 2) setTopSelected([...topSelected, index]);
    } else {
      if(bottomSelected.includes(index)) setBottomSelected(bottomSelected.filter(i => i !== index));
      else if(bottomSelected.length < 2) setBottomSelected([...bottomSelected, index]);
    }
  };

  // نص Sidebar ديناميكي
  let status = "اختر نوع المنشأة";
  if(bottomSelected.includes(0)) status = "تسجيل شركة جديدة";
  if(bottomSelected.includes(1)) status = "تسجيل مصنع جديد";

  return (
    <PageWrapper>
      <ContentWrapper>
        <StepperWrapper>
          {[1,2,3,4,5].map(s => <Step key={s} active={s===step}>{s}</Step>)}
        </StepperWrapper>

        <CardsWrapper>
          <Row>
            <CardWrapper selected={topSelected.includes(0)} onClick={()=>handleSelect("top",0)}>
              <CardImage src={iraqiIcon} alt="منشأة عراقية"/>
              <CardTitle>منشأة عراقية</CardTitle>
            </CardWrapper>
            <CardWrapper selected={topSelected.includes(1)} onClick={()=>handleSelect("top",1)}>
              <CardImage src={foreignIcon} alt="منشأة أجنبية"/>
              <CardTitle>منشأة أجنبية</CardTitle>
            </CardWrapper>
          </Row>

          <Row>
             <CardWrapper selected={bottomSelected.includes(1)} onClick={()=>handleSelect("bottom",1)}>
              <CardImage src={industry} alt="منشأة صناعية"/>
              <CardTitle>منشأة صناعية</CardTitle>
              <CardSubTitle>(مصنع)</CardSubTitle>
            </CardWrapper>
            <CardWrapper selected={bottomSelected.includes(0)} onClick={()=>handleSelect("bottom",0)}>
              <CardImage src={building} alt="منشأة غير صناعية"/>
              <CardTitle>منشأة غير صناعية</CardTitle>
              <CardSubTitle>(شركة)</CardSubTitle>
            </CardWrapper>
           
          </Row>
        </CardsWrapper>

        <ButtonsWrapper>
          <Button onClick={handlePrev} disabled={step===1}>السابق</Button>
          <Button onClick={handleNext} disabled={step===5}>التالي</Button>
        </ButtonsWrapper>
      </ContentWrapper>

      <Sidebar>
        <Logo src={logoImg} alt="Logo"/>
        <StatusText>{status}</StatusText>
      </Sidebar>
    </PageWrapper>
  );
};

export default StepperPage;
