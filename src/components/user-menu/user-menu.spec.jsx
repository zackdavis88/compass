import React from "react";
import UserMenu from "./user-menu";
import UserMenuFlyout from "./user-menu-flyout";
import { render } from "../../test-utils";
import { fireEvent } from "@testing-library/react";
import { faKey, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

describe("<UserMenu />", () => {
  let props;
  beforeEach(() => {
    props = {
      dataTestId: "testingUserMenu",
      userInfo: {
        username: "testuser",
        displayName: "testUser"
      },
      logout: jest.fn(),
      showChangePasswordModal: jest.fn()
    };
  });

  it("should mount the component", () => {
    const component = render(<UserMenu {...props} />);
    expect(component).toBeDefined();
  });

  it("should render the authenticated user's display name", () => {
    const {getByTestId, queryByText} = render(<UserMenu {...props} />);
    expect(getByTestId(props.dataTestId)).toBeDefined();
    expect(queryByText(props.userInfo.username)).toBeNull();
    expect(queryByText(props.userInfo.displayName)).toBeDefined();
  });

  it("should not render the menu flyout by default", () => {
    const {queryByTestId} = render(<UserMenu {...props} />);
    expect(queryByTestId(`${props.dataTestId}.flyout`)).toBeNull();
  });

  it("should render the flyout once the user's display name is clicked", () => {
    const {getByTestId} = render(<UserMenu {...props} />);
    const menu = getByTestId(props.dataTestId);
    fireEvent.click(menu);
    expect(getByTestId(`${props.dataTestId}.flyout`)).toBeDefined();
  });

  it("should render the change password and sign out menu items", () => {
    const {getByTestId, getByText} = render(<UserMenu {...props} />);
    const menu = getByTestId(props.dataTestId);
    fireEvent.click(menu);
    expect(getByText("Change Password")).toBeDefined();
    expect(getByText("Sign Out")).toBeDefined();
  });

  it("should call showChangePasswordModal when the change password menu-item is clicked", () => {
    const {getByTestId, getByText} = render(<UserMenu {...props} />);
    const menu = getByTestId(props.dataTestId);
    fireEvent.click(menu);
    const changePasswordMenuItem = getByText("Change Password");
    fireEvent.click(changePasswordMenuItem);
    expect(props.showChangePasswordModal).toHaveBeenCalledTimes(1);
  });

  it("should call logout when the logout menu-item is clicked", () => {
    const {getByTestId, getByText} = render(<UserMenu {...props} />);
    const menu = getByTestId(props.dataTestId);
    fireEvent.click(menu);
    const signOutMenuItem = getByText("Sign Out");
    fireEvent.click(signOutMenuItem);
    expect(props.logout).toHaveBeenCalledTimes(1);
  });
});

describe("<UserMenuFlyout />", () => {
  let props;
  beforeAll(() => {
    props = {
      dataTestId: "testUserMenuFlyout",
      items: [{
        icon: faKey,
        label: "Unit Test Item 1",
        onClick: jest.fn()
      }, {
        icon: faArrowLeft,
        label: "Unit Test Item 2",
        onClick: jest.fn()
      }],
      closeMenu: jest.fn()
    };
  });

  it("should mount the component", () => {
    const component = render(<UserMenuFlyout {...props} />);
    expect(component).toBeDefined();
  });

  it("should call the closeMenu method on click", () => {
    const {getByTestId} = render(<UserMenuFlyout {...props} />);
    expect(getByTestId(props.dataTestId)).toBeDefined();
    fireEvent.click(getByTestId(props.dataTestId));
    expect(props.closeMenu).toHaveBeenCalledTimes(1);
  });

  it("should render the menu items", () => {
    const {getByText} = render(<UserMenuFlyout {...props} />);
    expect(getByText(props.items[0].label)).toBeDefined();
    expect(getByText(props.items[1].label)).toBeDefined();
  });

  it("should call the onClick method for each menu item when clicked", () => {
    const {getByText} = render(<UserMenuFlyout {...props} />);
    const menuItem1 = getByText(props.items[0].label);
    const menuItem2 = getByText(props.items[1].label);
    fireEvent.click(menuItem1);
    expect(props.items[0].onClick).toHaveBeenCalledTimes(1);
    expect(props.items[1].onClick).toHaveBeenCalledTimes(0);
    fireEvent.click(menuItem2);
    expect(props.items[1].onClick).toHaveBeenCalledTimes(1);
  });
});
