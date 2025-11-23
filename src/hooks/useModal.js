import { useState } from "react";

export const useModal = (initialState = false) => {
    const [isOpen, setIsOpen] = useState(initialState);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const toggleModal = () => setIsOpen(prev => !prev);

    return {
        isOpen,
        setIsOpen,
        openModal,
        closeModal,
        toggleModal,
    };
};

// Specific modal hooks
export const usePaletteModal = () => useModal(false);
export const useStyleModal = () => useModal(false);
export const useParticleModal = () => useModal(false);