import React, { useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import "../../../style/mailBox.style.css";
import { useDispatch, useSelector } from "react-redux";

import { getContact } from "../../../features/Contact/ContactSlice";
import LoadingScreen from "../../../components/LoadingScreen";

function MailBox() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContact({ page: 1, limit: 10 }));
  }, [dispatch]);

  const { contacts, isLoading } = useSelector((state) => state.contact);

  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    dispatch(getContact({ page: page, limit: 10 }));
  }, [page, dispatch]);

  return (
    <div id="mail-container">
      {isLoading ? (
        <div className="loadingScreen">
          <LoadingScreen />
        </div>
      ) : (
        <>
          {contacts?.contacts?.map((contact) => (
            <div className="mail">
              <p>
                <b>Họ và tên</b>: {contact.name}
              </p>
              <p>
                <b>Email</b>: {contact.email}
              </p>
              <p>
                <b>Số điện thoại</b>: {contact.phone}
              </p>
              <p className="content">
                <b>Nội dung tin</b>: {contact.content}
              </p>
            </div>
          ))}
        </>
      )}
      <Stack spacing={2}>
        <Pagination
          count={Number(contacts.totalPage)}
          page={page}
          onChange={handleChange}
        />
      </Stack>
    </div>
  );
}

export default MailBox;
