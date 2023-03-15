import { useParams } from "react-router-dom";
import { usePlantQuery } from "../generated/graphql";
import { Box, Text } from "@chakra-ui/react";

export const PlantPage = () => {
  const { id } = useParams();

  const plant = usePlantQuery({
    variables: {
      id: id,
    },
  });

  return (
    <Box>
      {plant.error && <Box>Error: {plant.error.message}</Box>}

      {plant.loading && <Box>Loading...</Box>}

      {plant.data?.plant && (
        <Box>
          <Text>{plant.data.plant.name}</Text>
          <Text>Watering Frequency: {plant.data.plant.waterFrequency}</Text>
          <Text>Last Watered: {plant.data.plant.lastWatered}</Text>
        </Box>
      )}
    </Box>
  );
};
