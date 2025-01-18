import Modal from "@/components/Modal";
import ModalPostContent from "@/components/ModalPostContent";
import Preloader from "@/components/Preloader";
import { Suspense } from "react";

interface PageProps {
  params: { id: string };
}

// Async function to await params
export default async function PostInModal({ params }: PageProps) {
  const { id } = params; // Access the awaited params directly
    console.log({id})

  return (
    <Modal>
      <Suspense fallback={<Preloader />}>
        <ModalPostContent postId={id} />
      </Suspense>
    </Modal>
  );
}

