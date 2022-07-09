export interface IMessageContentItemProps {
  id: string;
  createDate: Date;
  createUser: string;
  createUserStatus: "Online" | "Away";
  createUserAvatar: string;
  messageContent: string;
  replies: IReplySummary[];
  zoomToUser: () => void;
  zoomToThread: () => void;
}

export interface IReplySummary {
  userName: string;
  userAvatar: string;
}
export interface IMessageSenderProps {
  placeHolderText: string;
  draftContent: string;

  draftContentChanged: (newContent: string) => void;
  sendContent: (newContent: string) => void;
}

export interface IMainContentProps {
  channelName: string;
  channelStatus: string;
  channelAvatar: string;

  messageSenderProps: IMessageSenderProps;
  messages: IMessageContentItemProps[];
}

export interface IMainContentContext {
  currentUser: string;
  dispatch: (e: ChatScreenEvent) => void;
}

export interface INoZoomIn {
  type: "NoZoomIn";
}
export interface IUserDetailZoomIn {
  type: "UserDetailZoomIn";
}
export interface IThreadDetailZoomIn {
  type: "ThreadDetailZoomIn";
}

export type IRightPanelProps =
  | IUserDetailZoomIn
  | IThreadDetailZoomIn
  | INoZoomIn;

export interface ILeftMenuLinkItemProps {
  clickAction?: () => void;
  name: string;
  active: boolean;
  keyPrefix?: string;
  items?: number;
  icon?: "GreenCircle" | "GrayCircle";
}

export interface ILeftMenuSectionProps {
  id: string;
  items: ILeftMenuLinkItemProps[];
  name: string;
  expanded: boolean;
  toggleExpansion: () => void;
  clickAdd: () => void;
}

export interface ILeftNavigationUserPanelProps {
  userName: string;
  status: "Away" | "Online";
}

export interface ILeftBarProps {
  leftNavigationProps: ILeftNavigationUserPanelProps;
  sections: ILeftMenuSectionProps[];
}

export interface IChatScreenState {
  mainContent: IMainContentProps;
  rightPanelProps: IRightPanelProps;
  leftBarProps: ILeftBarProps;
  loading: boolean;
}

export const EmptyChatScreenState: IChatScreenState = {
  mainContent: {
    messages: [],
    messageSenderProps: {
      draftContent: "",
      draftContentChanged: (arg) => {},
      sendContent: (arg) => {},
      placeHolderText: "",
    },
    channelName: "",
    channelAvatar: "",
    channelStatus: "",
  },
  rightPanelProps: { type: "NoZoomIn" },
  leftBarProps: {
    leftNavigationProps: { userName: "", status: "Away" },
    sections: [],
  },
  loading: true,
};

interface ChatScreenInitiallyLoaded {
  type: "InitiallyLoaded";
  mainContent: IMainContentProps;
  rightPanelProps: IRightPanelProps;
  leftBarProps: ILeftBarProps;
}

interface ChatScreenNavigateToChannel {
  channelName: string;
  type: "NavigateToChannel";
}
interface ChatScreenChannelLoaded {
  type: "ChannelLoaded";
  mainContent: IMainContentProps;
}

interface ChatScreenZoomUser {
  userName: string;
  type: "ZoomUser";
}

interface ChatScreenZoomThread {
  threadId: string;
  type: "ZoomThread";
}

interface ChatScreenRightPanelLoaded {
  type: "RightPanelLoaded";
  newRightPanel: IRightPanelProps;
}

interface ToggleLeftMenuExpansionEvent {
  type: "ToggleLeftMenuExpansion";
  sectionId: string;
}

export type ChatScreenEvent =
  | ChatScreenInitiallyLoaded
  | ChatScreenZoomThread
  | ChatScreenZoomUser
  | ChatScreenNavigateToChannel
  | ChatScreenChannelLoaded
  | ToggleLeftMenuExpansionEvent
  | ChatScreenRightPanelLoaded;

export interface IFetchChatStateForQueryRequest {
  zoomedChannel: string;
}

export interface IFetchChatStateForQueryResponse {
  mainContent: IMainContentProps;
  rightPanelProps: IRightPanelProps;
  leftBarProps: ILeftBarProps;
}
