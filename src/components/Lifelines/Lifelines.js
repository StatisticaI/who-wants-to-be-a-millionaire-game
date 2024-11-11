import React from 'react';

const Lifelines = ({ use50, useAudience, disabled50, disabledAudience }) => {
  return (
    <div className="lifelines">
      <button onClick={use50} disabled={disabled50}>
        50/50
      </button>

      <button onClick={useAudience} disabled={disabledAudience}>
        Audience Help
      </button>
    </div>
  );
};

export default Lifelines;
