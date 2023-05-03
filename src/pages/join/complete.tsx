import { FormErrorMessage, FormControl, FormLabel, Input } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';

interface IFormInput {
  firstName: string;
  lastName: string;
  age: number;
}

function JoinCompletePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={Boolean(errors.firstName)}>
        <FormLabel htmlFor="firstName">First Name</FormLabel>
        <Input
          id="firstName"
          placeholder="Enter your first name"
          {...register('firstName', {
            required: 'First name is required',
            maxLength: {
              value: 20,
              message: 'First name should not exceed 20 characters',
            },
          })}
        />
        <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={Boolean(errors.lastName)}>
        <FormLabel htmlFor="lastName">Last Name</FormLabel>
        <Input
          id="lastName"
          placeholder="Enter your last name"
          {...register('lastName', {
            required: 'Last name is required',
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: 'Last name should contain only alphabets',
            },
          })}
        />
        <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={Boolean(errors.age)}>
        <FormLabel htmlFor="age">Age</FormLabel>
        <Input
          type="number"
          id="age"
          placeholder="Enter your age"
          {...register('age', {
            required: 'Age is required',
            min: {
              value: 18,
              message: 'You must be at least 18 years old',
            },
            max: {
              value: 99,
              message: 'You cannot be older than 99 years',
            },
          })}
        />
        <FormErrorMessage>{errors.age?.message}</FormErrorMessage>
      </FormControl>

      <input type="submit" value="Submit" />
    </form>
  );
}

export default JoinCompletePage;
