import Modal from "@/components/Modal";
import ModalPostContent from "@/components/ModalPostContent";
import Preloader from "@/components/Preloader";
import { Suspense } from "react";

// Async function to await params
export default async function PostInModal({ params }: { params: { id: string } }) {
  const { id } = params; // Await params to get dynamic route parameters

  return (
    <Modal>
      <Suspense fallback={<Preloader />}>
        <ModalPostContent postId={id} />
      </Suspense>
    </Modal>
  );
}

