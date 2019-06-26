export const getSignByPosition = position => {
  switch (position) {
    case "top":
      return -1;
    case "left":
      return -1;
    case "right":
      return 1;
    case "bottom":
      return 1;
    default:
      return 0;
  }
};

export const calculateAlignment = (triggerProp, tooltipProp, align) => {
  switch (align) {
    case "start":
      return 0;
    case "center":
      return (triggerProp - tooltipProp) / 2;
    case "end":
      return triggerProp - tooltipProp;
  }
};
