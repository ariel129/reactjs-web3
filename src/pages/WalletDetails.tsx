import React, { useContext } from "react";
import {
  Box,
  Modal,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { formatEther } from "@ethersproject/units";

import { EnhancedModal } from "components/EnhancedModal";
import { ContextChain } from "context/Context";
import { injected } from "sevices/connetors";
import { truncateText } from "sevices/helper";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const WalletDetails: React.FC<Props> = ({ open, onClose }) => {
  const {
    state: {
      metamask_information: { account_id, chain_id, connected, balance },
    },
    dispatch,
  } = useContext(ContextChain);
  const { activate, deactivate } = useWeb3React<Web3Provider>();

  const onActivate = async () => {
    try {
      await activate(injected);
    } catch (err) {
      return false;
    }
  };

  const onDeactivate = async () => {
    try {
      deactivate();
      dispatch({
        type: "DISCONNECT_METAMASK",
        payload: {
          account_id: "",
          chain_id: 0,
          connected: false,
          balance: 0,
        },
      });
      onClose();
    } catch (err) {
      return false;
    }
  };

  const btn1Label = connected === false ? "Connect" : "Close";
  const btn2Label = connected === false ? "Cancel" : "Disconnect";
  const onClick2 = connected === false ? onClose : onDeactivate;
  const showBtn1 = connected === false ? true : false;
  const color1 = connected === false ? "gray" : "red";

  return (
    <div>
      <Modal
        blockScrollOnMount
        closeOnOverlayClick={false}
        onClose={onClose}
        isOpen={open}
        isCentered
      >
        <EnhancedModal
          title="Wallet Details"
          btn1={btn1Label}
          btn2={btn2Label}
          onClick1={onActivate}
          onClick2={onClick2}
          isDisabled1={false}
          isDisabled2={false}
          showBtn1={showBtn1}
          color={color1}
        >
          {connected === true ? (
            <Box>
              <Table variant="striped">
                <Thead>
                  <Tr>
                    <Th color="gray.500">KEY</Th>
                    <Th color="gray.500" isNumeric>
                      VALUE
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td className="td-text">Account</Td>
                    <Td className="td-text" isNumeric>
                      <Tooltip label={account_id} borderRadius="md">
                        <Text cursor="pointer" _hover={{}}>
                          {truncateText(account_id, 10)}
                        </Text>
                      </Tooltip>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td className="td-text">Chain ID</Td>
                    <Td className="td-text" isNumeric>
                      {chain_id}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td className="td-text">Balance</Td>
                    <Td className="td-text" isNumeric>
                      {`Ξ${formatEther(balance)}`}
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
          ) : (
            <Text color="red">
              Wallet not connected. Plesae click the "Connect Now" button below.
            </Text>
          )}
        </EnhancedModal>
      </Modal>
    </div>
  );
};
