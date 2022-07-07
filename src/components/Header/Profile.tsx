import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return(
    <Flex align="center">
      { showProfileData &&
        <Box mr="4" ml="4" textAlign="right">
          <Text>Lucas Andrade</Text>
          <Text color="gray.300" fontSize="small">
            seyadeodin@gmail.com
          </Text>
        </Box>
      }

      <Avatar
        size="md" 
        name="Lucas Andrade"
        src="https://github.com/seyadeodin.png"
      />
    </Flex>
  );
}