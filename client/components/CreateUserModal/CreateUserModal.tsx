import * as S from "./styles";
import { CreateUserModalProps } from "./interface";
import { CustomerInfoProps } from "../EditUserModal/interface";
import { useState } from "react";
import { apiNextURl } from "../../api";

export const CreateUserModal = ({
  isOpen,
  handleCloseClick,
  handleDataSent,
}: CreateUserModalProps) => {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfoProps>({
    name: "",
    email: "",
    telephone: "",
    Location: {
      country: "",
      street1: "",
    },
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const splitName = name.split(".");
      const location = {
        Location: {
          ...customerInfo.Location,
          [splitName[1]]: value,
        },
      };
      setCustomerInfo({ ...customerInfo, ...location });
    } else setCustomerInfo({ ...customerInfo, [name]: value });
  };
  const handleCreate = async () => {
    try {
      setSending(true);
      const data = await fetch(`${apiNextURl}/customers`, {
        method: "POST",
        body: JSON.stringify({ ...customerInfo }),
        headers: {
          "Content-Type": "application/json",
          Authorization: (window as any).token,
        },
      }).then((res) => res.json());
      handleCloseClick();
      setSending(false);
      if (!!data) setCustomerInfo(customerInfo);
      handleDataSent(customerInfo);
    } catch (e) {
      console.error(e);
    }
  };
  if (!customerInfo) return null;
  return (
    <S.CreateUserInfoWrapper className={isOpen ? "show" : ""}>
      <S.CreateUserButton className="back" onClick={handleCloseClick}>
        Fechar
      </S.CreateUserButton>
      <S.InputField
        name="name"
        onChange={(e) => handleChange(e)}
        placeholder="Nome"
      ></S.InputField>
      <S.InputField
        name="email"
        onChange={(e) => handleChange(e)}
        placeholder="Email"
      ></S.InputField>
      <S.InputField
        name="telephone"
        onChange={(e) => handleChange(e)}
        placeholder="Telefone"
      ></S.InputField>
      <S.InputField
        name="Location.country"
        onChange={(e) => handleChange(e)}
        placeholder="País de origem"
      ></S.InputField>
      <S.InputField
        name="Location.street1"
        onChange={(e) => handleChange(e)}
        placeholder="Endereço"
      ></S.InputField>
      <S.CreateUserButton onClick={handleCreate}>
        {sending ? "Enviando..." : "Enviar"}
      </S.CreateUserButton>

      <S.CreateUserButtonWrapper></S.CreateUserButtonWrapper>
    </S.CreateUserInfoWrapper>
  );
};