import type { NextPage } from "next";
import LeftNavigation from "../components/left-navigation";
import MainContent from "../components/main-content";

import RightPanel from "../components/right-panel";
import {
  ChatScreenEvent,
  EmptyChatScreenState,
  IChatScreenState,
} from "../models/models";
import { useEffect, useReducer } from "react";
import chatService from "../client-services/chat-service";

const Home: NextPage = () => {
  const [state, dispatcher] = useReducer(
    processChatEvents,
    EmptyChatScreenState
  );

  useEffect(() => {
    chatService
      .loadChatView({ userId: "my-name", zoomedChannel: "random" })
      .then((x) => {
        const mainContentProps = x.mainContent;
        const leftProps = x.leftBarProps;
        const rightPanelProps = x.rightPanelProps;

        dispatcher({
          type: "InitiallyLoaded",

          mainContent: mainContentProps,
          leftBarProps: leftProps,
          rightPanelProps,
        });
      });
  }, []);

  function processChatEvents(
    state: IChatScreenState,
    action: ChatScreenEvent
  ): IChatScreenState {
    switch (action.type) {
      case "InitiallyLoaded":
        return {
          ...state,
          loading: false,
          mainContent: action.mainContent,
          leftBarProps: action.leftBarProps,
          rightPanelProps: action.rightPanelProps,
        };
      case "NavigateToChannel":
        const loadNewChannelPromise =
          chatService.loadChannelDetailsForMainContent(action.channelName);
        loadNewChannelPromise.then((res) => {
          dispatcher({ type: "ChannelLoaded", mainContent: res });
        });
        return { ...state, loading: true };
      case "ChannelLoaded":
        return { ...state, loading: false, mainContent: action.mainContent };
    }

    return state;
  }

  return (
    <div className="flex flex-row grow  min-h-screen">
      <LeftNavigation {...state.leftBarProps} />
      <MainContent {...state.mainContent} />
      <RightPanel {...state.rightPanelProps} />
    </div>
  );
};

export default Home;
