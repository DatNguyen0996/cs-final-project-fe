import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

function PaginationControlled({ totalPage, page = 1, productType }) {
  const navitate = useNavigate();

  const handleChange = (event, value) => {
    navitate(`/listOfItem/${productType}/${value}`);
  };
  return (
    <Stack spacing={2} m={3} justifyContent="center" alignItems="center">
      <Pagination
        count={totalPage}
        page={Number(page)}
        onChange={handleChange}
      />
    </Stack>
  );
}

export default PaginationControlled;
