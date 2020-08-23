import React from "react";
import PriorityModal from "./priority-modal";
import { render } from "../../test-utils";
import { fireEvent, waitFor } from "@testing-library/react";

describe("<PriorityModal />", () => {
  let props;
  beforeEach(() => {
    props = {
      onClose: jest.fn(),
      onSubmit: jest.fn().mockReturnValue({message: "submit successful message"}),
      showNotification: jest.fn(),
      refresh: jest.fn(),
      requestInProgress: false,
      project: {
        id: "testProjectId",
        name: "testProject"
      }
    };
  });

  it("should mount the component", () => {
    const component = render(<PriorityModal {...props} />);
    expect(component).toBeDefined();
  });

  //Testing Priority Create--
  it("should disable the submit button by default when creating a new priority", () => {
    const {getByTestId} = render(<PriorityModal {...props}/>);
    const submit = getByTestId("priorityModal.actions.primaryButton");
    expect(submit).toBeDisabled();
  });

  it("should render a tooltip when submit is disabled due to missing input", () => {
    const {getByTestId, getByText} = render(<PriorityModal {...props}/>);
    const submitButton = getByTestId("priorityModal.actions.primaryButton");
    expect(submitButton).toBeDisabled();
    fireEvent.mouseOver(submitButton);
    expect(getByText("missing required fields")).toBeDefined();
  });

  it("should render a tooltip when submit is disabled to due pending API request", () => {
    props.requestInProgress = true;
    const {getByTestId, getByText} = render(<PriorityModal {...props}/>);
    const submitButton = getByTestId("priorityModal.actions.primaryButton");
    expect(submitButton).toBeDisabled();
    fireEvent.mouseOver(submitButton);
    expect(getByText("request in progress")).toBeDefined();
  });

  it("should render the 'Add Priority' modal header when creating a new priority", () => {
    const {getByText} = render(<PriorityModal {...props}/>);
    expect(getByText("Add Priority")).toBeDefined();
  });

  it("should render the project name", () => {
    const {getByText} = render(<PriorityModal {...props} />);
    expect(getByText("Project:")).toBeDefined();
    expect(getByText(props.project.name)).toBeDefined();
  });

  it("should render the preview section with default text", () => {
    const {getByText} = render(<PriorityModal {...props} />);
    expect(getByText("Preview:")).toBeDefined();
    expect(getByText("Enter a name for preview")).toBeDefined();
  });

  it("should render the expected inputs", () => {
    const {queryByTestId} = render(<PriorityModal {...props}/>);
    const nameInput = queryByTestId("nameInput");
    const colorInput = queryByTestId("colorInput");
    expect(nameInput).toBeDefined();
    expect(colorInput).toBeDefined();
  });

  it("should set the colorInput default value to #FFFFFF", () => {
    const {queryByTestId} = render(<PriorityModal {...props}/>);
    const colorInput = queryByTestId("colorInput.input");
    expect(colorInput).toHaveValue("#ffffff");
  });

  it("should render preview text if there is name input", () => {
    const {getByTestId, getByText} = render(<PriorityModal {...props}/>);
    const nameInput = getByTestId("nameInput.input");
    fireEvent.change(nameInput, {
      target: {value: "some name input"}
    });
    expect(getByText("some name input")).toBeDefined();
  });

  it("should enable the submit button if there is name input", () => {
    const {getByTestId} = render(<PriorityModal {...props}/>);
    const nameInput = getByTestId("nameInput.input");
    const submitButton = getByTestId("priorityModal.actions.primaryButton");
    expect(submitButton).toBeDisabled();
    fireEvent.change(nameInput, {
      target: {value: "some name input"}
    });
    expect(submitButton).toBeEnabled();
  });

  it("should call the onSubmit method when submit button is clicked", () => {
    const {getByTestId} = render(<PriorityModal {...props}/>);
    const nameInput = getByTestId("nameInput.input");
    const submitButton = getByTestId("priorityModal.actions.primaryButton");
    fireEvent.change(nameInput, {
      target: {value: "some name input"}
    });
    fireEvent.click(submitButton);
    expect(props.onSubmit).toHaveBeenCalledWith(props.project, "some name input", "#FFFFFF");
  });

  it("should set the nameError if there is a name validation error", async() => {
    props.onSubmit.mockReturnValueOnce({error: "name has an issue"});
    const {getByTestId,getByText} = render(<PriorityModal {...props} />);
    const nameInput = getByTestId("nameInput.input");
    const submitButton = getByTestId("priorityModal.actions.primaryButton");
    fireEvent.change(nameInput, {
      target: {value: "some name input"}
    });
    fireEvent.click(submitButton);
    await waitFor(() => expect(getByText("name has an issue")).toBeDefined());
    expect(getByText("please fix input errors")).toBeDefined();
  });

  it("should set the colorError if there is a color validation error", async() => {
    props.onSubmit.mockReturnValueOnce({error: "color has an issue"});
    const {getByTestId, getByText} = render(<PriorityModal {...props} />);
    const nameInput = getByTestId("nameInput.input");
    const colorInput = getByTestId("colorInput.input");
    const submitButton = getByTestId("priorityModal.actions.primaryButton");
    fireEvent.change(nameInput, {
      target: {value: "Test Priority"}
    });
    fireEvent.change(colorInput, {
      target: {value: "#a82c9b"}
    });
    fireEvent.click(submitButton);
    await waitFor(() => expect(getByText("color has an issue")).toBeDefined());
  });

  it("should call the onClose method when onSubmit is successful", async() => {
    const {getByTestId} = render(<PriorityModal {...props} />);
    const nameInput = getByTestId("nameInput.input");
    const colorInput = getByTestId("colorInput.input");
    const submitButton = getByTestId("priorityModal.actions.primaryButton");
    fireEvent.change(nameInput, {
      target: {value: "Test Priority"}
    });
    fireEvent.change(colorInput, {
      target: {value: "#a82c9b"}
    });
    fireEvent.click(submitButton);
    expect(props.onSubmit).toHaveBeenCalledWith(props.project, "Test Priority", "#a82c9b");
    await waitFor(() => expect(props.onClose).toHaveBeenCalled());
  });

  it("should call the showNotification method, if provided, when onSubmit is successful", async() => {
    const {getByTestId} = render(<PriorityModal {...props}/>);
    const nameInput = getByTestId("nameInput.input");
    const submitButton = getByTestId("priorityModal.actions.primaryButton");
    fireEvent.change(nameInput, {
      target: {
        value: "test priority name"
      }
    });
    fireEvent.click(submitButton);
    await waitFor(() => expect(props.showNotification).toHaveBeenCalledWith("submit successful message", "info", true));
  });

  it("should call the refresh method, if provided, when onSubmit is successful", async() => {
    const {getByTestId} = render(<PriorityModal {...props}/>);
    const nameInput = getByTestId("nameInput.input");
    const submitButton = getByTestId("priorityModal.actions.primaryButton");
    fireEvent.change(nameInput, {
      target: {
        value: "test priority name"
      }
    });
    fireEvent.click(submitButton);
    await waitFor(() => expect(props.refresh).toHaveBeenCalled());
  });

  //Testing Priority Update--
  it("should disable the submit button by default", () => {
    props.priority = {
      id: "testPriorityId1",
      name: "unit test priority",
      color: "#0194cc"
    };
    const {getByTestId, getByText} = render(<PriorityModal {...props}/>);
    expect(getByTestId("priorityModal.actions.primaryButton")).toBeDisabled();
    expect(getByText("there are no changes to submit")).toBeDefined();
  });

  it("should enable the submit button if there are any changes", () => {
    props.priority = {
      id: "testPriorityId1",
      name: "unit test priority",
      color: "#0194cc"
    };
    const {getByTestId} = render(<PriorityModal {...props}/>);
    const colorInput = getByTestId("colorInput.input");
    expect(getByTestId("priorityModal.actions.primaryButton")).toBeDisabled();
    fireEvent.change(colorInput, {target: {value: "#ffffff"}});
    expect(getByTestId("priorityModal.actions.primaryButton")).toBeEnabled();
  });

  it("should render the 'Edit Priority' modal header when updating", () => {
    props.priority = {
      id: "testPriorityId1",
      name: "unit test priority",
      color: "#0194cc"
    };
    const {getByText} = render(<PriorityModal {...props}/>);
    expect(getByText("Edit Priority")).toBeDefined();
  });

  it("should set the name input value based on the priority being updated", () => {
    props.priority = {
      id: "testPriorityId1",
      name: "unit test priority",
      color: "#0194cc"
    };
    const {getByTestId} = render(<PriorityModal {...props}/>);
    const nameInput = getByTestId("nameInput.input");
    expect(nameInput).toHaveValue(props.priority.name);
  });

  it("should set the color input value based on the priority being updated", () => {
    props.priority = {
      id: "testPriorityId1",
      name: "unit test priority",
      color: "#0194cc"
    };
    const {getByTestId} = render(<PriorityModal {...props}/>);
    const colorInput = getByTestId("colorInput.input");
    expect(colorInput).toHaveValue(props.priority.color);
  });

  it("should call the onSubmit method if submit is clicked when updating", async() => {
    props.priority = {
      id: "testPriorityId1",
      name: "unit test priority",
      color: "#0194cc"
    };
    const {getByTestId} = render(<PriorityModal {...props}/>);
    const nameInput = getByTestId("nameInput.input");
    const colorInput = getByTestId("colorInput.input");
    const nameVal = "unit test priority";
    const colorVal = "#cc06a4";
    fireEvent.change(nameInput, {target: { value: nameVal}});
    fireEvent.change(colorInput, {target: { value: colorVal}});
    const submitButton = getByTestId("priorityModal.actions.primaryButton");
    fireEvent.click(submitButton);
    await waitFor(() => expect(props.onSubmit).toHaveBeenCalledWith(props.project, props.priority, nameVal, colorVal));
  });


  it("should prevent the modal from autoclosing on click if there are any state changes", () => {
    const {getByTestId} = render(<PriorityModal {...props} />);
    const modalBackground = getByTestId("priorityModal.wrapper");
    const nameInput = getByTestId("nameInput.input");
    fireEvent.change(nameInput, {
      target: {value: "somevalue"}
    });
    fireEvent.click(modalBackground);
    expect(props.onClose).not.toHaveBeenCalled();
  });

  it("should show a confirm prompt if cancel is clicked and there are state changes", () => {
    window.confirm = jest.fn();
    const {getByTestId} = render(<PriorityModal {...props}/>);
    const cancelButton = getByTestId("priorityModal.actions.secondaryButton");
    const nameInput = getByTestId("nameInput.input");
    fireEvent.change(nameInput, {
      target: {value: "somevalue"}
    });
    fireEvent.click(cancelButton);
    expect(window.confirm).toHaveBeenCalled();
  });

  it("should call onClose if confirm prompt returns true", () => {
    window.confirm = jest.fn().mockReturnValueOnce(true);
    const {getByTestId} = render(<PriorityModal {...props}/>);
    const cancelButton = getByTestId("priorityModal.actions.secondaryButton");
    const nameInput = getByTestId("nameInput.input");
    fireEvent.change(nameInput, {
      target: {value: "somevalue"}
    });
    fireEvent.click(cancelButton);
    expect(window.confirm).toHaveBeenCalled();
    expect(props.onClose).toHaveBeenCalled();
  });

  it("should not call onClose if confirm prompt returns false", () => {
    window.confirm = jest.fn().mockReturnValueOnce(false);
    const {getByTestId} = render(<PriorityModal {...props}/>);
    const cancelButton = getByTestId("priorityModal.actions.secondaryButton");
    const nameInput = getByTestId("nameInput.input");
    fireEvent.change(nameInput, {
      target: {value: "somevalue"}
    });
    fireEvent.click(cancelButton);
    expect(window.confirm).toHaveBeenCalled();
    expect(props.onClose).not.toHaveBeenCalled();
  });
});
