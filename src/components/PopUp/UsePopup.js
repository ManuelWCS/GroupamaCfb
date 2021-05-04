import { useState } from 'react';

const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    function activate() {
        setIsOpen(!isOpen)
    }

    return {
        isOpen,
        toggle,
    }
};

export default useModal; 