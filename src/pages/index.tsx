import type { NextPage } from 'next'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

import { Flex, Button, Stack } from '@chakra-ui/react'
import { Input } from '../components/Form/Input'

interface SignInFormData {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('Email é obrigatório')
  .email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória')
  .min(6, 'Senha deve ter no mínimo 6 digitos')
})

const Home: NextPage = () => {
  const { register, handleSubmit, formState } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema)
  })

  console.log(formState.errors)

  const handleSignIn: SubmitHandler<SignInFormData> = (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(values)
  }

  return (
    <Flex 
      w="100vw" 
      h="100vh" 
      align="center" 
      justify="center"
    >
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack
          spacing='4'
        >
          
          <Input
            label="E-mail"
            type="email"
            error={formState.errors.email}
            {...register('email')}
          />
          <Input
            label="Senha"
            type="password"
            error={formState.errors.password}
            {...register('password')}
          />

        </Stack>

        <Button 
          type="submit" 
          mt="6" 
          size="lg" 
          colorScheme="pink"
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}

export default Home
