import './input-field.css';
import TextField, { TextFieldProps } from '@mui/material/TextField';
/* eslint-disable-next-line */


export function InputField(props: TextFieldProps) {
  return (
    <TextField color='secondary' inputProps={{ className: 'dos-input', style: { background: 'white' } }} {...props} />
  );
}

export default InputField;
