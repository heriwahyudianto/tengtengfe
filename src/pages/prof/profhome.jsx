import {useEffect, useState} from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Input,
  Dialog,
  CardFooter,
  Button,
  Spinner,
  DialogHeader,
  DialogBody,
  DialogFooter,Select, Option,
} from "@material-tailwind/react";
import axios from "axios";
import imageCompression from 'browser-image-compression';

export function ProfHome() {
  const [early, setEarly] = useState([])
  const [openDelete, setOpenDelete] = useState(false)
  const handleOpenDelete = () => setOpenDelete(!openDelete);

  const [openEdit, setOpenEdit] = useState(false)
  const [openAdd, setOpenAdd] = useState(false)
  const handleOpenEdit = () => setOpenEdit((cur) => !cur);
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [profesonal, setProfesonal] = useState('')
  const [tagline, setTagline] = useState('')
  const [imgFile, setImgFile] = useState(null)
  const [selectedId, setSelectedId] = useState(null)
  const [selectedEmail, setSelectedEmail] = useState(null)
  const [showErr, setShowErr] = useState(false);  
  const [showSpinner, setShowSpinner] = useState(false);

  const getEarly = async () => {      
    await axios.get('https://inarconsapi.indomaber.com/allpro')
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

  useEffect(()=>{
    setTagline(profesonal + ' - ' + city)
  }, [profesonal, city])

  return (
    <div className="mt-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <div className="flex justify-between">
            <Typography variant="h6" color="white">
              The Profesionals
            </Typography>
            <IconButton size="sm" color="amber" variant="gradient"
              onClick={()=>{setOpenAdd(true)}}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-4 h-4 " fill="#000">
              <path d="M96 0C60.7 0 32 28.7 32 64l0 384c0 35.3 28.7 64 64 64l180 0c-22.7-31.5-36-70.2-36-112 0-100.6 77.4-183.2 176-191.3l0-38.1c0-17-6.7-33.3-18.7-45.3L290.7 18.7C278.7 6.7 262.5 0 245.5 0L96 0zM357.5 176L264 176c-13.3 0-24-10.7-24-24L240 58.5 357.5 176zM432 544a144 144 0 1 0 0-288 144 144 0 1 0 0 288zm16-208l0 48 48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-48 0 0 48c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-48-48 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l48 0 0-48c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>
            </IconButton>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <div className={openAdd ? "mb-4 p-4" : "hidden"}>
            <div>
              <Typography variant="h4" color="blue-gray" className="mb-2">
                Add New Professional
              </Typography>
              <div className="mb-4">
              <Input label="Email" type="email"  size="sm" value={email} onChange={(e)=>{
                setEmail(e.target.value)
              }} />
              </div>
              <div className="mb-4">
              <Input label="Company" type="text" size="sm" value={company} onChange={(e) => {
                setCompany(e.target.value)
              }} />
              </div>
              <div className="mb-4">
              <Input label="Address" type="text" size="sm" value={address} onChange={(e) => {
                setAddress(e.target.value)
              }} />
              </div>
              <div className="mb-4">
              <Input label="Phone" type="tel" size="sm" value={phone} onChange={(e) => {
                setPhone(e.target.value)
              }} />
              </div>
              <div className="mb-4">
              <Select label="Profesional"
                onChange={(e)=>{
                  setProfesonal(e)
                }}
              >
                <Option value="Architect">Architect</Option>
                <Option value="Architectural Designer">Architectural Designer</Option>
                <Option value="Building Designer">Building Designer</Option>
                <Option value="Consultant">Consultant</Option>
                <Option value="Contractor">Contractor</Option>
                <Option value="Design and Build">Design and Build</Option>
                <Option value="Developer">Developer</Option>
                <Option value="Interior Designer">Interior Designer</Option>
                <Option value="Landscape Designer">Landscape Designer</Option>
                <Option value="Subcontractor">Subcontractor</Option>
              </Select>
              </div>
              <div className="mb-4">
              <Input variant="outlined" label="City" size="md" placeholder=""
                value={city}
                onChange={(e)=>{
                  setCity(e.target.value)
                }}
              />
              </div>
              <div className="mb-4">
              <Input
                size="sm"
                placeholder="Logo"
                label="Business logo"
                type="file"
                accept="image/*"
                variant="outlined"
                name="file"
                onChange={(event)=>{    
                  if (event.target.files && event.target.files[0]) {
                    console.log("filename", event.target.files[0].name)
                    setImgFile(event.target.files[0])
                  }
                }}
              />
              </div>
            </div>
            <div>
              <Spinner className={showSpinner? "h-12 w-12 mx-auto" : 'hidden'} color="amber" />
              <Button variant="outlined" size="sm" className="mr-4"
              disabled={showSpinner}
              onClick={()=>{
                setOpenAdd(false)
              }}
              >
                Cancel
              </Button>              
              <Button variant="gradient" color="amber" size="sm" 
              disabled={showSpinner || email === '' || company === '' || profesonal === '' || city === ''}
              onClick={async()=>{
                 setShowSpinner(true);                   
                try {
                  let imgdata = new FormData();
                  if (imgFile) {  
                    const imageFile = imgFile;
                    const options = {
                      maxSizeMB: 0.7,
                      //maxWidthOrHeight: 240,
                      useWebWorker: true,
                    }  
                    const compressedFile = await imageCompression(imageFile, options);
                    imgdata.append('file', compressedFile, imgFile.name); 
                  } else {
                    
                  }
                  imgdata.append('email', email); 
                  imgdata.append('name', company);   
                  imgdata.append('address', address);   
                  imgdata.append('phone', phone); 
                  imgdata.append('tagline', tagline);   
                  await axios.post('https://inarconsapi.indomaber.com/pro/addfromadmin', imgdata, {
                    headers: {
                      'accept': 'application/json',
                      'Accept-Language': 'en-US,en;q=0.8',
                      'Content-Type': `multipart/form-data; boundary=${imgdata._boundary}`,
                    },
                    mode : 'cors'
                  })
                  .then((response) => {
                    console.log("file res",response.data)
                    getEarly()
                    setShowSpinner(false)
                    setOpenAdd(false)
                  }).catch((error) => {
                    console.error(error)
                    setShowErr(true)
                    setShowSpinner(false)
                  })
                } catch (error) {
                  console.error(error);
                  setShowErr(true)
                  setShowSpinner(false)
                  setOpenAdd(false)
                }
              }}
              >
                Save
              </Button>
            </div>
          </div>
          <table className={openAdd ? 'hidden':"w-full min-w-[640px] table-auto"}>
            <thead>
              <tr>
                {["Company",  "Address", "Tagline", ""].map((el) => (
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
                ({ id, address, compro, email, name,  fax, ket, logo, phone, tagline, createDate }, key) => {
                  const className = `py-1 px-2 ${
                    key === early.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;
                  return (
                    <tr key={id}>
                      <td className={className}>
                        <div className="flex justify-start items-center gap-2">
                          <div className="aspect-square rounded-full object-cover object-center overflow-hidden shadow-md">
                            <img src={`https://inarconsapi.indomaber.com/logo/${logo}`} alt="" className="h-12 w-auto aspect-square rounded-full object-cover object-center" />
                          </div>
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
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="text-xs font-normal text-blue-gray-500"
                            >
                              {address} - {phone}
                            </Typography>
                          </div>
                      </td>  
                      <td className={className}>                          
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="text-xs font-normal text-blue-gray-500"
                            >
                              {tagline}
                            </Typography>
                          </div>
                      </td>                     
                      <td className={className}>
                         <IconButton size="sm" color="amber" variant="gradient" className="mr-2"
                          onClick={() => {
                            setEmail(email);
                            setCompany(name);
                            setAddress(address);
                            setPhone(phone);
                            setCity(tagline.split(' - ').pop());
                            setProfesonal(tagline.split(' - ').shift());
                            setSelectedId(id);
                            setOpenEdit(true);
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4" fill="#000">
                          <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L368 46.1 465.9 144 490.3 119.6c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L432 177.9 334.1 80 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg>
                         </IconButton>
                        <IconButton size="sm" color="red" variant="gradient"
                          onClick={() => {
                            setSelectedEmail(email);
                            setOpenDelete(true);
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4" fill="#fff">
                           <path d="M136.7 5.9C141.1-7.2 153.3-16 167.1-16l113.9 0c13.8 0 26 8.8 30.4 21.9L320 32 416 32c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 8.7-26.1zM32 144l384 0 0 304c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-304zm88 64c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24z"/></svg>
                      
                        </IconButton>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <Dialog
        size="xs"
        open={openEdit}
        handler={handleOpenEdit}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Edit
            </Typography>
            <Input label="Email" type="email"  size="sm" value={email} onChange={(e)=>{
              setEmail(e.target.value)
            }} />
            <Input label="Company" type="text" size="sm" value={company} onChange={(e) => {
              setCompany(e.target.value)
            }} />
              <div >
              <Input label="Address" type="text" size="sm" value={address} onChange={(e) => {
                setAddress(e.target.value)
              }} />
              </div>
              <div >
              <Input label="Phone" type="tel" size="sm" value={phone} onChange={(e) => {
                setPhone(e.target.value)
              }} />
              </div>
              
              <div >
              <Select label="Profesional" value={profesonal}
                onChange={(e)=>{
                  setProfesonal(e)
                }}
              >
                <Option value="Architect">Architect</Option>
                <Option value="Architectural Designer">Architectural Designer</Option>
                <Option value="Building Designer">Building Designer</Option>
                <Option value="Consultant">Consultant</Option>
                <Option value="Contractor">Contractor</Option>
                <Option value="Design and Build">Design and Build</Option>
                <Option value="Developer">Developer</Option>
                <Option value="Interior Designer">Interior Designer</Option>
                <Option value="Landscape Designer">Landscape Designer</Option>
                <Option value="Subcontractor">Subcontractor</Option>
              </Select>
              </div>
              <div >
              <Input variant="outlined" label="City" size="md" placeholder=""
                value={city}
                onChange={(e)=>{
                  setCity(e.target.value)
                }}
              />
              </div>
            <Input
              size="sm"
              placeholder="Logo"
              label="Business logo"
              type="file"
              accept="image/*"
              variant="outlined"
              name="file"
              onChange={(event)=>{    
                if (event.target.files && event.target.files[0]) {
                  console.log("filename", event.target.files[0].name)
                  setImgFile(event.target.files[0])
                }
              }}
            />
          </CardBody>
          <CardFooter className="pt-0">            
            <Spinner className={showSpinner? "h-12 w-12 mx-auto" : 'hidden'} color="amber" />
            <Button variant="outlined" size="sm"
            disabled={showSpinner}
            className="mr-4"
            onClick={()=>{
              setOpenEdit(false)
            }} >
              Cancel
            </Button>
            <Button variant="gradient" color="amber" size="sm"
            disabled={showSpinner || email === '' || company === '' || profesonal === '' || city === ''}
            onClick={async ()=>{
              setShowSpinner(true);                   
              try {
                let imgdata = new FormData();
                if (imgFile) {  
                  const imageFile = imgFile;
                  const options = {
                    maxSizeMB: 0.7,
                    //maxWidthOrHeight: 240,
                    useWebWorker: true,
                  }  
                  const compressedFile = await imageCompression(imageFile, options);
                  imgdata.append('file', compressedFile, imgFile.name); 
                } else {
                  
                }
                imgdata.append('email', email); 
                imgdata.append('name', company); 
                imgdata.append('address', address);   
                imgdata.append('phone', phone);     
                imgdata.append('id', selectedId);
                imgdata.append('tagline', tagline); 
                await axios.put('https://inarconsapi.indomaber.com/pro/editfromadmin', imgdata, {
                  headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data; boundary=${imgdata._boundary}`,
                  },
                  mode : 'cors'
                })
                .then((response) => {
                  console.log("file res",response.data)
                  getEarly()
                  setShowSpinner(false)
                  setOpenEdit(false)
                }).catch((error) => {
                  console.error(error)
                  setShowErr(true)
                  setShowSpinner(false)
                })
              } catch (error) {
                console.error(error);
                setShowErr(true)
                setShowSpinner(false)
                setOpenEdit(false)
              }
            }} >
              Save
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
      <Dialog open={openDelete} handler={handleOpenDelete}>
        <DialogHeader>Warning!</DialogHeader>
        <DialogBody>
          <Typography variant="h6" color="red">
            Are you sure you want to delete this professional?
          </Typography>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="outlined"
            onClick={handleOpenDelete}
            className="mr-4"
            size="sm"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="amber" 
            size="sm" 
            onClick={async ()=>{
              setShowSpinner(true);
              await axios.delete(`https://inarconsapi.indomaber.com/pro/delfromadmin`,{
                headers: {},
                data: {
                  email: selectedEmail
                }
              })
              .then((response) => {
                console.log("delete res",response.data)
                getEarly()
                setShowSpinner(false)
                setOpenDelete(false)
              }).catch((error) => {
                console.error(error)
                setShowErr(true)
                setShowSpinner(false)
              })
            }}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default ProfHome;
