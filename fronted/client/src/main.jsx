import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import App from './App.jsx';
import Home from './Pages/home/Home.jsx';
import "./index.css"
import LoginPage from './Pages/login/LoginPage.jsx';
import SignupPage from './Pages/signup/SignupPage.jsx';
import UserDashBoard from './Pages/User/UserDashBoard.jsx';
import About from './Pages/about/About.jsx';
import AdminLogin from './Pages/login/AdminLogin.jsx';
import AdminDashboard from './Pages/Admin/AdminDashboard.jsx';
import ADDBalance from './components/ADDBalance.jsx';
import BorderList from './Pages/BorderList/BorderLIst.jsx';
import Profile from './components/Profile.jsx';
import EmailVerifyPage from './Pages/login/EmailVerifyPage.jsx';
import MealMonth from './Meal/MealMonth.jsx';
import MealPlan from './components/MealPlan.jsx';
import BazarList from './Pages/BazarList/BazarList.jsx';
import AddBazarList from './Pages/BazarList/AddBazarList.jsx';
import MonthlyMealTable from './Meal/MealMonth.jsx';
import TotalMealsDashboard from './components/ManagerDashBoard.jsx';
import PendingDepositList from './components/PendingList.jsx';
import ResetPassword from './Pages/login/ResetPassword.jsx';



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About/>} />
        <Route path="contact" element={<div>Contact</div>} />
        <Route path="login" element={<LoginPage/>} />
        <Route path="forgot-password" element={<ResetPassword/>} />
        <Route path="signup" element={<SignupPage/>} />
        <Route path="dashboard" element={<UserDashBoard/>} />
        <Route path="adminlogin" element={<AdminLogin/>} />
        <Route path="admindashboard" element={<AdminDashboard/>} />
        <Route path="addbalance" element={<ADDBalance/>} />
        <Route path="borderlist" element={<BorderList />} />
        <Route path ="profile" element = {<Profile/>}/>
        <Route path='mealmonth' element = {<MonthlyMealTable/>}/>
        <Route path='mealplan' element = {<MealPlan/>} />
        <Route path='verify-email' element = {<EmailVerifyPage/>} />
        <Route path='bazarlist' element = {<BazarList/>} />
        <Route path='addbazarlist' element = {<AddBazarList/>} />
        <Route path='managerdashbaord' element = {<TotalMealsDashboard/>}/>
        <Route path='pendinglist' element = {<PendingDepositList/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
);
