"use client";

import { useProModal } from "@hooks/use-pro-modal";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { DialogTitle } from "@mui/material";

export const ProModal = () => {
  const proModal = useProModal();

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ugrade to pro</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
