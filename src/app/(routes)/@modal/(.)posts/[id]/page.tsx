import Modal from "@/components/Modal";
import ModalPostContent from "@/components/ModalPostContent";
import Preloader from "@/components/Preloader";
import { Suspense } from "react";

// Ensure that `params` is typed correctly as an object with `id`
export default async function PostInModal({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return (
    <Modal>
      <Suspense fallback={<Preloader />}>
        <ModalPostContent postId={id} />
      </Suspense>
    </Modal>
  );
}

