import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  Progress,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";
import LocalManager from "../../Common/LocalManager";
import MemoPeriod from "../../Common/MemoPeriod";
import { useLocalStorage } from "../../Common/useLocalStorage";

const SearchResult: FunctionComponent<{
  memo: Memo;
  memorize: (memo: Memo) => void;
  reset: (memo: Memo) => void;
}> = ({ memo, memorize, reset }) => {
  const [period] = useLocalStorage(
    MemoPeriod.MEMO_PERIOD_KEY,
    MemoPeriod.defaultPeriod
  );

  return (
    <Flex
      w="100%"
      border="1px"
      borderColor="blue.500"
      borderRadius="md"
      p="5"
      direction="column"
      gap="2"
      fontSize="4xl"
    >
      <Box flex="1" overflow="auto">
        {memo.content}
      </Box>
      <Flex gap="4">
        <Button
          colorScheme="blue"
          variant={memo.hasMemorized ? "solid" : "outline"}
          onClick={() => memorize(memo)}
        >
          记住了
        </Button>
        <Button
          colorScheme="blue"
          variant="outline"
          onClick={() => reset(memo)}
        >
          重新记忆
        </Button>
      </Flex>
      <Progress
        value={Math.round(MemoPeriod.getMemoProgress(memo, period) * 100)}
        size="sm"
        borderRadius="sm"
      ></Progress>
    </Flex>
  );
};

export default SearchResult;
