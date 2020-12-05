// Created by Alfredo Rodriguez.
// <summary>
// PrivacyStatementComponent will render the legal privacy statement.
// </summary>
import React from 'react';

function PrivacyStatement() {
  // #region render.
  return(
    <div className="container" style={{ width: '100%', height: '100vh' }}>
      <iframe src="https://ws.carnessupremaslapaz.com/assets/AvisoPrivacidadIntegral-CarnesSupremas.pdf"
        style={{ width: '100%', height: '100%' }}>
      </iframe>
    </div>
  );
  // #endregion render.
}

export default PrivacyStatement;
