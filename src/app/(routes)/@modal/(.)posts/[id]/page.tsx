import Modal from "@/components/Modal";
import ModalPostContent from "@/components/ModalPostContent";
import Preloader from "@/components/Preloader";
import { Suspense } from "react";

interface PostInModalProps {
  params: {
    id: string;
  };
}

export default async function PostInModal({ params }: PostInModalProps) {
  return (
    <Modal>
      <Suspense fallback={<Preloader />}>
        <ModalPostContent postId={params.id} />
      </Suspense>
    </Modal>
  );
}

