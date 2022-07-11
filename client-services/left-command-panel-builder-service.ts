import {
  ILeftMenuSectionProps,
  ILeftNavigationUserPanelProps,
  IMainContentContext,
} from "../models/models";

const getLeftMenuProps = async (context: IMainContentContext) => {
  const buildNavigateSectionToggleAction = (sectionId: string) => () => {
    context.dispatch({ type: "ToggleLeftMenuExpansion", sectionId, context });
  };
  const buildNavigateChannelAction = (channelName: string) => () =>
    context.dispatch({ type: "NavigateToChannel", channelName, context });
  const buildNavigateToUserChannelAction = (channelName: string) => () =>
    context.dispatch({
      type: "NavigateToChannel",
      channelName: `${context.currentUser}_${channelName}`,
      context,
    });

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
      toggleExpansion: buildNavigateSectionToggleAction(
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

export default getLeftMenuProps;
