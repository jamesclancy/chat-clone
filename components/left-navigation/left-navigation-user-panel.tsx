import { ILeftNavigationUserPanelProps } from "../../models/models";

const LeftNavigationUserPanel = (props: ILeftNavigationUserPanelProps) => {
  switch (props.status) {
    case "Away":
      return (
        <div className="py-3 border-solid rounded border-slate-600 border-2 px-4 mt-4">
          <span className="inline-block w-2 h-2 mr-2 bg-slate-600 rounded-full"></span>
          {props.userName}
        </div>
      );
    case "Online":
      return (
        <div className="py-3 border-solid rounded border-green-600 border-2 px-4 mt-4">
          <span className="inline-block w-2 h-2 mr-2 bg-green-600 rounded-full"></span>
          {props.userName}
        </div>
      );
  }
};

export default LeftNavigationUserPanel;
