// Created by Alfredo Rodriguez.
// <summary>
// TermsOfUseComponent will render the page terms of use.
// </summary>
import React from 'react';

function TermsOfUse() {
  // #region render.
  return (
    <div className="container" style={{ width: '100%', height: '100vh' }}>
      <iframe src="https://ws.carnessupremaslapaz.com/assets/Términos y condiciones-CarnesSupremas-2020.pdf"
        style={{ width: '100%', height: '100%' }}>
      </iframe>
    </div>
  );
  // #endregion render.
}

export default TermsOfUse;
