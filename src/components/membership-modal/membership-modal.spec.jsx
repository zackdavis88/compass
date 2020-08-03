import React from "react";
import MembershipModal from "./membership-modal";
import { render } from "../../test-utils";
import { fireEvent, waitFor } from "@testing-library/react";

describe("<MembershipModal />", () => {
  let props;
  beforeEach(() => {
    props = {
      onClose: jest.fn(),
      onSubmit: jest.fn().mockReturnValue({message: "submit successful message"}),
      showNotification: jest.fn(),
      getAvailableUsers: jest.fn().mockReturnValue({
        message: "test message",
        users: [
          "firstUser",
          "secondUser",
          "thirdUser"
        ]
      }),
      requestInProgress: false,
      project: {
        id: "testProjectId",
        name: "testProject"
      },
      adminAllowed: false
    };
  });

  it("should mount the component", async() => {
    const component = render(<MembershipModal {...props} />);
    await waitFor(() => expect(component).toBeDefined());
  });

  //Testing Membership Creation--
  it("should call getAvailableUsers on mount", async() => {
    render(<MembershipModal {...props}/>);
    await waitFor(() => expect(props.getAvailableUsers).toHaveBeenCalledWith(props.project));
  });

  it("should disable the submit button by default when creating a new membership", async() => {
    const {getByTestId} = render(<MembershipModal {...props}/>);
    await waitFor(() => expect(props.getAvailableUsers).toHaveBeenCalledWith(props.project));
    const submit = getByTestId("membershipModal.actions.primaryButton");
    expect(submit).toBeDisabled();
  });

  it("should render a tooltip when submit is disabled due to missing input", async() => {
    const {getByTestId, getByText} = render(<MembershipModal {...props}/>);
    await waitFor(() => expect(props.getAvailableUsers).toHaveBeenCalledWith(props.project));
    const submitButton = getByTestId("membershipModal.actions.primaryButton");
    expect(submitButton).toBeDisabled();
    fireEvent.mouseOver(submitButton);
    expect(getByText("missing required fields")).toBeDefined();
  });

  it("should render the LoadingSpinner component if availableUsers is undefined", async() => {
    props.getAvailableUsers.mockReturnValueOnce({users: undefined});
    const {getByTestId, getByText} = render(<MembershipModal {...props}/>);
    await waitFor(() => expect(props.getAvailableUsers).toHaveBeenCalledWith(props.project));
    expect(getByTestId("membershipModalLoader")).toBeDefined();
    expect(getByText("Loading available users")).toBeDefined();
  });

  it("should render a tooltip when submit is disabled to due pending API request", async() => {
    props.requestInProgress = true;
    const {getByTestId, getByText} = render(<MembershipModal {...props}/>);
    await waitFor(() => expect(props.getAvailableUsers).toHaveBeenCalledWith(props.project));
    const submitButton = getByTestId("membershipModal.actions.primaryButton");
    fireEvent.mouseOver(submitButton);
    expect(getByText("request in progress")).toBeDefined();
  });

  it("should render the 'New Membership' modal header when creating a new membership", async() => {
    const {getByText} = render(<MembershipModal {...props}/>);
    await waitFor(() => expect(props.getAvailableUsers).toHaveBeenCalledWith(props.project));
    expect(getByText("New Membership")).toBeDefined();
  });

  it("should render the project label and name", async() => {
    const {getByText} = render(<MembershipModal {...props}/>);
    await waitFor(() => expect(props.getAvailableUsers).toHaveBeenCalledWith(props.project));
    expect(getByText("Project:")).toBeDefined();
    expect(getByText("testProject")).toBeDefined();
  });

  it("should render the expected inputs", async() => {
    const {queryByTestId} = render(<MembershipModal {...props}/>);
    await waitFor(() => expect(props.getAvailableUsers).toHaveBeenCalledWith(props.project));
    const selectInput = queryByTestId("membershipUsernameInput");
    const isAdminInput = queryByTestId("membershipIsAdminInput");
    const isManagerInput = queryByTestId("membershipIsManagerInput");
    const isDeveloperInput = queryByTestId("membershipIsDeveloperInput");
    const isViewerInput = queryByTestId("membershipIsViewerInput");
    expect(selectInput).toBeDefined();
    expect(isAdminInput).toBeDefined();
    expect(isManagerInput).toBeDefined();
    expect(isDeveloperInput).toBeDefined();
    expect(isViewerInput).toBeDefined();
  });

  it("should disable the isAdmin input if admin is not allowed", async() => {
    const {getByTestId} = render(<MembershipModal {...props}/>);
    await waitFor(() => expect(props.getAvailableUsers).toHaveBeenCalledWith(props.project));
    const adminInput = getByTestId("membershipIsAdminInput.input");
    expect(adminInput).toBeDisabled();
  });

  it("should enable the isAdmin input if admin is allowed", async() => {
    props.adminAllowed = true;
    const {getByTestId} = render(<MembershipModal {...props}/>);
    await waitFor(() => expect(props.getAvailableUsers).toHaveBeenCalledWith(props.project));
    const adminInput = getByTestId("membershipIsAdminInput.input");
    expect(adminInput).toBeEnabled();
  });

  it("should enable the submit button if there is username input", async() => {
    const {getByTestId} = render(<MembershipModal {...props}/>);
    await waitFor(() => expect(props.getAvailableUsers).toHaveBeenCalledWith(props.project));
    const usernameInput = getByTestId("membershipUsernameInput.input");
    const submitButton = getByTestId("membershipModal.actions.primaryButton");
    expect(submitButton).toBeDisabled();
    fireEvent.change(usernameInput, {
      target: {
        value: "some value"
      }
    });
    expect(submitButton).toBeEnabled();
  });

  it("should validate that the username input is in availableUsers", async() => {
    const {getByTestId, queryByText} = render(<MembershipModal {...props}/>);
    await waitFor(() => expect(props.getAvailableUsers).toHaveBeenCalledWith(props.project));
    const usernameInput = getByTestId("membershipUsernameInput.input");
    const submitButton = getByTestId("membershipModal.actions.primaryButton");
    fireEvent.change(usernameInput, {
      target: {
        value: "some value again"
      }
    });
    expect(queryByText("username is invalid")).toBeNull();
    fireEvent.click(submitButton);
    await waitFor(() => expect(queryByText("username is invalid")).toBeDefined());
  });

  it("should call the onSubmit method when validation is successful", async() => {
    props.adminAllowed = true;
    const {getByTestId} = render(<MembershipModal {...props}/>);
    await waitFor(() => expect(props.getAvailableUsers).toHaveBeenCalledWith(props.project));
    const usernameInput = getByTestId("membershipUsernameInput.input");
    const submitButton = getByTestId("membershipModal.actions.primaryButton");
    const managerInput = getByTestId("membershipIsManagerInput.input");
    const adminInput = getByTestId("membershipIsAdminInput.input");
    fireEvent.click(managerInput);
    fireEvent.click(adminInput);
    fireEvent.change(usernameInput, {
      target: {
        value: "secondUser"
      }
    });
    fireEvent.click(submitButton);
    await waitFor(() => expect(props.onSubmit).toHaveBeenCalledWith(props.project, "secondUser", {
      isAdmin: true,
      isManager: true,
      isDeveloper: false,
      isViewer: true
    }));
  });

  it("should call the onClose method when onSubmit is successful", async() => {
    const {getByTestId} = render(<MembershipModal {...props}/>);
    await waitFor(() => expect(props.getAvailableUsers).toHaveBeenCalledWith(props.project));
    const usernameInput = getByTestId("membershipUsernameInput.input");
    const submitButton = getByTestId("membershipModal.actions.primaryButton");
    fireEvent.change(usernameInput, {
      target: {
        value: "firstUser"
      }
    });
    fireEvent.click(submitButton);
    await waitFor(() => expect(props.onClose).toHaveBeenCalledTimes(1));
  });

  it("should call the showNotification method, if provided, when onSubmit is successful", async() => {
    const {getByTestId} = render(<MembershipModal {...props}/>);
    await waitFor(() => expect(props.getAvailableUsers).toHaveBeenCalledWith(props.project));
    const usernameInput = getByTestId("membershipUsernameInput.input");
    const submitButton = getByTestId("membershipModal.actions.primaryButton");
    fireEvent.change(usernameInput, {
      target: {
        value: "thirdUser"
      }
    });
    fireEvent.click(submitButton);
    await waitFor(() => expect(props.showNotification).toHaveBeenCalledWith("submit successful message", "info", true));
  });

  //Testing Membership Update--
  it("should not call getAvailableUsers on mount when updating", () => {
    props.membership = {
      id: "testMembershipId",
      user: {displayName: "testUser"},
      roles: {
        isAdmin: true,
        isManager: false,
        isDeveloper: false,
        isViewer: false
      }
    };
    render(<MembershipModal {...props}/>);
    expect(props.getAvailableUsers).not.toHaveBeenCalled();
  });

  it("should render the 'Edit Roles' modal header when updating", () => {
    props.membership = {
      id: "testMembershipId",
      user: {displayName: "testUser"},
      roles: {
        isAdmin: true,
        isManager: false,
        isDeveloper: false,
        isViewer: false
      }
    };
    const {getByText} = render(<MembershipModal {...props}/>);
    expect(getByText("Edit Roles")).toBeDefined();
  });

  it("should render the username label and value", () => {
    props.membership = {
      id: "testMembershipId",
      user: {displayName: "testUser"},
      roles: {
        isAdmin: false,
        isManager: false,
        isDeveloper: true,
        isViewer: false
      }
    };
    const {getByText} = render(<MembershipModal {...props}/>);
    expect(getByText("Username:")).toBeDefined();
    expect(getByText("testUser")).toBeDefined();
  });

  it("should set role values based on the membership being updated", () => {
    props.membership = {
      id: "testMembershipId",
      user: {displayName: "testUser"},
      roles: {
        isAdmin: false,
        isManager: false,
        isDeveloper: true,
        isViewer: false
      }
    };
    const {getByTestId} = render(<MembershipModal {...props}/>);
    const isAdmin = getByTestId("membershipIsAdminInput.input");
    const isManager = getByTestId("membershipIsManagerInput.input");
    const isDeveloper = getByTestId("membershipIsDeveloperInput.input");
    const isViewer = getByTestId("membershipIsViewerInput.input");
    expect(isAdmin).not.toBeChecked();
    expect(isManager).not.toBeChecked();
    expect(isDeveloper).toBeChecked();
    expect(isViewer).not.toBeChecked();
  });

  it("should call the onSubmit method if submit is clicked when updating", async() => {
    props.membership = {
      id: "testMembershipId",
      user: {displayName: "testUser"},
      roles: {
        isAdmin: false,
        isManager: false,
        isDeveloper: true,
        isViewer: false
      }
    };
    const {getByTestId} = render(<MembershipModal {...props}/>);
    const submitButton = getByTestId("membershipModal.actions.primaryButton");
    const isManager = getByTestId("membershipIsManagerInput.input");
    fireEvent.click(isManager);
    fireEvent.click(submitButton);
    await waitFor(() => expect(props.onSubmit).toHaveBeenCalledWith(props.project, props.membership, {
      isAdmin: undefined,
      isManager: true,
      isDeveloper: true,
      isViewer: undefined
    }));
  });

  it("should call the onClose method if onSubmit is successful", async() => {
    props.membership = {
      id: "testMembershipId",
      user: {displayName: "testUser"},
      roles: {
        isAdmin: false,
        isManager: false,
        isDeveloper: true,
        isViewer: false
      }
    };
    const {getByTestId} = render(<MembershipModal {...props}/>);
    const submitButton = getByTestId("membershipModal.actions.primaryButton");
    const isManager = getByTestId("membershipIsManagerInput.input");
    fireEvent.click(isManager);
    fireEvent.click(submitButton);
    await waitFor(() => expect(props.onClose).toHaveBeenCalled());
  });
});
