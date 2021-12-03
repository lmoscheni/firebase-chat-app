export type Message = {
  id: string;
  from: {
    id: string;
    userName: string;
    profilePictureURL: string;
  };
  content: string;
  createdAt: string;
};
