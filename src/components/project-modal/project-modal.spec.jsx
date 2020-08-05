import React from "react";
import ProjectModal from "./project-modal";
import { render } from "../../test-utils";
import { fireEvent, waitFor } from "@testing-library/react";

describe("<ProjectModal />", () => {
  let props;
  beforeEach(() => {
    props = {
      onClose: jest.fn(),
      onSubmit: jest.fn(),
      showNotification: jest.fn(),
      requestInProgress: false,
      refresh: jest.fn()
    };
  });

  it("should mount the component", () => {
    const component = render(<ProjectModal {...props}/>);
    expect(component).toBeDefined();
  });

  it("should disable the submit button by default", () => {
    const {getByTestId} = render(<ProjectModal {...props}/>);
    const submitButton = getByTestId("projectModal.actions.primaryButton");
    expect(submitButton).toBeDisabled();
  });

  it("should render the expected inputs", () => {
    const {getByTestId} = render(<ProjectModal {...props}/>);
    expect(getByTestId("nameInput")).toBeDefined();
    expect(getByTestId("descriptionInput")).toBeDefined();
    expect(getByTestId("isPrivateInput")).toBeDefined();
  });

  it("should set isPrivate to false by default", () => {
    const {getByTestId} = render(<ProjectModal {...props}/>);
    const isPublicOption = getByTestId("isPrivateInput.option.0");
    const isPrivateOption = getByTestId("isPrivateInput.option.1");
    expect(isPublicOption).toBeChecked();
    expect(isPrivateOption).not.toBeChecked();
  });

  it("should enable the submit button if all required input is present without input errors", () => {
    const {getByTestId} = render(<ProjectModal {...props}/>);
    const nameInput = getByTestId("nameInput.input");
    const submitButton = getByTestId("projectModal.actions.primaryButton");
    fireEvent.change(nameInput, {target: {value: "some name"}});
    expect(submitButton).toBeEnabled();
  });

  it("should disable the submit button if an API call is in progress", () => {
    props.requestInProgress = true;
    const {getByTestId} = render(<ProjectModal {...props}/>);
    const nameInput = getByTestId("nameInput.input");
    const submitButton = getByTestId("projectModal.actions.primaryButton");
    fireEvent.change(nameInput, {target: {value: "some name"}});
    expect(submitButton).toBeDisabled();
  });


  it("should disable the submit button if there is an input error", async() => {
    props.onSubmit.mockReturnValueOnce({error: "name input error"});
    const {getByTestId, queryByText} = render(<ProjectModal {...props}/>);
    const nameInput = getByTestId("nameInput.input");
    const submitButton = getByTestId("projectModal.actions.primaryButton");
    fireEvent.change(nameInput, {target: {value: "some name"}});
    expect(queryByText("something went wrong")).toBeNull();
    fireEvent.click(submitButton);
    await waitFor(() => expect(queryByText("something went wrong")).toBeDefined());
    expect(submitButton).toBeDisabled();
  });

  it("should render the tooltip for submit button when it is disabled due to pending API call", () => {
    props.requestInProgress = true;
    const {getByTestId, getByText} = render(<ProjectModal {...props}/>);
    const submitButton = getByTestId("projectModal.actions.primaryButton");
    expect(submitButton).toBeDisabled();
    fireEvent.mouseOver(submitButton);
    expect(getByText("request in progress")).toBeDefined();
  });

  it("should render the tooltip for submit button when it is disabled due to missing input", () => {
    const {getByTestId, getByText} = render(<ProjectModal {...props}/>);
    const submitButton = getByTestId("projectModal.actions.primaryButton");
    expect(submitButton).toBeDisabled();
    fireEvent.mouseOver(submitButton);
    expect(getByText("missing required fields")).toBeDefined();
  });

  it("should call the onSubmit method if submit is clicked and there is no validation error", async() => {
    const name = "some project name";
    const description = "some description";
    props.onSubmit.mockReturnValueOnce({});
    const {getByTestId, getByText} = render(<ProjectModal {...props}/>);
    const nameInput = getByTestId("nameInput.input");
    const descriptionInput = getByTestId("descriptionInput.input");
    const isPrivateInput = getByText("Private");
    const submitButton = getByTestId("projectModal.actions.primaryButton");
    fireEvent.change(nameInput, {target: {value: name}});
    fireEvent.change(descriptionInput, {target: {value: description}});
    fireEvent.click(isPrivateInput);
    fireEvent.click(submitButton);
    await waitFor(() => expect(props.onSubmit).toHaveBeenCalledTimes(1));
    expect(props.onSubmit).toHaveBeenCalledWith(name, description, true);
  });

  it("should call onClose, refresh, and showNotification methods after a successful API call", async() => {
    const expectedMessage = "unit test success message";
    props.onSubmit.mockReturnValueOnce({message: expectedMessage});
    const {getByTestId} = render(<ProjectModal {...props}/>);
    const nameInput = getByTestId("nameInput.input");
    const submitButton = getByTestId("projectModal.actions.primaryButton");
    fireEvent.change(nameInput, {target: {value: "some project name"}});
    fireEvent.click(submitButton);
    await waitFor(() => expect(props.onSubmit).toHaveBeenCalled());
    expect(props.onClose).toHaveBeenCalledTimes(1);
    expect(props.refresh).toHaveBeenCalledTimes(1);
    expect(props.showNotification).toHaveBeenCalledWith(expectedMessage, "info", true);
  });

  it("should populate name, description, and isPrivate if editing a project", () => {
    props.project = {
      id: "testId",
      name: "test project",
      description: "this is a test.",
      isPrivate: true
    };
    const {getByTestId, getByText} = render(<ProjectModal {...props} />);
    expect(getByText("Edit Project")).toBeDefined();
    const nameInput = getByTestId("nameInput.input");
    const descriptionInput = getByTestId("descriptionInput.input");
    const isPublic = getByTestId("isPrivateInput.option.0");
    const isPrivate = getByTestId("isPrivateInput.option.1");
    expect(nameInput).toHaveValue(props.project.name);
    expect(descriptionInput).toHaveValue(props.project.description);
    expect(isPublic).not.toBeChecked();
    expect(isPrivate).toBeChecked();
  });

  it("should pass project.id to the onSubmit method if editing a project", async() => {
    props.project = {
      id: "testId",
      name: "test project",
      description: "this is a test.",
      isPrivate: true
    };
    props.onSubmit.mockReturnValueOnce({});
    const {getByTestId} = render(<ProjectModal {...props} />);
    const submitButton = getByTestId("projectModal.actions.primaryButton");
    fireEvent.click(submitButton);
    await waitFor(() => expect(props.onSubmit).toHaveBeenCalled());
    expect(props.onSubmit).toHaveBeenCalledWith("testId", "test project", "this is a test.", true);
  });
});
