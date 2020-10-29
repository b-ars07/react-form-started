import { Typography } from '@material-ui/core'
import React from 'react'
import { useHistory } from "react-router-dom"
import { useForm} from 'react-hook-form'
import { Form } from './components/Form'
import { MainContainer } from './components/MainContainer'
import { Input } from './components/Input'
import { PrimaryButton } from './components/PrimaryButton'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useData } from './DataContext'


const schema = yup.object().shape({
  firstName: yup.string().matches(/^([^0-9]*)$/, "First Name should not contain numbers").required("first name is a requared field"),
  lastName: yup.string().matches(/^([^0-9]*)$/, "Last Name should not contain numbers").required("Last name is a requared field"),
})

export const Step1 = () => {
  const history = useHistory();
  const { data, setValues } = useData();
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {firstName: data.firstName, lastName: data.lastName},
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
  
  const onSubmit = (data) => {
    history.push('/step2')
    setValues(data)
  }
  
  return <MainContainer>
    <Typography component='h2' variant = 'h5'>
      Step 1
    </Typography>
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input ref={register} id="firstName" type="text" label="First Name" name="firstName" error={!!errors.firstName} helperText={errors?.firstName?.message}/>
      <Input ref={register} id="lastName" type="text" label="Last Name" name="lastName" error={!!errors.lastName} helperText={errors?.lastName?.message}/>
      <PrimaryButton>Next</PrimaryButton>
    </Form>
  </MainContainer>
}
