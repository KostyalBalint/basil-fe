import { useNavigate, useParams } from "react-router-dom";
import {
  PlantDocument,
  usePlantQuery,
  useWaterPlantMutation,
} from "../generated/graphql";
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Text,
  useToken,
} from "@chakra-ui/react";
import moment from "moment";
import GaugeChart from "react-gauge-chart";
import { ImDroplet } from "react-icons/im";
import { FaWrench } from "react-icons/fa";
import React from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";

function TextLine(props: { label: string; value: string }) {
  return (
    <Box display="flex" alignItems="baseline">
      {props.label}
      <Box
        color="gray.500"
        fontWeight="semibold"
        letterSpacing="wide"
        fontSize="xs"
        textTransform="uppercase"
        ml="2"
      >
        {props.value}
      </Box>
    </Box>
  );
}

export const PlantPage = () => {
  const { id } = useParams();
  const [blue400] = useToken("colors", ["blue.400"]);

  const plant = usePlantQuery({
    variables: {
      id: id,
    },
  });

  const navigate = useNavigate();

  const [water] = useWaterPlantMutation({
    variables: {
      id: id ?? "",
    },
    refetchQueries: [PlantDocument],
  });

  const lastWateredHuman = moment(plant.data?.plant?.lastWatered).fromNow();

  const waterFrequencyHours = plant.data?.plant?.waterFrequency
    ? plant.data?.plant?.waterFrequency * 24
    : 0;
  const hoursFromLastWatering = plant.data?.plant?.lastWatered
    ? moment().diff(moment(plant.data?.plant?.lastWatered), "hours")
    : waterFrequencyHours;

  const progress =
    1 - Math.min(Math.max(hoursFromLastWatering / waterFrequencyHours, 0), 1);

  return (
    <Container height="100vh" overflow="hidden">
      <Stack gap={2} alignItems="start">
        <Box width="100%">
          {plant.error && <Box>Error: {plant.error.message}</Box>}

          {plant.loading && <Box>Loading...</Box>}

          {plant.data?.plant && (
            <Box
              marginTop={3}
              borderWidth="1px"
              borderRadius="lg"
              shadow={"base"}
              overflow="hidden"
            >
              <Stack p="4" gap={1}>
                <Stack
                  direction="row"
                  width="100%"
                  justifyContent="space-between"
                  position={"relative"}
                >
                  <Text fontSize="2xl" textAlign="center" flexGrow={1}>
                    {plant.data.plant.name}
                  </Text>
                  <IconButton
                    position={"absolute"}
                    top={0}
                    right={0}
                    icon={<FaWrench />}
                    aria-label="Edit"
                    variant="outline"
                  />
                </Stack>
                <Stack gap={2} alignItems="center">
                  <GaugeChart
                    id="gauge-chart5"
                    nrOfLevels={420}
                    arcsLength={[0.3, 0.3, 0.3]}
                    colors={["#EA4228", "#F5CD19", "#5BE12C"]}
                    percent={progress}
                    textColor={"#5E6977"}
                    arcPadding={0.02}
                  />

                  <Button
                    flexGrow={0}
                    variant="outline"
                    color={blue400}
                    onClick={async () => {
                      await water();
                    }}
                    rightIcon={<ImDroplet />}
                  >
                    Water Now
                  </Button>
                </Stack>
                <TextLine
                  label="Last Watered:"
                  value={
                    plant.data?.plant?.lastWatered ? lastWateredHuman : "Never"
                  }
                />
                <TextLine
                  label="Water Frequency:"
                  value={
                    plant.data?.plant?.waterFrequency
                      ? `${plant.data?.plant?.waterFrequency} days`
                      : "Unknown"
                  }
                />
              </Stack>
            </Box>
          )}
        </Box>
        <Button
          flexGrow={0}
          variant="outline"
          colorScheme={"gray"}
          onClick={() => {
            navigate("/");
          }}
          rightIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
      </Stack>
    </Container>
  );
};
