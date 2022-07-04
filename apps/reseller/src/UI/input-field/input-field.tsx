import './input-field.css';
import TextField, { TextFieldProps } from '@mui/material/TextField';
/* eslint-disable-next-line */

type rhfType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  forminput?: any
  size?: any
}
type forminputType = TextFieldProps & rhfType

export function InputField(props: forminputType) {
  return (
    <TextField
      {...props}
      size={props.size} color='primary'
      inputProps={{
        className: 'dos-input', style: {
          background: '#F9F9F9'
        }, ...props.forminput
      }} />
  );
}


export default InputField;
