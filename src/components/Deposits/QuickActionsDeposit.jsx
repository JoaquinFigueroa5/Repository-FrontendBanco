import { motion } from 'framer-motion'
import {
  Box,
  VStack,
  Text,
  Grid,
  Icon
} from '@chakra-ui/react'
import { BanknoteArrowUp, Sparkles, TrendingUp } from 'lucide-react'

// Componentes con motion
const MotionBox = motion(Box)
const MotionVStack = motion(VStack)

// Variantes de animación
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25
    }
  }
}

const buttonVariants = {
  rest: {
    scale: 1,
    rotateX: 0,
    boxShadow: "0 4px 15px rgba(218, 165, 32, 0.1)"
  },
  hover: {
    scale: 1.02,
    rotateX: 5,
    boxShadow: "0 8px 30px rgba(218, 165, 32, 0.3)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  },
  tap: {
    scale: 0.98,
    rotateX: 0,
    transition: {
      duration: 0.1
    }
  }
}

const iconVariants = {
  rest: {
    rotate: 0,
    scale: 1
  },
  hover: {
    rotate: 10,
    scale: 1.1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15
    }
  }
}

const QuickActionsDeposit = ({ onDepositClick }) => {
  return (
    <MotionBox
      p={6}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <MotionVStack
        spacing={6}
        align="stretch"
        variants={itemVariants}
      >
        {/* Header Section */}
        <MotionBox variants={itemVariants}>
          <Box position="relative" mb={2}>
            <Text
              fontSize="2xl"
              fontWeight="700"
              color="white"
              letterSpacing="-0.02em"
              position="relative"
              zIndex={2}
            >
              <Icon
                as={Sparkles}
                boxSize={5}
                color="rgba(218, 165, 32, 0.8)"
                mr={3}
                display="inline"
              />
              Acciones Rápidas
            </Text>
            {/* Decorative underline */}
            <Box
              position="absolute"
              bottom="-4px"
              left="0"
              w="80px"
              h="2px"
              bg="linear-gradient(90deg, rgba(218, 165, 32, 0.8) 0%, transparent 100%)"
              borderRadius="full"
            />
          </Box>
          <Text
            fontSize="sm"
            color="rgba(255, 255, 255, 0.7)"
            lineHeight="1.6"
            maxW="400px"
          >
            Realiza un depósito a tu cuenta de forma rápida y sencilla con nuestra interfaz optimizada.
          </Text>
        </MotionBox>

        {/* Action Button */}
        <MotionBox variants={itemVariants}>
          <Grid templateColumns="1fr" gap={4}>
            <MotionBox
              as="button"
              onClick={onDepositClick}
              p={6}
              borderRadius="2xl"
              bg="linear-gradient(135deg, rgba(26, 26, 26, 0.8) 0%, rgba(45, 45, 45, 0.8) 100%)"
              border="1px solid rgba(218, 165, 32, 0.3)"
              backdropFilter="blur(20px)"
              cursor="pointer"
              position="relative"
              overflow="hidden"
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              style={{ perspective: "1000px" }}
            >
              {/* Background glow effect */}
              <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                bg="linear-gradient(135deg, rgba(218, 165, 32, 0.05) 0%, rgba(218, 165, 32, 0.02) 100%)"
                opacity={0}
                transition="opacity 0.3s ease"
                _groupHover={{ opacity: 1 }}
              />

              {/* Top accent line */}
              <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                h="2px"
                bg="linear-gradient(90deg, transparent 0%, rgba(218, 165, 32, 0.6) 50%, transparent 100%)"
              />

              <VStack spacing={4} position="relative" zIndex={2}>
                {/* Icon container */}
                <MotionBox
                  p={4}
                  borderRadius="full"
                  bg="linear-gradient(135deg, rgba(218, 165, 32, 0.15) 0%, rgba(218, 165, 32, 0.05) 100%)"
                  border="1px solid rgba(218, 165, 32, 0.2)"
                  backdropFilter="blur(10px)"
                  variants={iconVariants}
                >
                  <Icon
                    as={BanknoteArrowUp}
                    boxSize={8}
                    color="rgba(218, 165, 32, 0.9)"
                  />
                </MotionBox>

                {/* Text content */}
                <VStack spacing={2}>
                  <Text
                    fontSize="lg"
                    fontWeight="600"
                    color="white"
                    letterSpacing="-0.01em"
                  >
                    💰 Depositar Fondos
                  </Text>
                  <Text
                    fontSize="sm"
                    color="rgba(255, 255, 255, 0.6)"
                    textAlign="center"
                    lineHeight="1.5"
                    maxW="200px"
                  >
                    Añade fondos a tu cuenta de manera segura e instantánea
                  </Text>
                </VStack>

                {/* Progress indicator */}
                <Box
                  display="flex"
                  alignItems="center"
                  gap={2}
                  mt={2}
                >
                  <Icon
                    as={TrendingUp}
                    boxSize={4}
                    color="rgba(218, 165, 32, 0.7)"
                  />
                  <Text
                    fontSize="xs"
                    color="rgba(218, 165, 32, 0.8)"
                    fontWeight="500"
                  >
                    Procesamiento instantáneo
                  </Text>
                </Box>
              </VStack>

              {/* Bottom decorative element */}
              <Box
                position="absolute"
                bottom="6px"
                left="20px"
                right="20px"
                h="1px"
                bg="linear-gradient(90deg, transparent 0%, rgba(218, 165, 32, 0.3) 50%, transparent 100%)"
              />
            </MotionBox>
          </Grid>
        </MotionBox>
      </MotionVStack>
    </MotionBox>
  )
}

export default QuickActionsDeposit