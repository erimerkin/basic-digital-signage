import { useState } from "react";

interface CollapsibleButtonProps {
  callback: () => void;
}

const CollapsibleButton: React.FC<CollapsibleButtonProps> = ({ callback }) => {

  const toggleForm = () => {
    callback();
  };

  return (
    <button className="collapsible-button" onClick={toggleForm}>
      Add new media
    </button>
  );
};

export default CollapsibleButton;
