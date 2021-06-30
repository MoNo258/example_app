import * as React from "react";
import { Button, Icon } from "semantic-ui-react";

export type ButtonComponentProps = {
  buttonText: string;
  buttonColor?: "green" | "blue";
  isIcon: boolean;
};

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  buttonText,
  buttonColor,
  isIcon
}) => {
  return (
    <Button size="medium" color={buttonColor}>
      {isIcon ? <Icon name="plus" size="small" /> : null} {buttonText}
    </Button>
  );
};

export default ButtonComponent;
