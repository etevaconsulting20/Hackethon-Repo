import React from "react";
import { Skeleton } from "@mui/material";

const TableLoader = () => {
  let SkeletonNum = 0;
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">
            <Skeleton animation="wave" width={11.565} />
          </th>
          <th scope="col">
            <Skeleton animation="wave" width={40} />
          </th>
          <th scope="col">
            <Skeleton animation="wave" width={45} />
          </th>
          <th scope="col">
            <Skeleton animation="wave" width={75} />
          </th>
          <th scope="col">
            <Skeleton animation="wave" width={45} />
          </th>
        </tr>
      </thead>
      <tbody>
        {[...Array(10)].map((item, index) => (
          <tr key={index}>
            <td>
              <Skeleton animation="wave" width={11.565} />
            </td>
            <td>
              <Skeleton animation="wave" width={80} />
            </td>
            <td>
              <Skeleton animation="wave" width={120} />
            </td>
            <td>
              <Skeleton animation="wave" width={125} />
            </td>
            <td>
              <Skeleton
                animation="wave"
                sx={{ marginTop: -1.5, marginBottom: -1.1 }}
                height={52}
                width={48}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableLoader;
