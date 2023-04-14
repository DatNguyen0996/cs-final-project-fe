import React, { useEffect } from "react";
import Pagination from "@mui/material/Pagination";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

import { useDispatch, useSelector } from "react-redux";

import { getContact } from "../../../features/Contact/ContactSlice";

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
    <>
      <Box sx={{ width: 1, mt: 5 }}>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            <Grid container spacing={3} columns={{ xs: 1, sm: 2, md: 2 }}>
              {contacts?.contacts?.map((contact, index) => (
                <Grid key={index} item xs={1} sm={1} md={1}>
                  <Typography variant="subtitle1" gutterBottom>
                    <b>Họ và tên:</b> <i>{contact.name}</i>
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    <b>Email:</b> <i>{contact.email}</i>
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    <b>Số điện thoại:</b> <i>{contact.phone}</i>
                  </Typography>
                  <Box
                    sx={{
                      width: 1,
                      minHeight: 100,
                      border: "1px solid #222",
                      borderRadius: 2,
                      p: 1,
                    }}
                  >
                    <Typography variant="subtitle1" gutterBottom>
                      <b>Nội dung tin:</b> <span>{contact.content}</span>
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
            {Number(contacts.totalPage) <= 1 ? (
              <></>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  p: 3,
                }}
              >
                <Pagination
                  count={Number(contacts.totalPage)}
                  page={page}
                  onChange={handleChange}
                />
              </Box>
            )}
          </Box>
        )}
      </Box>
    </>
  );
}

export default MailBox;
