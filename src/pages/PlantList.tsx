import { Container, Stack, Text } from "@chakra-ui/react";
import { AddPlant } from "../components/AddPlant";
import { PlantList } from "../components/PlantList";

export const PlantListPage = () => {
  return (
    <Container height="100vh" overflow="hidden">
      <Stack height="100%" padding={3}>
        <Text fontSize="lg" textAlign="center">
          316 Plant Tracker
        </Text>
        <PlantList />
        <AddPlant />
      </Stack>
    </Container>
  );
};
