import { faker } from "@faker-js/faker";
import {
  IMainContentContext,
  IMainContentProps,
  IMessageContentItemProps,
  IMessageSenderProps,
  IReplySummary,
} from "../models/models";
import getLeftMenuProps from "./left-command-panel-builder-service";

async function getMainContentProps(
  context: IMainContentContext,
  channelSlug: string
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

    const newUserName = faker.internet.userName().toString();
    const threadId = faker.random.alphaNumeric(25).toString();

    const messageProps: IMessageContentItemProps = {
      createDate: faker.date.past(),
      createUser: newUserName,
      createUserStatus: "Online",
      createUserAvatar: faker.image.avatar(),
      messageContent: faker.lorem.paragraphs(),
      replies: replies,
      id: threadId,
      zoomToUser: function (this: IMessageContentItemProps) {
        context.dispatch({
          type: "ZoomUser",
          userName: this.createUser,
          context,
        });
      },
      zoomToThread: function (this: IMessageContentItemProps) {
        context.dispatch({ type: "ZoomThread", threadId: this.id, context });
      },
    };

    messages.push(messageProps);
  }

  var messageSenderProps: IMessageSenderProps = {
    placeHolderText: `Message #${channelSlug}`,
    draftContent: "",
    draftContentChanged: function (newContent: string): void {
      context.dispatch({type:'SaveChannelMessageDraft', channelSlug: channelSlug, newContent, user: context.currentUser });
    },
    sendContent: function (newContent: string): void {
      context.dispatch({type:'SendChannelMessage', channelSlug: channelSlug, newContent, user: context.currentUser });
    },
  };

  return {
    messages,
    messageSenderProps,
    channelSlug: channelSlug,
    channelAvatar,
    channelStatus,
  };
}

export default getMainContentProps;
