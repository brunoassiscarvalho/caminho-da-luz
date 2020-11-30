import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { utils } from "@rjsf/core";

const { asNumber, guessType } = utils;

const nums = new Set(["number", "integer"]);

/**
 * This is a silly limitation in the DOM where option change event values are
 * always retrieved as strings.
 */
const processValue = (schema, value) => {
  console.log("processValue", value)
  // "enum" is a reserved word, so only "type" and "items" can be destructured
  const { type, items } = schema;
  if (value === "") {
    return undefined;
  } else if (type === "array" && items && nums.has(items.type)) {
    return value.map(asNumber);
  } else if (type === "boolean") {
    return value === "true";
  } else if (type === "number") {
    return asNumber(value);
  }

  // If type is undefined, but an enum is present, try and infer the type from
  // the enum values
  if (schema.enum) {
    if (schema.enum.every((x) => guessType(x) === "number")) {
      return asNumber(value);
    } else if (schema.enum.every((x) => guessType(x) === "boolean")) {
      return value === "true";
    }
  }
  return value;
};

const CustomComboBox = ({
  schema,
  id,
  options,
  label,
  required,
  disabled,
  readonly,
  value,
  multiple,
  autofocus,
  onChange,
  onBlur,
  onFocus,
  rawErrors = [],
}) => {
  const { enumOptions, enumDisabled } = options;

  const emptyValue = multiple ? [] : "";

  const _onChange = (e, newValue) => onChange(processValue(schema, newValue.value));
  const _onBlur = ({ target: { value } }) => onBlur(id, processValue(schema, value));
  const _onFocus = ({ target: { value }, }) => onFocus(id, processValue(schema, value));

  return (
    <Autocomplete
      id={id}
      required={required}
      autoFocus={autofocus}
      options={enumOptions}
      getOptionLabel={(option) => option.label}
      onChange={_onChange}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      renderInput={(params) =>
        <TextField {...params}
          id={id}
          label={label || schema.title}
          value={typeof value === "undefined" ? emptyValue : value}
          onBlur={_onBlur}
          onFocus={_onFocus}
          error={rawErrors.length > 0}
          disabled={disabled || readonly}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password',
          }}
        />}
    />
  );
};

export default CustomComboBox;