// Created by Alfredo Rodriguez.
// <summary>
// CompanyListComponent will render the companies that exist in the application.
// </summary>
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadStores } from '../redux/thunks/StoreThunks';
import Company from './CompanyComponent';

function CompanyList({ companyList, isLoading, startLoadingCompanies }) {

  // #region private methods.
  useEffect(() => {
    startLoadingCompanies();
  }, []);
  // #endregion private methods.

  // #region render.
  const loadingMessage = <div className="loader-container"><div className="loader"></div></div>

  const content =
    <div className="container paper-container p-4">
      <h1 className="text-center w-100 m-2">NEGOCIOS</h1>
      <ul className="container">
        {
          companyList.map((company) => {
            return (
              <Company key={company.Name} company={company} />
            );
          })
        }
      </ul>
    </div>;

  return isLoading ? loadingMessage : content;
  // #endregion render.
}

// #region redux.
const mapStateToProps = state => ({
  companyList: state.StoreList,
  isLoading: state.IsLoading
});

const mapDispatchToProps = dispatch => ({
  startLoadingCompanies: () => dispatch(loadStores())
});
// #endregion redux.

export default connect(mapStateToProps, mapDispatchToProps)(CompanyList);
