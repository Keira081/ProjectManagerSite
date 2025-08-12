import { useEffect, useState } from "react";
import { SendHorizontal } from "lucide-react";
import { motion, useAnimation } from "framer-motion";

interface LoadingPageProps {
  dataModel: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function LoadingPage({
  dataModel,
  isOpen,
  onClose,
}: LoadingPageProps) {
  const [progress, setProgress] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    if (!isOpen) return; // prevent running when closed

    let start: number | null = null;
    const duration = 1500;
    let rafId: number;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const percentage = Math.min((elapsed / duration) * 100, 100);
      setProgress(percentage);

      if (elapsed < duration) {
        rafId = requestAnimationFrame(step);
      } else {
        // Animation finished — close after a small delay if needed
        setTimeout(() => {
          onClose();
          console.log("no more??");
          setProgress(0); // reset for next time
        }, 200);
      }
    };

    rafId = requestAnimationFrame(step);

    // Start icon animation loop
    controls.start({
      y: [0, -2, 0, 2, 0],
      transition: {
        repeat: Infinity,
        duration: 0.4,
        ease: "easeInOut",
      },
    });

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId);
      controls.stop();
      setProgress(0); // ensures clean reset if unmounted mid-animation
    };
  }, [controls, isOpen, onClose]);

  if (!isOpen) {
    console.log("no more");
    return null;
  }
  console.log("ok");
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-purple-800 opacity-85 z-50">
      <div className="w-2/3 max-w-lg">
        {/* Progress bar background */}
        <div className="overflow-visible relative h-4 bg-gray-100 rounded-full">
          {/* Filled progress bar */}
          <div
            className="absolute top-0 left-0 h-full rounded-full"
            style={{
              width: `${progress}%`,
              backgroundColor: "#beb6c0",
            }}
          />
          {/* Icon racing across */}
          <motion.div
            animate={controls}
            className="absolute -top-2"
            style={{
              left: `calc(${progress}% - 15px)`,
            }}
          >
            <SendHorizontal
              className="text-purple-500 fill-white"
              strokeWidth={1.5}
              size={32}
            />
          </motion.div>
        </div>
        {/* Text label */}
        <p className="text-center text-white mt-4 text-lg tracking-wider font-semibold">
          CREATING YOUR {dataModel.toUpperCase()}
        </p>
      </div>
    </div>
  );
}
