import { signInWithPopup } from "firebase/auth";
import { ChatAlt2Icon } from "@heroicons/react/solid";

import { authenticationProvider, authenticator } from "../App/firebase";

type HomePageProps = {};

export default function HomePage(_props: HomePageProps): JSX.Element {
  return (
    <div className="p-2 sm:p-5">
      <main className="px-2 py-3 bg-gray-200 text-center border-2 rounded-md sm:p-5">
        <h1 className="text-2xl mb-2 font-bold sm:text-4xl sm:mb-5">
          Firebase Chat{" "}
          <ChatAlt2Icon className="inline w-10 h-10 text-green-600" />
        </h1>
        <p className="text-xl mb-2 sm:text-xl">Your free chatroom.</p>
        <p>You only need login with google, and enjoy the experience!</p>
        <button
          className="m-2 px-4 py-2 rounded-md text-white bg-green-600 hover:text-black hover:bg-gray-300 hover:font-bold"
          onClick={() => signInWithPopup(authenticator, authenticationProvider)}
        >
          Login
        </button>
      </main>
    </div>
  );
}
