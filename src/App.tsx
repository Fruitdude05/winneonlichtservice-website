import { BrowserRouter } from "react-router-dom";
import { AppProviders, AppRoutes } from "./AppRoutes";

const App = () => (
  <AppProviders>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AppProviders>
);

export default App;
