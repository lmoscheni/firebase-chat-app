import { DocumentData } from "firebase/firestore";

export const sortMessagesByDate = (a: DocumentData, b: DocumentData) => {
  const aTime = new Date(a.data().createdAt).getTime();
  const bTime = new Date(b.data().createdAt).getTime();

  if (aTime > bTime) {
    return 1;
  }

  if (bTime > aTime) {
    return -1;
  }

  return 0;
};
