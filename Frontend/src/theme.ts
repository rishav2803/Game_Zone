import { extendTheme } from "@chakra-ui/react";
import colorScheme from "./utils/colors";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        height: "50vh",
        backgroundColor: "#22222e",
        fontFamily: "JetBrains Mono",
        overflow: "hidden", // Uncomment if you want to hide overflow
      },
      '*::-webkit-scrollbar': {
        width: '4px',
      },
      '*::-webkit-scrollbar-thumb': {
        borderRadius: '20px',
        backgroundColor: `${colorScheme.foreground}`,
      },
    },
  },
});

export default theme;
