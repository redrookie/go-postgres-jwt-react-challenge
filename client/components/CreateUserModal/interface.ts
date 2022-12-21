import { CustomerInfoProps } from "../EditUserModal/interface";

export type CreateUserModalProps = {
  isOpen: boolean;
  handleCloseClick: () => void;
  handleDataSent: (customer: CustomerInfoProps) => void;
};
