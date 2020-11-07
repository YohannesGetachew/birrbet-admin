const getTextFieldOverride = (palette) => ({
  MuiTextField: {
    root: {
      "& label": {
        color: (props) =>
          props.dark ? palette.primary.dark : palette.secondary.main,
      },
      "& label.Mui-focused": {
        color: (props) =>
          props.dark ? palette.primary.light : palette.secondary.dark,
      },
      "& .MuiInput-underline:before": {
        borderBottomColor: (props) =>
          props.dark ? palette.primary.dark : palette.secondary.main,
      },
      "& .MuiInput-underline:hover::before": {
        borderBottomColor: (props) =>
          props.dark ? palette.primary.light : palette.secondary.dark,
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: (props) =>
          props.dark ? palette.primary.light : palette.secondary.dark,
      },
      "& .MuiInput-input": {
        color: (props) =>
          props.dark ? palette.primary.light : palette.accentOne.main,
      },
      "& .MuiInputAdornment-root": {
        color: palette.accentOne.light,
      },

      "& .MuiOutlinedInput-inputMarginDense": {
        color: (props) =>
          props.dark ? palette.accentTwo.light : palette.accentOne.dark,
      },
      "& .MuiOutlinedInput-notchedOutlineMarginDense": {
        borderColor: (props) =>
          props.dark ? palette.accentTwo.main : palette.accentOne.main,
      },
      "&:hover .MuiOutlinedInput-notchedOutlineMarginDense": {
        borderColor: (props) =>
          props.dark ? palette.accentTwo.light : palette.primary.dark,
      },
    },
  },
});

export default getTextFieldOverride;
