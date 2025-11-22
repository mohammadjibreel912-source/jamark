import React, { useState } from "react";
import { Box, Stepper, Step, StepLabel, Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';

// RTL cache for MUI
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

// Step titles
const steps = ["النوع", "معلومات أساسية", "معلومات المصنع/الشركة", "الدفع", "تأكيد الحساب"];

const CompanyRegistration = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCard, setSelectedCard] = useState("");

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={createTheme({ direction: 'rtl' })}>
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            backgroundImage: "url('/path/to/background.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Right Sidebar */}
          <Box sx={{ width: "35%", p: 4, bgcolor: "rgba(255,255,255,0.9)" }}>
            <Box sx={{ textAlign: "center", mb: 2 }}>
              <img src="/path/to/logo.png" alt="Logo" style={{ maxWidth: "150px" }} />
              <Box sx={{ height: "4px", bgcolor: "green", mt: 1, mb: 1 }} />
              <Typography variant="h6">تسجيل شركة جديدة</Typography>
            </Box>

            {/* Stepper */}
            <Stepper activeStep={activeStep} orientation="vertical" sx={{ mt: 4, mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* Content Step 1 */}
            {activeStep === 0 && (
              <Box>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>اختر نوع المنشأة:</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Card
                      sx={{
                        border: selectedCard === "iraqi" ? "2px solid green" : "1px solid gray",
                        cursor: "pointer",
                        textAlign: "center",
                        p: 2
                      }}
                      onClick={() => setSelectedCard("iraqi")}
                    >
                      <img src="/path/to/iraq-flag.png" alt="Iraqi" style={{ width: "50px", marginBottom: "8px" }} />
                      <CardContent>
                        <Typography>منشأة عراقية</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card
                      sx={{
                        border: selectedCard === "foreign" ? "2px solid green" : "1px solid gray",
                        cursor: "pointer",
                        textAlign: "center",
                        p: 2
                      }}
                      onClick={() => setSelectedCard("foreign")}
                    >
                      <img src="/path/to/globe.png" alt="Foreign" style={{ width: "50px", marginBottom: "8px" }} />
                      <CardContent>
                        <Typography>منشأة أجنبية</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                <Box sx={{ height: "16px" }} />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Card
                      sx={{
                        border: selectedCard === "non-industrial" ? "2px solid green" : "1px solid gray",
                        cursor: "pointer",
                        textAlign: "center",
                        p: 2
                      }}
                      onClick={() => setSelectedCard("non-industrial")}
                    >
                      <img src="/path/to/company.png" alt="Company" style={{ width: "50px", marginBottom: "8px" }} />
                      <CardContent>
                        <Typography>منشأة غير صناعية (شركة)</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card
                      sx={{
                        border: selectedCard === "industrial" ? "2px solid green" : "1px solid gray",
                        cursor: "pointer",
                        textAlign: "center",
                        p: 2
                      }}
                      onClick={() => setSelectedCard("industrial")}
                    >
                      <img src="/path/to/factory.png" alt="Factory" style={{ width: "50px", marginBottom: "8px" }} />
                      <CardContent>
                        <Typography>منشأة صناعية (مصنع)</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* Navigation Buttons */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
              <Button variant="contained" color="secondary" onClick={handleBack} disabled={activeStep === 0}>
                السابق
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                التالي
              </Button>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default CompanyRegistration;
