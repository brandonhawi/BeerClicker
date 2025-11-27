"use client";

import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div className="block h-full w-full">
      {children}
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 6000,
        }}
      />
    </div>
  );
}
