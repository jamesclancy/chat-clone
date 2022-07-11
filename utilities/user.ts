export function channelNameForTwoUsers(user1: string, user2: string) {
  if (user1 < user2) {
    return `${user1}_${user2}`;
  }
  return `${user2}_${user1}`;
}
