import Modal from "@/components/Modal";
import ModalPostContent from "@/components/ModalPostContent";
import Preloader from "@/components/Preloader";
import { Suspense } from "react";

// @ts-ignore: Disabling type checking for params
export default async function PostInModal({ params }: any) {
  return (
    <Modal>
      <Suspense fallback={<Preloader />}>
        <ModalPostContent postId={params.id} />
      </Suspense>
    </Modal>
  );
}

