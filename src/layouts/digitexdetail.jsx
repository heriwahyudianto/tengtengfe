import { Routes, Route } from "react-router-dom";
import {
  Sidenav,
  DashboardNavbar,
} from "@/widgets/layout";
import bannerImg from '../assets/img/banner.jpg'
import {Map} from '../widgets/digitex/map'
import {Search} from '../widgets/digitex/search'
import routes from "@/routes";
import { useMaterialTailwindController } from "@/context";
import banner from '@/assets/img/6.png'

export function DigitexDetail() {
  
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
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}
        </Routes>
      </div>
      <div className="container mx-auto pb-6">
        <div className="xl:ml-60">
          <img src={banner} alt="" className="w-full h-auto object-cover" />
          <Map />
          <Search />
        </div>
      </div>
    </div>
  );
}

DigitexDetail.displayName = "/src/layout/beranda.jsx";

export default DigitexDetail;
