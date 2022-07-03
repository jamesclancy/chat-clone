import {
  CodeIcon,
  LightningBoltIcon,
  CloudUploadIcon,
  PhotographIcon,
} from "@heroicons/react/outline";
import {
  IconAt,
  IconBlockquote,
  IconBold,
  IconCode,
  IconFileCode,
  IconItalic,
  IconLego,
  IconLink,
  IconList,
  IconListNumbers,
  IconMicrophone,
  IconPlus,
  IconSend,
  IconSettings,
  IconStrikethrough,
  IconVideo,
} from "@tabler/icons";

const Divider = () => {
  return <div className="mx-2 border-r-2 border-slate-300" />;
};

const MessageSenderIconContainer = (props: { name: string }) => {};

const MessageSender = () => {
  return (
    <div className="lg:h-56 flex py-2">
      <div className="flex flex-col border-2 border-slate-300 rounded-xl flex-grow p-4">
        <div className="flex flex-row  align-middle text-sm h-6">
          <div className="w-4 h-4 align-middle text-center" aria-label="Bold">
            <IconBold size={16} stroke={2} />
          </div>
          <div className="w-4 h-4 align-middle text-center" aria-label="Bold">
            <IconItalic size={16} stroke={2} />
          </div>
          <div className="w-4 h-4 align-middle text-center" aria-label="Bold">
            <IconStrikethrough size={16} stroke={2} />
          </div>
          <Divider />
          <div className="w-4 h-4 align-middle text-center" aria-label="Bold">
            <IconLink size={16} stroke={2} />
          </div>
          <Divider />
          <div className="w-4 h-4 align-middle text-center" aria-label="Bold">
            <IconListNumbers size={16} stroke={2} />
          </div>
          <div className="w-4 h-4 align-middle text-center" aria-label="Bold">
            <IconList size={16} stroke={2} />
          </div>

          <Divider />
          <div className="w-4 h-4 align-middle text-center" aria-label="Bold">
            <IconCode size={16} stroke={2} />
          </div>
          <div className="w-4 h-4 align-middle text-center" aria-label="Bold">
            <IconBlockquote size={16} stroke={2} />
          </div>
        </div>
        <div className="flex flex-grow">
          <textarea
            className="flex-grow text-xs py-4 resize-none"
            placeholder="Message #random"
          ></textarea>
        </div>
        <div className="flex flex-row  align-middle text-sm h-6">
          <div className="flex-grow flex flex-row">
            <div className="w-4 h-4 align-middle text-center" aria-label="Bold">
              <IconPlus size={16} stroke={2} />
            </div>
            <Divider />
            <div className="w-4 h-4 align-middle text-center" aria-label="Bold">
              <IconVideo size={16} stroke={2} />
            </div>
            <div className="w-4 h-4 align-middle text-center" aria-label="Bold">
              <IconMicrophone size={16} stroke={2} />
            </div>
            <Divider />
            <div className="w-4 h-4 align-middle text-center" aria-label="Bold">
              <IconLego size={16} stroke={2} />
            </div>
            <div className="w-4 h-4 align-middle text-center" aria-label="Bold">
              <IconAt size={16} stroke={2} />
            </div>
            <div className="w-4 h-4 align-middle text-center" aria-label="Bold">
              <IconSettings size={16} stroke={2} />
            </div>
          </div>
          <div className="flex w-8">
            <IconSend size={16} stroke={2} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageSender;
