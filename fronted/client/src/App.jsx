import Nabvar from './components/Nabvar';
import { Outlet, useLocation } from 'react-router';
import Footer from './components/Footer';
import UserContextProvider from './Context/UserContextProvider';
import Sidebar from './components/Sidebar';
import {Toaster} from 'react-hot-toast';

const App = () => {
  const location = useLocation();

  const hideNavbarPaths = ['','','','','','','','','']
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);
  
  return (
   <UserContextProvider>
    {
      !shouldHideNavbar && (
        <nav><Nabvar/></nav>
      )}
   
   <main className='min-h-screen pt-20 bg-white'><Outlet/></main>
   <Toaster position='top-center' reverseOrder={false} />
   {/* Show Footer only if not in hidden paths */}
   {
    !shouldHideNavbar && <Footer/>
   }
   </UserContextProvider>
  );
};

export default App;

