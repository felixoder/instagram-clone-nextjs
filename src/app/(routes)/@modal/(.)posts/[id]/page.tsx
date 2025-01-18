import Modal from "@/components/Modal";
import ModalPostContent from "@/components/ModalPostContent";
import Preloader from "@/components/Preloader";
import { Suspense } from "react";

interface Params {
  params: {
    id: string;
  };
}

export default async function PostInModal({ params: { id } }: Params) {
  return (
    <Modal>
      <Suspense fallback={<Preloader />}>
        <ModalPostContent postId={id} />
      </Suspense>
    </Modal>
  );
}

