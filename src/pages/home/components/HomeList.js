import React from "react";
import { useNavigate } from "react-router-dom";

const HomeList = () => {
  const navigate = useNavigate();

  const navigateToAdd = () => {
    navigate("/app/home/add");
  };
  const handleEditClick = () =>{
    navigate("/app/home/edit")
  }
  return (
    <div>
      <div className="row">
        <div className="col-10"></div>
        <div className="col-2">
          <button onClick={navigateToAdd} className="btn btn-primary m-1">
            Add new
          </button>
        </div>
      </div>

      <div className="row">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>
                <i class="bi bi-pencil-square" style={{cursor:'pointer'}} onClick={handleEditClick}></i>
              </td>{" "}
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>
                <i class="bi bi-pencil-square" style={{cursor:'pointer'}} onClick={handleEditClick}></i>
              </td>{" "}
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
              <td>
                <i class="bi bi-pencil-square" style={{cursor:'pointer'}} onClick={handleEditClick}></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomeList;
