import React from 'react';
import Control from 'react-bootstrap/FormControl';
import Feedback from 'react-bootstrap/esm/Feedback';
import Label from 'react-bootstrap/FormLabel';
import Group from 'react-bootstrap/FormGroup';
import { get, useFormContext } from 'react-hook-form';

type props = {
  name: string,
  placeholder?: string,
  label?: string,
  children?: React.ReactNode,
}

export default function Field (props: props) {
  const { register, formState: { errors } } = useFormContext();
  const error = get(errors, props.name);

  return (
    <Group controlId={props.name}>
      <Label>{props.label}</Label>

      <Control
        isInvalid={!!error}
        placeholder={props.placeholder}
        {...props}
        {...register(props.name)}
      >
        {props.children}
      </Control>

      { error && error.message &&
        <Feedback type='invalid'>{error.message}</Feedback>
      }
    </Group>
  )
}