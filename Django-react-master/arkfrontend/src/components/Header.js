import React from "react";
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from "../actions/userActions";
import { useDispatch, useSelector } from 'react-redux'


function Header() {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>

          <LinkContainer to="/">
            <Navbar.Brand>Fabriq</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="justify-content-end"
              style={{ maxHeight: "100px", width:"100%"}}
              navbarScroll
            >
              <LinkContainer to="/">
                <Nav.Link><i className="fas fa-home"></i> Home</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/cart">
                <Nav.Link><i className=" fas fa-shopping-cart"></i> Cart</Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                </NavDropdown>

              ) :
                (
                  <LinkContainer to="/login">
                    <Nav.Link><i className="fas fa-user"></i> Login</Nav.Link>
                  </LinkContainer>
                )

              }

            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;