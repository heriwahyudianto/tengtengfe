import { Routes, Route } from "react-router-dom";
import {Sidenav, DashboardNavbar} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController } from "@/context";

export function Beranda() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <DashboardNavbar />
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="container mx-auto py-6">
         <div className="xl:ml-60">
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}
        </Routes>
        </div>
      </div>
    </div>
  );
}

Beranda.displayName = "/src/layout/beranda.jsx";

export default Beranda;
