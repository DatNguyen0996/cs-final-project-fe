import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { getAllUsers } from "../../../features/User/UserSlice";
import { useDispatch, useSelector } from "react-redux";

function GetUsersMUI({ expanded, handleChange, panel1, tabName }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers({ page: 1, limit: 10 }));
  }, [dispatch]);

  const { users, isLoading } = useSelector((state) => state.user);

  const { totalPage } = users;
  const [pageSelect, setPageSelect] = useState(1);
  const handleChangePage = (event, value) => {
    setPageSelect(value);
    dispatch(getAllUsers({ page: value, limit: 10 }));
  };
  return (
    <Accordion
      sx={{ bgcolor: "#f0f8ff" }}
      expanded={expanded === panel1}
      onChange={handleChange(panel1)}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ width: "80%", flexShrink: 0 }}>{tabName}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box component={"div"} sx={{ width: 1, overflow: "auto" }}>
            <Box component={"table"} sx={{ width: 1, minWidth: 600 }}>
              <Box component={"thead"} sx={{ bgcolor: "#e95220", height: 40 }}>
                <Box component={"tr"} color={"#fff"}>
                  <Box component={"th"} width="25%">
                    Tên
                  </Box>
                  <Box component={"th"} width="25%">
                    Email
                  </Box>
                  <Box component={"th"} width="25%">
                    Vai trò
                  </Box>
                  <Box component={"th"} width="25%">
                    Địa chỉ
                  </Box>
                </Box>
              </Box>
              <Box component={"tbody"}>
                {users?.users?.map((user, index) => (
                  <Box
                    key={index}
                    component={"tr"}
                    sx={{
                      color: "#000",
                      bgcolor: index % 2 === 0 ? "#3131310f" : "#2222",
                      minHeight: 50,
                    }}
                  >
                    <Box component={"td"} width="25%" sx={{ p: "10px 5px" }}>
                      {user.name}
                    </Box>
                    <Box component={"td"} width="25%" sx={{ p: "10px 5px" }}>
                      {user.email}
                    </Box>
                    <Box component={"td"} width="25%" sx={{ p: "10px 5px" }}>
                      {user.role}
                    </Box>
                    <Box component={"td"} width="25%" sx={{ p: "10px 5px" }}>
                      {user.address}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
            {totalPage <= 1 ? (
              <></>
            ) : (
              <div className="pagination">
                <Stack
                  spacing={2}
                  m={3}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Pagination
                    count={totalPage}
                    page={Number(pageSelect)}
                    onChange={handleChangePage}
                  />
                </Stack>
              </div>
            )}
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
}

export default GetUsersMUI;
