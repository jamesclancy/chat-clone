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
