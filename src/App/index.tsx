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
      <div className="px-10 py-5 h-full">
        {user ? <ChatPage /> : <HomePage />}
      </div>
    </div>
  );
}

export default App;
