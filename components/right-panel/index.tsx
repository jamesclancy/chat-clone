import { IRightPanelProps } from "../../models/models";

const RightPanel = (props: IRightPanelProps) => {
  if (props.type === "NoZoomIn") return <></>;

  return <div className="lg:w-48 ">Right Bar</div>;
};

export default RightPanel;
