// Created by Alfredo Rodriguez.
// <summary>
// CompanyComponent will render each company with its description.
// </summary>
import React from 'react';
import { Card } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { Constants } from './Constants';
const UrlEndpoints = Constants.UrlEndpoints;

function Company({ company }) {
  // #region private properties.
  let history = useHistory();
  const { Name, Address, Neighborhood, City, Phone, WeekStartTime, WeekEndTime, SundayStartTime, c } = company;
  const tel = 'tel:' + Phone;
  // #endregion private properties.

  // #region render.
  return (
    <div class="row my-4 p-2" style={{ border: '2px solid' }}>
      <div class="col-sm-7">
        <p>{Name}</p>
        <p>{Address}, {Neighborhood}, {City}</p>
        <p> <a href={tel}>{Phone}</a></p>
      </div>
      <div class="col-sm-5 ">
        <p> Horario de Lunes a Sabado: </p>
        <p>{WeekStartTime} a {WeekEndTime} </p>
        <p> Horario de Domingos:</p>
        <p>{SundayStartTime} a {SundayStartTime}</p>
      </div>
    </div>
  );
  // #endregion render.

}

export default Company;
