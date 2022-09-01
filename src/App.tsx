import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './App.css';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import Field from './components/Field';
import 'bootstrap/dist/css/bootstrap.min.css';

type FieldValues = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  // terms_and_conditions: boolean;
}

function App() {
  const schema = yup.object({
    first_name: yup.string().required('Please enter your First Name'),
    last_name: yup.string().required('Please enter your Last Name'),
    email: yup.string()
      .email('Please enter a valid email')
      .required('Please enter your Email'),
    password: yup.string()
      .required('Please enter a password')
      .min(8, 'Please enter a longer password'),
    // terms_and_conditions: yup.string().required('Please accept the terms and conditions'),
  });

  const methods = useForm<FieldValues>({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      // terms_and_conditions: false,
    },
    resolver: yupResolver(schema),
    shouldUnregister: true,
  });

  const { handleSubmit } = methods;
  const onSubmit = (fields: FieldValues) => { alert(`Gracias por probar ${fields.first_name}`) }

  return (
    <div className="App">
      <header className="App-header">
        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Field name='first_name' label='First Name: '/>
            <Field name='last_name' label='Last Name: '/>
            <Field name='email' label='Email: '/>
            <Field name='password' label='Password: '/>

            <Button variant='primary' type='submit' className='mt-3'>Send</Button>
          </Form>
        </FormProvider>
      </header>
    </div>
  );
}

export default App;
