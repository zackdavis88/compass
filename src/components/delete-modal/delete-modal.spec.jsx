import React from "react";
import DeleteModal from "./delete-modal";
import { render } from "../../test-utils";
import {fireEvent, waitFor} from "@testing-library/react";

describe("<DeleteModal />", () => {
  let props;
  beforeEach(() => {
    props = {
      dataTestId: "unitTestDeleteModal",
      onClose: jest.fn(),
      onSubmit: jest.fn().mockReturnValue({message: "success!"}),
      resource: {
        id: "unitTestId"
      },
      expectedInput: "some expected value"
    };
  });

  it("should mount the component", () => {
    const component = render(<DeleteModal {...props} />);
    expect(component).toBeDefined();
  });

  it("should render the headerText if provided", () => {
    props.headerText = "Unit Test Header";
    const {getByText} = render(<DeleteModal {...props} />);
    expect(getByText("Unit Test Header")).toBeDefined();
  });

  it("should render a default header if headerText is not provided", () => {
    const {getByTextId, getByText} = render(<DeleteModal {...props} />);
    expect(getByText("Confirm Delete")).toBeDefined();
  });

  it("should disable the delete button by default", () => {
    const {getByTestId} = render(<DeleteModal {...props} />);
    expect(getByTestId("unitTestDeleteModal.actions.primaryButton")).toBeDisabled();
  });

  it("should render a delete button instead of submit", () => {
    const {queryByText} = render(<DeleteModal {...props} />);
    expect(queryByText("Delete")).toBeDefined();
    expect(queryByText("Submit")).toBeNull();
  });

  it("should render the message section with a default warning message", () => {
    const {getByTestId, getByText} = render(<DeleteModal {...props} />);
    expect(getByTestId("unitTestDeleteModal.messageSection")).toBeDefined();
    expect(getByText("Are you sure?")).toBeDefined();
    expect(getByText("Once a resource has been deleted it can not be recovered.")).toBeDefined();
  });

  it("should render the bodyText if provided", () => {
    props.bodyText = "unit testing body text";
    const {getByText} = render(<DeleteModal {...props} />);
    expect(getByText("unit testing body text")).toBeDefined();
  });

  it("should render an InputBox section if the expectedInput is a string", () => {
    const {getByTestId, getByPlaceholderText, getByLabelText} = render(<DeleteModal {...props}/>);
    expect(getByTestId("unitTestDeleteModal.stringInputSection")).toBeDefined();
    expect("Enter some expected value below to proceed.");
    expect(getByTestId("confirmStringInput")).toBeDefined();
    const input = getByTestId("confirmStringInput.input");
    expect(input).toBeDefined();

    // Expect the default label / placeholder if one is not provided.
    fireEvent.focus(input);
    expect(getByLabelText("Confirm Input")).toBeDefined();
    expect(getByPlaceholderText("Enter the required value")).toBeDefined();
  });

  it("should render an InputBox with optional label/placeholder for input", () => {
    props.inputProps = {
      label: "test label",
      placeholder: "test placeholder"
    };
    const {getByTestId, getByPlaceholderText, getByLabelText} = render(<DeleteModal {...props}/>);
    const input = getByTestId("confirmStringInput.input");
    expect(input).toBeDefined();
    fireEvent.focus(input);
    expect(getByLabelText("test label")).toBeDefined();
    expect(getByPlaceholderText("test placeholder")).toBeDefined();
  });

  it("should enable the delete button if input matches expectedInput", () => {
    const {getByTestId} = render(<DeleteModal {...props}/>);
    const input = getByTestId("confirmStringInput.input");
    const button = getByTestId("unitTestDeleteModal.actions.primaryButton");
    expect(button).toBeDisabled();
    fireEvent.change(input, {
      target: {
        value: "some expected value"
      }
    });
    expect(button).toBeEnabled();
  });

  it("should render a CheckBox input if expectedInput is non-string", () => {
    props.expectedInput = true;
    const {getByTestId, getByText} = render(<DeleteModal {...props} />);
    expect(getByTestId("unitTestDeleteModal.inputSection")).toBeDefined();
    expect("Check the box below to proceed.");
    expect(getByTestId("confirmBoolInput")).toBeDefined();
    const input = getByTestId("confirmBoolInput.input");
    expect(input).toBeDefined();
    expect(getByText("Delete this Resource")).toBeDefined();
  });

  it("should enable the delete button if the checkbox is checked", () => {
    props.expectedInput = true;
    const {getByTestId, queryByText} = render(<DeleteModal {...props}/>);
    const input = getByTestId("confirmBoolInput.input");
    const button = getByTestId("unitTestDeleteModal.actions.primaryButton");
    expect(button).toBeDisabled();
    expect(queryByText("missing required input")).toBeDefined();
    fireEvent.click(input);
    expect(button).toBeEnabled();
    expect(queryByText("missing required input")).toBeNull();
  });

  //TODO: API Error handling is weak in this component. Add tests for that once you improve it...right now it just sinks the error.
  it("should call onSubmit once the delete button has been clicked", async() => {
    props.expectedInput = true;
    const {getByTestId} = render(<DeleteModal {...props}/>);
    const input = getByTestId("confirmBoolInput.input");
    const button = getByTestId("unitTestDeleteModal.actions.primaryButton");
    fireEvent.click(input);
    fireEvent.click(button);
    await waitFor(() => expect(props.onSubmit).toHaveBeenCalledWith(props.resource, true));
    expect(props.onClose).toHaveBeenCalled();
  });

  it("should call refresh, if provided, after successful onSubmit", async() => {
    props.refresh = jest.fn();
    const {getByTestId} = render(<DeleteModal {...props}/>);
    const input = getByTestId("confirmStringInput.input");
    const button = getByTestId("unitTestDeleteModal.actions.primaryButton");
    fireEvent.change(input, {
      target: {
        value: props.expectedInput
      }
    });
    fireEvent.click(button);
    await waitFor(() => expect(props.onSubmit).toHaveBeenCalledWith(props.resource, props.expectedInput));
    expect(props.onClose).toHaveBeenCalled();
    expect(props.refresh).toHaveBeenCalled();
  });

  it("should call showNotification, if provided, after successful onSubmit", async() => {
    props.showNotification = jest.fn();
    const {getByTestId} = render(<DeleteModal {...props}/>);
    const input = getByTestId("confirmStringInput.input");
    const button = getByTestId("unitTestDeleteModal.actions.primaryButton");
    fireEvent.change(input, {
      target: {
        value: props.expectedInput
      }
    });
    fireEvent.click(button);
    await waitFor(() => expect(props.onSubmit).toHaveBeenCalledWith(props.resource, props.expectedInput));
    expect(props.onClose).toHaveBeenCalled();
    expect(props.showNotification).toHaveBeenCalledWith("success!", "info", true);
  });
});
