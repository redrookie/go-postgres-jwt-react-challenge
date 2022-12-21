export type CreateUserModalProps = {
  isOpen: boolean;
  handleCloseClick: () => void;
  handleDataSent: (customer: CreateCustomerInfoProps, id: number) => void;
};

export type CreateCustomerInfoProps = {
  name: string;
  email: string;
  telephone: string;
  Location: {
    country: string;
    street1: string;
  };
};
