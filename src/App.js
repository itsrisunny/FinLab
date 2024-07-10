import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./assets/css/style.css";
import "./assets/css/custom.css";
import "./assets/css/responsive.css";
import "./assets/js/custom.js";

import Home from "./component/home/index";
import Login from "./component/login/index";
import LoanApply from "./component/loan-apply/index";
import Dashboard from "./component/dashboard/index";
import MyOffer from "./component/dashboard/myOffer.js";
import MyProfile from "./component/dashboard/myProfile.js";
import MyDocument from "./component/dashboard/myDocument.js";
import MyApplication from "./component/dashboard/myApplication.js";
import LoanInfo from "./component/dashboard/loanInfo.js";
import HelpDesk from "./component/dashboard/helpDesk.js";
import Products from "./component/products/index";
import Partner from "./component/home/partner";
import AdminLogin from "./component/admin/login";
import AdminDashboard from "./component/admin/dashboard";
import AdminLeadCase from "./component/admin/case/leadCase.js";
import AdminIncompleteLeadCase from "./component/admin/case/incompleteLeadCase.js";
import AdminDeclinedLeadCases from "./component/admin/case/declinedCases.js";
import AdminPartnerList from "./component/admin/partner/index.js";
import AdminPartnerView from "./component/admin/partner/partnerView.js";
import AdminPartnerAssignRole from "./component/admin/partner/assignRole.js";
import AdminWecomedUserList from "./component/admin/case/listWelcomeCases.js";
import AdminAddCase from "./component/admin/case/add-case";

import AdminOfferedCase from "./component/admin/case/offerd-case";
import AddBank from "./component/admin/master/addBank.js";
import CaseDetail from "./component/admin/case";
import TermsOfUse from "./component/home/termsofuse.js";
import Declaration from "./component/home/declaration.js";
import PrivacyPolicy from "./component/home/privacypolicy.js";

import PartnersLogin from "./component/partners/login";
import PartnerResetPassword from "./component/partners/login/forgot-password";
import PartnersDashboards from "./component/partners/dashboard/index.js";
import PartnerAddCases from "./component/partners/cases/add-cases.js";

import PartnerViewIndividualCases from "./component/partners/cases/view-individual-case.js";

import PartnerPersonalAddCases from "./component/partners/personalCases/add-cases";
import PartnerAddCase from "./component/partners/cases/add-case";
import PartnerPersonalAddCase from "./component/partners/personalCases/add-case";
import PartnerViewPersIndividualCases from "./component/partners/personalCases/view-individual-case";

import PerosnalIncLeadCase from "./component/admin/personalLoan/incompleteLeadCase";
import PerosnalLeadCase from "./component/admin/personalLoan/leadCase";
import PerosnalOfferCase from "./component/admin/personalLoan/offerd-case";
import PerosnalWelcomeCase from "./component/admin/personalLoan/listWelcomeCases";
import PerosnalDeclinedCase from "./component/admin/personalLoan/declinedCases";
import PerosnalCaseDetail from "./component/admin/personalLoan";
import AdminPersonalAddCase from "./component/admin/personalLoan/add-case";
import VerifyEmailComponent from "./component/VerifyEmailComponent";
import RoleWrapper from "./RoleRoute";
import UnAuthorized from "./component/unAuthorised.js";

function App() {
  const [menuAccess, setMenuAccess] = React.useState({});
  console.log(menuAccess);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} exact={true} />
        <Route path="/login" element={<Login />} exact={true} />
        <Route path="/products" element={<Products />} exact={true} />
        <Route path="/loan-apply" element={<LoanApply />} exact={true} />
        <Route path="/dashboard" element={<Dashboard />} exact={true} />
        <Route path="/dashboard/myOffer" element={<MyOffer />} exact={true} />
        <Route
          path="/dashboard/myProfile"
          element={<MyProfile />}
          exact={true}
        />
        <Route
          path="/dashboard/myDocument"
          element={<MyDocument />}
          exact={true}
        />
        <Route
          path="/dashboard/myApplication"
          element={<MyApplication />}
          exact={true}
        />
        <Route path="/dashboard/loanInfo" element={<LoanInfo />} exact={true} />
        <Route path="/dashboard/helpDesk" element={<HelpDesk />} exact={true} />
        <Route path="/partner" element={<Partner />} exact={true} />
        <Route path="/terms-of-use" element={<TermsOfUse />} exact={true} />
        <Route path="/declaration" element={<Declaration />} exact={true} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} exact={true} />

        <Route path="/admin/login" element={<AdminLogin />} exact={true} />
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
          exact={true}
        />
        <Route
          path="/admin/lead-case"
          element={<AdminLeadCase />}
          exact={true}
        />
        <Route path="/admin/add-bank" element={<AddBank />} exact={true} />
        <Route
          path="/admin/case-detail/:caseID/:type/:offerId"
          element={<CaseDetail />}
          exact={true}
        />
        <Route
          path="/admin/offered-case"
          element={<AdminOfferedCase />}
          exact={true}
        />
        <Route
          path="/admin/incomplete-lead-case"
          element={<AdminIncompleteLeadCase />}
          exact={true}
        />
        <Route
          path="/admin/declined-cases"
          element={<AdminDeclinedLeadCases />}
          exact={true}
        />
        <Route
          path="/admin/partner/index"
          element={<AdminPartnerList />}
          exact={true}
        />
        <Route
          path="/admin/partner/assignRole"
          element={<AdminPartnerAssignRole />}
          exact={true}
        />
        <Route
          path="/admin/partner-detail/:Id"
          element={<AdminPartnerView />}
          exact={true}
        />
        <Route
          path="/admin/welcomed-cases"
          element={<AdminWecomedUserList />}
          exact={true}
        />
        <Route path="/admin/add/case" element={<AdminAddCase />} exact={true} />

        <Route
          path="/admin/personal/add/case"
          element={<AdminPersonalAddCase />}
          exact={true}
        />
        <Route
          path="/admin/personal/incomplete-lead-case"
          element={<PerosnalIncLeadCase />}
          exact={true}
        />
        <Route
          path="/admin/personal/lead-case"
          element={<PerosnalLeadCase />}
          exact={true}
        />
        <Route
          path="/admin/personal/offered-case"
          element={<PerosnalOfferCase />}
          exact={true}
        />
        <Route
          path="/admin/personal/welcomed-cases"
          element={<PerosnalWelcomeCase />}
          exact={true}
        />
        <Route
          path="/admin/personal/declined-cases"
          element={<PerosnalDeclinedCase />}
          exact={true}
        />
        <Route
          path="/admin/personal/case-detail/:caseID/:type/:offerId"
          element={<PerosnalCaseDetail />}
          exact={true}
        />

        <Route
          path="/partners/login"
          element={<PartnersLogin />}
          exact={true}
        />
        <Route
          path="/partners/reset-password"
          element={<PartnerResetPassword />}
          exact={true}
        />
        <Route
          path="/partners-admin/dashboard"
          element={
            <RoleWrapper role="Partner" setMenuAccess={setMenuAccess}>
              <PartnersDashboards menuAccess={menuAccess} />
            </RoleWrapper>
          }
          exact={true}
        />
        <Route
          path="/partners-admin/add-cases"
          element={
            <RoleWrapper role="Partner" setMenuAccess={setMenuAccess}>
              {menuAccess?.permissions?.businessLoan?.closedLead ||
              menuAccess?.permissions?.businessLoan?.declinedLead ||
              menuAccess?.permissions?.businessLoan?.incompleteLead ||
              menuAccess?.permissions?.businessLoan?.lead ||
              menuAccess?.permissions?.businessLoan?.offeredLead ? (
                <PartnerAddCases menuAccess={menuAccess} />
              ) : (
                <UnAuthorized menuAccess={menuAccess} />
              )}
            </RoleWrapper>
          }
          exact={true}
        />
        <Route
          path="/partners-admin/add/case"
          element={
            <RoleWrapper role="Partner" setMenuAccess={setMenuAccess}>
              {menuAccess?.permissions?.businessLoan?.addCase ? (
                <PartnerAddCase menuAccess={menuAccess} />
              ) : (
                <UnAuthorized menuAccess={menuAccess} />
              )}
            </RoleWrapper>
          }
          exact={true}
        />
        <Route
          path="/partners-admin/personal/add-cases"
          element={
            <RoleWrapper role="Partner" setMenuAccess={setMenuAccess}>
              {menuAccess?.permissions?.personalLoan?.closedLead ||
              menuAccess?.permissions?.personalLoan?.declinedLead ||
              menuAccess?.permissions?.personalLoan?.incompleteLead ||
              menuAccess?.permissions?.personalLoan?.lead ||
              menuAccess?.permissions?.personalLoan?.offeredLead ? (
                <PartnerPersonalAddCases menuAccess={menuAccess} />
              ) : (
                <UnAuthorized menuAccess={menuAccess} />
              )}
            </RoleWrapper>
          }
          exact={true}
        />
        <Route
          path="/partners-admin/view-partner-case-detail/:caseID/:type/:offerId"
          element={
            <RoleWrapper role="Partner" setMenuAccess={setMenuAccess}>
              {menuAccess?.permissions?.businessLoan?.closedLead ||
              menuAccess?.permissions?.businessLoan?.declinedLead ||
              menuAccess?.permissions?.businessLoan?.incompleteLead ||
              menuAccess?.permissions?.businessLoan?.lead ||
              menuAccess?.permissions?.businessLoan?.offeredLead ? (
                <PartnerViewIndividualCases menuAccess={menuAccess} />
              ) : (
                <UnAuthorized menuAccess={menuAccess} />
              )}
            </RoleWrapper>
          }
          exact={true}
        />

        <Route
          path="/partners-admin/personal/add-case"
          element={
            <RoleWrapper role="Partner" setMenuAccess={setMenuAccess}>
              {menuAccess?.permissions?.personalLoan?.addCase ? (
                <PartnerPersonalAddCase menuAccess={menuAccess} />
              ) : (
                <UnAuthorized menuAccess={menuAccess} />
              )}
            </RoleWrapper>
          }
          exact={true}
        />
        <Route
          path="/partners-admin/personal/case-detail/:caseID/:type/:offerId"
          element={
            <RoleWrapper role="Partner" setMenuAccess={setMenuAccess}>
              {menuAccess?.permissions?.personalLoan?.closedLead ||
              menuAccess?.permissions?.personalLoan?.declinedLead ||
              menuAccess?.permissions?.personalLoan?.incompleteLead ||
              menuAccess?.permissions?.personalLoan?.lead ||
              menuAccess?.permissions?.personalLoan?.offeredLead ? (
                <PartnerViewPersIndividualCases menuAccess={menuAccess} />
              ) : (
                <UnAuthorized menuAccess={menuAccess} />
              )}
            </RoleWrapper>
          }
          exact={true}
        />
        <Route
          path="/verify-email"
          element={<VerifyEmailComponent />}
          exact={true}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
