import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  PlusCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/solid";

interface ILeftMenuLinkItemProps {
  clickAction?: () => void;
  name: string;
  active: boolean;
  keyPrefix?: string;
  items?: number;
  icon?: "GreenCircle" | "GrayCircle";
}

interface ILeftMenuSectionProps {
  items: ILeftMenuLinkItemProps[];
  name: string;
  expanded: boolean;
}

const LeftMenuItem = (props: ILeftMenuLinkItemProps) => {
  const MenuItemIcon = () => {
    switch (props.icon) {
      case "GreenCircle":
        return (
          <span className="inline-block w-2 h-2 mr-2 bg-green-600 rounded-full"></span>
        );
      case "GrayCircle":
        return (
          <span className="inline-block w-2 h-2 mr-2 bg-slate-600 rounded-full"></span>
        );
    }
    return <></>;
  };

  const classes = props.active
    ? "flex flex-row transform transition duration-400 hover:bg-emerald-200 py-1 font-bold"
    : "flex flex-row transform transition duration-400 hover:bg-emerald-200 py-1";

  return (
    <li>
      <div className={classes}>
        <div className="w-5">
          <MenuItemIcon />
        </div>
        <div className="flex-grow">
          {props.name} &nbsp;
          {props.items && <span className="">({props.items})</span>}
        </div>
      </div>
    </li>
  );
};

const LeftMenuSection = (props: ILeftMenuSectionProps) => {
  return (
    <div className="py-3">
      {props.name && (
        <div className="flex flex-row font-sm font-bold shadow-md py-2">
          <div className="w-5">
            {props.expanded ? (
              <ChevronDownIcon className="h-4 w-4 text-slate-500" />
            ) : (
              <ChevronUpIcon className="h-4 w-4 text-slate-500" />
            )}
          </div>
          <div className="flex-grow">
            <h2>{props.name}</h2>
          </div>
          <div className="w-5">
            <PlusCircleIcon className="h-4 w-4 text-slate-500" />
          </div>
        </div>
      )}
      <ul>
        {props.expanded &&
          props.items.map((item) => (
            <div>
              <LeftMenuItem {...item} />
            </div>
          ))}
      </ul>
    </div>
  );
};

const Home: NextPage = () => {
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

  interface ILeftNavigationUserPanelProps {
    userName: string;
    status: "Away" | "Online";
  }

  const LeftNavigationUserPanel = (props: ILeftNavigationUserPanelProps) => {
    return (
      <div className="py-3">
        <span className="inline-block w-2 h-2 mr-2 bg-green-600 rounded-full"></span>
        Your Name
      </div>
    );
  };

  return (
    <>
      <div className="lg:flex xl:flex-row">
        <div className="lg:w-48 flex">
          <div className="lg:text-xs px-3 flex-grow">
            <LeftNavigationUserPanel userName="James" status="Online" />
            {panels.map((panel) => (
              <LeftMenuSection {...panel} />
            ))}
          </div>
        </div>
        <div className="flex flex-grow">Main Content</div>
        <div className="lg:w-48 ">Right Bar</div>
      </div>
    </>
  );
};

export default Home;
