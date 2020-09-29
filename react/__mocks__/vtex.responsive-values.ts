export const useResponsiveValue = (font: {
  desktop?: string
  mobile?: string
  tablet?: string
}) => font.desktop ?? font.mobile ?? font.tablet ?? font
