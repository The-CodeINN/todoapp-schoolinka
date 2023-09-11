import { Dialog, DialogContent } from './ui/dialog';

interface MobileModalProps {
  children: React.ReactNode;
  open?: boolean;
  setOpen: (open: boolean) => void;
}

export default function MobileModal({
  children,
  open,
  setOpen,
}: MobileModalProps) {
  // Function to close the modal
  const modalClose = (value: boolean) => {
    setOpen(value);
  };

  return (
    <Dialog open={open} onOpenChange={modalClose}>
      <DialogContent className='border-none '>{children} </DialogContent>
    </Dialog>
  );
}
