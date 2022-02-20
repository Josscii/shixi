import { Box, Button, Center, Flex, HStack, Tag } from "@chakra-ui/react";
import * as dayjs from "dayjs";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import LocalManager from "../../Common/LocalManager";
import MemoPeriod from "../../Common/MemoPeriod";
import { useLocalStorage } from "../../Common/useLocalStorage";

const MEMOED_CACHE_KEY = "memoed_cache";
const CURRENT_DAY_KEY = dayjs().format("YYYY-MM-DD");

const LocalReview: FunctionComponent<{ reload: number }> = ({ reload }) => {
  let [memos, setMemos] = useState<Memo[]>([]);
  let [memoedCache, setMemoedCache] = useLocalStorage<{
    [key: string]: Memo[];
  }>(MEMOED_CACHE_KEY, {
    [CURRENT_DAY_KEY]: [],
  });
  let periodContext = useContext(MemoPeriod.context);

  let remainArray: Memo[] = [];
  for (const memo of memos) {
    if (
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
      MemoPeriod.isMemoInPeriod(memo, periodContext)
    );
    setMemos(filteredMemos);
  }

  function updateMemoCache() {
    const currentMemo = remainArray[0];
    setMemoedCache((last) => {
      const copy = { ...last };
      copy[CURRENT_DAY_KEY] = copy[CURRENT_DAY_KEY].concat(currentMemo);
      return copy;
    });
  }

  function memorize() {
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

  return (
    <Flex
      w="100%"
      flex="1 1 60%"
      mt="5"
      border="1px"
      borderColor="blue.500"
      borderRadius="md"
      p="5"
      direction="column"
      gap="2"
      fontSize="4xl"
      pos="relative"
    >
      {remainArray.length > 0 ? (
        <>
          <Tag colorScheme="blue" variant="outline" pos="absolute" right="5">
            {remainArray.length}
          </Tag>
          <Box flex="1">{remainArray[0].content}</Box>
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
          <Box
            bg="blue.200"
            h="5px"
            borderRadius="lg"
            overflow="hidden"
            pos="relative"
          >
            <Box
              bg="blue.500"
              w={`${Math.round(
                MemoPeriod.getMemoProgress(remainArray[0], periodContext) * 100
              )}px`}
              h="full"
            ></Box>
          </Box>
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
