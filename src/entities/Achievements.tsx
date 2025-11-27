import Modal from "../components/Modal";
import Tooltip from "../components/Tooltip";
import { useState, type ReactNode } from "react";
import { useAchievements } from "../store/selectors";
import Image from "next/image";

export default function Achievements() {
  const [achievementsShown, setAchievementsShown] = useState(false);
  const achievements = useAchievements();

  const achievementsRender: ReactNode[] = [];
  Object.values(achievements).forEach(({ earned, name, description }) => {
    if (earned) {
      achievementsRender.push(
        <Tooltip key={name} title={`${name}: ${description}`}>
          <div className="inline-block">
            <Image
              src="/beerenomics.png"
              alt="beerenomics achievements"
              width={50}
              height={50}
            />
          </div>
        </Tooltip>
      );
    } else {
      achievementsRender.push(
        <div key={name} className="inline-block">
          <Image
            src="https://placehold.co/50"
            alt="placeholder"
            width={50}
            height={50}
          />
        </div>
      );
    }
  });

  return (
    <>
      <div className="fixed bottom-0 left-60 bg-primary text-white shadow-lg z-40">
        <div className="px-4 py-2">
          <button
            className="text-white hover:bg-primary-dark p-2 rounded transition-colors"
            aria-label="achievements"
            onClick={() => {
              setAchievementsShown(!achievementsShown);
            }}
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.016 7.5v7.5h-3v6l-9-9 2.016-2.016h3.984v-6zM5.016 18.984v-1.968h12.984v1.968h-12.984z" />
            </svg>
          </button>
        </div>
      </div>
      <Modal
        open={achievementsShown}
        onClose={() => setAchievementsShown(false)}
      >
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-4">Achievements</h2>
          <div className="grid grid-cols-8 gap-1 w-[400px] max-h-[450px] overflow-y-auto">
            {achievementsRender}
          </div>
        </div>
      </Modal>
    </>
  );
}
