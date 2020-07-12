import React from "react";
import NewProjectModal from "./new-project-modal";
import { render } from "../../test-utils";
import { fireEvent, waitFor } from "@testing-library/react";

describe("<NewProjectModal />", () => {
  let props;
  beforeEach(() => {
    props = {
      onClose: jest.fn(),
      createProject: jest.fn(),
      showNotification: jest.fn(),
      requestInProgress: false,
      refreshDashboard: jest.fn()
    };
  });

  it("should mount the component", () => {
    const component = render(<NewProjectModal {...props}/>);
    expect(component).toBeDefined();
  });

  it("should disable the submit button by default", () => {
    const {getByTestId} = render(<NewProjectModal {...props}/>);
    const submitButton = getByTestId("newProjectModal.actions.primaryButton");
    expect(submitButton).toBeDisabled();
  });

  it("should render the expected inputs", () => {
    const {getByTestId} = render(<NewProjectModal {...props}/>);
    expect(getByTestId("nameInput")).toBeDefined();
    expect(getByTestId("descriptionInput")).toBeDefined();
    expect(getByTestId("isPrivateInput")).toBeDefined();
  });

  it("should set isPrivate to false by default", () => {
    const {getByTestId} = render(<NewProjectModal {...props}/>);
    const isPublicOption = getByTestId("isPrivateInput.option.0");
    const isPrivateOption = getByTestId("isPrivateInput.option.1");
    expect(isPublicOption).toBeChecked();
    expect(isPrivateOption).not.toBeChecked();
  });

  it("should enable the submit button if all required input is present without input errors", () => {
    const {getByTestId} = render(<NewProjectModal {...props}/>);
    const nameInput = getByTestId("nameInput.input");
    const submitButton = getByTestId("newProjectModal.actions.primaryButton");
    fireEvent.change(nameInput, {target: {value: "some name"}});
    expect(submitButton).toBeEnabled();
  });

  it("should disable the submit button if an API call is in progress", () => {
    props.requestInProgress = true;
    const {getByTestId} = render(<NewProjectModal {...props}/>);
    const nameInput = getByTestId("nameInput.input");
    const submitButton = getByTestId("newProjectModal.actions.primaryButton");
    fireEvent.change(nameInput, {target: {value: "some name"}});
    expect(submitButton).toBeDisabled();
  });


  it("should disable the submit button if there is an input error", async() => {
    props.createProject.mockReturnValueOnce({error: "name input error"});
    const {getByTestId, queryByText} = render(<NewProjectModal {...props}/>);
    const nameInput = getByTestId("nameInput.input");
    const submitButton = getByTestId("newProjectModal.actions.primaryButton");
    fireEvent.change(nameInput, {target: {value: "some name"}});
    expect(queryByText("something went wrong")).toBeNull();
    fireEvent.click(submitButton);
    await waitFor(() => expect(queryByText("something went wrong")).toBeDefined());
    expect(submitButton).toBeDisabled();
  });

  it("should render the tooltip for submit button when it is disabled due to pending API call", () => {
    props.requestInProgress = true;
    const {getByTestId, getByText} = render(<NewProjectModal {...props}/>);
    const submitButton = getByTestId("newProjectModal.actions.primaryButton");
    expect(submitButton).toBeDisabled();
    fireEvent.mouseOver(submitButton);
    expect(getByText("request in progress")).toBeDefined();
  });

  it("should render the tooltip for submit button when it is disabled due to missing input", () => {
    const {getByTestId, getByText} = render(<NewProjectModal {...props}/>);
    const submitButton = getByTestId("newProjectModal.actions.primaryButton");
    expect(submitButton).toBeDisabled();
    fireEvent.mouseOver(submitButton);
    expect(getByText("missing required fields")).toBeDefined();
  });

  it("should call the createProject method if submit is clicked and there is no validation error", async() => {
    const name = "some project name";
    const description = "some description";
    props.createProject.mockReturnValueOnce({});
    const {getByTestId, getByText} = render(<NewProjectModal {...props}/>);
    const nameInput = getByTestId("nameInput.input");
    const descriptionInput = getByTestId("descriptionInput.input");
    const isPrivateInput = getByText("Private");
    const submitButton = getByTestId("newProjectModal.actions.primaryButton");
    fireEvent.change(nameInput, {target: {value: name}});
    fireEvent.change(descriptionInput, {target: {value: description}});
    fireEvent.click(isPrivateInput);
    fireEvent.click(submitButton);
    await waitFor(() => expect(props.createProject).toHaveBeenCalledTimes(1));
    expect(props.createProject).toHaveBeenCalledWith(name, description, true);
  });

  it("should call onClose, refreshDashboard, and showNotification methods after a successful API call", async() => {
    const expectedMessage = "unit test success message";
    props.createProject.mockReturnValueOnce({message: expectedMessage});
    const {getByTestId} = render(<NewProjectModal {...props}/>);
    const nameInput = getByTestId("nameInput.input");
    const submitButton = getByTestId("newProjectModal.actions.primaryButton");
    fireEvent.change(nameInput, {target: {value: "some project name"}});
    fireEvent.click(submitButton);
    await waitFor(() => expect(props.createProject).toHaveBeenCalled());
    expect(props.onClose).toHaveBeenCalledTimes(1);
    expect(props.refreshDashboard).toHaveBeenCalledTimes(1);
    expect(props.showNotification).toHaveBeenCalledWith(expectedMessage, "info", true);
  });
});
