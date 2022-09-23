import React, { useCallback } from "react";

import { cpf } from "../utils/mask";

const Input = ({ mask, ...props }) => {
  const handleKeyUp = useCallback(
    (e) => {
      if (mask === "cpf") {
        cpf(e);
      }
    },
    [mask]
  );

  return <input {...props} onKeyUp={handleKeyUp} />;
};

export default Input;
