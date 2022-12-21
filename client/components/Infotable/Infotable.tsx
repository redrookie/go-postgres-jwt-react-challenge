import * as S from "./styles";
import { CustomerArrayProps } from "./interface";

export const Infotable = ({ list, onClickEdit }: CustomerArrayProps) => {
  if (!list) return null;
  return (
    <S.InfotableWrapper>
      <S.InfotableThead>
        <S.InfotableTr>
          <S.InfotableTh>Nome</S.InfotableTh>
          <S.InfotableTh>Email</S.InfotableTh>
          <S.InfotableTh>Telefone</S.InfotableTh>
          <S.InfotableTh>País</S.InfotableTh>
          <S.InfotableTh>Endereço</S.InfotableTh>
          <S.InfotableTh>Editar</S.InfotableTh>
        </S.InfotableTr>
      </S.InfotableThead>
      <S.InfotableTbody>
        {list?.map((item, index) => {
          return (
            <S.InfotableTr key={index}>
              <S.InfotableTd>{item.name}</S.InfotableTd>
              <S.InfotableTd>{item.email}</S.InfotableTd>
              <S.InfotableTd>{item.telephone}</S.InfotableTd>
              <S.InfotableTd>{item.Location.country}</S.InfotableTd>
              <S.InfotableTd>{item.Location.street1}</S.InfotableTd>
              <S.InfotableTd>
                <S.InfoTableEditButton
                  onClick={() => onClickEdit(item.customerID)}
                >
                  Editar
                </S.InfoTableEditButton>
              </S.InfotableTd>
            </S.InfotableTr>
          );
        })}
      </S.InfotableTbody>
    </S.InfotableWrapper>
  );
};
