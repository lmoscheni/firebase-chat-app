import { signOut } from "firebase/auth";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { authenticator } from "../App/firebase";

import { ChatAlt2Icon } from "@heroicons/react/solid";

type NavbarProps = {};

function Navbar(_props: NavbarProps): JSX.Element {
  const [user] = useAuthState(authenticator);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav className="w-full px-3 py-3 flex flex-row justify-between border-b-2 sm:px-10 sm:py-4">
      <div className="font-extrabold italic">
        <ChatAlt2Icon className="w-10 h-10 text-green-600" />
      </div>
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
                  className="block px-4 py-2 text-xs text-gray-800 rounded-lg hover:bg-green-300 hover:text-white"
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
