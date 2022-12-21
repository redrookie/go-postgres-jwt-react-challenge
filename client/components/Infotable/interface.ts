import { CustomerInfoProps } from "../EditUserModal/interface";
export type InfoTableProps = {
  list: CustomerInfoProps[];
  onClickEdit: (e: number | undefined) => void;
};
