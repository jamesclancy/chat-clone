import MessageSender from "./message-sender";

interface IMessageContentItemProps {
  id: string;
  createDate: Date;
  createUser: string;
  createUserStatus: "Online" | "Away";
  createUserAvatar: string;
  messageContent: string;
  replies: IReplySummary[];
  navigateToThread: () => void;
  zoomToThread: () => void;
}

interface IReplySummary {
  userName: string;
  userAvatar: string;
}

const selectReplySummariesForDisplay = (x: IReplySummary[], y: IReplySummary) =>
  x.findIndex((p) => p.userName === y.userName) > -1 ? [...x, y] : x;

const MessageContentItem = (props: IMessageContentItemProps) => {
  return (
    <div
      className="flex flex-row text-sm mt-4"
      key={`message_main_window_${props.id}`}
    >
      <div className="w-12">
        <img
          src={props.createUserAvatar}
          className="fill-current rounded-full"
        />
      </div>
      <div className="flex-grow ml-4">
        <div className="flex flex-row flex-grow">
          <div className="font-bold">{props.createUser}</div>
          <div>
            <span className="inline-block w-2 h-2 mx-2 bg-green-600 rounded-full"></span>
          </div>
          <div>{props.createDate.toDateString()}</div>
        </div>
        <div>{props.messageContent}</div>
        {props.replies.length > 0 && (
          <div>
            {props.replies
              .reduce(selectReplySummariesForDisplay, [])
              .map((x) => (
                <>{x.userName}</>
              ))}
            {props.replies.length} Replies
          </div>
        )}
        {!props.replies?.length && <div>Add Reply</div>}
      </div>
    </div>
  );
};

const MainContent = () => {
  const messages: IMessageContentItemProps[] = [];

  for (let i = 0; i < 100; i++) {
    messages.push({
      navigateToThread: () => {},
      zoomToThread: () => {},
      createDate: new Date(Date.now()),
      createUser: `James-${i}`,
      createUserStatus: "Online",
      createUserAvatar: `https://i.pravatar.cc/300?random=${i}`,
      messageContent: "My Awesome Message",
      replies: [],
      id: i.toString(),
    });
  }

  return (
    <div className="flex flex-grow">
      <div className="flex flex-col flex-grow h-screen">
        <div className="h-32 pt-4 flex flex-row border-b-slate-100 border-b-2 flex-grow">
          <div className="flex flex-grow">
            <h4>#random</h4>
          </div>
          <div className="w-16">
            <span className="bg-lime-600 rounded align-middle content-center flex-grow p-2">
              #R
            </span>
          </div>
        </div>
        <div className="flex-grow flex flex-col overflow-auto">
          {messages.map((message) => (
            <MessageContentItem {...message} />
          ))}
        </div>
        <MessageSender />
      </div>
    </div>
  );
};

export default MainContent;
