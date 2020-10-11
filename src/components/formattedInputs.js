import React from 'react';
import MaskedInput from 'react-text-mask';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { Input } from '@material-ui/core';

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;
  console.log(props)
  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={patternsMask[props.type]}
      placeholderChar={'\u2000'}
    />
  );
}

const patternsMask = {
  tel: ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  cpf: [/[0-9]/, /\d/,/\d/,'.', /\d/, /\d/, /\d/,'.', /\d/, /\d/, /\d/, '-',/\d/,/\d/],
  cep: [/[0-9]/, /\d/,'.', /\d/, /\d/, /\d/,'-',/\d/,/\d/,/\d/],
}

export default function FormattedInputs(props) {
  console.log("FormattedInputs", props)
  const onChange = (event) => {
    props.onChange(event.target.value)
  };

  const onBlur = (event) => {
    props.onBlur(event.target.id, event.target.value)
  };
  return (
    <FormControl>
      <InputLabel htmlFor="formatted-text-mask-input">{props.schema.title || props.schema.name}</InputLabel>
      <Input
        {...props}
        type={props.schema.format}
        onChange={onChange}
        onBlur = {onBlur}      
        id={props.id}
        inputComponent={TextMaskCustom}
      />
    </FormControl>
  );
}