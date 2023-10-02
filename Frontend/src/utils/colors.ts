interface ColorScheme {
    background: string;
    brightBlack:string;
    black: string;
    blue: string;
    cyan: string;
    foreground: string;
    green: string;
    purple: string;
    red: string;
    white: string;
    yellow: string;
    scissorsGradient:string;
    paperGradient:string;
    rockGradient:string;
}

const colorScheme: ColorScheme = {
    background: "#282C34",
    brightBlack:"#252930",
    black: "#282C34",
    blue: "#61AFEF",
    cyan: "#56B6C2",
    foreground: "#969fa8",
    green: "#98C379",
    purple: "#C678DD",
    red: "#E06C75",
    white: "#DCDFE4",
    yellow: "#E5C07B",
    scissorsGradient: "linear-gradient(to right, hsl(39, 89%, 49%), hsl(40, 84%, 53%))",
    paperGradient: "linear-gradient(to right, hsl(230, 89%, 62%), hsl(230, 89%, 65%))",
    rockGradient: "linear-gradient(to right, hsl(349, 71%, 52%), hsl(349, 70%, 56%))",
};

export default colorScheme;
