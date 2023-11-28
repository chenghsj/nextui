import { ModalContentProps } from "@nextui-org/react";
import { FC, ReactElement, createContext, useContext } from "react";
import { UseFormProps, UseFormReturn } from "react-hook-form";

export const ModalContentContext = createContext<{ onClose: () => void; } & Partial<UseFormReturn> | null>(null);

export const useModalContentContext = () => {
  const context = useContext(ModalContentContext);

  if (!context) {
    throw new Error('ModalContent.*  component must be rendered as child of ModalContent component.');
  }

  return context;
};

export const ModalContentProvider: FC<{ children: ReactElement, onClose: () => void; } & Partial<UseFormReturn>> = ({
  children,
  onClose,
}) => {
  return (
    <ModalContentContext.Provider value={{ onClose }}>
      {children}
    </ModalContentContext.Provider>
  );
};