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
import { Dispatch, useEffect, useReducer } from "react";
import chatService from "../client-services/chat-service";

const Home: NextPage = () => {
  const [state, dispatcher] = useReducer(
    processChatEvents,
    EmptyChatScreenState
  );

  const context = { dispatch: dispatcher, currentUser: "my-name" };

  useEffect(() => {
    chatService.loadChatView(context, { zoomedChannel: "random" }).then((x) => {
      const mainContentProps = x.mainContent;
      const leftProps = x.leftBarProps;
      const rightPanelProps = x.rightPanelProps;

      dispatcher({
        type: "InitiallyLoaded",

        mainContent: mainContentProps,
        leftBarProps: leftProps,
        rightPanelProps,
        context,
      });
    });
  }, []);

  return (
    <div className="flex flex-row grow min-h-screen ">
      <LeftNavigation {...state.leftBarProps} />
      <div className=" max-h-screen flex flex-col lg:flex-row-reverse grow overflow-y-hidden">
        <RightPanel {...state.rightPanelProps} />{" "}
        <MainContent {...state.mainContent} />
      </div>
    </div>
  );
};

export default Home;

function performAsyncAndDispatchAfter<J>(
  state: IChatScreenState,
  dispatch: Dispatch<ChatScreenEvent>,
  promiseToExecute: () => Promise<J>,
  dispatchMessageBuilder: (arg0: J) => ChatScreenEvent
) {
  const promise = promiseToExecute();
  promise.then((res) => dispatch(dispatchMessageBuilder(res)));
  return {
    ...state,
    loading: true,
  };
}

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
      return performAsyncAndDispatchAfter(
        state,
        action.context.dispatch,
        () =>
          chatService.loadChannelDetailsForMainContent(
            action.context,
            action.channelName
          ),
        (res) => ({
          type: "ChannelLoaded",
          mainContent: res,
          context: action.context,
        })
      );
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
    case "ZoomThread":
      return performAsyncAndDispatchAfter(
        state,
        action.context.dispatch,
        () =>
          chatService.loadRightPanelDetailsForRightContent(action.context, {
            threadId: action.threadId,
          }),
        (res) => ({
          type: "RightPanelLoaded",
          newRightPanel: res,
          context: action.context,
        })
      );
    case "ZoomUser":
      return performAsyncAndDispatchAfter(
        state,
        action.context.dispatch,
        () =>
          chatService.loadRightPanelDetailsForRightContent(action.context, {
            userName: action.userName,
          }),
        (res) => ({
          type: "RightPanelLoaded",
          newRightPanel: res,
          context: action.context,
        })
      );
    case "RightPanelLoaded":
      return {
        ...state,
        rightPanelProps: action.newRightPanel,
        loading: false,
      };
  }

  return state;
}
