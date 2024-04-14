import route from '../../containers/route';
import { NavLink } from 'react-router-dom';

const AppSidebar = () => (
  <footer className="app-sidebar">
    <div className="container">
      <h1 style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>LOGO</h1>
      <hr />
      <div>
        {
          route.map((item, index) => (
            <div key={index} className={'item-sidebar'}>
              <NavLink to={item.path} className={'link-item'} activeclassname={'active'}>
                <img src={item.icon} alt={'icon'} /> <span>{item.name}</span>
              </NavLink>
              <hr />
            </div>
          ))
        }
      </div>
    </div>
  </footer>
);

export default AppSidebar;