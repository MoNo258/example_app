import * as React from "react";
import { ButtonProps, Form, Image, Modal } from "semantic-ui-react";
import styled from "styled-components";
import ButtonComponent from "../../Components/ButtonComponent";

export const AddHeroStyled = styled.div``;
export type AddHeroProps = {
  loading: boolean;
  openModal: boolean;
  onClose: () => void;
  onOpen: () => void;
  addHero: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ButtonProps
  ) => void;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (
    e: React.SyntheticEvent<HTMLElement, Event>,
    data: {}
  ) => void;
  optionsForSelect: OptionsForSelect[];
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  saveHero: () => void;
  isDisabled: boolean;
};
const AddHero: React.FC<AddHeroProps> = ({
  loading,
  openModal,
  onClose,
  onOpen,
  addHero,
  onAvatarChange,
  onNameChange,
  onSelectChange,
  optionsForSelect,
  onDescriptionChange,
  saveHero,
  isDisabled
}) => {
  return (
    <Modal
      closeIcon
      onClose={onClose}
      onOpen={onOpen}
      open={openModal}
      trigger={
        <ButtonComponent
          loading={loading}
          isIcon
          iconName="plus"
          buttonText="Add hero"
          buttonColor="green"
          onButtonClick={addHero}
        />
      }
      style={{ width: "40%" }}
    >
      <Modal.Header>Add hero</Modal.Header>
      <Modal.Content>
        <Image
          size="small"
          src="https://cdn.pixabay.com/photo/2016/06/16/08/42/monster-1460885_960_720.png"
          circular
        />
        <Modal.Description style={{ padding: "0" }}>
          <Form>
            <Form.Input required label="Avatar URL" onChange={onAvatarChange} />
            <Form.Input required label="Full name" onChange={onNameChange} />
            <Form.Select
              required
              label="Type"
              options={optionsForSelect}
              placeholder="Select type"
              onChange={onSelectChange}
            />
            <Form.TextArea
              required
              label="Description"
              onChange={onDescriptionChange}
            />
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions style={{ margin: "auto" }}>
        <ButtonComponent
          loading={loading}
          buttonText="Save"
          buttonColor="green"
          onButtonClick={saveHero}
          disabled={isDisabled ? true : false}
          buttonWideAndCentered
        />
      </Modal.Actions>
    </Modal>
  );
};

export default AddHero;
