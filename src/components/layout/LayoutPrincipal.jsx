import NavbarPrincipal from "./NavbarPrincipal";
import { Outlet } from "react-router-dom";

const LayoutPrincipal = () => {
    return (
        <>
            <NavbarPrincipal />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default LayoutPrincipal;