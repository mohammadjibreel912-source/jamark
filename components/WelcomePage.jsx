import React from "react";
import styled from "styled-components";
import backgroundImg from "../src/assets/7d9b9ef5-7dca-4d13-861a-57702efa2f45.jpg";
import factoryIcon from "../src/assets/factory.png"; // أيقونة المصنع
import companyIcon from "../src/assets/company.png"; // أيقونة الشركة

const PageWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background-image: url(${backgroundImg});
  background-size: cover;
  background-position: center;
  overflow: hidden; /* تمنع ظهور scroll */

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: #07126B99; /* لون نصف شفاف على الصورة */
    z-index: 0;
  }
`;
const CardContainer = styled.div`
  display: flex;
  flex-direction: column; /* عمود ليتم ترتيب الكاردين + الزر */
  gap: 20px;
  padding: 40px;
  border-radius: 20px;
  align-items: center;
  position: relative;
  z-index: 1;
  background: white;
`;

const MiniCardsWrapper = styled.div`
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

const MiniCard = styled.div`
  width: 296px;
  min-height: 512px;
  border-radius: 20px;
  border: 1px solid #E1E1E1;
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: white;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: flex-start;
  direction: rtl;
`;

const Icon = styled.img`
  object-fit: contain;
  border-radius: 10px;
  padding: 22px;
  background: #05BAA3;
`;

const Title = styled.h3`
  font-family: 'Cairo', sans-serif;
  font-weight: 600;
  font-size: 20px;
  color: #07126B;
  margin: 0;
`;

const Section = styled.div`
  margin-top: 10px;
  font-size: 14px;
  ul {
    padding-left: 20px;
    margin-top: 5px;
    direction: rtl;
  }
`;

const SectionTitle = styled.div`
  font-family: 'Cairo', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.2px;
  text-align: right;
  color: #9a9a9a; /* فاتح */
  margin-bottom: 8px;
`;

const Button = styled.button`
  margin-top: 20px;
  width: calc(296px * 2 + 32px); /* طول الكاردين + المسافة بينهما */
  max-width: 100%;
  padding: 15px;
  background-color: #07126B;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;

  &:hover {
    background-color: #050a4a;
  }
`;
const SubTitle = styled.div`
  font-family: 'Cairo', sans-serif;
  font-weight: 400; /* Regular */
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.2px;
  vertical-align: middle;
  color: #8E8E8E;
`;

const WelcomePage = () => {
  return (
    <PageWrapper>
      <CardContainer>
        <MiniCardsWrapper>
          <MiniCard>
            <Header>
              <Icon src={factoryIcon} alt="Factory Icon" />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Title>منشأة صناعية</Title>
    <SubTitle>(مصنع)</SubTitle>
  </div>


            </Header>
            <Section>
              <SectionTitle>معلومات المصنع</SectionTitle>
              <ul>
                <li>إسم المصنع</li>
                <li>موقع وعنوان المصنع</li>
                <li>سنة التأسيس</li>
                <li>رأس المال</li>
                <li>المنتجات التي يقدمها المصنع</li>
              </ul>
            </Section>
            <Section>
              <SectionTitle>الوثائق المطلوبة</SectionTitle>
              <ul>
                <li>الشهادات الإختصاصية</li>
                <li>شهادة تسجيل المصنع</li>
              </ul>
            </Section>
          </MiniCard>

          <MiniCard>
            <Header>
              <Icon src={companyIcon} alt="Company Icon" />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Title>منشأة غير صناعية</Title>
    <SubTitle>(شركة)</SubTitle>
  </div>
            </Header>
            <Section>
              <SectionTitle>معلومات الشركة</SectionTitle>
              <ul>
                <li>إسم الشركة</li>
                <li>موقع وعنوان الشركة</li>
                <li>سنة التأسيس</li>
                <li>رأس المال</li>
                <li>نوع الشركة</li>
                <li>شكل الشركة</li>
                <li>طريقة إدارة الشركة</li>
                <li>إسم المدير المفوض</li>
              </ul>
            </Section>
            <Section>
              <SectionTitle>الوثائق المطلوبة</SectionTitle>
              <ul>
                <li>الشهادات الإختصاصية</li>
                <li>شهادات تسجيل الشركة</li>
              </ul>
            </Section>
          </MiniCard>
        </MiniCardsWrapper>

        <Button>البدء بتسجيل المنشأة</Button>
      </CardContainer>
    </PageWrapper>
  );
};

export default WelcomePage;
