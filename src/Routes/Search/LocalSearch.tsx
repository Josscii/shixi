import { Center, Container, Flex, Input, Text } from "@chakra-ui/react";
import * as dayjs from "dayjs";
import { FunctionComponent, useEffect, useState } from "react";
import LocalManager from "../../Common/LocalManager";
import SearchResult from "./SearchResult";

const LocalSearch: FunctionComponent = () => {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    updateMemos();
  }, [searchText]);

  function updateMemos() {
    const localMemos = LocalManager.getLocalMemos();
    const values = Object.values(localMemos);
    setMemos(values);
  }

  function memorize(memo: Memo) {
    const localMemos = LocalManager.getLocalMemos();
    localMemos[memo.id] = { ...memo, hasMemorized: !memo.hasMemorized };
    LocalManager.saveMemosToLocal(localMemos);
    updateMemos();
  }

  function reset(memo: Memo) {
    const localMemos = LocalManager.getLocalMemos();
    localMemos[memo.id] = { ...memo, reviewDate: dayjs().toString() };
    LocalManager.saveMemosToLocal(localMemos);
    updateMemos();
  }

  function remove(memo: Memo) {
    const localMemos = LocalManager.getLocalMemos();
    delete localMemos[memo.id];
    LocalManager.saveMemosToLocal(localMemos);
    updateMemos();
  }

  const filtered = memos.filter((memo) => memo.content.includes(searchText));

  return (
    <Container h="full" py="5">
      <Flex direction="column" gap="2" h="full">
        <Input
          placeholder="输入关键词进行搜索"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          size="lg"
        ></Input>
        {filtered.length > 0 ? (
          filtered.map((memo) => (
            <SearchResult
              key={memo.id}
              memo={memo}
              memorize={memorize}
              reset={reset}
              remove={remove}
            />
          ))
        ) : (
          <Center h="full">
            <Text fontSize="4xl" color="gray.300">
              没有记录
            </Text>
          </Center>
        )}
      </Flex>
    </Container>
  );
};

export default LocalSearch;
