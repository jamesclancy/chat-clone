import { ILeftMenuLinkItemProps } from "./models";

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

export default LeftMenuItem;
