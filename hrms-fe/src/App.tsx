import { RouterProvider } from "react-router";
import routes from "./routes";
import "./locale/i18n";
import Notification from "./components/Notification";

function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <Notification />
    </>
  );
}

export default App;
