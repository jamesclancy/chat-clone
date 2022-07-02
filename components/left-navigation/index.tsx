import LeftMenuSection from "./left-menu-section";
import LeftNavigationUserPanel from "./left-navigation-user-panel";
import { ILeftMenuSectionProps } from "./models";

const LeftNavigation = () => {
  const panels: ILeftMenuSectionProps[] = [
    {
      items: [
        { name: "Unread", active: false },
        { name: "Threads", active: true },
        { name: "Mentions", active: true, items: 10 },
        { name: "Drafts", active: false },
      ],
      name: "",
      expanded: true,
    },
    {
      items: [
        { name: "#random", active: false },
        { name: "#tailwinds", active: false },
        { name: "#testing", active: false },
      ],
      name: "Channels",
      expanded: true,
    },
    {
      items: [{ name: "#my-channel", active: false }],
      name: "Some Customer Folder",
      expanded: false,
    },
    {
      items: [
        { name: "James", active: false, icon: "GreenCircle" },
        { name: "Tailwinds", active: false, icon: "GrayCircle" },
        { name: "Testing", active: false, icon: "GrayCircle" },
      ],
      name: "Direct Messages",
      expanded: true,
    },
  ];
  return (
    <div className="lg:w-48 flex">
      <div className="lg:text-xs px-3 flex-grow">
        <LeftNavigationUserPanel userName="James" status="Online" />
        {panels.map((panel) => (
          <LeftMenuSection {...panel} />
        ))}
      </div>
    </div>
  );
};

export default LeftNavigation;
