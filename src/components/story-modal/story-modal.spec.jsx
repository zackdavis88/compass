import React from "react";
import StoryModal from "./story-modal";
import { render } from "../../test-utils";
import { fireEvent, waitFor } from "@testing-library/react";

describe("<StoryModal />", () => {
  let props;
  beforeEach(() => {
    props = {
      onClose: jest.fn(),
      onSubmit: jest.fn().mockReturnValue({message: "submit successful message"}),
      showNotification: jest.fn(),
      getMemberNames: jest.fn().mockReturnValue({
        message: "test message",
        users: [
          "firstMember",
          "secondMember",
          "thirdMember"
        ]
      }),
      requestInProgress: false,
      project: {
        id: "testProjectId",
        name: "testProject"
      }
    };
  });

  it("should mount the component", async() => {
    const component = render(<StoryModal {...props} />);
    await waitFor(() => expect(component).toBeDefined());
  });

  //Testing Story Creation--
  it("should call getMemberNames on mount", async() => {
    render(<StoryModal {...props}/>);
    await waitFor(() => expect(props.getMemberNames).toHaveBeenCalledWith(props.project));
  });

  it("should disable the submit button by default when creating a new story", async() => {
    const {getByTestId} = render(<StoryModal {...props}/>);
    await waitFor(() => expect(props.getMemberNames).toHaveBeenCalledWith(props.project));
    const submit = getByTestId("storyModal.actions.primaryButton");
    expect(submit).toBeDisabled();
  });

  it("should render a tooltip when submit is disabled due to missing input", async() => {
    const {getByTestId, getByText} = render(<StoryModal {...props}/>);
    await waitFor(() => expect(props.getMemberNames).toHaveBeenCalledWith(props.project));
    const submitButton = getByTestId("storyModal.actions.primaryButton");
    expect(submitButton).toBeDisabled();
    fireEvent.mouseOver(submitButton);
    expect(getByText("missing required fields")).toBeDefined();
  });

  it("should render the LoadingSpinner component if memberNames is undefined", async() => {
    props.getMemberNames.mockReturnValueOnce({users: undefined});
    const {getByTestId, getByText} = render(<StoryModal {...props}/>);
    await waitFor(() => expect(props.getMemberNames).toHaveBeenCalledWith(props.project));
    expect(getByTestId("storyModalLoader")).toBeDefined();
    expect(getByText("Loading available members")).toBeDefined();
  });

  it("should render a tooltip when submit is disabled to due pending API request", async() => {
    props.requestInProgress = true;
    const {getByTestId, getByText} = render(<StoryModal {...props}/>);
    await waitFor(() => expect(props.getMemberNames).toHaveBeenCalledWith(props.project));
    const submitButton = getByTestId("storyModal.actions.primaryButton");
    fireEvent.mouseOver(submitButton);
    expect(getByText("request in progress")).toBeDefined();
  });

  it("should render the 'New Story' modal header when creating a new story", async() => {
    const {getByText} = render(<StoryModal {...props}/>);
    await waitFor(() => expect(props.getMemberNames).toHaveBeenCalledWith(props.project));
    expect(getByText("New Story")).toBeDefined();
  });

  it("should render the expected inputs", async() => {
    const {queryByTestId} = render(<StoryModal {...props}/>);
    await waitFor(() => expect(props.getMemberNames).toHaveBeenCalledWith(props.project));
    const nameInput = queryByTestId("nameInput");
    const detailsInput = queryByTestId("detailsInput");
    const ownerInput = queryByTestId("ownerInput");

    expect(nameInput).toBeDefined();
    expect(detailsInput).toBeDefined();
    expect(ownerInput).toBeDefined();
  });

  it("should enable the submit button if there is name input", async() => {
    const {getByTestId} = render(<StoryModal {...props}/>);
    await waitFor(() => expect(props.getMemberNames).toHaveBeenCalledWith(props.project));
    const nameInput = getByTestId("nameInput.input");
    const submitButton = getByTestId("storyModal.actions.primaryButton");
    expect(submitButton).toBeDisabled();
    fireEvent.change(nameInput, {
      target: {
        value: "some value"
      }
    });
    expect(submitButton).toBeEnabled();
  });

  it("should validate that the owner input is in memberNames", async() => {
    const {getByTestId, queryByText} = render(<StoryModal {...props}/>);
    await waitFor(() => expect(props.getMemberNames).toHaveBeenCalledWith(props.project));
    const nameInput = getByTestId("nameInput.input");
    const ownerInput = getByTestId("ownerInput.input");
    const submitButton = getByTestId("storyModal.actions.primaryButton");
    fireEvent.change(nameInput, {
      target: {
        value: "some name value"
      }
    });
    fireEvent.change(ownerInput, {
      target: {
        value: "some owner value"
      }
    });
    expect(queryByText("username is invalid")).toBeNull();
    fireEvent.click(submitButton);
    await waitFor(() => expect(queryByText("username is invalid")).toBeDefined());
  });

  it("should call the onSubmit method when validation is successful", async() => {
    const {getByTestId, queryByText} = render(<StoryModal {...props}/>);
    await waitFor(() => expect(props.getMemberNames).toHaveBeenCalledWith(props.project));
    const nameInput = getByTestId("nameInput.input");
    const ownerInput = getByTestId("ownerInput.input");
    const detailsInput = getByTestId("detailsInput.input");
    const submitButton = getByTestId("storyModal.actions.primaryButton");
    const nameVal = "some name value";
    const detailsVal = "some details value";
    const ownerVal = "firstMember";
    fireEvent.change(nameInput, {
      target: {
        value: nameVal
      }
    });
    fireEvent.change(ownerInput, {
      target: {
        value: ownerVal
      }
    });
    fireEvent.change(detailsInput, {
      target: {
        value: detailsVal
      }
    });
    fireEvent.click(submitButton);
    await waitFor(() => expect(props.onSubmit).toHaveBeenCalledWith(props.project, nameVal, detailsVal, ownerVal));
  });

  it("should call the onClose method when onSubmit is successful", async() => {
    const {getByTestId} = render(<StoryModal {...props}/>);
    await waitFor(() => expect(props.getMemberNames).toHaveBeenCalledWith(props.project));
    const nameInput = getByTestId("nameInput.input");
    const submitButton = getByTestId("storyModal.actions.primaryButton");
    fireEvent.change(nameInput, {
      target: {
        value: "test story name"
      }
    });
    fireEvent.click(submitButton);
    await waitFor(() => expect(props.onClose).toHaveBeenCalledTimes(1));
  });

  it("should call the showNotification method, if provided, when onSubmit is successful", async() => {
    const {getByTestId} = render(<StoryModal {...props}/>);
    await waitFor(() => expect(props.getMemberNames).toHaveBeenCalledWith(props.project));
    const nameInput = getByTestId("nameInput.input");
    const submitButton = getByTestId("storyModal.actions.primaryButton");
    fireEvent.change(nameInput, {
      target: {
        value: "test story name"
      }
    });
    fireEvent.click(submitButton);
    await waitFor(() => expect(props.showNotification).toHaveBeenCalledWith("submit successful message", "info", true));
  });

  it("should call the refresh method, if provided, when onSubmit is successful", async() => {
    props.refresh = jest.fn();
    const {getByTestId} = render(<StoryModal {...props}/>);
    await waitFor(() => expect(props.getMemberNames).toHaveBeenCalledWith(props.project));
    const nameInput = getByTestId("nameInput.input");
    const submitButton = getByTestId("storyModal.actions.primaryButton");
    fireEvent.change(nameInput, {
      target: {
        value: "test story name"
      }
    });
    fireEvent.click(submitButton);
    await waitFor(() => expect(props.refresh).toHaveBeenCalled());
  });

  //Testing Story Update--
  it("should render the 'Edit Story' modal header when updating", async() => {
    props.story = {
      id: "testStoryId",
      name: "unit test story",
      details: "these the deets.",
      owner: {displayName: "secondMember"}
    };
    const {getByText} = render(<StoryModal {...props}/>);
    await waitFor(() => expect(props.getMemberNames).toHaveBeenCalledWith(props.project));
    expect(getByText("Edit Story")).toBeDefined();
  });

  it("should set the name input value based on the story being updated", async() => {
    props.story = {
      id: "testStoryId",
      name: "unit test story",
      details: "these the deets.",
      owner: {displayName: "secondMember"}
    };
    const {getByTestId} = render(<StoryModal {...props}/>);
    await waitFor(() => expect(props.getMemberNames).toHaveBeenCalledWith(props.project));
    const nameInput = getByTestId("nameInput.input");
    expect(nameInput).toHaveValue(props.story.name);
  });

  it("should set the owner input value based on the story being updated", async() => {
    props.story = {
      id: "testStoryId",
      name: "unit test story",
      details: "these the deets.",
      owner: {displayName: "secondMember"}
    };
    const {getByTestId} = render(<StoryModal {...props}/>);
    await waitFor(() => expect(props.getMemberNames).toHaveBeenCalledWith(props.project));
    const ownerInput = getByTestId("ownerInput.input");
    expect(ownerInput).toHaveValue(props.story.owner.displayName);
  });

  it("should set the details input value based on the story being updated", async() => {
    props.story = {
      id: "testStoryId",
      name: "unit test story",
      details: "these the deets.",
      owner: {displayName: "secondMember"}
    };
    const {getByTestId} = render(<StoryModal {...props}/>);
    await waitFor(() => expect(props.getMemberNames).toHaveBeenCalledWith(props.project));
    const detailsInput = getByTestId("detailsInput.input");
    expect(detailsInput).toHaveValue(props.story.details);
  });

  it("should call the onSubmit method if submit is clicked when updating", async() => {
    props.story = {
      id: "testStoryId",
      name: "unit test story",
      details: "these the deets.",
      owner: {displayName: "secondMember"}
    };
    const {getByTestId} = render(<StoryModal {...props}/>);
    await waitFor(() => expect(props.getMemberNames).toHaveBeenCalledWith(props.project));
    const nameInput = getByTestId("nameInput.input");
    const detailsInput = getByTestId("detailsInput.input");
    const ownerInput = getByTestId("ownerInput.input");
    const nameVal = "unit test name";
    const detailsVal = "unit test details";
    const ownerVal = "thirdMember";
    fireEvent.change(nameInput, {target: { value: nameVal}});
    fireEvent.change(detailsInput, {target: { value: detailsVal}});
    fireEvent.change(ownerInput, {target: { value: ownerVal}});
    const submitButton = getByTestId("storyModal.actions.primaryButton");
    fireEvent.click(submitButton);
    await waitFor(() => expect(props.onSubmit).toHaveBeenCalledWith(props.project, props.story, nameVal, detailsVal, ownerVal));
  });


  it("should prevent the modal from autoclosing on click if there are any state changes", async() => {
    const {getByTestId} = render(<StoryModal {...props} />);
    await waitFor(() => expect(props.getMemberNames).toHaveBeenCalledWith(props.project));
    const modalBackground = getByTestId("storyModal.wrapper");
    const nameInput = getByTestId("nameInput.input");
    fireEvent.change(nameInput, {
      target: {value: "somevalue"}
    });
    fireEvent.click(modalBackground);
    expect(props.onClose).not.toHaveBeenCalled();
  });

  it("should show a confirm prompt if cancel is clicked and there are state changes", async() => {
    window.confirm = jest.fn();
    const {getByTestId} = render(<StoryModal {...props}/>);
    await waitFor(() => expect(props.getMemberNames).toHaveBeenCalledWith(props.project));
    const cancelButton = getByTestId("storyModal.actions.secondaryButton");
    const nameInput = getByTestId("nameInput.input");
    fireEvent.change(nameInput, {
      target: {value: "somevalue"}
    });
    fireEvent.click(cancelButton);
    expect(window.confirm).toHaveBeenCalled();
  });

  it("should call onClose if confirm prompt returns true", async() => {
    window.confirm = jest.fn().mockReturnValueOnce(true);
    const {getByTestId} = render(<StoryModal {...props}/>);
    await waitFor(() => expect(props.getMemberNames).toHaveBeenCalledWith(props.project));
    const cancelButton = getByTestId("storyModal.actions.secondaryButton");
    const nameInput = getByTestId("nameInput.input");
    fireEvent.change(nameInput, {
      target: {value: "somevalue"}
    });
    fireEvent.click(cancelButton);
    expect(window.confirm).toHaveBeenCalled();
    expect(props.onClose).toHaveBeenCalled();
  });

  it("should not call onClose if confirm prompt returns false", async() => {
    window.confirm = jest.fn().mockReturnValueOnce(false);
    const {getByTestId} = render(<StoryModal {...props}/>);
    await waitFor(() => expect(props.getMemberNames).toHaveBeenCalledWith(props.project));
    const cancelButton = getByTestId("storyModal.actions.secondaryButton");
    const nameInput = getByTestId("nameInput.input");
    fireEvent.change(nameInput, {
      target: {value: "somevalue"}
    });
    fireEvent.click(cancelButton);
    expect(window.confirm).toHaveBeenCalled();
    expect(props.onClose).not.toHaveBeenCalled();
  });
});
