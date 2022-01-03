import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ALL_FAMILY, DELETE_FAMILY } from '../../config/Constants';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Topbar from "../common/Topbar";
import Sidebar from "../common/Sidebar";

const ManageFamily = () => {
    const [token, setToken] = useState("");
    const [familyList, setFamilyList] = useState([]);
    const [notFoundMessage, setNotFoundMessage] = useState("");
    const [deleteId, setDeleteId] = useState("");
    const navigation = useNavigate();
    let errorMessage = "";

    // load family list onload
    useEffect(() => {
        if (!localStorage.getItem('admin_token_id')) {
            navigation("/");
        }
        setToken(localStorage.getItem('admin_token_id'));

    }, []);

    useEffect(() => {
        loadFamilyList();
    }, [token]);

    // load family list function
    const loadFamilyList = async () => {
        const schemaOption = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token_id: token
            })
        }

        const response = await fetch(ALL_FAMILY, schemaOption);
        const result = await response.json();

        if (result.result.status == 200) {
            setFamilyList(result.result.data);
        } else {
            setNotFoundMessage(result.result.message);
        }
    }

    // delete family
    const deleteFamily = async () => {
        if(deleteId == ""){
            errorMessage = "Try Again ! Invalid Family Id";
        } else{
            const schemaOption = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token_id: token,
                    id : deleteId
                })
            }
    
            const response = await fetch(DELETE_FAMILY, schemaOption);
            const result = await response.json();
            
            if(result.result.status == 200){
                toast.success(result.result.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                loadFamilyList();
            } else{
                errorMessage = result.result.message;
            }
        }

        if(errorMessage != ""){
            toast.error(errorMessage, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
        }
    }

    return (
        <>
            <Topbar />
            {/* partial */}
            <div className="container-fluid page-body-wrapper">
                {/* partial:partials/_sidebar.html */}
                <Sidebar />
                {/* partial */}
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="page-header">
                            <h3 className="page-title"> Manage Families </h3>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">Records</li>
                                    <li className="breadcrumb-item active" aria-current="page">Manage Families</li>
                                </ol>
                            </nav>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="btn-group" role="group" aria-label="Basic outlined example">
                                            <button type="button" className="btn btn-gradient-primary">Family List</button>
                                            <button type="button" className="btn btn-outline-primary">Members List</button>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table table-bordered mt-4">
                                                <tbody><tr>
                                                    <th>Family Id</th>
                                                    <th>Name</th>
                                                    <th>Phone</th>
                                                    <th>Address</th>
                                                    <th>City</th>
                                                    <th>State</th>
                                                    <th>Zipcode</th>
                                                    <th>Action</th>
                                                </tr>
                                                    {
                                                        familyList.length > 0 ?
                                                            familyList.map((singleFamily, index) =>
                                                                <tr key={index}>
                                                                    <td><a href="">{singleFamily.family_id}</a></td>
                                                                    <td>{singleFamily.title}</td>
                                                                    <td>{singleFamily.home_phone}</td>
                                                                    <td>{singleFamily.street_address + ', ' + singleFamily.address}</td>
                                                                    <td>{singleFamily.city}</td>
                                                                    <td>{singleFamily.state}</td>
                                                                    <td>{singleFamily.zip_code}</td>
                                                                    <td>
                                                                        <Link to={`/records/edit_family/${singleFamily._id}`} className="btn btn-gradient-primary btn-sm"><i className="mdi mdi-pencil-box" /></Link>
                                                                        <a href="#!" className="btn btn-gradient-danger btn-sm ml-2" data-toggle="modal" data-target="#familyDeleteModal" onClick={() => setDeleteId(singleFamily._id)}><i className="mdi mdi-delete" /></a>
                                                                    </td>
                                                                </tr>
                                                            )
                                                            :
                                                            <tr>
                                                                <td colSpan={8}>{notFoundMessage}</td>
                                                            </tr>
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* content-wrapper ends */}
                    {/* partial:partials/_footer.html */}
                    <footer className="footer">
                        <div className="container-fluid clearfix">
                            <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">Copyright © blessysoftwaresolution.com 2020</span>
                            <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center"> <a href="https://www.bootstrapdash.com/bootstrap-admin-template/" target="_blank">Blessy Software Solutions </a> blessysoftwaresolution.com</span>
                        </div>
                    </footer>
                    {/* partial */}
                </div>

                {/* main-panel ends */}
            </div>
            {/* page-body-wrapper ends */}

            {/** delete modal */}
            <div className="modal fade" id="familyDeleteModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Delete Family ?</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h5>Confirmation ! Are you sure delete this family detail</h5>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={() => deleteFamily()} data-dismiss="modal">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            {/** delete modal */}
            <ToastContainer/>
        </>
    );
}

export default ManageFamily;