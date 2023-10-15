import { useState } from "react";

interface CollapsibleButtonProps {
    callback: (isActive: boolean) => void;
    }

const CollapsibleButton: React.FC<CollapsibleButtonProps> = ( { callback }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleForm = () => {
    setIsActive(!isActive);
    callback(isActive);
  };

  return (
    <button className="collapsible-button" onClick={toggleForm}>
      Add new media
    </button>
  );
};

export default CollapsibleButton;
