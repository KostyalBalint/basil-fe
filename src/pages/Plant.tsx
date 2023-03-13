import { Box, Container, Text } from "@chakra-ui/react";

const PlantList = () => {
  return (
    <>
      <Box dropShadow="md" borderRadius="lg">
        Plant
      </Box>
    </>
  );
};

export const PlantPage = () => {
  return (
    <Container>
      <Box>
        <Text fontSize="md">Plants</Text>
        <PlantList />
      </Box>
    </Container>
  );
};
