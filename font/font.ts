import { Open_Sans, Inter, Playfair_Display, Roboto } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const openSans = Open_Sans({ subsets: ["latin"]});
const playfairDisplay = Playfair_Display({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["100", "300", "400", "500", "700", "900"] });

export {inter, openSans, playfairDisplay, roboto}