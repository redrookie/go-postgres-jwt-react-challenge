import * as S from "./styles";
import { CustomerInfoProps } from "./interface";
import { useState } from "react";
import { apiNextURl } from "../../api";

export const CustomerInfo = (data: CustomerInfoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [infoChange, setInfoChange] = useState(data);
  const [costumerInfo, setcostumerInfo] = useState(data);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    console.log("name", name);
    setInfoChange({ ...infoChange, [name]: value });
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
      if (!!data) setcostumerInfo(infoChange);
    } catch (e) {
      console.error(e);
    }
  };
  if (!costumerInfo) return null;
  console.log("data", data);
  console.log("infoChange", costumerInfo);
  return (
    <S.CustomerInfoWrapper>
      {isEditing ? (
        <>
          <S.CustomerButton
            className="back"
            onClick={() => setIsEditing(!isEditing)}
          >
            Voltar
          </S.CustomerButton>
          <S.InputField
            name="name"
            onChange={(e) => handleChange(e)}
            placeholder={costumerInfo.name || "Nome"}
          ></S.InputField>
          <S.InputField
            name="email"
            onChange={(e) => handleChange(e)}
            placeholder={costumerInfo.email || "Email"}
          ></S.InputField>
          <S.InputField
            name="telephone"
            onChange={(e) => handleChange(e)}
            placeholder={costumerInfo.telephone || "Telefone"}
          ></S.InputField>
          <S.InputField
            name="Location.country"
            onChange={(e) => handleChange(e)}
            placeholder={costumerInfo.Location.country || "País de origem"}
          ></S.InputField>
          <S.InputField
            name="Location.street1"
            onChange={(e) => handleChange(e)}
            placeholder={costumerInfo.Location.street1 || "Endereço"}
          ></S.InputField>
          <S.CustomerButton onClick={handleEdit}>Enviar</S.CustomerButton>
        </>
      ) : (
        <>
          <S.CustomerInfoText>{`${
            costumerInfo.name || "Nome não cadastrado"
          }`}</S.CustomerInfoText>
          <S.CustomerInfoText>{`${
            costumerInfo.email || "Email não cadastrado"
          }`}</S.CustomerInfoText>
          <S.CustomerInfoText>{`${
            costumerInfo.telephone || "Telefone não cadastrado"
          }`}</S.CustomerInfoText>
          <S.CustomerInfoText>{`${
            costumerInfo.Location.country || "País de origem não cadastrado"
          }`}</S.CustomerInfoText>
          <S.CustomerInfoText>{`${
            costumerInfo.Location.street1 || "Endereço não cadastrado"
          }`}</S.CustomerInfoText>
          <S.CustomerButton onClick={() => setIsEditing(!isEditing)}>
            Editar
          </S.CustomerButton>
        </>
      )}
      <S.CustomerButtonWrapper></S.CustomerButtonWrapper>
    </S.CustomerInfoWrapper>
  );
};
