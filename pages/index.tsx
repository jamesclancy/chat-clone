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
}

interface ILeftMenuSection {
  items: ILeftMenuLinkItemProps[];
  name: string;
  expanded: boolean;
}

const LeftMenuItem = (props: ILeftMenuLinkItemProps) => {
  return <li>{props.name}</li>;
};

const LeftMenuSection = () => {
  return (
    <div className="py-3">
      <div className="flex flex-row">
        <div className="w-5">
          <ChevronDownIcon className="h-4 w-4 text-slate-500" />
        </div>
        <div className="flex-grow">
          <h2>Direct Messages</h2>
        </div>
        <div className="w-5">
          <PlusCircleIcon className="h-4 w-4 text-slate-500" />
        </div>
      </div>
      <ul>
        <li>
          <span className="inline-block w-2 h-2 mr-2 bg-green-600 rounded-full"></span>
          random
        </li>
        <li>
          <span className="inline-block w-2 h-2 mr-2 bg-slate-600 rounded-full"></span>
          tailwinds
        </li>
        <li>
          <span className="inline-block w-2 h-2 mr-2 bg-slate-600 rounded-full"></span>
          testing
        </li>
      </ul>
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <>
      <div className="lg:flex xl:flex-row">
        <div className="lg:w-48 flex">
          <div className="lg:text-xs px-3 flex-grow">
            <div className="py-3">
              <span className="inline-block w-2 h-2 mr-2 bg-green-600 rounded-full"></span>
              Your Name
            </div>
            <div className="py-3">
              <ul>
                <li>Unread</li>
                <li>Threads</li>
                <li>Mentions</li>
                <li>Drafts</li>
              </ul>
            </div>
            <div className="py-3">
              <div className="flex flex-row">
                <div className="w-5">
                  <ChevronDownIcon className="h-4 w-4 text-slate-500" />
                </div>
                <div className="flex-grow">
                  <h2>Channels</h2>
                </div>
                <div className="w-5">
                  <PlusCircleIcon className="h-4 w-4 text-slate-500" />
                </div>
              </div>
              <ul>
                <li>#random</li>
                <li>#tailwinds</li>
                <li>#testing</li>
              </ul>
            </div>
            <div className="py-3">
              <div className="flex flex-row">
                <div className="w-5">
                  <ChevronUpIcon className="h-4 w-4 text-slate-500" />
                </div>
                <div className="flex-grow">
                  <h2>Some Custom Folder</h2>
                </div>
              </div>
            </div>
            <div className="py-3">
              <div className="flex flex-row">
                <div className="w-5">
                  <ChevronDownIcon className="h-4 w-4 text-slate-500" />
                </div>
                <div className="flex-grow">
                  <h2>Direct Messages</h2>
                </div>
                <div className="w-5">
                  <PlusCircleIcon className="h-4 w-4 text-slate-500" />
                </div>
              </div>
              <ul>
                <li>
                  <span className="inline-block w-2 h-2 mr-2 bg-green-600 rounded-full"></span>
                  random
                </li>
                <li>
                  <span className="inline-block w-2 h-2 mr-2 bg-slate-600 rounded-full"></span>
                  tailwinds
                </li>
                <li>
                  <span className="inline-block w-2 h-2 mr-2 bg-slate-600 rounded-full"></span>
                  testing
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-grow">Main Content</div>
        <div className="lg:w-48 ">Right Bar</div>
      </div>
    </>
  );
};

export default Home;
