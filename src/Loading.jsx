import { Flex, Spinner, Text } from "@chakra-ui/react";

function Loading() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      height="100vh"
      backgroundColor="gray.50"
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="teal.500"
        size="xl"
      />
      <Text mt={4} fontSize="lg" color="gray.600">
        Cargando...
      </Text>
    </Flex>
  );
}

export default Loading;
