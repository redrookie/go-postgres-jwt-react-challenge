export type CustomerInfoProps = {
  customerID?: number;
  name: string;
  email: string;
  telephone: string;
  Location: {
    country: string;
    street1: string;
  };
};

export type EditUserModalProps = {
  customer: CustomerInfoProps;
  isOpen: boolean;
  handleCloseClick: () => void;
};
