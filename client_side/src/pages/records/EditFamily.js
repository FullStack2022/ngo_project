import Topbar from "../common/Topbar";
import Sidebar from "../common/Sidebar";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UPDATE_FAMILY,SINGLE_FAMILY } from '../../config/Constants';

const EditFamily = () => {
    const { id } = useParams();
    
    const [token, setToken] = useState("");
    const navigation = useNavigate();
    const yearList = [];
    const current_date = new Date();
    const current_year = current_date.getFullYear();
    const last_10_year = current_year - 10;

    // initial variables
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [homePhone, setHomePhone] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [note, setNote] = useState("");
    let errorMessage = "";

    for (let i = current_year; i > last_10_year; i--) {
        yearList.push(i);
    }

    // check admin login
     // check admin is login
     useEffect(() => {
        if(!localStorage.getItem('admin_token_id')){
        navigation("/");
        }

        setToken(localStorage.getItem('admin_token_id'));
    }, [id]);

    useEffect(() => {
        singleFamilyDetails(id);
    }, [token]);

    // fetch single family details
    const singleFamilyDetails = async (id) => {
        const schemaOption = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token_id: token,
                id : id
            })
        }

        try {
            const response = await fetch(SINGLE_FAMILY, schemaOption);
            const result = await response.json();
            
            if(result.result.status == 200){
                var familyDetails = result.result.data;

                setTitle(familyDetails.title);
                setStreetAddress(familyDetails.street_address);
                setAddress(familyDetails.address);
                setCity(familyDetails.city);
                setState(familyDetails.state);
                setZipCode(familyDetails.zip_code);
                setHomePhone(familyDetails.home_phone);
                setMonth(familyDetails.month);
                setYear(familyDetails.year);
                setNote(familyDetails.note);
            } else{
               navigation("/records/manage_family");
            }
        } catch (error) {
            console.log(error.message);
        }
        
    }

    // save family details
    const updateFamily = async () => {
        setIsLoading(true);
        if(title == ""){
            errorMessage = "Title field is Required.";
        }
        else if(streetAddress == ""){
            errorMessage = "Street Address field is Required.";
        }
        else if(address == ""){
            errorMessage = "Address field is Required.";
        }
        else if(city == ""){
            errorMessage = "City field is Required.";
        }
        else if(state == ""){
            errorMessage = "State field is Required.";
        }
        else if(zipCode == ""){
            errorMessage = "Zip Code field is Required.";
        }
        else if(homePhone == ""){
            errorMessage = "Home Phone field is Required.";
        }
        else if(month == ""){
            errorMessage = "Month field is Required.";
        }
        else if(year == ""){
            errorMessage = "Year field is Required.";
        }
        else if(note == ""){
            errorMessage = "Note field is Required.";
        }
        else{
            const schemaOption = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token_id: token,
                    id : id,
                    title : title,
                    street_address : streetAddress,
                    address : address,
                    city : city,
                    state : state,
                    zip_code : zipCode,
                    home_phone : homePhone,
                    month : month,
                    year : year,
                    note : note
                })
            }

            const response = await fetch(UPDATE_FAMILY, schemaOption);
            const result = await response.json();

            if(result.result.status == 200){
                singleFamilyDetails(id);
                toast.success(result.result.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

            } else{
                errorMessage = result.result.message;
            }
        }
        setIsLoading(false);
        // show error message
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
                            <h3 className="page-title"> Edit Family </h3>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">Records</li>
                                    <li className="breadcrumb-item active" aria-current="page">Edit Family</li>
                                </ol>
                            </nav>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Family Information</h4>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputUsername1">Title<span className="text-danger">*</span></label>
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                id="exampleInputUsername1" 
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)} />
                                                <small className="text-secondary">Nicknames of husband &amp; wife. example: Sujan &amp; Suma</small>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputUsername1">Street Address<span className="text-danger">*</span></label>
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                id="exampleInputUsername1" 
                                                value={streetAddress} 
                                                onChange={(e) => setStreetAddress(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputUsername1">Address (eg. Apt#)<span className="text-danger">*</span></label>
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                id="exampleInputUsername1" 
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputUsername1">City<span className="text-danger">*</span></label>
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                id="exampleInputUsername1" 
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputUsername1">State<span className="text-danger">*</span></label>
                                                <select className="form-control" onChange={(e) => setState(e.target.value)}>
                                                <option value="" selected>Select State</option>
                                                    <option value="Dallas">Dallas</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputUsername1">Zip Code<span className="text-danger">*</span></label>
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                id="exampleInputUsername1" 
                                                value={zipCode} 
                                                onChange={(e) => setZipCode(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputUsername1">Home Phone#<span className="text-danger">*</span></label>
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                id="exampleInputUsername1" 
                                                maxLength={10}
                                                value={homePhone} 
                                                onChange={(e) => setHomePhone(e.target.value)}
                                                />
                                            </div>
                                            <button type="button" className="btn btn-gradient-success btn-fw" onClick={() => updateFamily() }>{isLoading ? 'Loading...':'Save'}</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Payment Starts From (Month &amp; Year)</h4>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputUsername1">Month<span className="text-danger">*</span></label>
                                            <select className="form-control" value={month} onChange={(e) => setMonth(e.target.value)}>
                                            <option value="1">January</option>
                                            <option value="2">February</option>
                                            <option value="3">March</option>
                                            <option value="4">Apirl</option>
                                            <option value="5">May</option>
                                            <option value="6">June</option>
                                            <option value="7">July</option>
                                            <option value="8">August</option>
                                            <option value="9">September</option>
                                            <option value="10">October</option>
                                            <option value="11">November</option>
                                            <option value="12">December</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputUsername1">Year<span className="text-danger">*</span></label>
                                            <select className="form-control" defaultValue={year} onChange={(e) => setYear(e.target.value)}>
                                                {
                                                yearList.length > 0 ? 
                                                yearList.map((single) => 
                                                   <option value={single} key={single}>{single}</option>)
                                                : <option value="">Year List Not Found</option>
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="card mt-5">
                                    <div className="card-body">
                                        <h4 className="card-title">Other Information</h4>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputUsername1">Note<span className="text-danger">*</span></label>
                                            <textarea className="form-control" id="exampleInputUsername1" defaultValue={note} onChange={(e) => setNote(e.target.value)} />
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
            <ToastContainer />
        </>
    );
}

export default EditFamily;