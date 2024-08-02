import AdminHeader from "../../layouts/admin-header";
import AdminFooter from "../../layouts/admin-footer";
import AdminNavBar from "../../layouts/admin-nav-bar";
export default function UnAuthorized({ menuAccess }) {
  return (
    <div className="layout-wrapper">
      <div className="layout-container">
        <AdminNavBar menuAccess={menuAccess} />
        <div className="adminMain-wrapper">
          <AdminHeader />
          <div className="mainContent">
            <div className="access-denied-container">
              <h1>Under Construction</h1>
              <p>
                Our website is currently being updated. We apologize for the
                inconvenience and appreciate your patience.
              </p>

              <p>
                We expect to be back online soon. Thank you for your
                understanding.
              </p>
            </div>
          </div>
          <AdminFooter />
        </div>
      </div>
    </div>
  );
}
