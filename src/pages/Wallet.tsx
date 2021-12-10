import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  GridItem,
  Button,
  Center,
  Text,
  Box,
  Input,
  FormControl,
  Icon,
  FormLabel,
} from "@chakra-ui/react";
import { MdSwapHoriz } from "react-icons/md";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import { ContextChain } from "context/Context";
import { WalletDetails } from "./WalletDetails";
import { injected } from "sevices/connetors";
import { EnhancedToastify } from "components/EnhancedToastify";

interface Props {}

export const Wallet: React.FC<Props> = () => {
  const {
    state: {
      metamask_information: { account_id },
    },
    dispatch,
  } = useContext(ContextChain);
  const { active, account, chainId, library, activate, error } =
    useWeb3React<Web3Provider>();

  const [open, setOpen] = useState<boolean>(false);
  const [value1, setValue1] = useState<any>(0);
  const [value2, setValue2] = useState<any>(0);

  const onOpen = () => {
    setOpen((prev) => !prev);
  };

  const onClose = () => {
    setOpen((prev) => !prev);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value }: any = e.target;
    const busd = 3;
    const nep = 1;
    let val1 = 0;
    let val2 = 0;

    if (id === "busd") {
      val1 = value / nep;
      val2 = value;
    } else {
      val1 = value;
      val2 = value * busd;
    }

    setValue1(val1);
    setValue2(val2);
  };

  useEffect(() => {
    (async function resources() {
      if (active === true) {
        let balance: any = 0;
        if (!!account && library) {
          const results = await library.getBalance(account);
          balance = results;
        }

        dispatch({
          type: "SAVE_METAMASK_INFO",
          payload: {
            account_id: account,
            chain_id: chainId,
            connected: true,
            balance: balance,
          },
        });
      }
    })();
  }, [active, account, chainId, library, dispatch]);

  useEffect(() => {
    (async function resources() {
      if (account_id !== "") {
        try {
          await activate(injected);
        } catch (err) {
          return false;
        }
      }
    })();
  }, [account_id, activate]);

  useEffect(() => {
    if (!!error?.message) {
      EnhancedToastify("error", error?.message);
    }
  }, [error]);

  return (
    <>
      <Grid>
        <GridItem minHeight="100vh">
          <Box
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            minHeight="100%"
            display="grid"
            flexDirection="row"
          >
            <Center>
              <Box>
                <Text fontSize="5xl" fontWeight="bold">
                  Crypto Converter
                </Text>
                <FormControl pt="4">
                  <FormLabel>NEP</FormLabel>
                  <Input
                    id="nep"
                    type="number"
                    value={value1 ? value1 : ""}
                    placeholder="0.00"
                    onChange={onChange}
                  />
                </FormControl>
                <FormControl pt="4">
                  <Button
                    colorScheme="gray"
                    _focus={{ bgColor: "none" }}
                    _hover={{ bgColor: "none" }}
                  >
                    <Icon as={MdSwapHoriz} />
                  </Button>
                </FormControl>
                <FormControl>
                  <FormLabel>BUSD</FormLabel>
                  <Input
                    id="busd"
                    type="number"
                    value={value2 ? value2 : ""}
                    placeholder="0.00"
                    onChange={onChange}
                  />
                </FormControl>
                <FormControl pt="3">
                  <Button colorScheme="blue" onClick={onOpen}>
                    Check Wallet Details
                  </Button>
                </FormControl>
              </Box>
            </Center>
          </Box>
        </GridItem>
        <WalletDetails open={open} onClose={onClose} />
      </Grid>
    </>
  );
};
