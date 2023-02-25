import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllDataAction } from "src/redux/thunks/homeThunk";


const HomeList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

const homeState = useSelector(state => state.home)
    const {formListData} = homeState
    useEffect(() => {
      
      dispatch(getAllDataAction())  
      return () => {
        
      }
    }, [])
    

    const navigateToAdd = () => {
        navigate("/app/home/add");
    };
    const handleEditClick = (item) => {
        navigate(`/app/home/edit/${item.id}`)
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

            <div className="row ml-2">
                <table className="table table-striped" style={{marginLeft: 10}}>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">gender</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            formListData && formListData[0] && formListData.map((item, index) => (
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
