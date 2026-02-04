import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { platformSettingsData, conversationsData, projectsData } from "@/data";
import {useEffect, useState} from "react";
import axios from "axios";
import moment from "moment";
import { useSearchParams } from 'react-router-dom';

export function Profile() {
  const [registrant, setRegistrant] = useState([])
  const [desiredFeature, setsetDesiredFeature] = useState([])
  const [productCategory, setProductCategory] = useState([])
  const [searchParams] = useSearchParams();

  const getRegistrant = async (id) => {      
    await axios.get(`https://inarconsapi.indomaber.com/registrant/${id}`)
      .then(response => {
        setRegistrant(response.data.registrant[0]);
        setsetDesiredFeature(response.data.desiredfeature)
        setProductCategory(response.data.productcategory)
        console.log(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(()=> {
    getRegistrant(searchParams.get('id'))
  }, [])
  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <i className="fa-solid fa-user-large text-5xl"></i>
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  {registrant && registrant.name}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  {registrant && registrant.profession}
                  {registrant && registrant.typeOfVendor}
                </Typography>
              </div>
            </div>
          </div>
          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2">
            <div>
              <div className="flex flex-col gap-12">
                <Typography className="block text-xs font-semibold uppercase text-blue-gray-500">
                  Company : {registrant && registrant.companyName}
                </Typography> 
                <div>
                  <Typography className="mb-4 block text-xs font-semibold uppercase text-blue-gray-500">
                    Desired Feature
                  </Typography>
                  <div className="flex flex-col gap-2">
                    {desiredFeature && desiredFeature.map((item, id) => (
                      <div>
                      <i className="fa-solid fa-check"></i> {item.name}
                      </div>
                    ))}
                  </div>
                </div>
                {productCategory.length > 0 ?
                <div>
                  <Typography className="mb-4 block text-xs font-semibold uppercase text-blue-gray-500">
                    Product Category
                  </Typography>
                  <div className="flex flex-col gap-2">
                    {productCategory.map((item, id) => (
                      <div>
                      <i className="fa-solid fa-check"></i> {item.name}
                      </div>
                    ))}
                  </div>
                </div>
                : <></>}
              </div>
            </div>
            <div>              
              <ProfileInfoCard
                title="Brands"
                description={registrant && registrant.brand}
                details={
                  registrant ? 
                    registrant.areYouA === 'professional' ?
                      {
                        "He/She is a": registrant.areYouA ,
                        "Whatsapp": registrant.whatsapp,
                        email: registrant.email,
                        "Domicile": registrant.domicile,
                        "Register Date": moment(registrant.createDate).format('D MMM YYYY')
                      }
                    : {
                      "He/She is a": registrant.areYouA ,
                      "Type of Vendor" : registrant.typeOfVendor,
                      "Whatsapp": registrant.whatsapp,
                      email: registrant.email,
                      "Domicile": registrant.domicile,
                      "Register Date": moment(registrant.createDate).format('D MMM YYYY')
                    }
                  : {}                  
                }
                action={<></>
                }
              />
              <hr className="my-8 border-blue-gray-50" />
              <Typography
                variant="small"
                className="font-normal text-blue-gray-500"
              >
                { registrant?.interested ? 'Yes': 'Not' } INTERESTED TO RECEIVE EARLY ACCESS (FREE PREMIUM WITH INCENTIVES) 
              </Typography>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
