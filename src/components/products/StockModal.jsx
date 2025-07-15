import React, { useState, useMemo } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  VStack,
  Spinner,
  Box,
  HStack,
  Badge,
  Select,
} from "@chakra-ui/react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { useIntradayStock } from "../../shared/hooks";
import { useProductsView } from "../../shared/hooks/hooksProducts/useProductsView";

function StockModal({ isOpen, onClose }) {
  const [searchSymbol, setSearchSymbol] = useState("");
  const { data, loading, error } = useIntradayStock(searchSymbol);

  const { products } = useProductsView(); // Obtener productos del hook

  const assetOptions = useMemo(() => {
    return products.filter((p) => p.asset && p.name);
  }, [products]);

  

  const timeSeries = data?.["Time Series (5min)"] || null;

  const dataPoints = useMemo(() => {
    if (!timeSeries) return [];
    return Object.entries(timeSeries)
      .map(([date, values]) => ({
        date,
        close: parseFloat(values["4. close"]),
        open: parseFloat(values["1. open"]),
        high: parseFloat(values["2. high"]),
        low: parseFloat(values["3. low"]),
        volume: parseInt(values["5. volume"], 10),
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [timeSeries]);

  const metrics = useMemo(() => {
    if (dataPoints.length === 0) return null;
    const maxPrice = Math.max(...dataPoints.map((d) => d.high));
    const minPrice = Math.min(...dataPoints.map((d) => d.low));
    const avgPrice =
      dataPoints.reduce((acc, d) => acc + d.close, 0) / dataPoints.length;
    const totalVolume = dataPoints.reduce((acc, d) => acc + d.volume, 0);
    return { maxPrice, minPrice, avgPrice, totalVolume };
  }, [dataPoints]);

  React.useEffect(() => {
    if (!isOpen) {
      setSearchSymbol("");
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Estadisticas de Acciones</ModalHeader>
        <ModalBody>
          {/* Combo box de productos con asset:true */}
          <Select
            placeholder="Seleccione un activo"
            mb={4}
            onChange={(e) => setSearchSymbol(e.target.value)}
            value={searchSymbol}
          >
            {assetOptions.map((product) => (
              <option key={product._id} value={product.symbol}>
                {product.name} 
              </option>
            ))}
          </Select>

          {loading && (
            <Box textAlign="center" py={10}>
              <Spinner size="xl" />
              <Text mt={2}>Cargando datos...</Text>
            </Box>
          )}

          {error && (
            <Text color="red.500" mb={4}>
              Error: {error}
            </Text>
          )}

          {!loading && !error && searchSymbol && dataPoints.length === 0 && (
            <Text>No hay datos para mostrar para el símbolo "{searchSymbol}"</Text>
          )}

          {!loading && !error && dataPoints.length > 0 && (
            <>
              <Box height="300px" mb={6}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dataPoints}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(str) => str.slice(11, 16)} />
                    <YAxis domain={["auto", "auto"]} />
                    <Tooltip
                      labelFormatter={(label) => `Hora: ${label}`}
                      formatter={(value, name) => {
                        if (name === "volume") return [value, "Volumen"];
                        return [value.toFixed(2), name];
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="close"
                      stroke="#3182ce"
                      dot={false}
                      name="Precio cierre"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>

              <Box
                bg="gray.800"
                border="1px solid"
                borderColor="gray.700"
                borderRadius="lg"
                p={4}
              >
                <Text fontWeight="bold" mb={2}>
                  📊 Métricas del período:
                </Text>
                <VStack align="start" spacing={2}>
                  <HStack>
                    <Badge colorScheme="green">Máximo</Badge>
                    <Text>${metrics.maxPrice.toFixed(2)}</Text>
                  </HStack>
                  <HStack>
                    <Badge colorScheme="red">Mínimo</Badge>
                    <Text>${metrics.minPrice.toFixed(2)}</Text>
                  </HStack>
                  <HStack>
                    <Badge colorScheme="blue">Promedio</Badge>
                    <Text>${metrics.avgPrice.toFixed(2)}</Text>
                  </HStack>
                  <HStack>
                    <Badge colorScheme="purple">Volumen</Badge>
                    <Text>{metrics.totalVolume.toLocaleString()}</Text>
                  </HStack>
                </VStack>
              </Box>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} colorScheme="blue">
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

// Para abrir el modal
import { useDisclosure } from "@chakra-ui/react";

export function StockModalExample() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue" mb={4}>
        Ver gráfico y métricas
      </Button>
      <StockModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default StockModal;
