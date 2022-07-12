
import { Box, Button, Checkbox, Divider, Flex, Heading, HStack, Icon, SimpleGrid, Table, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";


interface CreateUserFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().required('Email é obrigatório')
  .email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória')
  .min(6, 'Senha deve ter no mínimo 6 digitos'),
  password_confirmation: yup.string().required('Confirmação obrigatório')
  .oneOf([
    null, yup.ref('password')
  ], 'As senhas precisam ser iguaiis')
})

export default function CreateUser() {
  const { register, handleSubmit, formState } = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserFormSchema)
  });


  const handleCreateUser: SubmitHandler<CreateUserFormData> = async(values) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(values);
  }

  return(
    <Box>
      <Header/>

      <Flex
        w="100%"
        my="6"
        maxWidth={1480}
        mx="auto"
        px="6"
      >
        <Sidebar/>

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">
            Criar usuário
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8" >
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                label="Nome completo"
                error={formState.errors.name}
                {...register('name')}
              />
              <Input
                type="email"
                label="E-mail"
                error={formState.errors.email}
                {...register('email')}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                type="password"
                label="Senha"
                error={formState.errors.password}
                {...register('password')}
              />
              <Input
                type="password"
                label="Confirmação da senha"
                error={formState.errors.password_confirmation}
                {...register('password_confirmation')}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                {<Button
                  as='a'
                  colorScheme="whiteAlpha">
                    Cancelar
                </Button>}
              </Link>
              <Button
                type="submit"
                colorScheme="pink"
                isLoading={formState.isSubmitting}
              >
               Salvar
              </Button>
            </HStack>
          </Flex>

        </Box>

      </Flex>
    </Box>
  )
}