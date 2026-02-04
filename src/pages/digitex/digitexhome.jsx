import { Routes, Route } from "react-router-dom";
import { IconButton,  Card, CardBody, Spinner, Typography } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController } from "@/context";
import banner from '@/assets/img/6.png'
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import def from '../../assets/img/prodefault.png'

export function DigitexHome() {
  
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
      <div className="">
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
  );
}

export default DigitexHome;
