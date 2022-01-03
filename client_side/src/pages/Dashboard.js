import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Sidebar from "./common/Sidebar";
import Topbar from "./common/Topbar";

const Dashboard = () => {
    const navigation = useNavigate();

    // check admin is login
    useEffect(() => {
        if(!localStorage.getItem('admin_token_id')){
        navigation("/");
        }
    }, []);

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
                            <div className="row" id="proBanner">
                                <div className="col-12">
                                    <span className="d-flex align-items-center purchase-popup">
                                        <p>Welcome to Admin Dashboard</p>
                                        <a href className="btn download-button purchase-button ml-auto">Refresh</a>
                                        <i className="mdi mdi-close" id="bannerClose" />
                                    </span>
                                </div>
                            </div>
                            <div className="page-header">
                                <h3 className="page-title">
                                    <span className="page-title-icon bg-gradient-primary text-white mr-2">
                                        <i className="mdi mdi-home" />
                                    </span> Dashboard
                                </h3>
                                <nav aria-label="breadcrumb">
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item active" aria-current="page">
                                            <span />Overview <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle" />
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="row">
                                <div className="col-md-4 stretch-card grid-margin">
                                    <div className="card bg-gradient-danger card-img-holder text-white">
                                        <div className="card-body">
                                            <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                                            <h4 className="font-weight-normal mb-3">Total Income<i className="mdi mdi-chart-line mdi-24px float-right" />
                                            </h4>
                                            <h2 className="mb-5">$ 15,0000</h2>
                                            <h6 className="card-text">Increased by 60%</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 stretch-card grid-margin">
                                    <div className="card bg-gradient-info card-img-holder text-white">
                                        <div className="card-body">
                                            <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                                            <h4 className="font-weight-normal mb-3">Total Expense<i className="mdi mdi-chart-line mdi-24px float-right" />
                                            </h4>
                                            <h2 className="mb-5">$ 45,6334</h2>
                                            <h6 className="card-text">Decreased by 10%</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 stretch-card grid-margin">
                                    <div className="card bg-gradient-success card-img-holder text-white">
                                        <div className="card-body">
                                            <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                                            <h4 className="font-weight-normal mb-3">Total Mamebers <i className="mdi mdi mdi-account-multiple mdi-24px float-right" />
                                            </h4>
                                            <h2 className="mb-5">95,5741</h2>
                                            <h6 className="card-text">Increased by 5%</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 stretch-card grid-margin">
                                    <div className="card bg-gradient-primary card-img-holder text-white">
                                        <div className="card-body">
                                            <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                                            <h4 className="font-weight-normal mb-3">Mamebers Group<i className="mdi mdi-google-circles-group mdi-24px float-right" />
                                            </h4>
                                            <h2 className="mb-5">95,5741</h2>
                                            <h6 className="card-text">Increased by 5%</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-7 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="clearfix">
                                                <h4 className="card-title float-left">Transactions</h4>
                                                <div id="visit-sale-chart-legend" className="rounded-legend legend-horizontal legend-top-right float-right" />
                                            </div>
                                            <canvas id="visit-sale-chart" className="mt-4" />
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

        </>
    );
}

export default Dashboard;