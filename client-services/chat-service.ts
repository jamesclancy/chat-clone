import { faker } from "@faker-js/faker";
import {
  IFetchChatStateForQueryRequest,
  IFetchChatStateForQueryResponse,
  IMainContentContext,
  IRightPanelProps,
} from "../models/models";
import getLeftMenuProps from "./left-command-panel-builder-service";
import getMainContentProps from "./main-conent-panel-builder-service";

async function loadChatView(
  context: IMainContentContext,
  request: IFetchChatStateForQueryRequest
): Promise<IFetchChatStateForQueryResponse> {
  //const buildNavigateThreadAction = (channelName: string) => (()=> context.dispatch({type:'ZoomChannel', channelName}));

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
    userName?: string;
  }
): Promise<IRightPanelProps> {
  if (args.threadId) {
    return { type: "ThreadDetailZoomIn" };
  }

  if (args.userName) {
    return { type: "UserDetailZoomIn" };
  }

  return { type: "NoZoomIn" };
}
