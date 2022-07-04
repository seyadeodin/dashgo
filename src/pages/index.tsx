import type { NextPage } from 'next'
import { Flex, Button, Stack, FormLabel, FormControl } from '@chakra-ui/react'
import { Input } from '../components/Form/Input'

const Home: NextPage = () => {
  return (
    <Flex 
      w="100vh" 
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
      >
        <Stack
          spacing='4'
        >
          
          <Input
            name="email"
            label="E-mail"
            type="email"
          />
          <Input
            name="password"
            label="Senha"
            type="password"
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
