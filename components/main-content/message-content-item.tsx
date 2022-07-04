import { IMessageContentItemProps, IReplySummary } from "./models";

const selectReplySummariesForDisplay = (x: IReplySummary[], y: IReplySummary) =>
  x.findIndex((p) => p.userName === y.userName) > -1 ? x : [...x, y];

const MessageContentItem = (props: IMessageContentItemProps) => {
  return (
    <div
      className="flex flex-row text-sm mt-4"
      key={`message_main_window_${props.id}`}
    >
      <div className="w-12 min-w-fit">
        <img
          src={props.createUserAvatar}
          className="fill-current rounded-full w-12 h-12"
        />
      </div>
      <div className="flex-grow ml-4">
        <div className="flex flex-row grow">
          <div className="font-bold">{props.createUser}</div>
          <div>
            <span className="inline-block w-2 h-2 mx-2 bg-green-600 rounded-full"></span>
          </div>
          <div>{props.createDate.toDateString()}</div>
        </div>
        <div>{props.messageContent}</div>
        {props.replies.length > 0 && (
          <div className="flex flex-row">
            {props.replies
              .reduce(selectReplySummariesForDisplay, [])
              .map((x) => (
                <div className="w-4 mr-2">
                  <img src={x.userAvatar} className="fill-current rounded" />
                </div>
              ))}
            <a onClick={props.navigateToThread}>
              {props.replies.length} Replies
            </a>
          </div>
        )}
        {!props.replies?.length && (
          <div onClick={props.navigateToThread}>Add Reply</div>
        )}
      </div>
    </div>
  );
};

export default MessageContentItem;
