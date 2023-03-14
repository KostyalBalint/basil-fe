import { Box, Container, Grid, Stack, Text } from "@chakra-ui/react";
import { usePlantsQuery } from "../generated/graphql";
import { PlantItem } from "../components/PlantItem";
import { AddPlant } from "../components/AddPlant";

const PlantList = () => {
  const plants = usePlantsQuery({
    fetchPolicy: "network-only",
  });
  return (
    <>
      {plants.error && (
        <Box>
          <Text fontSize="md">Error: {plants.error.message}</Text>
        </Box>
      )}
      {plants.loading && (
        <Box>
          <Text fontSize="md">Loading...</Text>
        </Box>
      )}
      <Grid gap={2}>
        {plants.data?.plants.map((plant) => (
          <PlantItem key={plant.id} plant={plant} />
        ))}
      </Grid>
    </>
  );
};

export const PlantPage = () => {
  return (
    <Container height="100vh" overflow="hidden">
      <Stack height="100%" padding={3}>
        <Text fontSize="lg" textAlign="center">
          316 Plant Tracker
        </Text>
        <Box>
          <PlantList />
        </Box>
        <AddPlant />
      </Stack>
    </Container>
  );
};
