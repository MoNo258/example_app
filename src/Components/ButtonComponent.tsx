import * as React from "react";
import { Button, ButtonProps, Icon } from "semantic-ui-react";
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic";

export type ButtonComponentProps = {
  loading?: boolean;
  buttonText: string;
  buttonColor?: "green" | "blue" | "red";
  isIcon?: boolean;
  iconName?: SemanticICONS;
  isBasic?: boolean;
  onButtonClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ButtonProps
  ) => void;
};

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  loading,
  buttonText,
  buttonColor,
  isIcon,
  iconName,
  isBasic,
  onButtonClick
}) => {
  return (
    <Button
      loading={loading}
      size="medium"
      basic={isBasic}
      color={buttonColor}
      onClick={onButtonClick}
      // onClick={param => onButtonClick(param)}
    >
      {isIcon ? <Icon name={iconName} size="small" /> : null} {buttonText}
    </Button>
  );
};

export default ButtonComponent;
