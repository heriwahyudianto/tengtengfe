import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton,  Card, CardBody, Spinner, Typography } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import banner from '@/assets/img/6.png'
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import def from '../assets/img/prodefault.png'

export function Beranda() {
  
  const [digitex, setdigitex] =  useState([]) 
  const [showSpinner, setShowSpinner] = useState(false);

  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  
  const getDigitex = async () => {
    setShowSpinner(true);
    try { 
      await axios.get(`https://inarconsapi.indomaber.com/digitex/fe`)
      .then(async response => {
        console.log('digitex from server:', response.data);       
        if (response.data.length > 0) {
          setdigitex(response.data)
        } else {
          setdigitex([])
        }
        //setShowErr(false);
        setShowSpinner(false);
      })
      .catch(error => {
        console.error('There was an error making the request:', error);
        //setShowErr(true);
        setShowSpinner(false);
      });    
    } catch (error) {
        console.error('Error fetching subcategory:', error);
    } finally {}
  }

  useEffect(()=>{
    getDigitex()
  }, [])


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
      <div className="container mx-auto py-6">
        <div className="xl:ml-60">
          <img src={banner} alt="" className="w-full h-auto object-cover" />
          {digitex.length > 0 &&
            <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-2 py-6 ">
              {digitex.map((item, idx)=>
                <Card key={idx} shadow={true} variant="filled">
                  <CardBody className="p-4">
                    <img src={item.logo == null ? def : `https://inarconsapi.indomaber.com/digitex/${item.logo}`} 
                      className="w-full object-contain h-auto aspect-square rounded-lg" alt={item.eventname} />                
                    <Typography variant="paragraph" className="text-black mb-1 mt-2 text-xs font-normal">                
                    {moment(item.date).format('D MMM YYYY')} 
                      {item.todate == null ? '' : ` - ${moment(item.todate).format('D MMM YYYY')}`}
                    </Typography>
                    <a href={`/digitex/${item.eventname}`} className="hover:underline">
                      <Typography variant="h6">
                      {item.eventname}
                      </Typography>
                    </a>
                  </CardBody>
                </Card>
              )}
            </div>
          }
        </div>
      </div>
    </div>
  );
}

Beranda.displayName = "/src/layout/beranda.jsx";

export default Beranda;
