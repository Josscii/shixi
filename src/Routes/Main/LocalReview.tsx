import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Icon,
  IconButton,
  Progress,
  useToast,
} from "@chakra-ui/react";
import * as dayjs from "dayjs";
import { FunctionComponent, useEffect, useState } from "react";
import LocalManager from "../../Common/LocalManager";
import MemoPeriod from "../../Common/MemoPeriod";
import { useLocalStorage } from "../../Common/useLocalStorage";
import { Maximize, Minimize } from "react-feather";
import TipManager from "../../Common/TipManager";

const CURRENT_DAY_KEY = dayjs().format("YYYY-MM-DD");

const LocalReview: FunctionComponent<{
  reload: number;
  expand: boolean;
  toggleExpand: () => void;
}> = ({ reload, expand, toggleExpand }) => {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [memoedCache, setMemoedCache] = useLocalStorage<{
    [key: string]: Memo[];
  }>(LocalManager.MEMOED_CACHE_KEY, {});
  const [period] = useLocalStorage(
    MemoPeriod.MEMO_PERIOD_KEY,
    MemoPeriod.defaultPeriod
  );

  let remainArray: Memo[] = [];
  for (const memo of memos) {
    if (
      !memoedCache[CURRENT_DAY_KEY] ||
      memoedCache[CURRENT_DAY_KEY].filter((cache) => cache.id === memo.id)
        .length === 0
    ) {
      remainArray.push(memo);
    }
  }

  useEffect(() => {
    updateMemos();
  }, [reload]);

  function updateMemos() {
    const localMemos = LocalManager.getLocalMemos();
    let filteredMemos = Object.values(localMemos).filter(
      (memo) => !memo.hasMemorized
    );
    filteredMemos = filteredMemos.filter((memo) =>
      MemoPeriod.isMemoInPeriod(memo, period)
    );
    setMemos(filteredMemos);
  }

  function updateMemoCache() {
    const currentMemo = remainArray[0];
    setMemoedCache((last) => {
      const copy = { ...last };
      if (copy[CURRENT_DAY_KEY]) {
        copy[CURRENT_DAY_KEY] = copy[CURRENT_DAY_KEY].concat(currentMemo);
      } else {
        copy[CURRENT_DAY_KEY] = [currentMemo];
      }
      return copy;
    });
  }

  function memorize() {
    showMemorizedTipIfNeeded();

    const currentMemo = remainArray[0];
    currentMemo.hasMemorized = true;

    // update local
    const localMemos = LocalManager.getLocalMemos();
    localMemos[currentMemo.id] = currentMemo;
    LocalManager.saveMemosToLocal(localMemos);

    // update memos
    updateMemos();

    // update memo cache
    updateMemoCache();
  }

  function next() {
    updateMemoCache();
  }

  function reset() {
    showResetTipIfNeeded();

    const currentMemo = remainArray[0];
    currentMemo.reviewDate = dayjs().toString();

    // update local
    const localMemos = LocalManager.getLocalMemos();
    localMemos[currentMemo.id] = currentMemo;
    LocalManager.saveMemosToLocal(localMemos);

    // update memos
    updateMemos();
  }

  function clearMemoCache() {
    setMemoedCache((last) => {
      const copy = { ...last };
      copy[CURRENT_DAY_KEY] = [];
      return copy;
    });
  }

  const toast = useToast();

  function showMemorizedTipIfNeeded() {
    if (!TipManager.hasShowedMemorizeTip()) {
      toast({
        title:
          "标记为“记住了”之后，该内容将不会出现在复习列表中。你可以随时从右上角的🔍按钮中恢复回来。",
        status: "info",
        isClosable: true,
      });
      TipManager.showedMemorizeTip();
    }
  }

  function showResetTipIfNeeded() {
    if (!TipManager.hasShowedRestTip()) {
      toast({
        title: "重新记忆会重置该内容记忆周期开始的时间为今天。",
        status: "info",
        isClosable: true,
      });
      TipManager.showedRestTip();
    }
  }

  return (
    <Flex
      w="100%"
      flex={expand ? "0 1 60%" : "1 1 60%"}
      mt="5"
      border="1px"
      borderColor="blue.500"
      borderRadius="md"
      p="5"
      direction="column"
      gap="2"
      fontSize="4xl"
      pos="relative"
      overflow="hidden"
    >
      {remainArray.length > 0 ? (
        <>
          <Badge colorScheme="blue" pos="absolute" right="0" top="0">
            {remainArray.length}
          </Badge>
          <IconButton
            aria-label="maximize"
            icon={<Icon as={expand ? Minimize : Maximize}></Icon>}
            pos="absolute"
            right="5"
            top="5"
            bg="clear"
            color="blue.500"
            onClick={() => toggleExpand()}
          ></IconButton>
          <Box flex="1" overflow="auto">
            {remainArray[0].content}
          </Box>
          <Flex gap="4">
            <Button
              colorScheme="blue"
              variant="outline"
              onClick={() => memorize()}
            >
              记住了
            </Button>
            <Button
              colorScheme="blue"
              variant="outline"
              onClick={() => reset()}
            >
              重新记忆
            </Button>
            <Button colorScheme="blue" ml="auto" onClick={() => next()}>
              下一个
            </Button>
          </Flex>
          <Progress
            value={Math.round(
              MemoPeriod.getMemoProgress(remainArray[0], period) * 100
            )}
            size="sm"
            borderRadius="sm"
          ></Progress>
        </>
      ) : memos.length > 0 ? (
        <Center h="full" color="gray.300" pos="relative">
          今天复习完了
          <Button
            pos="absolute"
            right="0"
            bottom="0"
            colorScheme="blue"
            onClick={() => clearMemoCache()}
          >
            再来一次
          </Button>
        </Center>
      ) : (
        <Center h="full" color="gray.300">
          请添加内容来复习......
        </Center>
      )}
    </Flex>
  );
};

export default LocalReview;
