import {createBrowserRouter} from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
import App from "./App";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Coins />
    },
    {
        path: "/:coinId",
        element: <Coin />
    }
])

export default router;