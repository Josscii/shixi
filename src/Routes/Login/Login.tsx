import {
  Box,
  Button,
  Center,
  Container,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/AuthProvider";

const Login: FunctionComponent = () => {
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const { localAuth } = useAuth();

  return (
    <Box h="full" bgGradient="linear(to-r, blue.50, blue.100)">
      <Container h="full">
        <Center minH="full">
          <Box>
            <VStack align="left" fontSize="3xl" spacing="5">
              <Text>
                学而
                <Text as="strong" color="blue.500">
                  时习
                </Text>
                之，不亦说乎？
              </Text>
              <Text>学和习是两个密不可分的步骤。</Text>
              <Text>在时习里，</Text>
              <Text>你可以记录下任何你学到的东西，</Text>
              <Text>
                自定义你想要的
                <Text as="strong" color="blue.500">
                  复习周期
                </Text>
                ，
              </Text>
              <Text>然后开始学&习。</Text>
            </VStack>
            <HStack mt="7">
              <Button disabled={true} colorScheme="blue">
                连接 Notion
              </Button>
              <Button
                colorScheme="blue"
                variant="outline"
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    localAuth(() => {
                      setLoading(false);
                      navigate("/", { replace: true });
                    });
                  }, 500);
                }}
                isLoading={loading}
              >
                本地体验
              </Button>
            </HStack>
          </Box>
        </Center>
      </Container>
    </Box>
  );
};

export default Login;
