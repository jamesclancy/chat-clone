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
  items: ILeftMenuLinkItemProps[];
  name: string;
  expanded: boolean;
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
}

interface ChatScreenInitiallyLoaded {
  type: "InitiallyLoaded";
  mainContent: IMainContentProps;
  rightPanelProps: IRightPanelProps;
  leftBarProps: ILeftBarProps;
}

interface ChatScreenNavigateToChannel {
  type: "NavigateToChannel";
}

interface ChatScreenZoomUser {
  type: "ZoomUser";
}

interface ChatScreenZoomThread {
  type: "ZoomThread";
}

export type ChatScreenEvent =
  | ChatScreenInitiallyLoaded
  | ChatScreenZoomThread
  | ChatScreenZoomUser
  | ChatScreenNavigateToChannel;
