import route, { getRoutes } from '../../containers/route';
import { NavLink } from 'react-router-dom';
import logoutIcon from '../../assets/icon/logout-icon.png';
import userIcon from '../../assets/icon/user-icon.png';
import storageService from '../../utils/storage.service';
import { AuthKeys } from '../../constant';

const AppSidebar = ({handleLogout}) => (
  <footer className="app-sidebar">
    <div className="container">
      <h1 style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>LOGO</h1>
      <hr />
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
      }}>
        <div>
          {
            getRoutes(JSON.parse(storageService.get(AuthKeys.CURRENT_USER))).map((item, index) => (
              <div key={index} className={'item-sidebar'}>
                <NavLink to={item.path} className={'link-item'} activeclassname={'active'}>
                  <img src={item.icon} alt={'icon'} /> <span>{item.name}</span>
                </NavLink>
                <hr />
              </div>
            ))
          }
        </div>

        <div className={'sidebar-info'}>
          <div>
            <img src={userIcon} alt={'logout'} style={{
              width: '40px',
            }} />
          </div>
          <div>
            <p style={{color: 'white', lineHeight: '0px', fontSize: '26px', paddingTop: '16px'}}>
              {JSON.parse(storageService.get(AuthKeys.CURRENT_USER))?.username}
            </p>
          </div>
          <div>
            <img src={logoutIcon} alt={'logout'}  style={{
              width: '24px',
              cursor: 'pointer',
            }}
            onClick={handleLogout}/>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default AppSidebar;