import { IconX } from "@tabler/icons";
import {
  IMainContentContext,
  IRightPanelProps,
  IThreadDetailZoomIn,
  IUserDetailZoomIn,
} from "../../models/models";

const RightPanel = (props: IRightPanelProps) => {
  switch (props.type) {
    case "UserDetailZoomIn":
      return <UserDetails {...props} />;
    case "ThreadDetailZoomIn":
      return <ThreadDetails {...props} />;
  }

  return <></>;
};

const Header = (props: {
  banner: string;
  subBanner?: string;
  closeRightMenu: () => void;
}) => {
  return (
    <div className="flex flex-row shadow-md px-4 pb-1">
      <div className="flex-grow">
        <h1>{props.banner}</h1>
      </div>
      {props.subBanner && (
        <div className="flex-grow">
          <h2>{props.subBanner}</h2>
        </div>
      )}
      <div className="">
        <IconX stroke={1} onClick={props.closeRightMenu} />
      </div>
    </div>
  );
};

const UserDetails = (props: IUserDetailZoomIn) => {
  return (
    <div className="min-w-max min-h-screen  lg:w-48 p-4 flex-grow flex flex-col">
      <Header banner="Profile" closeRightMenu={props.closeRightMenu} />
      <img src={props.avatar} className="w-32 h-32 mt-2 shadow-md" />
      <h2 className="text-xl mt-4">{props.userName}</h2>
      <p>{props.description}</p>
      <p className="text-sm">{props.status}</p>
      <p className="text-sm">{props.timeZone}</p>
      <button
        className="bg-blue-500 p-2 mt-8 rounded text-white text-sm"
        onClick={props.messageUser}
      >
        Send Message
      </button>
      <div className="flex-grow"></div>
    </div>
  );
};

const ThreadDetails = (props: IThreadDetailZoomIn) => {
  const mainMessage = props.mainComment;

  return (
    <div className="w-full lg:w-48 p-4 lg:min-w-max flex flex-col h-screen">
      <Header
        banner="Thread"
        subBanner={`#${props.channelSlug}`}
        closeRightMenu={props.closeRightMenu}
      />
      <div className=" overflow-auto scrollbar">
        <div
          className="flex flex-row text-sm my-4 pb-4 border-b-2 border-gray-200 border-solid"
          key={`message_main_window_${mainMessage.id}`}
        >
          <div className="w-12 min-w-fit" onClick={mainMessage.zoomToUser}>
            <img
              src={mainMessage.createUserAvatar}
              className="fill-current rounded-full w-12 h-12"
            />
          </div>
          <div className="flex-grow ml-4 flex flex-col max-w-2xl">
            <div className="flex flex-row grow">
              <div className="font-bold" onClick={mainMessage.zoomToUser}>
                {mainMessage.createUser}
              </div>
              <div>
                <span className="inline-block w-2 h-2 mx-2 bg-green-600 rounded-full"></span>
              </div>
              <div>{mainMessage.createDate.toDateString()}</div>
            </div>
            <div className="">{mainMessage.messageContent}</div>
          </div>
        </div>
        {props.comments &&
          props.comments.map((comment) => {
            return (
              <div
                className="flex flex-row text-sm my-4 pb-4"
                key={`message_main_window_${comment.id}`}
              >
                <div className="w-12 min-w-fit" onClick={comment.zoomToUser}>
                  <img
                    src={comment.createUserAvatar}
                    className="fill-current rounded-full w-12 h-12"
                  />
                </div>
                <div className="flex-grow ml-4 flex flex-col max-w-2xl">
                  <div className="flex flex-row grow">
                    <div className="font-bold" onClick={comment.zoomToUser}>
                      {comment.createUser}
                    </div>
                    <div>
                      <span className="inline-block w-2 h-2 mx-2 bg-green-600 rounded-full"></span>
                    </div>
                    <div>{comment.createDate.toDateString()}</div>
                  </div>
                  <div className="">{comment.messageContent}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RightPanel;
