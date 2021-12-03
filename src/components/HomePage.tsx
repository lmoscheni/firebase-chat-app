import { signInWithPopup } from "firebase/auth";
import { authenticationProvider, authenticator } from "../App/firebase";

type HomePageProps = {};

export default function HomePage(_props: HomePageProps): JSX.Element {
  return (
    <div className="p-5">
      <main className="p-5 text-center border-1 rounded-md">
        <h1 className="text-4xl font-bold mb-5">F-Chat[Firebase Chat]</h1>
        <p className="text-xl">
          You only need login with google, and enjoy the experience!
        </p>
        <button
          className="m-2 px-4 py-2 rounded-md text-white bg-green-600"
          onClick={() => signInWithPopup(authenticator, authenticationProvider)}
        >
          Login
        </button>
      </main>
    </div>
  );
}
