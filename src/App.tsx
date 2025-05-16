import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Admin from './pages/Dashboards/Admin';
import Member from './pages/Dashboards/Member';
import Users from './pages/Admin/Users';
import User from './pages/Admin/User';
import CreateUser from './pages/Admin/CreateUser';
import Tasks from './pages/Admin/Tasks';
import CreateTask from './pages/Admin/CreateTask';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

function AppRoutes() {

  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/admin-dashboard' element={<Admin />} />
      <Route path='/member-dashboard' element={<Member />} />
      <Route path='/users' element={<Users />} />
      <Route path='/tasks/user/:id' element={<User />} />
      <Route path='/create' element={<CreateUser />} />
      <Route path='/admin/tasks' element={<Tasks />} />
      <Route path='/create-task' element={<CreateTask />} />
      <Route path='*' element={<div>Page Not Found</div>} />
    </Routes>
  );
}

export default App;
