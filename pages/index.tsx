import type { NextPage } from "next";
import LeftNavigation from "../components/left-navigation";
import MainContent from "../components/main-content";
import { faker } from "@faker-js/faker";

import RightPanel from "../components/right-panel";
import {
  ChatScreenEvent,
  IChatScreenState,
  ILeftMenuSectionProps,
  ILeftNavigationUserPanelProps,
  IMessageContentItemProps,
  IMessageSenderProps,
  IReplySummary,
  IRightPanelProps,
} from "../models/models";
import { useEffect, useReducer } from "react";

const Home: NextPage = () => {
  const initialState: IChatScreenState = {
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
  };

  const [state, dispatcher] = useReducer(processChatEvents, initialState);

  useEffect(() => {
    const mainContentProps = getMainContentProps();
    const leftProps = getLeftMenuProps();
    const rightPanelProps = getRightPanelProps();

    dispatcher({
      type: "InitiallyLoaded",

      mainContent: mainContentProps,
      leftBarProps: leftProps,
      rightPanelProps,
    });
  }, []);

  return (
    <div className="flex flex-row grow  min-h-screen">
      <LeftNavigation {...state.leftBarProps} />
      <MainContent {...state.mainContent} />
      <RightPanel {...state.rightPanelProps} />
    </div>
  );
};

function processChatEvents(state: IChatScreenState, action: ChatScreenEvent) {
  switch (action.type) {
    case "InitiallyLoaded":
      return {
        ...state,
        mainContent: action.mainContent,
        leftBarProps: action.leftBarProps,
        rightPanelProps: action.rightPanelProps,
      };
  }

  return state;
}

export default Home;

const getRightPanelProps: () => IRightPanelProps = () => {
  return { type: "NoZoomIn" };
};

const getLeftMenuProps = () => {
  const panels: ILeftMenuSectionProps[] = [
    {
      items: [
        { name: "Unread", active: false },
        { name: "Threads", active: true },
        { name: "Mentions", active: true, items: 10 },
        { name: "Drafts", active: false },
      ],
      name: "",
      expanded: true,
    },
    {
      items: [
        { name: "#random", active: false },
        { name: "#tailwinds", active: false },
        { name: "#testing", active: false },
      ],
      name: "Channels",
      expanded: true,
    },
    {
      items: [{ name: "#my-channel", active: false }],
      name: "Some Customer Folder",
      expanded: false,
    },
    {
      items: [
        { name: "James", active: false, icon: "GreenCircle" },
        { name: "Tailwinds", active: false, icon: "GrayCircle" },
        { name: "Testing", active: false, icon: "GrayCircle" },
      ],
      name: "Direct Messages",
      expanded: true,
    },
  ];

  const leftNavigationProps: ILeftNavigationUserPanelProps = {
    userName: "James",
    status: "Online",
  };

  return { leftNavigationProps, sections: panels };
};

const getMainContentProps = () => {
  const channelName: string = "random";
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

    messages.push({
      zoomToUser: () => {},
      zoomToThread: () => {},
      createDate: new Date(Date.now()),
      createUser: faker.internet.userName(),
      createUserStatus: "Online",
      createUserAvatar: faker.image.avatar(),
      messageContent: faker.lorem.paragraphs(),
      replies: replies,
      id: i.toString(),
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
