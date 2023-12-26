import {useNavigate} from "react-router-dom";
import {Navbar, NavbarBrand, NavItem, NavLink} from "react-bootstrap";

export default function WANavigation({children}) {
    let navigate = useNavigate();

    return (
        <>
            <div className="navbar sticky-top navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <NavbarBrand href="#">Society</NavbarBrand>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <Navbar className="navbar-nav me-auto mb-2 mb-lg-0">
                            <NavItem>
                                <NavLink href="#" onClick={(e) => {
                                    e.preventDefault();
                                    localStorage.setItem('token', '');
                                    navigate("/auth");
                                }}>Авторизоваться</NavLink>
                            </NavItem>
                        </Navbar>
                    </div>
                </div>
            </div>
            {children}
        </>
    )
}
