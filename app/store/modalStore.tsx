import { create } from "zustand";

type ModalStore = {
  addShowModal: boolean;
  setAddShowModal: (show: boolean) => void;
  viewShowModal: boolean;
  setViewShowModal: (show: boolean) => void;
  editShowModal: boolean;
  setEditShowModal: (show: boolean) => void;
};

const useModalStore = create<ModalStore>((set) => ({
  addShowModal: false,
  setAddShowModal: (show) => set({ addShowModal: show }),

  viewShowModal: false,
  setViewShowModal: (show) => set({ viewShowModal: show }),

  editShowModal: false,
  setEditShowModal: (show) => set({ editShowModal: show }),
}));

export default useModalStore;
