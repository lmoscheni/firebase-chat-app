import { SyntheticEvent, useState } from "react";
import { addDoc, QueryDocumentSnapshot } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { ArrowCircleRightIcon } from "@heroicons/react/solid";

import { authenticator, dbCollection } from "../App/firebase";
import MessageBubble from "./MessageBubble";
import ErrorMessage from "./Error";
import { Message } from "../models/Message";

import Loader from "./Loader";

import { sortMessagesByDate } from "./utils";

type ChatPageProps = {};

export default function ChatPage(_props: ChatPageProps): JSX.Element {
  const [user] = useAuthState(authenticator);
  const [value, loading, error] = useCollection(dbCollection, {});
  const [content, setContent] = useState<string>("");
  const [submissionError, setSubmissionError] = useState<boolean>(false);

  const submitMessage = (e: SyntheticEvent) => {
    e.stopPropagation();
    addDoc(dbCollection, {
      from: {
        id: user?.uid,
        userName: user?.displayName,
        profilePictureURL: user?.photoURL,
      },
      createdAt: new Date().toISOString(),
      content,
    })
      .then(() => {
        setContent("");
      })
      .catch(() => {
        setSubmissionError(true);
        setTimeout(() => setSubmissionError(false), 2000);
      });
  };

  if (error) {
    return (
      <div className="flex flex-row justify-center">
        <ErrorMessage />
      </div>
    );
  }

  return (
    <Loader isLoading={loading}>
      <div className="h-full">
        {!submissionError ? null : (
          <div className="p-4 my-2 bg-red-400 rounded-md">
            Error sending the message, please try again
          </div>
        )}
        <div className="h-5/6">
          <div className="h-full overflow-auto p-1 bg-white flex-1 rounded-md shadow-md">
            {value?.docs
              .sort(sortMessagesByDate)
              .map((doc: QueryDocumentSnapshot) => (
                <MessageBubble
                  documentRef={doc}
                  message={{ id: doc.id, ...doc.data() } as Message}
                />
              ))}
          </div>
        </div>
        <div className="w-full flex flex-row mt-2 bg-white rounded-md shadow-md">
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 p-2 mr-2"
            placeholder="Type your message..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && content && !submissionError) {
                submitMessage(e);
              }
            }}
          />
          <button
            onClick={submitMessage}
            disabled={!content || submissionError}
          >
            <ArrowCircleRightIcon className="rounded-full h-9 w-9 text-green-600 hover:text-black hover:bg-gray-200" />
          </button>
        </div>
      </div>
    </Loader>
  );
}
