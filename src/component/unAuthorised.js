import AdminHeader from "./partners/layouts/partner-admin-header";
import AdminFooter from "./partners/layouts/partner-admin-footer";
import AdminNavBar from "./partners/layouts/partner-admin-nav-bar";
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
