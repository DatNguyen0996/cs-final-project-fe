import React, { useState } from "react";
import IconOpen from "../../../components/IconOpen";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { getAllUsers } from "../../../features/User/UserSlice";
import { useDispatch } from "react-redux";

function GetUsers({ name, users }) {
  const { totalPage } = users;
  const [rotation, setRotation] = useState(false);
  const [pageSelect, setPageSelect] = useState(1);

  const dispatch = useDispatch();

  const handleChange = (event, value) => {
    setPageSelect(value);
    dispatch(getAllUsers({ page: value, limit: 10 }));
  };

  return (
    <div className="form-container">
      <div className="field">
        <div className="title-wrapper">
          <div className="title">
            <p>{name}</p>
          </div>

          <>
            <IconOpen rotation={rotation} setRotation={setRotation} />
          </>
        </div>

        {rotation ? (
          <div className="body">
            <div className="table">
              <table id="customers">
                <thead>
                  <tr>
                    <th width="25%">Tên</th>
                    <th width="25%">Email</th>
                    <th width="25%">Vai trò</th>
                    <th width="25%">Địa chỉ</th>
                  </tr>
                </thead>
                <tbody>
                  {users.users.map((user, index) => {
                    return (
                      <tr key={index}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{user.address}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {totalPage === 0 ? (
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
                      onChange={handleChange}
                    />
                  </Stack>
                </div>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default GetUsers;
