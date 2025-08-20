import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  // useDisclosure,
} from "@heroui/react";
// import { handelDeletingPost } from "../../helper/helpers";

export default function DeleteModal({
  title,
  isOpen,
  onOpenChange,
  handelDeleting,
  isDeleting,
  // isNavigate,
  onClosePostModal,
}) {
  // const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {/* <Button onPress={onOpen}>Open Modal</Button> */}
      <Modal
        backdrop={"blur"}
        placement="center"
        size="lg"
        isOpen={isOpen}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center">
                Deleting Your {title}
              </ModalHeader>
              <ModalBody>
                <div className="text-yellow-200">
                  {/* <i className="fa-solid fa-circle-exclamation text-8xl"></i> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-24 mx-auto"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                    />
                  </svg>
                </div>
                <h3 className="text-3xl text-center text-red-600">
                  Are You Sure?
                </h3>
                <div className="text-center text-xl">
                  You won't be able to revert this!
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  isDisabled={isDeleting}
                  color="default"
                  variant="shadow"
                  onPress={onClose}
                >
                  Cancel
                </Button>
                <Button
                  isLoading={isDeleting}
                  isDisabled={isDeleting}
                  color="danger"
                  // onPress={() => handelDeleting(onClose, true)}
                  onPress={() => {
                    handelDeleting();
                    onClosePostModal();
                  }}
                  // onPress={() => handelDeletingPost(onClose, true)}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
