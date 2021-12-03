import { SyntheticEvent } from "react";
import { deleteDoc, QueryDocumentSnapshot } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { TrashIcon } from "@heroicons/react/outline";

import type { Message } from "../models/Message";

import { authenticator } from "../App/firebase";

type MessageBubbleProps = {
  documentRef: QueryDocumentSnapshot;
  message: Message;
};

export default function MessageBubble(props: MessageBubbleProps): JSX.Element {
  const [user] = useAuthState(authenticator);

  const stylesByUser = (isTheSameUser: boolean) => {
    if (isTheSameUser) {
      return "flex-1 p-3 bg-gray-300 text-black rounded-tr-lg rounded-b-lg";
    }
    return "flex-1 p-3 bg-green-300 text-black rounded-tr-lg rounded-b-lg";
  };

  const deleteMessage = (
    e: SyntheticEvent,
    documentRef: QueryDocumentSnapshot
  ) => {
    e.stopPropagation();
    deleteDoc(documentRef.ref);
  };

  console.log(typeof props.documentRef);

  const isTheSameUser = user?.uid === props.message.from.id;

  return (
    <div className="p-2 flex flex-row flex-nowrap gap-1">
      <img
        className="rounded-full w-12 h-12 m-1"
        src={props.message.from.profilePictureURL}
        alt={props.message.from.userName}
      />
      <div className={` ${stylesByUser(isTheSameUser)} `}>
        <div className="flex flex-row justify-between">
          <p className="px-2 max-w-max italic rounded-md text-sm bg-gray-500 text-white">
            {isTheSameUser ? "You" : props.message.from.userName}
          </p>
          {isTheSameUser ? (
            <span
              className="h-5 w-5 text-black"
              onClick={(e) => deleteMessage(e, props.documentRef)}
            >
              <TrashIcon className="h-5 w-5 text-black hover:text-red-500" />
            </span>
          ) : null}
        </div>

        <p className="py-2">{props.message.content}</p>
      </div>
    </div>
  );
}
