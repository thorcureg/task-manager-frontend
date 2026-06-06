import { CloseButton } from "@chakra-ui/close-button"

export default function Modal({ isOpen, onClose, children }) {
    return (
        <div className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/50
        "
            onClick={(e) => {
                e.stopPropagation();
                onClose();
            }}
        >
            <div className="
                w-full
                max-w-lg
                rounded-xl
                bg-white
                p-6
                shadow-lg
            "
                onClick={(e) => e.stopPropagation()}
            >
                    <div className="
                        flex
                        justify-end
                        mb-4
                    ">
                        <CloseButton
                            onClick={(e) => {
                                e.stopPropagation();
                                onClose();
                            }}
                        />
                    </div>
                    {children}
                </div>
            </div>
    );
};