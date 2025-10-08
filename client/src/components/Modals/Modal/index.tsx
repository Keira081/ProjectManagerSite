import ReactDOM from "react-dom";
import { X } from "lucide-react";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  name?: string;
  transparentBg?: boolean;
};

const Modal = ({
  children,
  isOpen,
  onClose,
  name,
  transparentBg = false,
}: Props) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-60 flex h-full w-full items-center justify-center overflow-y-auto p-4 text-purple-700 dark:text-white">
      <div className="absolute inset-0 bg-purple-800/40 backdrop-blur-sm"></div>

      <div
        className={`relative overflow-y-auto max-h-[500px] w-full max-w-2xl rounded-lg ${transparentBg ? "" : "bg-white dark:bg-purple-500"} p-4`}
      >
        {/* Header */}
        <div
          className={`flex w-full items-center ${name ? "mb-5 justify-between" : "justify-end"}`}
        >
          {name && <h1 className="text-2xl font-semibold">{name}</h1>}
          <button
            className="cursor-pointer flex h-7 w-7 items-center justify-center rounded-full dark:text-white hover:bg-purple-100 dark:hover:bg-purple-400"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
