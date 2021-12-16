import { signOut } from "firebase/auth";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { ChatAlt2Icon } from "@heroicons/react/solid";

import { authenticator } from "../App/firebase";

type NavbarProps = {};

function Navbar(_props: NavbarProps): JSX.Element {
  const [user] = useAuthState(authenticator);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav className="w-full px-3 py-3 flex flex-row justify-between border-b-2 sm:px-10 sm:py-4">
      <div className="font-extrabold italic">
        <ChatAlt2Icon className="w-11 h-11 text-green-600" />
      </div>
      <ul className="flex flex-row gap-10 font-semibold">
        {!user ? null : (
          <li>
            <img
              style={{ borderColor: "#059669" }}
              className="w-11 p-0 m-0 rounded-full border-2"
              src={user.photoURL || ""}
              alt="Profile"
              onClick={() => setIsOpen(!isOpen)}
            />
            {!isOpen ? null : (
              <div
                className="absolute right-0 mt-2 p-2 w-48 bg-white rounded-md shadow-xl"
                onBlur={() => setIsOpen(false)}
              >
                <p
                  className="block px-4 py-2 text-xs text-gray-800 rounded-md hover:bg-green-500 hover:text-white"
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
