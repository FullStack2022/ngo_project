import express from 'express';
import validateToken from './ValidateToken';
import { PageNotFound, AdminController, FamilyController } from '../controllers/index';

// call router function
const route = express.Router();


// set all routes

// admin login
route.post('/login', AdminController.login);

// family routes
route.post('/add_family', validateToken ,FamilyController.add_family);
route.post('/all_family_list', validateToken ,FamilyController.all_family_list);
route.post('/delete_family', validateToken ,FamilyController.delete_family);
route.post('/single_family_details', validateToken ,FamilyController.single_family_details);
route.post('/update_family', validateToken ,FamilyController.update_family);

route.post('/search_family_members', validateToken ,FamilyController.search_family_members);
route.post('/create_group', validateToken ,FamilyController.create_group);
route.post('/all_group_list', validateToken ,FamilyController.all_group_list);
route.post('/single_group', validateToken ,FamilyController.single_group);
route.post('/edit_group', validateToken ,FamilyController.edit_group);
route.post('/delete_group', validateToken ,FamilyController.delete_group);

route.all('*', PageNotFound.page_not_found);

export default route;