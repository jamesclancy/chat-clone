import { faker } from "@faker-js/faker";

import MessageSender from "./message-sender";
import MessageContentItem from "./message-content-item";
import { IMainContentProps } from "../../models/models";

const MainContent = (props: IMainContentProps) => {
  const messages = props.messages;

  return (
    <div className="flex flex-grow">
      <div className="flex flex-col row h-screen">
        <div className="pt-4 border-b-slate-100 border-b-2 grow h-32 min-h-fit">
          <div className="grow flex flex-row min-h-fit">
            <div className="flex grow flex-col">
              <div>
                <h4>#{props.channelName}</h4>
              </div>
              <div className="text-xs text-gray-400">{props.channelStatus}</div>
            </div>
            <div className="w-16 m-4">
              <img
                src={props.channelAvatar}
                className="w-16 h-16 rounded shadow-md"
              />
            </div>
          </div>
        </div>
        <div className="grow flex flex-col overflow-auto mt-2 mr-4">
          {messages.map((message) => (
            <MessageContentItem {...message} />
          ))}
        </div>
        <MessageSender {...props.messageSenderProps} />
      </div>
    </div>
  );
};

export default MainContent;
