import Topbar from "../common/Topbar";
import Sidebar from "../common/Sidebar";
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ALL_GROUP, CREATE_GROUP, DELETE_GROUP, EDIT_GROUP } from "../../config/Constants";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';


const MamberGroup = () => {
    const [token, setToken] = useState("");
    const [groups, setGroups] = useState([]);
    const [notFoundMessage, setNotFoundMessage] = useState("");
    const [groupName, setGroupName] = useState("");
    const [deleteId, setDeleteId] = useState("");
    const [editId, setEditId] = useState("");

    const navigation = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('admin_token_id')) {
            navigation("/");
        }
        setToken(localStorage.getItem('admin_token_id'));

    }, []);

    useEffect(() => {
        loadGroupList();
    }, [token]);

    // load group list
    const loadGroupList = async () => {
        const schemaOption = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token_id: token
            })
        }

        const response = await fetch(ALL_GROUP, schemaOption);
        const result = await response.json();

        if (result.result.status == 200) {
            setGroups(result.result.data);
        } else {
            setNotFoundMessage(result.result.message);
        }
    }

    // create group
    const saveGroup = async () => {
        if (groupName == "") {
            toast.error('Please Enter Group Name', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        const schemaOption = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token_id: token,
                group_name: groupName
            })
        }

        const response = await fetch(CREATE_GROUP, schemaOption);
        const result = await response.json();
        if (result.result.status == 200) {
            setGroupName("");
            toast.success(result.result.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            loadGroupList();

        } else {
            toast.error(result.result.message, {
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

    // delete group
    const deleteGroup = async () => {
        if (deleteId == "") {
            toast.error('Try Again ! Invalid Group Id', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        const schemaOption = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token_id: token,
                id: deleteId
            })
        }

        const response = await fetch(DELETE_GROUP, schemaOption);
        const result = await response.json();
        if (result.result.status == 200) {
            setDeleteId("");
            toast.success(result.result.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            loadGroupList();

        } else {
            toast.error(result.result.message, {
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

    // update group
    const fetchGroupDetails = async (id) => {
        if (id == "") {
            toast.error('Try Again ! Invalid Group Id', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        const schemaOption = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token_id: token,
                id: id
            })
        }

        const response = await fetch(EDIT_GROUP, schemaOption);
        const result = await response.json();
        if(result.result.status == 200){
            const data = result.result.data;
            setGroupName(data.group_name);
        } else{
            toast.error(result.result.message, {
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

    // update group
    const updateGroup = () => {
        
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
                            <h3 className="page-title"> Manage Group </h3>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">Records</li>
                                    <li className="breadcrumb-item active" aria-current="page">Manage Group</li>
                                </ol>
                            </nav>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <a href="#!" className="btn btn-gradient-primary float-right" data-toggle="modal" data-target="#exampleModal">Create Group</a>
                                        {/* Modal */}
                                        <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">Create New Group</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">×</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputUsername1">Group Name<span className="text-danger">*</span></label>
                                                            <input type="text" className="form-control" value={groupName} onChange={(e) => setGroupName(e.target.value)} id="exampleInputUsername1" />
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => saveGroup()}>Save</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br /><br /><br />
                                        <table className="table table-bordered">
                                            <tbody><tr>
                                                <th>Group Name</th>
                                                <th>Total Members</th>
                                                <th>Action</th>
                                            </tr>
                                                {groups.length > 0 ?
                                                    groups.map((singleGroup, index) =>
                                                        <tr key={index}>
                                                            <td><a href>{singleGroup.group_name}</a></td>
                                                            <td>0</td>
                                                            <td>
                                                                <a href className="btn btn-gradient-primary btn-sm" data-toggle="modal" data-target="#editModal" onClick={() => fetchGroupDetails(singleGroup._id) }><i className="mdi mdi-pencil-box" /></a>
                                                                <a href className="btn btn-gradient-danger btn-sm ml-2" data-toggle="modal" data-target="#deleteModal" onClick={() => setDeleteId(singleGroup._id)}><i className="mdi mdi-delete" /></a>
                                                            </td>
                                                        </tr>)
                                                    :
                                                    <tr><td colSpan={3} className="text-center">{notFoundMessage}</td></tr>
                                                }
                                            </tbody></table>
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
            <div className="modal fade" id="deleteModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Delete Group ?</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h5>Confirmation ! Are you sure delete this group</h5>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={() => deleteGroup()} data-dismiss="modal">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            {/** delete modal */}

            {/** edit modal */}
            <div className="modal fade" id="editModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Create New Group</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="exampleInputUsername1">Group Name<span className="text-danger">*</span></label>
                                <input type="text" className="form-control" value={groupName} onChange={(e) => setGroupName(e.target.value)} id="exampleInputUsername1" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => updateGroup()}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
            {/** edit modal */}

            <ToastContainer />
        </>
    );
}

export default MamberGroup;