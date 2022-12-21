import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { apiNextURl, apiURl } from "../api";
import { deleteCookie } from "../utils";
import { CustomerInfo } from "../components/CustomerInfo/CustomerInfo";
import { CustomerInfoProps } from "../components/CustomerInfo/interface";
import * as S from "../styles/session";

export default function Session() {
  const router = useRouter();
  const [state, setState] = useState<any>({
    isFetching: false,
    message: null,
    user: null,
  });

  const { isFetching, message, user = {} } = state;
  const [customers, setCustomers] = useState<CustomerInfoProps[]>();

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
  console.log("customers", customers);

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
      {customers && <CustomerInfo {...customers[0]} />}
    </S.SessionWrapper>
  );
}
