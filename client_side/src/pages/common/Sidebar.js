import { Link } from 'react-router-dom';
import { BASE_URL } from '../../config/Constants';
const Sidebar = () => {
    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
                <li className="nav-item nav-profile">
                    <a href="#" className="nav-link">
                        <div className="nav-profile-image">
                            <img src={BASE_URL+`assets/images/faces/face1.jpg`} alt="profile" />
                            <span className="login-status online" />
                            {/*change to offline or busy as needed*/}
                        </div>
                        <div className="nav-profile-text d-flex flex-column">
                            <span className="font-weight-bold mb-2">Deepak Tailor</span>
                            <span className="text-secondary text-small">Admin</span>
                        </div>
                        <i className="mdi mdi-bookmark-check text-success nav-profile-badge" />
                    </a>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">
                        <span className="menu-title">Dashboard</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                        <span className="menu-title">Accounts</span>
                        <i className="menu-arrow" />
                    </a>
                    <div className="collapse" id="ui-basic">
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item"> <a className="nav-link" href="view_files/accounts/income/add_income.html">Add Income</a></li>
                            <li className="nav-item"> <a className="nav-link" href="view_files/accounts/income/manage_income.html">Manage Income</a></li>
                            <li className="nav-item"> <a className="nav-link" href="view_files/accounts/expense/add_expense.html">Add Expense</a></li>
                            <li className="nav-item"> <a className="nav-link" href="view_files/accounts/expense/manage_expense.html">Manage Expense</a></li>
                            <li className="nav-item"> <a className="nav-link" href="view_files/accounts/reimbursment/manage_reimbursment.html">Reimbursment</a></li>
                            <li className="nav-item"> <a className="nav-link" href="view_files/accounts/members/view_member_account_details.html">Individual Account Journal</a></li>
                            <li className="nav-item"> <a className="nav-link" href="view_files/accounts/transactions/manage_transaction.html">Transaction</a></li>
                            <li className="nav-item"> <a className="nav-link" href="view_files/accounts/summary/manage_summary.html">Summary </a></li>
                            <li className="nav-item"> <a className="nav-link" href="view_files/accounts/members/view_member_account_details.html">Family Account Details</a></li>
                            <li className="nav-item"> <a className="nav-link" href="view_files/accounts/transactions/approved_pending_transactions.html">Approved Pending Transactions</a></li>
                            <li className="nav-item"> <a className="nav-link" href="view_files/accounts/transactions/uncleared_transactions.html">Uncleared Transactions</a></li>
                            <li className="nav-item"> <a className="nav-link" href="pages/ui-features/typography.html">Previous Dues</a></li>
                            <li className="nav-item"> <a className="nav-link" href="pages/ui-features/typography.html"> Previous Balance</a></li>
                            <li className="nav-item"> <a className="nav-link" href="pages/ui-features/typography.html">Pledge </a></li>
                            <li className="nav-item"> <a className="nav-link" href="pages/ui-features/typography.html">Bank Balances</a></li>
                            <li className="nav-item"> <a className="nav-link" href="pages/ui-features/typography.html">Auctions </a></li>
                            <li className="nav-item"> <a className="nav-link" href="pages/ui-features/typography.html">Family Exclusions</a></li>
                            <li className="nav-item"> <a className="nav-link" href="pages/ui-features/typography.html">Account Audit View</a></li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="collapse" href="#records" aria-expanded="false" aria-controls="ui-basic">
                        <span className="menu-title">Records</span>
                        <i className="menu-arrow" />
                    </a>
                    <div className="collapse" id="records">
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item"> <Link className="nav-link" to="/records/add_family">Add Family</Link></li>
                            <li className="nav-item"> <Link className="nav-link" to="/records/manage_family">Manage Families</Link></li>
                            <li className="nav-item"> <Link className="nav-link" to="/records/search_member">Search Members</Link></li>
                            <li className="nav-item"> <Link className="nav-link" to="/records/member_group">Member Group</Link></li>
                            <li className="nav-item"> <Link className="nav-link" to="/records/inventory">Inventroy</Link></li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="collapse" href="#notifications" aria-expanded="false" aria-controls="ui-basic">
                        <span className="menu-title">Notifications</span>
                        <i className="menu-arrow" />
                    </a>
                    <div className="collapse" id="notifications">
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item"> <a className="nav-link" href="view_files/notifications/send_email.html">Send Email</a></li>
                            <li className="nav-item"> <a className="nav-link" href="view_files/notifications/get_email.html">Get Email</a></li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="collapse" href="#events" aria-expanded="false" aria-controls="ui-basic">
                        <span className="menu-title">Events</span>
                        <i className="menu-arrow" />
                    </a>
                    <div className="collapse" id="events">
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item"> <a className="nav-link" href="pages/ui-features/buttons.html">Add Event</a></li>
                            <li className="nav-item"> <a className="nav-link" href="pages/ui-features/buttons.html">Manage Events</a></li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="collapse" href="#my_account" aria-expanded="false" aria-controls="ui-basic">
                        <span className="menu-title">My Account</span>
                        <i className="menu-arrow" />
                    </a>
                    <div className="collapse" id="my_account">
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item"> <a className="nav-link" href="view_files/my_account/account/account.html">Account</a></li>
                            <li className="nav-item"> <a className="nav-link" href="view_files/my_account/my_profile.html">My Profile</a></li>
                            <li className="nav-item"> <a className="nav-link" href="view_files/my_account/find_member.html">Find Members</a></li>
                            <li className="nav-item"> <a className="nav-link" href="view_files/my_account/my_settings.html">My Settings</a></li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="collapse" href="#history" aria-expanded="false" aria-controls="ui-basic">
                        <span className="menu-title">History</span>
                        <i className="menu-arrow" />
                    </a>
                    <div className="collapse" id="history">
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item"> <a className="nav-link" href="view_files/history/tracking_history.html">Tracking History</a></li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="collapse" href="#settings" aria-expanded="false" aria-controls="ui-basic">
                        <span className="menu-title">Settings</span>
                        <i className="menu-arrow" />
                    </a>
                    <div className="collapse" id="settings">
                        <ul className="nav flex-column sub-menu">
                            <li className="nav-item"> <a className="nav-link" href="view_files/settings/general_settings.html">General Settings</a></li>
                            <li className="nav-item"> <a className="nav-link" href="view_files/settings/manage_items.html">Manage Items</a></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </nav>
    );
}

export default Sidebar;