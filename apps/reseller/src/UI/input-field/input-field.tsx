import './input-field.css';
import TextField, { TextFieldProps } from '@mui/material/TextField';
/* eslint-disable-next-line */

type rhfType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formInput?:any
}
type formInputType = TextFieldProps & rhfType
export function InputField(props: formInputType ) {
  return (
    <TextField color='secondary' inputProps={{ className: 'dos-input', style: { background: 'white' },...props.formInput }} {...props}  />
  );
}


export default InputField;
