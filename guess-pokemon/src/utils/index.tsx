export const nesClasses = {
  tagType: {
    text: "nes-text",
    button: "nes-btn",
    radio: "nes-radio",
    input: "nes-input",
    textarea: "nes-textarea",
    select: "nes-select",
  },
};

export const nesStatus = {
  status: {
    primary: "is-primary",
    success: "is-success",
    warning: "is-warning",
    error: "is-error",
    disabled: "is-disabled",
  },
};

export const theme = {
  ...nesClasses,
  ...nesStatus,
};
