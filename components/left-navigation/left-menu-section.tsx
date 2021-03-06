import {
  ChevronDownIcon,
  ChevronUpIcon,
  PlusCircleIcon,
} from "@heroicons/react/solid";
import { ILeftMenuSectionProps } from "../../models/models";
import LeftMenuItem from "./left-menu-item";

const LeftMenuSection = (props: ILeftMenuSectionProps) => {
  return (
    <div className="py-3">
      {props.name && (
        <div className="flex flex-row font-sm font-bold shadow-md py-2">
          <div className="w-5" onClick={props.toggleExpansion}>
            {props.expanded ? (
              <ChevronDownIcon className="h-4 w-4 text-slate-500" />
            ) : (
              <ChevronUpIcon className="h-4 w-4 text-slate-500" />
            )}
          </div>
          <div className="flex-grow">
            <h2>{props.name}</h2>
          </div>
          <div className="w-5" onClick={props.clickAdd}>
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

export default LeftMenuSection;
