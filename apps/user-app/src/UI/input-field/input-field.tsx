import './input-field.css';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';
/* eslint-disable-next-line */

type rhfType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  forminput?: any
  iconStart?: any,
  iconend?: any
  InputProps?: any

}
type forminputType = TextFieldProps & rhfType

export function InputField(props: forminputType) {
  return (
    <TextField color='primary'
      {...props}
      InputProps={{
        className: 'dos-input', style: { background: 'white' },
        ...props.forminput,
        ...props.InputProps,
        startAdornment: props.iconStart ? (
          <InputAdornment position="start">{props.iconStart}</InputAdornment>
        ) : null,
        endAdornment: props.iconend ? (
          <InputAdornment position="end">{props.iconend}</InputAdornment>
        ) : null
      }}
    />
  );
}


export default InputField;
