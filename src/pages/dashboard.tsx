import dynamic from 'next/dynamic';
import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

const options = {
  chart: {
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    },
    foreColor: theme.colors.gray[500]
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600]
    },
    axisTicks: {
     colors: theme.colors.gray[600]
    },
    categories: [
      '2022-07-03T00:00:00.000Z',
      '2022-07-04T00:00:00.000Z',
      '2022-07-05T00:00:00.000Z',
      '2022-07-06T00:00:00.000Z',
      '2022-07-07T00:00:00.000Z',
      '2022-07-08T00:00:00.000Z',
      '2022-07-09T00:00:00.000Z',
    ],
  },
    fill: {
      opacity: 0.3,
      type: 'gradient',
      gradient: {
        shade: 'dark',
        opacityFrom: 0.7,
        opacityTo: 0.3
      }
  }
} as ApexOptions;

const series = [
  { name: 'series', data: [31, 120, 10, 34, 54, 94, 71]}
]

export default function Dashboard() {
  return(
    <Flex direction="column" h="100vh">
      <Header/>

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar/>

        <SimpleGrid
          flex="1"
          gap="4"
          minChildWidth="320px"
          align-items="flex-start"
        >
          <Box
            p={["6", "8"]}
            bg="gray.800"
            borderRadius={8}
            pb="4"
          >
            <Text fontSize="lag" mb="4">Inscritos da semana</Text>
            <Chart 
              options={options}
              series={series}
              type="area"
              height={160}
            />
          </Box>

          <Box
            p={["6", "8"]}
            bg="gray.800"
            borderRadius={8}
          >
            <Text fontSize="lag" mb="4">Taxa de abertura</Text>
            <Chart 
              options={options}
              series={series}
              type="area"
              height={160}
            />
          </Box>

        </SimpleGrid>

      </Flex>
    </Flex>
  )
}