import {
  Text,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Divider,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useToast,
} from "@chakra-ui/react";
import { FunctionComponent, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../Auth/AuthProvider";
import LocalManager from "../../Common/LocalManager";
import MemoPeriod from "../../Common/MemoPeriod";
import { useLocalStorage } from "../../Common/useLocalStorage";

const Setting: FunctionComponent = () => {
  const [period, setPeriod] = useLocalStorage(
    MemoPeriod.MEMO_PERIOD_KEY,
    MemoPeriod.defaultPeriod
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputInvalid, setInputInvalid] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();
  const toast = useToast();
  const onDelete = () => {
    LocalManager.delete();
    onClose();
    toast({
      title: "清除成功",
      status: "success",
      duration: 500,
    });
  };

  useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = period;
    }
  }, []);

  function changePeriod() {
    if (inputRef.current) {
      const value = inputRef.current.value.trim();
      if (/\d+\ ?$/g.test(value)) {
        setPeriod(value);
        setInputInvalid(false);
      } else {
        setInputInvalid(true);
      }
    }
  }

  function logout() {
    auth.logout(() => {
      navigate("/login");
    });
  }

  return (
    <Container h="full" py="5">
      <Flex direction="column" h="full">
        <Flex direction="column" gap="4" my="2">
          <Heading size="sm">设置复习周期</Heading>
          <Flex gap="2">
            <Input
              isInvalid={inputInvalid}
              ref={inputRef}
              placeholder="1 2 3 4 5 6 7 10 20 30"
            ></Input>
            <Button
              colorScheme="blue"
              variant="outline"
              onClick={() => changePeriod()}
            >
              修改
            </Button>
          </Flex>
          <Text fontSize="xs">
            你添加的内容会在添加的第{period.replaceAll(" ", "、")}
            天的时候出现在复习列表里。
          </Text>
          <Divider />
        </Flex>
        <Flex direction="column" gap="4" mt="auto">
          <Button colorScheme="blue" variant="outline" disabled>
            连接 Notion
          </Button>
          <Button colorScheme="blue" variant="outline" onClick={() => logout()}>
            退出登陆
          </Button>
          <Button
            colorScheme="red"
            variant="outline"
            onClick={() => setIsOpen(true)}
          >
            清除本地数据
          </Button>
        </Flex>
      </Flex>
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
              清除本地数据
            </AlertDialogHeader>

            <AlertDialogBody>确定要清除吗？ 清除后无法恢复。</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                取消
              </Button>
              <Button colorScheme="red" onClick={onDelete} ml={3}>
                清除
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
};

export default Setting;
