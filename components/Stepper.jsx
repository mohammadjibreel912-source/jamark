import React from "react";

const Stepper = ({ step = 1, totalSteps = 5, isRTL = false }) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  // If RTL, reverse the array to start from the right
  const displaySteps = isRTL ? [...steps].reverse() : steps;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        flexDirection: isRTL ? "row-reverse" : "row",
      }}
    >
      {displaySteps.map((s, index) => {
        const isCurrent = s === step;
        const isCompleted = isRTL
          ? s > step // For RTL, larger numbers are "before"
          : s < step;

        return (
          <React.Fragment key={s}>
            {/* Connector Line */}
            {index > 0 && (
              <div
                style={{
                  flex: 1,
                  height: "2px",
                  backgroundColor: isCompleted ? "#05BAA3" : "#E1E1E1",
                  outlineOffset: "-1px",
                }}
              />
            )}

            {/* Step Circle */}
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: isCurrent
                  ? "#05BAA3"
                  : isCompleted
                  ? "#EEFCFC"
                  : "#F5F5F5",
                border: isCurrent
                  ? "1px solid #05BAA3"
                  : isCompleted
                  ? "1px solid #05BAA3"
                  : "1px solid #F5F5F5",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              {isCompleted && !isCurrent ? (
                // Checkmark for finished step
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    backgroundColor: "#15C5CE",
                    clipPath:
                      "polygon(14% 44%, 0 65%, 50% 100%, 100% 10%, 85% 0, 43% 62%)",
                  }}
                />
              ) : (
                <span
                  style={{
                    color: isCurrent ? "#fff" : "#8E8E8E",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "24px",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {s}
                </span>
              )}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Stepper;
