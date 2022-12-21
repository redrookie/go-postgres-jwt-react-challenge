import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { apiNextURl, apiURl } from "../api";
import { deleteCookie } from "../utils";
import { EditUserModal } from "../components/EditUserModal/EditUserModal";
import { CreateUserModal } from "../components/CreateUserModal/CreateUserModal";
import { CustomerInfoProps } from "../components/EditUserModal/interface";
import { Infotable } from "../components/Infotable/Infotable";
import * as S from "../static/session";

export default function Session() {
  const router = useRouter();
  const [state, setState] = useState<any>({
    isFetching: false,
    message: null,
    user: null,
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { isFetching, message, user = {} } = state;
  const [customers, setCustomers] = useState<CustomerInfoProps[]>();
  const [currentEditedCustomer, setCurrentEditedCustomer] = useState({
    customerID: 0,
    name: "",
    email: "",
    telephone: "",
    Location: {
      country: "",
      street1: "",
    },
  });

  const getUserInfo = async () => {
    setState({ ...state, isFetching: true, message: "fetching details..." });
    try {
      const res = await fetch(`${apiNextURl}/session`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          Authorization: (window as any).token,
        },
      }).then((res) => res.json());

      const { success, user } = res;
      if (!success) {
        router.push("/login");
      }
      setState({ ...state, user, message: null, isFetching: false });
    } catch (e: any) {
      setState({ ...state, message: e.toString(), isFetching: false });
    }
  };

  const handleLogout = () => {
    deleteCookie("token");
    router.push("/login");
  };

  useEffect(() => {
    getUserInfo();
    getCustomers();
  }, []);

  const handleEditClick = (id: number | undefined) => {
    const result = customers?.filter((elem) => {
      return elem.customerID === id;
    });
    if (!!result && result.length > 0 && result[0].customerID) {
      setCurrentEditedCustomer({
        ...result[0],
        customerID: result[0].customerID,
      });
    }
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleDataSent = (newCustomer: CustomerInfoProps) => {
    if (!!customers) setCustomers([...customers, newCustomer]);
  };

  const getCustomers = async () => {
    try {
      const data = await fetch(`${apiNextURl}/customers`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: (window as any).token,
        },
      }).then((res) => res.json());
      if (!!data) setCustomers(data.customers);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <S.SessionWrapper>
      <S.LogoutButton
        onClick={() => {
          handleLogout();
        }}
      >
        logout
      </S.LogoutButton>
      <S.WelcomeTitle>Welcome, {user && user.name}</S.WelcomeTitle>
      {customers && (
        <EditUserModal
          isOpen={isEditModalOpen}
          handleCloseClick={handleCloseEditModal}
          customer={currentEditedCustomer}
        />
      )}
      <CreateUserModal
        handleCloseClick={handleCloseCreateModal}
        isOpen={isCreateModalOpen}
        handleDataSent={handleDataSent}
      />
      <S.SessionBody>
        <S.CreateUserButton onClick={() => setIsCreateModalOpen(true)}>
          Adicionar cliente
        </S.CreateUserButton>
        {!!customers && customers.length > 0 ? (
          <Infotable onClickEdit={handleEditClick} list={customers} />
        ) : null}
      </S.SessionBody>
    </S.SessionWrapper>
  );
}
