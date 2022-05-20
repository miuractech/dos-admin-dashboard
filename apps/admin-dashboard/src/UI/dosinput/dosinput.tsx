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
        InputProps={{style:{borderRadius:40, height:35,...props.InputProps?.style},...props.InputProps}} 
        inputProps={{ style: { background: 'white',...props.inputProps?.style },...props.inputProps, ...props.forminput }}
        />
  );
}

export default DOSInput;
