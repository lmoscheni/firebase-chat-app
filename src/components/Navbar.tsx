import { signOut } from "firebase/auth";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { authenticator } from "../App/firebase";

type NavbarProps = {};

function Navbar(_props: NavbarProps): JSX.Element {
  const [user] = useAuthState(authenticator);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav className="w-full px-10 py-4 flex flex-row justify-between border-b-2">
      <div className="font-extrabold text-blue-500 italic">firebaseChat_</div>
      <ul className="flex flex-row gap-10 font-semibold">
        {!user ? null : (
          <li>
            <img
              className="w-7 p-0 m-0 rounded-full"
              src={user.photoURL || ""}
              alt="Profile"
              onClick={() => setIsOpen(!isOpen)}
            />
            {!isOpen ? null : (
              <div
                className="absolute right-0 mt-2 p-2 w-48 bg-white rounded-lg shadow-xl"
                onBlur={() => setIsOpen(false)}
              >
                <p
                  className="block px-4 py-2 text-xs text-gray-800 rounded-lg hover:bg-blue-500 hover:text-white"
                  onClick={() => {
                    setIsOpen(!isOpen);
                    signOut(authenticator);
                  }}
                >
                  logout
                </p>
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
