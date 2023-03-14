import {
  Button,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { PlantsDocument, useAddPlantMutation } from "../generated/graphql";
import React, { useState } from "react";

export const AddPlant = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState<string | null>(null);
  const [waterFrequency, setWaterFrequency] = useState<number | null>(null);

  const [addPlant] = useAddPlantMutation({
    refetchQueries: [PlantsDocument],
  });

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new plant</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack gap={2}>
              <Input
                variant="filled"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                variant="filled"
                type="number"
                placeholder="Watering Frequency in Days"
                onChange={(e) => setWaterFrequency(Number(e.target.value))}
              />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="solid"
              colorScheme="green"
              onClick={() => {
                if (name && waterFrequency) {
                  addPlant({
                    variables: {
                      name,
                      waterFrequency,
                    },
                  });
                  onClose();
                }
              }}
            >
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <IconButton
        colorScheme="twitter"
        aria-label="Call Segun"
        size="lg"
        onClick={() => {
          setWaterFrequency(null);
          setName(null);
          onOpen();
        }}
        icon={<AddIcon />}
      />
    </>
  );
};
