"use client";

import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Modal from "../Modal";

interface RedirectModalProps {
  id: number;
  isOpen: boolean;
  onClose: () => void;
  url: string;
  item: string;
}

const RedirectModal = ({
  id,
  isOpen,
  onClose,
  url,
  item,
}: RedirectModalProps) => {
  const [timeLeft, setTimeLeft] = useState(3);
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) return; // only run countdown if open
    if (timeLeft <= 0) {
      onClose(); // close modal
      router.push(url);
      return;
    }

    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, id, router, isOpen, onClose]);

  useEffect(() => {
    if (isOpen) setTimeLeft(4);
  }, [isOpen]);

  const handleRedirect = () => {
    onClose();
    router.push(url);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} transparentBg={true}>
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <Loader2 className="animate-spin text-purple-600 dark:text-white w-12 h-12 mb-2" />
        <p className="text-lg font-semibold text-purple-800 dark:text-white">
          Redirecting to your new {item} in {timeLeft}...
        </p>
        <p className="text-sm text-gray-800 dark:text-gray-300">
          Click the X to cancel redirect or
        </p>
        <button
          onClick={handleRedirect}
          className="mt-2 rounded bg-purple-500 text-white px-4 py-2 hover:bg-purple-700 dark:hover:bg-purple-500 cursor-pointer"
        >
          Go Now
        </button>
      </div>
    </Modal>
  );
};

export default RedirectModal;
