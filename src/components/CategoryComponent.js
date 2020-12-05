// Created by Alfredo Rodriguez.
// <summary>
// CategoryComponent will render each category with its image and provide the ability to redirect to the product page with items belonging only to that category.
// </summary>
import React from 'react';
import { Card } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { Constants } from './Constants';
const UrlEndpoints = Constants.UrlEndpoints;

function Category({ category }) {
  // #region private properties.
  let history = useHistory();
  const { Id, Description, Image } = category;
  // #endregion private properties.

  // #region public methods.
  const handleClick = () => {
    history.push({ pathname: UrlEndpoints.products, search: `?category=${Id}` });
  }
  // #endregion public methods.

  // #region render.
  return (
    <div className="col-12 col-sm-6 col-lg-4" onClick={handleClick}>
      <div className="m-2 px-1 py-4" >
        <div className="img-container" style={{ display: 'flex' }}>
          <img className="rounded-img" src={Image} alt={Description} />
        </div>
        <hr style={{ width: '50px', border: '1px solid rgba(128,128,128, 0.3)' }} />
        <div className="col-12">
          <h5 className="text-center">{Description}</h5>
        </div>
      </div>
    </div>
  );
  // #endregion render.
}

export default Category;
