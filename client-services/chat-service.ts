import { faker } from "@faker-js/faker";
import { type } from "os";
import {
  IFetchChatStateForQueryRequest,
  IFetchChatStateForQueryResponse,
  IMainContentContext,
  IRightPanelProps,
  IThreadDetailZoomIn,
  IUserDetailZoomIn,
} from "../models/models";
import { channelNameForTwoUsers } from "../utilities/user";
import getLeftMenuProps from "./left-command-panel-builder-service";
import getMainContentProps from "./main-content-panel-builder-service";

async function loadChatView(
  context: IMainContentContext,
  request: IFetchChatStateForQueryRequest
): Promise<IFetchChatStateForQueryResponse> {
  return {
    mainContent: await getMainContentProps(context, request.zoomedChannel),
    leftBarProps: await getLeftMenuProps(context),
    rightPanelProps: await getRightPanelProps(context, {}),
  };
}

const chatService = {
  loadChatView,
  loadChannelDetailsForMainContent: getMainContentProps,
  loadRightPanelDetailsForRightContent: getRightPanelProps,
};

export default chatService;


async function getRightPanelProps(
  context: IMainContentContext,
  args: {
    threadId?: string;
    channelSlug?: string;
    userName?: string;
  }
): Promise<IRightPanelProps> {
  if (args.threadId) {
    return await generateZoomInThreadDetail(
      context,
      args.threadId,
      args.channelSlug ?? "random"
    );
  }

  if (args.userName) {
    return await generateUserDetail(context, args.userName);
  }

  return { type: "NoZoomIn" };
}

async function generateZoomInThreadDetail(
  context: IMainContentContext,
  threadId: string,
  channelSlug: string
): Promise<IThreadDetailZoomIn> {
  const [mainComment, ...comments] = (
    await getMainContentProps(context, "testing")
  ).messages;
  const details: IThreadDetailZoomIn = {
    type: "ThreadDetailZoomIn",
    closeRightMenu: () =>
      context.dispatch({
        type: "RightPanelLoaded",
        newRightPanel: { type: "NoZoomIn" },
        context: context,
      }),
    channelSlug,
    mainComment: mainComment,
    comments: comments,
  };

  return details;
}

async function generateUserDetail(
  context: IMainContentContext,
  userName: string
): Promise<IUserDetailZoomIn> {
  const details: IUserDetailZoomIn = {
    timeZone: "GMT",
    status: "Online",
    avatar: faker.image.avatar(),
    description: faker.company.catchPhrase(),
    userName: userName,
    type: "UserDetailZoomIn",
    closeRightMenu: () =>
      context.dispatch({
        type: "RightPanelLoaded",
        newRightPanel: { type: "NoZoomIn" },
        context: context,
      }),
    messageUser: () =>
      context.dispatch({
        type: "NavigateToChannel",
        channelName: channelNameForTwoUsers(userName, context.currentUser),
        context,
      }),
  };

  return details;
}
