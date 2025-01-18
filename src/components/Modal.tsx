'use client';

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function Modal({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.back()}
      className="bg-black/80 dark:bg-gray-700/80 fixed inset-0 z-20 flex justify-center items-center">
      <div
        style={{ maxHeight: 'calc(100vh - 4.5rem)' }}
        className="bg-white dark:bg-gray-950 py-4 rounded-lg overflow-y-auto">
        <div
          className="z-30 rounded-lg">
          <div
            onClick={ev => ev.stopPropagation()}
            className="px-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

