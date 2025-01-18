import Modal from "@/components/Modal";
import ModalPostContent from "@/components/ModalPostContent";
import Preloader from "@/components/Preloader";
import {Suspense} from "react";

export default async function PostInModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
 const postId = (await params).id;  return (
    <Modal>
      <Suspense fallback={<Preloader />}>
        <ModalPostContent postId={postId} />
      </Suspense>
    </Modal>
  );
}
