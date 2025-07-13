import {
  Box,
  Flex,
  Icon,
} from '@chakra-ui/react';
import React from 'react';

const ProductCard = ({ label, icon, onClick }) => {
  return (
    <Flex
      direction="column"
      justify="space-between"
      bg="#1a1a1a"
      borderRadius="md"
      border="1px solid gold"
      p={6}
      minW="250px"
      color="white"
      cursor="pointer"
      _hover={{ bg: "gray.800" }}
      onClick={onClick}
    >
      <Flex
        justify="space-between"
        align="center"
        mb={4}
        p={2}
        borderRadius="md"
      >
        <Box fontSize="250%" fontWeight="bold" color="white">
          {label}
        </Box>
        <Box
          bg="gray.800"
          borderRadius="full"
          p={4}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={icon} boxSize={7} color="gold" />
        </Box>
      </Flex>
    </Flex>
  );
};

export default ProductCard;
