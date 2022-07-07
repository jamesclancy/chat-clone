import { faker } from "@faker-js/faker";
import {
  IFetchChatStateForQueryRequest,
  IFetchChatStateForQueryResponse,
  ILeftMenuSectionProps,
  ILeftNavigationUserPanelProps,
  IMainContentContext,
  IMessageContentItemProps,
  IMessageSenderProps,
  IReplySummary,
  IRightPanelProps,
} from "../models/models";

async function loadChatView(
  context: IMainContentContext,
  request: IFetchChatStateForQueryRequest
): Promise<IFetchChatStateForQueryResponse> {
  const getRightPanelProps: () => IRightPanelProps = () => {
    return { type: "NoZoomIn" };
  };

  //const buildNavigateThreadAction = (channelName: string) => (()=> context.dispatch({type:'ZoomChannel', channelName}));
  const buildNavigateSectionToggleAction = (sectionId: string) => () => {
    context.dispatch({ type: "ToggleLeftMenuExpansion", sectionId });
  };
  const buildNavigateChannelAction = (channelName: string) => () =>
    context.dispatch({ type: "NavigateToChannel", channelName });
  const buildNavigateToUserChannelAction = (channelName: string) => () =>
    context.dispatch({
      type: "NavigateToChannel",
      channelName: `${context.currentUser}_${channelName}`,
    });

  const getLeftMenuProps = () => {
    const panels: ILeftMenuSectionProps[] = [
      {
        id: `${context.currentUser}_generic`,
        items: [
          {
            name: "Unread",
            active: false,
            clickAction: buildNavigateToUserChannelAction("unread"),
          },
          {
            name: "Threads",
            active: true,
            clickAction: buildNavigateToUserChannelAction("threads"),
          },
          {
            name: "Mentions",
            active: true,
            items: 10,
            clickAction: buildNavigateToUserChannelAction("mentions"),
          },
          {
            name: "Drafts",
            active: false,
            clickAction: buildNavigateToUserChannelAction("drafts"),
          },
        ],
        name: "",
        expanded: true,
        toggleExpansion: () => {},
        clickAdd: () => {},
      },
      {
        id: "channels",
        items: [
          {
            name: "#random",
            active: false,
            clickAction: buildNavigateChannelAction(`random`),
          },
          {
            name: "#tailwinds",
            active: false,
            clickAction: buildNavigateChannelAction(`tailwinds`),
          },
          {
            name: "#testing",
            active: false,
            clickAction: buildNavigateChannelAction(`testing`),
          },
        ],
        name: "Channels",
        expanded: true,
        toggleExpansion: buildNavigateSectionToggleAction("channels"),
        clickAdd: () => {},
      },
      {
        id: `${context.currentUser}_some-customer-folder`,
        items: [{ name: "#my-channel", active: false }],
        name: "Some Customer Folder",
        expanded: false,
        toggleExpansion: buildNavigateChannelAction(
          `${context.currentUser}_some-customer-folder`
        ),
        clickAdd: () => {},
      },
      {
        id: "direct-messages",
        items: [
          { name: "James", active: false, icon: "GreenCircle" },
          { name: "Tailwinds", active: false, icon: "GrayCircle" },
          { name: "Testing", active: false, icon: "GrayCircle" },
        ],
        name: "Direct Messages",
        expanded: true,
        toggleExpansion: buildNavigateSectionToggleAction("direct-messages"),
        clickAdd: () => {},
      },
    ];

    const leftNavigationProps: ILeftNavigationUserPanelProps = {
      userName: "James",
      status: "Online",
    };

    return { leftNavigationProps, sections: panels };
  };

  return {
    mainContent: await loadChannelDetailsForMainContent(
      context,
      request.zoomedChannel
    ),
    leftBarProps: getLeftMenuProps(),
    rightPanelProps: getRightPanelProps(),
  };
}

async function loadChannelDetailsForMainContent(
  context: IMainContentContext,
  channelName: string
) {
  const getMainContentProps = () => {
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
  };

  return getMainContentProps();
}

const chatService = {
  loadChatView,
  loadChannelDetailsForMainContent,
};

export default chatService;
