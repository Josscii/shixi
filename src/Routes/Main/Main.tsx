import { Container, Flex } from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";
import { useAuth } from "../../Auth/AuthProvider";
import Header from "./Header";
import LocalAddInput from "./LocalAddInput";
import LocalReview from "./LocalReview";

const Main: FunctionComponent = () => {
  const [reload, setReload] = useState(0);
  const auth = useAuth();
  const [expand, setExpand] = useState(false);
  return (
    <Container h="full" pb="5">
      <Flex direction="column" h="full">
        <Header />
        <Flex
          direction="column"
          h="full"
          justify={expand ? "center" : "stretch"}
        >
          {!expand &&
            (auth.authInfo.authType === "local" ? (
              <LocalAddInput
                didSubmit={(_) => setReload((reload) => reload + 1)}
              />
            ) : (
              "not implement yet"
            ))}
          {auth.authInfo.authType === "local" ? (
            <LocalReview
              reload={reload}
              expand={expand}
              toggleExpand={() => setExpand(!expand)}
            />
          ) : (
            "not implemented yet"
          )}
        </Flex>
      </Flex>
    </Container>
  );
};

export default Main;
