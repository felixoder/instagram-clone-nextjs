import Modal from "@/components/Modal";
import ModalPostContent from "@/components/ModalPostContent";
import Preloader from "@/components/Preloader";
import { Suspense } from "react";

// Adjust the type of `params` to match the expected Promise structure
export default async function PostInModal({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params; // Resolve the Promise
  const { id } = resolvedParams;

  return (
    <Modal>
      <Suspense fallback={<Preloader />}>
        <ModalPostContent postId={id} />
      </Suspense>
    </Modal>
  );
}

