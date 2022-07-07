import type { NextPage } from "next";
import LeftNavigation from "../components/left-navigation";
import MainContent from "../components/main-content";

import RightPanel from "../components/right-panel";
import {
  ChatScreenEvent,
  EmptyChatScreenState,
  IChatScreenState,
  ILeftMenuSectionProps,
} from "../models/models";
import { useEffect, useReducer } from "react";
import chatService from "../client-services/chat-service";

const Home: NextPage = () => {
  const [state, dispatcher] = useReducer(
    processChatEvents,
    EmptyChatScreenState
  );

  const context = { dispatch: dispatcher, currentUser: "my-name" };

  useEffect(() => {
    chatService
      .loadChatView(
        context,
        { zoomedChannel: "random" }
      )
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
          chatService.loadChannelDetailsForMainContent(context, action.channelName);
        loadNewChannelPromise.then((res) => {
          dispatcher({ type: "ChannelLoaded", mainContent: res });
        });
        return { ...state, loading: true };
      case "ChannelLoaded":
        return { ...state, loading: false, mainContent: action.mainContent };
      case "ToggleLeftMenuExpansion":
        const newSections = applyChangeToSections(
          state.leftBarProps.sections,
          action.sectionId,
          (sec) => ({ ...sec, expanded: !sec.expanded })
        );
        return {
          ...state,
          leftBarProps: { ...state.leftBarProps, sections: newSections },
        };
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

function applyChangeToSections(
  sections: ILeftMenuSectionProps[],
  sectionKey: string,
  sectionModification: (
    previous: ILeftMenuSectionProps
  ) => ILeftMenuSectionProps
) {
  let result: ILeftMenuSectionProps[] = [];

  for (const section of sections) {
    result.push(
      section.id === sectionKey ? sectionModification(section) : section
    );
  }

  return result;
}

export default Home;
