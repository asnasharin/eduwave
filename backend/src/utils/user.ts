export let users: { socketId: string; userId: string }[] = [];

export const userJoin = (socketId: string, userId: string): boolean => {
  const user = users.find((user) => user.userId === userId);
  if (user) {
    return false;
  }
  users.push({ socketId, userId });
  return true;
};

export const userLeft = (socketId: string) => {
  users = users.filter((user) => user.socketId !== socketId);
};

export const getUsers = () => users;
