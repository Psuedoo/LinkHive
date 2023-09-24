export const bgColor = "#100019";
export const primaryColor = "#fd3ae3";
export const secondaryColor = "#281526";
export const accentColor = "#ed0259";
export const textColor = "#f6e6ff";

const theme = {
  components: {
    Button: {
      colorPrimaryHover: primaryColor,
      primaryColor: textColor,
      controlOutline: secondaryColor,
      colorText: textColor,
    },
    Modal: {
      headerBg: secondaryColor,
      contentBg: secondaryColor,
      footerBg: secondaryColor,
    },
    Input: {
      colorBgContainer: bgColor,
      colorBorder: bgColor,
      activeBorderColor: primaryColor,
      hoverBorderColor: primaryColor,
      colorTextPlaceholder: textColor,
    },
    Switch: {
      colorPrimary: primaryColor,
      colorPrimaryHover: primaryColor,
      colorWarning: secondaryColor,
      colorBgBase: primaryColor,
    },
    Dropdown: {
      colorPrimary: primaryColor,
      colorBgElevated: secondaryColor,
      colorTextBase: textColor,
    },
    FloatButton: {
      colorPrimary: primaryColor,
      colorBgElevated: accentColor,
      colorTextBase: textColor,
    },
    Avatar: {
      colorTextLightSolid: textColor,
      colorTextPlaceholder: secondaryColor,
    },
  },

  token: {
    fontFamily: "Inter, Roboto, sans-serif",
    colorText: textColor,
  },
};

export default theme;
