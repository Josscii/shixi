import {
  Text,
  Button,
  Flex,
  Icon,
  IconButton,
  Progress,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { FunctionComponent, useRef, useState } from "react";
import { X } from "react-feather";
import MemoPeriod from "../../Common/MemoPeriod";
import { useLocalStorage } from "../../Common/useLocalStorage";

const SearchResult: FunctionComponent<{
  memo: Memo;
  memorize: (memo: Memo) => void;
  reset: (memo: Memo) => void;
  remove: (memo: Memo) => void;
}> = ({ memo, memorize, reset, remove }) => {
  const [period] = useLocalStorage(
    MemoPeriod.MEMO_PERIOD_KEY,
    MemoPeriod.defaultPeriod
  );

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  //https://github.com/chakra-ui/chakra-ui/discussions/2936
  const cancelRef = useRef(null);

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
      pos="relative"
    >
      <Text flex="1" overflow="auto" whiteSpace="pre-line">
        {memo.content}
      </Text>
      <IconButton
        aria-label="delete"
        icon={<Icon as={X} />}
        bg="clear"
        onClick={() => setIsOpen(true)}
        pos="absolute"
        top="0"
        right="0"
      ></IconButton>
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
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
        size="xs"
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              删除「{memo.content.substring(0, 10)}」
            </AlertDialogHeader>

            <AlertDialogBody>确定要删除吗？ 删除后无法恢复。</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                取消
              </Button>
              <Button colorScheme="red" onClick={() => remove(memo)} ml={3}>
                删除
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
};

export default SearchResult;
