import './dosinput.css';
import TextField, { TextFieldProps } from '@mui/material/TextField';
/* eslint-disable-next-line */

type rhfType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  forminput?: any
}
type forminputType = TextFieldProps & rhfType


export function DOSInput(props: forminputType) {
  return (
    <TextField
      {...props}
      // style={{ height: 35, ...props.style }}
      InputProps={{ ...props.InputProps,style: { borderRadius: 40, height: 30, ...props.InputProps?.style } }}
      inputProps={{...props.inputProps, style: { background: 'white', padding: '0px 16px', ...props.inputProps?.style },  ...props.forminput }}
    />
  );
}

export default DOSInput;
