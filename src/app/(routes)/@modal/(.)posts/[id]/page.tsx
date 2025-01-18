import Modal from "@/components/Modal";
import ModalPostContent from "@/components/ModalPostContent";
import Preloader from "@/components/Preloader";
import { Suspense } from "react";

// Explicitly define the type for PageProps
interface PageProps {
  params: {
    id: string;
  };
}

// Ensure the function is properly typed
export default async function PostInModal({ params }: PageProps) {
  const { id } = params;

  return (
    <Modal>
      <Suspense fallback={<Preloader />}>
        <ModalPostContent postId={id} />
      </Suspense>
    </Modal>
  );
}

