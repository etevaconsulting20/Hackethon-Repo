import React from "react";
import { useNavigate } from "react-router-dom";

const HomeList = () => {
    const navigate = useNavigate();

    const navigateToAdd = () => {
        navigate("/app/home/add");
    };
    const handleEditClick = (item) => {
        navigate(`/app/home/edit/${item.id}`)
    }

    const dummyData = [
        {
            id: "1",
            firstName: "Bharat",
            lastName: "Sonwane",
            gender: "male"
        },
        {
            id: "1",
            firstName: "Kavita",
            lastName: "Savant",
            gender: "Female"
        },
        {
            id: "1",
            firstName: "Kunal",
            lastName: "Kamat",
            gender: "Male"
        },
    ]
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
                <table className="table table-striped">
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
                        {
                            dummyData && dummyData[0] && dummyData.map((item, index) => (
                                <tr key={index}>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.gender}</td>
                                    <td>
                                        <i className="bi bi-pencil-square" style={{ cursor: 'pointer' }} onClick={() => handleEditClick(item)}></i>
                                    </td>{" "}
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HomeList;
