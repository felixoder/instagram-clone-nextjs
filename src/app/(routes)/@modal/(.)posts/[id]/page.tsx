import Modal from "@/components/Modal";
import ModalPostContent from "@/components/ModalPostContent";
import Preloader from "@/components/Preloader";
import { Suspense } from "react";

export default async function PostInModal({
  params: paramsPromise,
}: { params: Promise<{ id: string }> }) {
  const { id } = await paramsPromise; // Await the promise to get the resolved value

  return (
    <Modal>
      <Suspense fallback={<Preloader />}>
        <ModalPostContent postId={id} />
      </Suspense>
    </Modal>
  );
}

