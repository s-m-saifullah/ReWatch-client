import { RouterProvider } from "react-router-dom";
import { router } from "./routers/routes";

function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
