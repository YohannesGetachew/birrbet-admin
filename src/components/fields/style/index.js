import { makeStyles } from "@material-ui/core/styles";

const style = makeStyles((theme) => ({
  root: {
    "& label": {
      color: (props) =>
        props.dark ? theme.palette.primary.dark : theme.palette.secondary.main,
    },
    "& label.Mui-focused": {
      color: (props) =>
        props.dark ? theme.palette.primary.light : theme.palette.secondary.dark,
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: (props) =>
        props.dark ? theme.palette.primary.dark : theme.palette.secondary.main,
    },
    "& .MuiInput-underline:hover::before": {
      borderBottomColor: (props) =>
        props.dark ? theme.palette.primary.light : theme.palette.secondary.dark,
    },
    "& .MuiInput-input": {
      color: (props) =>
        props.dark ? theme.palette.primary.light : theme.palette.accentOne.main,
    },
    "& .MuiInputAdornment-root": {
      color: theme.palette.accentOne.light,
    },

    "& .MuiOutlinedInput-input": {
      color: (props) =>
        props.dark
          ? theme.palette.accentTwo.light
          : theme.palette.accentOne.dark,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: (props) =>
        props.dark
          ? theme.palette.accentTwo.main
          : theme.palette.accentOne.main,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: (props) =>
        props.dark ? theme.palette.accentTwo.light : theme.palette.primary.dark,
    },
  },
}));

export default style;

// '& .MuiInputLabel-outlined': {
//     color: '#a3a3a3',
//     position: 'absolute',
//     left: '50%',
//     marginLeft: '-45px',
//     top: '0',
// },
// '& .Mui-focused.MuiInputLabel-outlined': {
//     color: '#ffffff',
//     top: 0,
//     backgroundColor: '#000000'

// },

// '& .MuiInput-input': {
//     color: '#000000',
//     textAlign: 'center',
//     fontSize: '40px',
//     backgroundColor: 'yellow',
//     opacity: '0.3',
//     zIndex: 1
// },
// "&::placeholder": {
//     color: "red",
//     zIndex: 1
// },
