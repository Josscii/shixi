import {
  Divider,
  Flex,
  Heading,
  Icon,
  IconButton,
  Spacer,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { Search, Settings } from "react-feather";
import { useNavigate } from "react-router-dom";

const Header: FunctionComponent = () => {
  let navigate = useNavigate();
  return (
    <Flex align="center" py="2">
      <IconButton
        aria-label="help"
        icon={<Icon as={Settings}></Icon>}
        bg="clear"
        onClick={() => navigate("/setting")}
      ></IconButton>
      <Spacer />
      <Heading size="sm">时习</Heading>
      <Spacer />
      <IconButton
        aria-label="search"
        icon={<Icon as={Search}></Icon>}
        bg="clear"
        disabled={true}
      ></IconButton>
    </Flex>
  );
};

export default Header;
