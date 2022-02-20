import { Box, Button, Textarea } from "@chakra-ui/react";
import * as dayjs from "dayjs";
import { FunctionComponent, useState } from "react";
import { useAuth } from "../../Auth/AuthProvider";
import { v4 as uuidv4 } from "uuid";
import LocalManager from "../../Common/LocalManager";

const LocalAddInput: FunctionComponent<{
  didSubmit: (memo: Memo) => void;
}> = ({ didSubmit }) => {
  const [text, setText] = useState("");
  const [submiting, setSubmiting] = useState(false);

  function submit() {
    setSubmiting(true);
    const memo: Memo = {
      id: uuidv4(),
      createDate: dayjs().toString(),
      content: text,
      reviewDate: dayjs().toString(),
      hasMemorized: false,
    };
    console.log(memo);

    let localMemos = LocalManager.getLocalMemos();
    localMemos[memo.id] = memo;
    LocalManager.saveMemosToLocal(localMemos);
    setSubmiting(false);
    setText("");
    didSubmit(memo);
  }

  return (
    <Box
      w="100%"
      flex="1 1 40%"
      pos="relative"
      isolation="isolate"
      borderColor="blue.500"
    >
      <Textarea
        resize="none"
        h="100%"
        fontSize="4xl"
        p="5"
        placeholder="在这里输入......"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={submiting}
      ></Textarea>
      <Button
        pos="absolute"
        bottom="5"
        right="5"
        colorScheme="blue"
        zIndex="1"
        onClick={() => submit()}
        isLoading={submiting}
        disabled={text.length === 0}
      >
        添加
      </Button>
    </Box>
  );
};

export default LocalAddInput;

//https://www.geeksforgeeks.org/how-to-put-a-responsive-clear-button-inside-html-input-text-field/
