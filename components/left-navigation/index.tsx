import { ILeftBarProps } from "../../models/models";
import LeftMenuSection from "./left-menu-section";
import LeftNavigationUserPanel from "./left-navigation-user-panel";

const LeftNavigation = (props: ILeftBarProps) => {
  return (
    <div className="lg:text-xs px-3 md:w-48 min-w-max flex flex-col">
      <LeftNavigationUserPanel {...props.leftNavigationProps} />
      {props.sections.map((panel) => (
        <LeftMenuSection {...panel} />
      ))}
    </div>
  );
};

export default LeftNavigation;
