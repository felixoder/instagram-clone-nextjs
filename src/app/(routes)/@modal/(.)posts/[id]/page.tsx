import Modal from "@/components/Modal";
import ModalPostContent from "@/components/ModalPostContent";
import Preloader from "@/components/Preloader";
import {Suspense} from "react";

export default async function PostInModal({params}:{params: {id: string}}) {
  return (
    <Modal>
      <Suspense fallback={<Preloader />}>
        <ModalPostContent postId={params.id} />
      </Suspense>
    </Modal>
  );
}
