import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      html: {
        height: "100%",
      },
      body: {
        height: "100%",
      },
      "#app": {
        height: "100%",
      },
    },
  },
});

export { theme };
