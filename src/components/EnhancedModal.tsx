import React from "react";
import {
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";

interface Props {
  title: string;
  btn1: string;
  btn2: string;
  onClick1: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClick2: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled1: boolean;
  isDisabled2: boolean;
  showBtn1: boolean;
  color?: string;
}

export const EnhancedModal: React.FC<Props> = ({
  title,
  btn1,
  btn2,
  onClick1,
  onClick2,
  isDisabled1 = false,
  isDisabled2 = false,
  showBtn1 = true,
  color = "blue",
  children,
}) => {
  return (
    <ModalContent width="90%" boxShadow="dark-lg">
      <ModalHeader>
        <Text fontWeight="600">{title}</Text>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        {showBtn1 === true && (
          <Button
            onClick={onClick1}
            isDisabled={isDisabled1}
            width="100%"
            colorScheme="blue"
          >
            {btn1}
          </Button>
        )}
        <Button
          onClick={onClick2}
          isDisabled={isDisabled2}
          colorScheme={color}
          width="100%"
          ml="1"
        >
          {btn2}
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};
