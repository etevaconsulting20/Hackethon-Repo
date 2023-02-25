import { Searchbox } from "src/components/searchbox";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TableLoader from "../helper/table-loader";

// Thunk
import { getAllUsersData } from "src/redux/thunks/userThunk.js";

const UsersList = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [t, I18n] = useTranslation();
  const [search, changeSearch] = useState("");
  const [page, setPage] = useState(1);

  const recordsPerPage = 10;
  const lastIndex = page * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const state = useSelector((state) => state.user);

  const [displayData, setDisplayData] = useState();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    renderData();
  }, []);

  useEffect(() => {
    if (search == "") {
      try {
        dispatch(getAllUsersData())
          .unwrap()
          .then((result) => {
            setDisplayData(result.data);
          });
      } catch (error) {
        
      }
    }

    return () => { };
  }, [search]);

  const renderData = () => {
    try {
      dispatch(getAllUsersData())
        .unwrap()
        .then((result) => {
          setDisplayData(result.data);
          setLoader(false);
        });
    } catch (error) {
      
    }
  };

  const pageLength = (num) => {
    var array = [];
    for (var i = 1; i <= num; i++) {
      array.push(i);
    }
    return array
  };

  const buttons = pageLength(
    Math.ceil(displayData && displayData[0] && displayData.length / recordsPerPage)
  );
  const handlePaginationChange = (value) => {
    if (value == 0) {
      value = 1;
    }
    let check = Math.ceil((displayData && displayData[0] && displayData.length) / recordsPerPage);
    if (value > check) {
      value = check;
    }
    setPage(value);
  };


  const onChangeSearch = (e) => {
    const { value } = e.target;
    const lowercasedValue = value ? value.toLowerCase() : "";
    const newlyAddedFiltereedData = displayData.filter((e1) =>
      e1.username.toLowerCase().includes(lowercasedValue)
    );
    setDisplayData(newlyAddedFiltereedData);
    changeSearch(value);
  };

  return (
    <>
      <div
        className={`p-2 container-fluid d-flex flex-row justify-content-between bg-primary text-white`}
      >
        <h4>{t("sidebar.users")}</h4>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-light mx-2 text-primary common-button"
            onClick={() => navigate("/app/users/create")}
          >
            Add
          </button>
          <div className="w-20">
            <Searchbox
              value={search}
              onChange={onChangeSearch}
              placeholder={"Search by username"}
            />
          </div>
        </div>
      </div>
      <div className="container-fluid scroll-without-tabs p-3">
        <div className="table-height">
          {loader ? (
            <TableLoader />
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Sr. no</th>
                  <th scope="col">{t("table.username")}</th>
                  <th scope="col">{t("table.isprimary")}</th>
                  <th scope="col">{t("table.createdAt")}</th>
                  <th scope="col">{t("table.details")}</th>
                </tr>
              </thead>
              <tbody>
                {displayData && displayData[0] ? (
                  displayData.slice(firstIndex, lastIndex).map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.username}</td>
                        <td>{item.isPrimary == true ? "Yes" : "No"}</td>
                        <td>
                          {item.createdAt.substring(0, 19).replace("T", " ")}
                        </td>
                        <td>
                          <a
                            className="btn btn-primary btn-sm text-white"
                            onClick={() => {
                              navigate(
                                `/app/users/details/${item.id}`,
                                { state: { url: location.pathname } }
                              );
                            }}
                          >
                            {t("table.view")}
                          </a>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td className="text-center" colSpan="5">
                      No users found...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        <div className="d-flex justify-content-end m-2">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item" style={{ cursor: "pointer" }}>
                <a
                  className="page-link"
                  onClick={() => handlePaginationChange(page - 1)}
                >
                  Previous
                </a>
              </li>
              {buttons &&
                buttons.map((t, i) => {
                  return (

                    <li key={"nav-emp" + i}
                      className={`page-item ${page === t ? "active" : ""
                        }`}
                      style={{ cursor: "pointer" }}
                    >
                      <a
                        className="page-link "
                        onClick={() => handlePaginationChange(i + 1)}
                      >
                        {i + 1}
                      </a>
                    </li>

                  );
                })}
              <li className="page-item" style={{ cursor: "pointer" }}>
                <a
                  className="page-link"
                  onClick={() => handlePaginationChange(page + 1)}
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default UsersList;
