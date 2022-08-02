import { useQuery, UseQueryOptions } from "react-query";
import { api } from "../api";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

type GetUsersResponse = {
  totalCount: number;
  users: User[]
}

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get('/users', {
    params: {
      page,
    }
  });

  const totalCount = Number(headers['x-total-count'])

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

  return { 
    users,
    totalCount
  }
}

//here we decoupled the function that fetchs the data from our backkend from rq
export function useUsers(page: number, options: UseQueryOptions) {
  //we could apso pass it as a generic to rect query like this:
  //useQuery<User[]>()
  return useQuery(['users', page], () => getUsers(page), {
    //since we're passing page as a parameter we need to use an arrow function
    //since we're not merely invoking the function anymore
    //for our pagination we need to create a compost key that receives not only
    //our page number 
    staleTime: 1000 * 5,
    ...options
    });
  }