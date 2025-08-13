import ReactDOM from "react-dom";
import Header from "../Header";
import { X } from "lucide-react";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  name: string;
};

const Modal = ({ children, isOpen, onClose, name }: Props) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto p-4 text-purple-700 dark:text-white">
      <div className="absolute inset-0 bg-purple-800 opacity-75"></div>

      <div className="relative overflow-y-auto max-h-[500px] w-full max-w-2xl rounded-lg bg-white dark:bg-purple-500 p-4 shadow-lg opacity-100">
        {/* Header */}
        <div className="mb-5 flex w-full items-center justify-between">
          <h1 className="text-2xl font-semibold">{name}</h1>
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
