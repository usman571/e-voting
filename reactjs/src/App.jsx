import { BrowserRouter } from "react-router-dom";
import UserRouter from "./routes/UserRouter";
import AdminRouter from "./routes/AdminRouter";
import LandingPage from "./components/LandingPage";

import { useCurrentUser, useCurrentAdmin } from "./hooks/useCurrentUser";

function App() {
  const currentUser = useCurrentUser();
  const currentAdmin = useCurrentAdmin();

  const isUser = currentUser && currentUser.role === "voter";
  const isAdmin = currentAdmin && currentAdmin.role === "admin";

  let showUserRouter = true; // set flag to true by default

  if (isUser || isAdmin) {
    showUserRouter = false; // hide UserRouter component
  }

  return (
    <BrowserRouter forceRefresh={true}>
      {showUserRouter && <UserRouter />}
      <div className="flex gap-1 w-full">
        {isUser ? <UserRouter /> : isAdmin ? <AdminRouter /> : null}
      </div>
    </BrowserRouter>
  );
}

export default App;
