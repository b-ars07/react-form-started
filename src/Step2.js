import React from 'react'
import { MainContainer } from './components/MainContainer'
import { Checkbox, FormControlLabel, Typography } from '@material-ui/core'
import { Form } from './components/Form'
import { Input } from './components/Input'
import { useForm } from 'react-hook-form'
import { useHistory } from "react-router-dom"
import { PrimaryButton } from './components/PrimaryButton'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import {useData} from './DataContext'

const schema = yup.object().shape({
  email: yup.string().email('Email should have correct format').required('Email is a required field')
})

const normalizePhoneNumber = (value) => {
  const phoneNumber = parsePhoneNumberFromString(value)
  
  if (!phoneNumber) {
    return value
  } 
  
  return phoneNumber.formatInternational()
}

export const Step2 = () => {
  const history = useHistory();
  const {data, setValues} = useData()
  const { register, handleSubmit, errors, watch } = useForm({
    defaultValues: {email: data.email, hasPhone: data.hasPhone, phoneNumber: data.phoneNumber },
    mode: "onBlur",
    resolver: yupResolver(schema)
  })
  
  const hasPhone = watch('hasPhone')
  
  const onSubmit = (data) => {
    history.push('/step3')
    setValues(data)
  }
  console.log(data)
  
  return <MainContainer>
    <Typography component='h2' variant = 'h5'>
      Step 2
    </Typography>
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        ref={register}
        id="email"
        type="email"
        label="Email"
        name="email"
        requared
        error={!!errors.email}
        helperText={errors?.email?.message}
      />
      <FormControlLabel control={
        <Checkbox defaultValue={data.hasPhone} defaultChecked={data.hasPhone} name="hasPhone" inputRef={register} color="primary" />
      }
        label="Do you have a phone" />
      {
        hasPhone && (
          <Input
            ref={register}
            id="phoneNumber"
            type="tel"
            label="Phone number"
            name="phoneNumber"
            onChange={e => {
              e.target.value = normalizePhoneNumber(e.target.value)
            }}
          />
        )
      }
      <PrimaryButton>Next</PrimaryButton>
    </Form>
  </MainContainer>
}
