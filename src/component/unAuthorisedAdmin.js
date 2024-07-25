import AdminHeader from "./layouts/admin-header";
import AdminFooter from "./layouts/admin-footer";
import AdminNavBar from "./layouts/admin-nav-bar";
export default function UnAuthorized({ menuAccess }) {
  return (
    <div className="layout-wrapper">
      <div className="layout-container">
        <AdminNavBar menuAccess={menuAccess} />
        <div className="adminMain-wrapper">
          <AdminHeader />
          <div className="mainContent">
            <div className="access-denied-container">
              <h1>Access Denied</h1>
              <p>You do not have permission to access this page.</p>
              <p>Please contact your administrator for more information.</p>
            </div>
          </div>
          <AdminFooter />
        </div>
      </div>
    </div>
  );
}
