import { faker } from "@faker-js/faker";
import {
  IMainContentContext,
  IMainContentProps,
  IMessageContentItemProps,
  IMessageSenderProps,
  IReplySummary,
} from "../models/models";

async function getMainContentProps(
  context: IMainContentContext,
  channelName: string
): Promise<IMainContentProps> {
  //const channelName: string = channelName;
  const channelStatus: string = "A place for random messages";
  const channelAvatar: string = faker.image.business();

  const messages: IMessageContentItemProps[] = [];

  for (let i = 0; i < 100; i++) {
    const replyCount = Math.floor(Math.random() * 5);

    let replies: IReplySummary[] = [];

    for (let y = 0; y < replyCount; y++) {
      replies.push({
        userAvatar: faker.image.avatar(),
        userName: faker.internet.userName(),
      });
    }

    const newUserName = faker.internet.userName();
    const threadId = faker.random.alphaNumeric(25);

    messages.push({
      zoomToUser: () => {
        context.dispatch({ type: "ZoomUser", userName: newUserName });
      },
      zoomToThread: () => {
        context.dispatch({ type: "ZoomThread", threadId: threadId });
      },
      createDate: faker.date.past(),
      createUser: newUserName,
      createUserStatus: "Online",
      createUserAvatar: faker.image.avatar(),
      messageContent: faker.lorem.paragraphs(),
      replies: replies,
      id: threadId,
    });
  }

  var messageSenderProps: IMessageSenderProps = {
    placeHolderText: `Message #${channelName}`,
    draftContent: "",
    draftContentChanged: function (newContent: string): void {
      console.log(newContent);
    },
    sendContent: function (newContent: string): void {
      console.log(newContent);
    },
  };

  return {
    messages,
    messageSenderProps,
    channelName,
    channelAvatar,
    channelStatus,
  };
}

export default getMainContentProps;
