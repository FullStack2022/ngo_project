import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Topbar from './pages/common/Topbar';
import AddFamily from './pages/records/AddFamily';
import EditFamily from './pages/records/EditFamily';
import ManageFamily from './pages/records/ManageFamily';
import SearchMember from './pages/records/SearchMember';
import MamberGroup from './pages/records/MemberGroup';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route exact path="/dashboard" element={<Dashboard />}></Route>
        {/** records routes */}
        <Route exact path="/records/add_family" element={<AddFamily />}></Route>
        <Route exact path="/records/manage_family" element={<ManageFamily />}></Route>
        <Route exact path="/records/edit_family/:id" element={<EditFamily />}></Route>
        <Route exact path="/records/search_member" element={<SearchMember />}></Route>
        <Route exact path="/records/member_group" element={<MamberGroup />}></Route>
        {/** records routes */}
      </Routes>
    </BrowserRouter>
   

      
      </>
  );
}

export default App;
