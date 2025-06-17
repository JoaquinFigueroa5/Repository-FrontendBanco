import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  VStack,
  HStack,
  Text,
  Badge,
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  IconButton,
  Input
} from '@chakra-ui/react';
import { Eye, EyeOff, CreditCard, TrendingUp } from 'lucide-react';
import { useColorModeValue } from '@chakra-ui/react';
import useUserStore from '../../context/UserStore';
import { useAccount } from '../../shared/hooks/useAccount';

const AccountOverview = ({ refresh }) => {

  const { account, loading, error, fetchAccount } = useAccount();
  const [gastos, setGastos] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  
  const { user } = useUserStore()

  useEffect(() => {
    fetchAccount();
  }, [refresh]);
  const textColor = useColorModeValue('gray.800', 'white');
  const [showBalance, setShowBalance] = useState(true);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-GT', {
      style: 'currency',
      currency: 'GTQ'
    }).format(amount);
  };

  return (
    <Card
      bg="linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2d2d2d 100%)"
      border="1px solid"
      borderColor="rgba(255, 215, 0, 0.3)"
      boxShadow="0 10px 40px rgba(255, 215, 0, 0.15), inset 0 1px 0 rgba(255, 215, 0, 0.1)"
      backdropFilter="blur(10px)"
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        bgGradient: 'linear(to-r, transparent, #FFD700, transparent)',
        opacity: 0.6,
      }}
    >
      <CardBody>
        <VStack spacing={6} align="stretch">
          <HStack justify="space-between" align="center">
            <HStack spacing={3}>
              <Box
                p={3}
                bg="linear-gradient(135deg, #FFD700, #FFA500)"
                borderRadius="xl"
                boxShadow="0 4px 20px rgba(255, 215, 0, 0.4)"
                border="1px solid rgba(255, 215, 0, 0.2)"
              >
                <CreditCard size={24} color='black' />
              </Box>
              <VStack spacing={0} align="start">
                <Text fontSize="sm" color="gray.300" fontWeight="medium">
                  Cuenta Principal - {user?.username}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {account?.accountNumber}
                </Text>
              </VStack>
            </HStack>
            <Badge
              bg="linear-gradient(135deg, #FFD700, #FFA500)"
              color="black"
              variant="solid"
              px={3}
              py={1}
              borderRadius="full"
              fontWeight="bold"
              textTransform="uppercase"
              fontSize="xs"
              boxShadow="0 2px 10px rgba(255, 215, 0, 0.4)"
            >
              Activa
            </Badge>
          </HStack>

          <Box>
            <HStack justify="space-between" align="center" mb={3}>
              <Text fontSize="sm" color="gray.400" fontWeight="medium">
                Saldo Disponible
              </Text>
              <IconButton
                icon={showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
                onClick={() => setShowBalance(!showBalance)}
                size="sm"
                variant="ghost"
                color="#FFD700"
                bg="rgba(255, 215, 0, 0.1)"
                border="1px solid rgba(255, 215, 0, 0.2)"
                _hover={{
                  bg: 'rgba(255, 215, 0, 0.2)',
                  transform: 'scale(1.05)',
                  boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)',
                }}
                _active={{
                  transform: 'scale(0.95)',
                }}
                transition="all 0.2s ease"
                aria-label="Toggle balance visibility"
              />
            </HStack>
            <Text
              fontSize="3xl"
              fontWeight="bold"
              mb={2}
              bgGradient="linear(to-r, #FFD700, #FFA500, #FFD700)"
              bgClip="text"
              textShadow="0 0 30px rgba(255, 215, 0, 0.3)"
            >
              {showBalance ? '••••' : `Q ${account?.balance?.$numberDecimal}`}
            </Text>
            <HStack spacing={2}>
              <Box
                p={1}
                bg="rgba(0, 255, 100, 0.1)"
                borderRadius="md"
                border="1px solid rgba(0, 255, 100, 0.2)"
              >
                <TrendingUp size={16} color="#00FF64" />
              </Box>
              <Text fontSize="sm" color="gray.300" fontWeight="medium">
                +2.5% vs mes anterior
              </Text>
            </HStack>
          </Box>

          <HStack spacing={6}>
            <Stat size="sm">
              <StatLabel color="whiteAlpha.800">Ingresos</StatLabel>
              <StatNumber fontSize="lg" color="white">
                {showBalance ? '••••' : formatCurrency(user?.income?.$numberDecimal)}
              </StatNumber>
              <StatHelpText color="whiteAlpha.700" mb={0}>
                <StatArrow type="increase" />
                12.5%
              </StatHelpText>
            </Stat>
            <Stat size="sm" onClick={() => setIsEditing(true)}>
              <StatLabel color="whiteAlpha.800">Gastos</StatLabel>

              {isEditing ? (
                <Input
                  size="sm"
                  value={gastos}
                  type="number"
                  color="white"
                  onChange={(e) => setGastos(Number(e.target.value))}
                  onBlur={() => setIsEditing(false)}
                  autoFocus
                />
              ) : (
                <StatNumber fontSize="lg" color="white">
                  {showBalance ? '••••' : formatCurrency(gastos)}
                </StatNumber>
              )}

              <StatHelpText color="whiteAlpha.700" mb={0}>
                <StatArrow type="decrease" />
                8.2%
              </StatHelpText>
            </Stat>
          </HStack>
        </VStack>
      </CardBody>

      {/* Decorative corner elements */}
      <Box
        position="absolute"
        top="0"
        right="0"
        width="100px"
        height="100px"
        bgGradient="radial(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        bottom="0"
        left="0"
        width="80px"
        height="80px"
        bgGradient="radial(circle, rgba(255, 215, 0, 0.08) 0%, transparent 70%)"
        pointerEvents="none"
      />
    </Card>
  );
};

export default AccountOverview;