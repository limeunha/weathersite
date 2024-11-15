import './css/Menu.css'
import { NavLink } from 'react-router-dom'

function Menu() {
   return (
      <header>
         <nav>
            <ul>
               <li>
                  <NavLink to="/">
                     <img src="/images/pngwing.png" alt="로고" width="40" />
                  </NavLink>
               </li>
               <li>
                  <NavLink to="/home">HOME</NavLink>
               </li>
               <li>
                  <NavLink to="/forecast">주간예보</NavLink>
               </li>
            </ul>
         </nav>
      </header>
   )
}

export default Menu
