import React from "react";
import Modal from "./modal";
import { render } from "../../test-utils";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { fireEvent } from "@testing-library/react";

describe("<Modal />", () => {
  let props;
  beforeEach(() => {
    props = {
      onClose: jest.fn(),
      onSubmit: jest.fn(),
      submitDisabled: false,
      header: {
        text: "Unit Test Modal",
        startIcon: faUserPlus,
        endIcon: faUserPlus
      },
      dataTestId: "testModal",
      submitTooltip: "Unit test tooltip"
    };
  });

  it("should mount the component", () => {
    const component = render(<Modal {...props} />);
    expect(component).toBeDefined();
  });

  it("should call the onClose method when the area outside of the modal box is clicked", () => {
    const {getByTestId} = render(<Modal {...props} />);
    const outsideArea = getByTestId(`${props.dataTestId}.wrapper`);
    fireEvent.mouseDown(outsideArea);
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });

  it("should not call the onClose method when the area outside of the modal box is clicked and confirmBeforeClose is true", () => {
    props.confirmBeforeClose = true;
    const {getByTestId} = render(<Modal {...props} />);
    const outsideArea = getByTestId(`${props.dataTestId}.wrapper`);
    fireEvent.mouseDown(outsideArea);
    expect(props.onClose).not.toHaveBeenCalled();
  });

  it("should call the onClose method when the close button is clicked", () => {
    const {getByTestId} = render(<Modal {...props} />);
    const closeButton = getByTestId(`${props.dataTestId}.closeButton`);
    fireEvent.click(closeButton);
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });

  it("should show a confirm prompt if close button is clicked and confirmBeforeClose is true", () => {
    props.confirmBeforeClose = true;
    window.confirm = jest.fn();
    const {getByTestId} = render(<Modal {...props} />);
    const closeButton = getByTestId(`${props.dataTestId}.closeButton`);
    fireEvent.click(closeButton);
    expect(window.confirm).toHaveBeenCalled();
  });

  it("should render the header text and icons if provided", () => {
    const {getByTestId, getByText} = render(<Modal {...props} />);
    expect(getByTestId(`${props.dataTestId}.header`)).toBeDefined();
    expect(getByTestId(`${props.dataTestId}.header.startIcon`)).toBeDefined();
    expect(getByTestId(`${props.dataTestId}.header.endIcon`)).toBeDefined();
    expect(getByText(props.header.text)).toBeDefined();
  });

  it("should render the modal body", () => {
    const bodyText = "unit testing modal body";
    const {getByTestId, getByText} = render(<Modal {...props}>{bodyText}</Modal>);
    expect(getByTestId(`${props.dataTestId}.body`)).toBeDefined();
    expect(getByText(bodyText)).toBeDefined();
  });

  it("should render the modal actions section and buttons", () => {
    const {getByTestId} = render(<Modal {...props} />);
    expect(getByTestId(`${props.dataTestId}.actions`)).toBeDefined();
    expect(getByTestId(`${props.dataTestId}.actions.primaryButton`)).toBeDefined();
    expect(getByTestId(`${props.dataTestId}.actions.secondaryButton`)).toBeDefined();
  });

  it("should disable the submit button if submitDisabled is true", () => {
    props.submitDisabled = true;
    const {getByTestId} = render(<Modal {...props} />);
    const submitButton = getByTestId(`${props.dataTestId}.actions.primaryButton`);
    expect(submitButton).toBeDisabled();
  });
  
  it("should call the onSubmit method when the submit button is clicked", () => {
    const {getByTestId} = render(<Modal {...props} />);
    const submitButton = getByTestId(`${props.dataTestId}.actions.primaryButton`);
    fireEvent.click(submitButton);
    expect(props.onSubmit).toHaveBeenCalledTimes(1);
  });

  it("should call the onClose method when the cancel button is clicked", () => {
    const {getByTestId} = render(<Modal {...props} />);
    const cancelButton = getByTestId(`${props.dataTestId}.actions.secondaryButton`);
    fireEvent.click(cancelButton);
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });

  it("should show a confirm prompt if cancel button is clicked and confirmBeforeClose is true", () => {
    props.confirmBeforeClose = true;
    window.confirm = jest.fn();
    const {getByTestId} = render(<Modal {...props} />);
    const cancelButton = getByTestId(`${props.dataTestId}.actions.secondaryButton`);
    fireEvent.click(cancelButton);
    expect(window.confirm).toHaveBeenCalled();
  });

  it("should render the submit tooltip if present", () => {
    const {getByText} = render(<Modal {...props}/>);
    expect(getByText(props.submitTooltip)).toBeDefined();
  });

  it("should render a delete button if the modal has the danger property", () => {
    props.danger = true;
    const {getByText} = render(<Modal {...props} />);
    expect(getByText("Delete")).toBeDefined();
  });

  it("should call onClose if a confirm prompt returns true", () => {
    props.confirmBeforeClose = true;
    window.confirm = jest.fn();
    window.confirm.mockReturnValue(true);
    const {getByTestId} = render(<Modal {...props} />);
    const cancelButton = getByTestId(`${props.dataTestId}.actions.secondaryButton`);
    fireEvent.click(cancelButton);
    expect(window.confirm).toHaveBeenCalled();
    expect(props.onClose).toHaveBeenCalled();
  });

  it("should not call onClose if a confirm prompt returns false", () => {
    props.confirmBeforeClose = true;
    window.confirm = jest.fn();
    window.confirm.mockReturnValue(false);
    const {getByTestId} = render(<Modal {...props} />);
    const cancelButton = getByTestId(`${props.dataTestId}.actions.secondaryButton`);
    fireEvent.click(cancelButton);
    expect(window.confirm).toHaveBeenCalled();
    expect(props.onClose).not.toHaveBeenCalled();
  });
});
