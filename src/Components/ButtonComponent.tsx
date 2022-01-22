import * as React from "react";
import { Button, ButtonProps, Icon } from "semantic-ui-react";
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic";

export type ButtonComponentProps = {
  loading?: boolean;
  buttonText: string;
  buttonColor?: "green" | "blue" | "red" | "grey";
  isIcon?: boolean;
  iconName?: SemanticICONS;
  isBasic?: boolean;
  onButtonClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ButtonProps
  ) => void;
  disabled?: boolean;
  buttonWideAndCentered?: boolean;
  isSubmit?: boolean;
};

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  loading,
  buttonText,
  buttonColor,
  isIcon,
  iconName,
  isBasic,
  onButtonClick,
  disabled,
  buttonWideAndCentered,
  isSubmit
}) => {
  return (
    <Button
      loading={loading}
      size="medium"
      basic={isBasic}
      color={buttonColor}
      onClick={onButtonClick}
      disabled={disabled}
      style={buttonWideAndCentered ? { width: "100%", margin: "auto" } : {}}
      type={isSubmit ? "submit" : "button"}
    >
      {isIcon ? <Icon name={iconName} size="small" /> : null} {buttonText}
    </Button>
  );
};

export default ButtonComponent;
