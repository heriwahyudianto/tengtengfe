import {useEffect, useState} from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Tooltip,
  Chip,
  Button
} from "@material-tailwind/react";
import {
  authorsTableData
} from "@/data";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

export function Home() {
  const navigate = useNavigate()
  const [early, setEarly] = useState([])

  const getEarly = async () => {      
    await axios.get('https://inarconsapi.indomaber.com/early')
      .then(response => {
        setEarly(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(()=> {
    getEarly()
  }, [])

  return (
    <div className="mt-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <div className="flex justify-between">
            <Typography variant="h6" color="white">
              Early Access Registrant
            </Typography>
            <a href="https://inarconsapi.indomaber.com/downloadcsv">
              <Button color="green">Download Excel</Button>
            </a>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Name", "company", "Type", "register date", ""].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {early.map(
                ({ id, name, email, areYouA, companyName, brand, whatsapp, domicile, profession, typeOfVendor, interested, createDate }, key) => {
                  const className = `py-3 px-5 ${
                    key === authorsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={id}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {name}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {companyName}
                        </Typography>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {profession} {typeOfVendor} 
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                        {areYouA}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {moment(createDate).format('DD MMM YYYY')}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Tooltip content="Detail info">
                        <IconButton size="sm"
                          onClick={() => {
                            navigate(`/dashboard/Registrant/?id=${id}`)
                          }}
                        >
                          <i className="fa-solid fa-info"></i>
                        </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Home;
