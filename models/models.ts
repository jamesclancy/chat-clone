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
  channelSlug: string;
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
  messageUser: () => void;
  closeRightMenu: () => void;
  timeZone: string;
  status: string;
  avatar: string;
  description: string;
  userName: string;
  type: "UserDetailZoomIn";
}

export interface IThreadDetailZoomIn {
  channelSlug: string;
  closeRightMenu: () => void;
  type: "ThreadDetailZoomIn";

  mainComment: IMessageContentItemProps;
  comments: IMessageContentItemProps[];
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
    channelSlug: "",
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
  context: IMainContentContext;
}

interface ChatScreenNavigateToChannel {
  channelName: string;
  type: "NavigateToChannel";
  context: IMainContentContext;
}
interface ChatScreenChannelLoaded {
  type: "ChannelLoaded";
  mainContent: IMainContentProps;
  context: IMainContentContext;
}

interface ChatScreenZoomUser {
  userName: string;
  type: "ZoomUser";
  context: IMainContentContext;
}

interface ChatScreenZoomThread {
  threadId: string;
  type: "ZoomThread";
  context: IMainContentContext;
}

interface ChatScreenSaveThreadMessageDraft {
  type: "SaveThreadMessageDraft";
  threadId: string;
  newContent: string;
  user: string;
}

interface ChatScreenSaveChannelMessageDraft {
  type: "SaveChannelMessageDraft";
  channelSlug: string;
  newContent: string;
  user: string;
}

interface ChatScreenSendThreadMessage {
  type: "SendThreadMessage";
  threadId: string;
  newContent: string;
  user: string;
}

interface ChatScreenSendChannelMessage {
  type: "SendChannelMessage";
  channelSlug: string;
  newContent: string;
  user: string;
}

interface ChatScreenRightPanelLoaded {
  type: "RightPanelLoaded";
  newRightPanel: IRightPanelProps;
  context: IMainContentContext;
}

interface ToggleLeftMenuExpansionEvent {
  type: "ToggleLeftMenuExpansion";
  sectionId: string;
  context: IMainContentContext;
}

export type ChatScreenEvent =
  | ChatScreenInitiallyLoaded
  | ChatScreenZoomThread
  | ChatScreenZoomUser
  | ChatScreenNavigateToChannel
  | ChatScreenChannelLoaded
  | ToggleLeftMenuExpansionEvent
  | ChatScreenRightPanelLoaded
  | ChatScreenSaveThreadMessageDraft
  | ChatScreenSaveChannelMessageDraft
  | ChatScreenSendThreadMessage
  | ChatScreenSendChannelMessage;

export interface IFetchChatStateForQueryRequest {
  zoomedChannel: string;
}

export interface IFetchChatStateForQueryResponse {
  mainContent: IMainContentProps;
  rightPanelProps: IRightPanelProps;
  leftBarProps: ILeftBarProps;
}
