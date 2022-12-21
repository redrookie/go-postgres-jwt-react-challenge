import { CustomerInfoProps } from "../EditUserModal/interface";
export type CustomerArrayProps = {
  list: CustomerInfoProps[];
  onClickEdit: (e: number | undefined) => void;
};
