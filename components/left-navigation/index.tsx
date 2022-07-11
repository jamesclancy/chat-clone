import {
  IconArrowRightBar,
  IconChevronRight,
  IconMenu,
  IconMenu2,
} from "@tabler/icons";
import { useState } from "react";
import { ILeftBarProps } from "../../models/models";
import LeftMenuSection from "./left-menu-section";
import LeftNavigationUserPanel from "./left-navigation-user-panel";

const LeftNavigation = (props: ILeftBarProps) => {
  const [expandDrawer, setExpandDrawer] = useState(true);

  const classesForDrawer = `${
    expandDrawer ? "" : "hidden"
  }  w-screen md:flex md:text-xs px-3 md:w-48 md:min-w-max flex-col`;

  return (
    <div>
      <div className="p-4 m-4 bg-blue-600 md:hidden">
        <IconMenu2 onClick={() => setExpandDrawer(!expandDrawer)} />
      </div>
      <div className={classesForDrawer}>
        <LeftNavigationUserPanel {...props.leftNavigationProps} />
        {props.sections.map((panel) => (
          <LeftMenuSection {...panel} />
        ))}
      </div>
    </div>
  );
};

export default LeftNavigation;
