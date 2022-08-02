import { Box, Button, Checkbox, Flex, Heading, Icon, IconButton, Link as ChakraLink, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";
import { getUsers, useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";

export default function UserList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, isFetching, refetch,  } = useUsers(page, {
    // initialData: users,
    //leaving it as an example we use intialData to integrate reactquery with serversider renderer
  });
  //we first pass a string which will serve as a cache key
  //inside our function(async) we pass the http opepratio that will be done

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  })

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`users/${userId}`);

      return response.data;
    }, {
      staleTime: 1000 * 60 * 10 //10 min
    })
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
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p="8"
        >
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {
                !isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />
              }
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
                      data.users.map(user => (
                        <Tr key={user.id}>
                          <Td px={["4", "4", "6"]}>
                            <Checkbox colorScheme="pink"/>
                          </Td>
                          <Td>
                            <Box>
                              <ChakraLink color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                                <Text fontWeight="bold">{user.name}</Text>
                              </ChakraLink>
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
                <Pagination 
                  totalCountOfRegisters={data.totalCount}
                  currentPage={page}
                  onPageChange={setPage}
                />
              </>
            )
          }

        </Box>

      </Flex>
    </Box>
  )
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   const { users, totalCount }= await getUsers(1);

//   return {
//     props: {
//       users,
//     }
//   }
  
// }