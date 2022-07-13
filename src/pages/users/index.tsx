import { Box, Button, Checkbox, Flex, Heading, Icon, IconButton, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { useQuery } from 'react-query';

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function UserList() {
  const { data, isLoading, isError } = useQuery('users', async () => {
    const response = await fetch('http://localhost:3000/api/users');
    const data = await response.json();

    const users = data.users.map((user: User) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
      }
    })

    return users as User[];
  }, {
    staleTime: 1000 * 5,
  });

  console.log(data)

  //we first pass a string which will serve as a cache key
  //inside our function(async) we pass the http opepratio that will be done

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  })

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
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p="8"
        >
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
            </Heading>

          <Link href='/users/create' passHref>
            <Button
              as="a"
              size="sm"
              fontSize="sm"
              colorScheme="pink"
              leftIcon={<Icon
              as={RiAddLine} fontSize={20}></Icon>}
            >
                Criar novo
              </Button>
          </Link>

          </Flex>
        
          {
            isLoading ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
            ) : isError ? (
              <Flex justify="center">
                <Text>Falha ao obter dados dos usuários</Text> 
              </Flex>

            ) : (
              <>
                <Table colorScheme="whiteAlpha">
                  <Thead>
                    <Tr>
                      <Th px={["4", "4", "6"]} color="gray.300" width="8">
                        <Checkbox colorScheme="pink"/>
                      </Th>
                      <Th>Usuário</Th>
                      { isWideVersion && <Th>Data de cadastro</Th> }
                      <Th width="8"></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {
                      data!.map(user => (
                        <Tr key={user.id}>
                          <Td px={["4", "4", "6"]}>
                            <Checkbox colorScheme="pink"/>
                          </Td>
                          <Td>
                            <Box>
                              <Text fontWeight="bold">{user.name}</Text>
                              <Text fontSize="small" color="gray.300">{user.email}</Text>
                            </Box>
                          </Td>
                          { isWideVersion &&
                            <Td>
                              {user.createdAt}
                            </Td>
                          }
                          <Td>
                          { isWideVersion ?
                            <Button
                              as="a"
                              size="sm"
                              fontSize="sm"
                              colorScheme="purple"
                              leftIcon={<Icon
                              as={RiPencilLine} fontSize={16}/>}
                            >
                              Editar
                            </Button>
                            :
                            <IconButton
                              aria-label="Editar"
                              as="a"
                              size="sm"
                              fontSize="sm"
                              colorScheme="purple"
                              icon={
                                <Icon as={RiPencilLine} fontSize={16}/>
                              }
                            />
                          }
                          </Td>
                        </Tr>

                      ))
                    }
                  </Tbody>
                </Table>
                <Pagination />
              </>
            )
          }

        </Box>

      </Flex>
    </Box>
  )
}