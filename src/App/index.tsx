import { useAuthState } from "react-firebase-hooks/auth";

import { authenticator } from "./firebase";
import ChatPage from "../components/ChatPage";
import HomePage from "../components/HomePage";
import Navbar from "../components/Navbar";

function App(): JSX.Element {
  const [user] = useAuthState(authenticator);
  console.log(user);
  return (
    <div className="bg-gray-100 h-screen overflow-hidden">
      <Navbar />
      <div className="h-full px-3 py-3 sm:px-10 sm:py-5">
        {user ? <ChatPage /> : <HomePage />}
      </div>
    </div>
  );
}

export default App;
