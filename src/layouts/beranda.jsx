import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import banner from '@/assets/img/6.png'

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
      <div className="p-4 xl:ml-80">
        <IconButton
          size="lg"
          color="white"
          className="hidden fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}
        </Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
      <div className="container mx-auto ">
        <div className="xl:ml-60">
          <img src={banner} alt="" className="w-full h-auto object-cover" />
        </div>
      </div>
    </div>
  );
}

Beranda.displayName = "/src/layout/beranda.jsx";

export default Beranda;
