import './input-field.css';
import TextField,{ TextFieldProps } from '@mui/material/TextField';
/* eslint-disable-next-line */


export function InputField(props: TextFieldProps) {
  return (
    <TextField inputProps={{className:'dos-input'}} {...props} />
  );
}

export default InputField;
