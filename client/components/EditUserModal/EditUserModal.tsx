import * as S from "./styles";
import { EditUserModalProps } from "./interface";
import { useEffect, useState } from "react";
import { apiNextURl } from "../../api";

export const EditUserModal = ({
  customer,
  isOpen,
  handleCloseClick,
  handleDataSent,
}: EditUserModalProps) => {
  const [infoChange, setInfoChange] = useState(customer);
  useEffect(() => {
    setInfoChange(customer);
  }, [customer]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const splitName = name.split(".");
      const location = {
        Location: {
          ...infoChange.Location,
          [splitName[1]]: value,
        },
      };
      setInfoChange({ ...infoChange, ...location });
    } else setInfoChange({ ...infoChange, [name]: value });
  };
  const handleEdit = async () => {
    try {
      const data = await fetch(`${apiNextURl}/customers`, {
        method: "POST",
        body: JSON.stringify({ ...infoChange }),
        headers: {
          "Content-Type": "application/json",
          Authorization: (window as any).token,
        },
      }).then((res) => res.json());
      handleCloseClick();
      handleDataSent(infoChange);
    } catch (e) {
      console.error(e);
    }
  };
  if (!customer) return null;
  return (
    <S.EditUserWrapper className={isOpen ? "show" : ""}>
      <S.EditUserButton className="back" onClick={handleCloseClick}>
        Fechar
      </S.EditUserButton>
      <S.InputField
        name="name"
        onChange={(e) => handleChange(e)}
        placeholder={customer.name || "Nome"}
      ></S.InputField>
      <S.InputField
        name="email"
        onChange={(e) => handleChange(e)}
        placeholder={customer.email || "Email"}
      ></S.InputField>
      <S.InputField
        name="telephone"
        onChange={(e) => handleChange(e)}
        placeholder={customer.telephone || "Telefone"}
      ></S.InputField>
      <S.InputField
        name="Location.country"
        onChange={(e) => handleChange(e)}
        placeholder={customer.Location.country || "País de origem"}
      ></S.InputField>
      <S.InputField
        name="Location.street1"
        onChange={(e) => handleChange(e)}
        placeholder={customer.Location.street1 || "Endereço"}
      ></S.InputField>
      <S.EditUserButton onClick={handleEdit}>Enviar</S.EditUserButton>

      <S.EditUserButtonWrapper></S.EditUserButtonWrapper>
    </S.EditUserWrapper>
  );
};
