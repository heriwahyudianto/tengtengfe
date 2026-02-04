import {useEffect, useState} from "react";
import {
  Typography,
  Card,
  CardBody,
  IconButton,
  Tooltip,
  Button,
  Input,
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Spinner,
  Textarea, Select, Option,
  Alert
} from "@material-tailwind/react";
import { Switch } from "@material-tailwind/react";
import axios from "axios";
import moment from "moment";
import imageCompression from 'browser-image-compression';
import prodefault from '../../assets/img/prodefault.png'
import DigitexExhibitors from "@/widgets/digitex/digitexexbibitors";

export function DigitexHome() {
  const [eventname, seteventname] = useState('')
  const [eventdate, seteventdate] = useState('')
  const [todate, settodate] = useState('')
  const [location, setlocation] = useState('')
  const [row, setrow] = useState(0)
  const [col, setcol] = useState(0)
  
  const [ready, setReady] = useState(false)
  const [rowcol, setrowcol] = useState([])
  const [url, seturl] = useState('')
  const [imgFile, setImgFile] = useState()
  const [logopameran, setlogopameran] = useState()
  
  const [showSpinner, setshowSpinner] = useState(false)
  const [replaceSpinner, setreplaceSpinner] = useState(false)
  const [action3Spinner, setaction3Spinner] = useState(false)
  const [open, setOpen] = useState(false); 
  const handleOpen = () => setOpen(!open);
  const [openDelAll, setOpenDelAll] = useState(false); 
  const handleOpenDelAll = () => setOpenDelAll(!openDelAll);
  const [id, setid] = useState()
  const [digitexid, setdigitexid] = useState()
  const [digitex, setdigitex] = useState([])

  const [slotCode, setSlotCode] = useState('');
  const [website, setWebsite] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [logo, setLogo] = useState('');
  const [category,setCategory] = useState('')
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [UtubeTitle, setUtubeTitle] = useState('');
  const [UtubeDesc, setUtubeDesc] = useState('');
  const [UtubeCode, setUtubeCode] = useState('');
  const [mapexist,setmapexist] = useState([])
  const [select,setSelect] = useState(false)
  const [selectedBox, setSelectedBox] = useState([])
  const [deselect, setDeselect] = useState(false)
  const [arsir, setArsir] = useState([])
  const [catalog, setCatalog] = useState()
  const [brochure, setBrochure] = useState()
  const [pricelist, setPricelist] = useState()
  const [catalogURL, setCatalogURL] = useState()
  const [brochureURL, setBrochureURL] = useState()
  const [pricelistURL, setPricelistURL] = useState()
  const [videosituational, setVideosituational] = useState('')
  const [videopromo, setVideopromo] = useState('')
  const [videohighlight, setVideohighlight] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)

  const getDidgitex = async () => {
    setshowSpinner(true)
    await axios.get('https://tengtengapi.indomaber.com/digitex')
    .then(response => {      
      console.log('digitex',response.data)
      if (response.data.length > 0) {
        setdigitex(response.data)
        //setmapexist(response.data)
        //seteventname(response.data[0].eventname)
        //seteventdate(moment(response.data[0].date).format("YYYY-MM-DD"))
        //setlocation(response.data[0].location)
        //setcol(respone.data[0].kolom)
        //setrow(response.data[0].baris)
        //dseturl(response.data[0].url)
      } else {
        setdigitex([])
      }
      setshowSpinner(false)
    })
    .catch(error => {
      console.error(error);
    });
  }

  const getArsir = async (digiid) => {
    await axios.get(`https://tengtengapi.indomaber.com/digitex/arsir/${digiid}`)
    .then(response => {    
      if (response.data.length > 0) {
        let dataarsir = []
        response.data.map((item,idx)=>{
          dataarsir.push(item.id)
        })
        console.log('dataarsir',dataarsir)
        setArsir(dataarsir)
      }
    })
    .catch(error => {
      console.error(error);
    });
  }

  useEffect(()=> {
    getDidgitex()
    //getArsir()
  }, [])

  useEffect(()=>{
  let total = row * col
    let komponen = []
    for (let index = 0; index < total ; index++) {
      komponen.push(1)
    }
    setrowcol(komponen)
  }, [row,col])

  const getMap = async (idx) => {
    setaction3Spinner(true)
     await axios.get(`https://tengtengapi.indomaber.com/digitex/map/${idx}/digitexid/${digitexid}`)
    .then(response => {      
      console.log('map server',response.data)
      if (response.data.length > 0) {
        setSlotCode(response.data[0].slotcode)
        setWebsite(response.data[0].web)
        setEmail(response.data[0].email)
        setPhone(response.data[0].phone)
        setLogo(response.data[0].logo)
        setCategory(response.data[0].category)
        setTitle(response.data[0].title)
        setContent(response.data[0].content)
        setUtubeTitle(response.data[0].utubetitle)
        setUtubeDesc(response.data[0].utubedesc)
        setUtubeCode(response.data[0].utubeid)
        setVideohighlight(response.data[0].videohighlight)
        setVideopromo(response.data[0].videopromo)
        setVideosituational(response.data[0].videosituational)
        setCatalogURL(response.data[0].catalog)
        setBrochureURL(response.data[0].brochure)
        setPricelistURL(response.data[0].pricelist)
        setOpen(true)
      } else {        
        setSlotCode('')
        setWebsite('')
        setEmail('')
        setPhone('')
        setLogo('')
        setCategory('')
        setTitle('')
        setContent('')
        setUtubeTitle('')
        setUtubeDesc('')
        setUtubeCode('')
      }
      setaction3Spinner(false)
    })
    .catch(error => {
      console.error(error);
      setaction3Spinner(false)
    });
  }

  useEffect(()=>{
    if (id >= 0) {
      getMap(id)
    }
  }, [id])

  const checkBg = (id) => {
    if (selectedBox.length>0) {
      if (selectedBox.includes(id)) {
        return "bg-blue-500 border border-red-700 hover:cursor-pointer"
      } else if (arsir.length > 0) {
        if (arsir.includes(id)) {
          return "bg-yellow-500 border border-red-700 hover:cursor-pointer bg-opacity-50"
        } else {
          return "border border-red-700 hover:cursor-pointer"
        }
      } else {
        return "border border-red-700 hover:cursor-pointer"
      }
    } else if (arsir.length > 0) {
      if (arsir.includes(id)) {
        return "bg-amber-500 border border-red-700 hover:cursor-pointer bg-opacity-50"
      } else {
        return "border border-red-700 hover:cursor-pointer"
      }
    } else {
      return "border border-red-700 hover:cursor-pointer"
    }
  }

const TABLE_HEAD = ["Evant Name", "Event Date", "Location", "Column", "Row"];
 
const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
];

  return (
    <div className="mt-12">
      <Typography variant="h1">
        Digital Exhibition
      </Typography>      
      {showAdd &&
        <Card className="my-8">
          <CardBody>
            <Typography variant="h3">
              Add Event
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="">
              <Input size="sm" placeholder="image" variant="outlined" label="Exihition Logo"  type="file"
              accept="image/*" name="logo"
              onChange={(event)=>{    
                if (event.target.files && event.target.files[0]) {
                  console.log("filename", event.target.files[0].name)
                  setlogopameran(event.target.files[0])
                }
              }}
            />
            </div>
            <div className="">
              <Input variant="outlined" size="md" label="Event Name" value={eventname} onChange={(e)=>{seteventname(e.target.value)}} />
            </div>
            <div className="">
              <Input variant="outlined" type="date" size="md" label="Event Date" value={eventdate} onChange={(e)=>{seteventdate(e.target.value)}} />
              {eventdate === '' ? null :
                <Typography
                variant="small"
                color="gray"
                className="mt-0 flex items-center gap-1 italic "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="-mt-px h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
                {moment(eventdate).format("DD MMMM YYYY")}
                </Typography>
              }
            </div>
             <div className="">
              <Input variant="outlined" type="date" size="md" label="To Date" value={todate} 
              onChange={(e)=>{settodate(e.target.value)}} />
              {todate === '' ? null :
                <Typography
                  variant="small"
                  color="gray"
                  className="mt-0 flex items-center gap-1 italic "
                >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="-mt-px h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
                {moment(todate).format("DD MMMM YYYY")}
                </Typography>
              }
            </div>
            <div className="">
              <Input variant="outlined"  size="md" label="Location" value={location} onChange={(e)=>{setlocation(e.target.value)}} />
            </div>
            <div className="">
              <Input variant="outlined"  size="md" label="Columns" value={col} onChange={(e)=>{setcol(e.target.value)}} />
            </div>
            <div className="">
              <Input variant="outlined"  size="md" label="Rows" value={row} onChange={(e)=>{setrow(e.target.value)}} />
            </div>
            </div>
            <div className="flex justify-end items-center mt-4 gap-4">
              <Spinner color="purple" size="md" className={showSpinner? '': 'hidden'} ></Spinner>
              <Button variant="outlined" size="sm"
                className={showSpinner? 'hidden': ''}
                onClick={()=>{
                  setShowAdd(false)
                }}
              >
                Cancel
              </Button> 
              <Button variant="gradient" color="blue" size="sm"
                className={showSpinner? 'hidden': ''}
                disabled={eventname === '' || eventdate==='' || parseInt(col) < 1 || parseInt(row) < 1}
                onClick={async()=>{
                  setshowSpinner(true)
                  let imgdata = new FormData();
                  if (logopameran) {  
                    const imageFile = logopameran;
                    const options = {
                      maxSizeMB: 0.5,
                      useWebWorker: true,
                    }
                    const compressedFile = await imageCompression(imageFile, options);
                    imgdata.append('logo', compressedFile, logopameran.name);  
                  }
                  imgdata.append("id",digitexid)
                  imgdata.append("eventname", eventname)
                  imgdata.append("date", eventdate)
                  imgdata.append("todate", todate)
                  imgdata.append("location", location)
                  imgdata.append("kolom", col)
                  imgdata.append("baris", row)
                  await axios.post('https://tengtengapi.indomaber.com/digitex', imgdata, {
                    headers: {
                      'accept': 'application/json',
                      'Accept-Language': 'en-US,en;q=0.8',
                      'Content-Type': `multipart/form-data; boundary=${imgdata._boundary}`,
                    },
                    mode : 'cors'
                  })
                  .then(response => {
                    console.log('add digitex successfully:', response.data);
                    getDidgitex()
                    setshowSpinner(false)
                    setShowAdd(false)
                  })
                  .catch(error => {
                    console.error('Error updating resource:', error);
                  });
              }}
              >Save</Button>
            </div>
          </CardBody>
        </Card> 
      }
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>             
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4" >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Event Name
                </Typography>
              </th>  
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4" >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Event Date
                </Typography>
              </th> 
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4" >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Location
                </Typography>
              </th> 
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4" >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Column
                </Typography>
              </th>  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4" >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Row
                </Typography>
              </th>                
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 flex justify-end">
                 <IconButton color="deep-purple" size="sm" variant="gradient"
                  onClick={()=>{setShowAdd(true)}}
                 >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4" fill="#fff">
                    <path d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"/></svg>
                    
                  </IconButton>
                </th>
            </tr>
          </thead>
          <tbody>
            {digitex.length>0 &&
            <>
            {digitex.map(({ id, logo, eventname, location, date, todate, kolom, baris, url, ready }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";  
              return (
                <tr key={index}>
                  <td className={classes}>
                    {logo == null ? null :
                    <img src={`https://tengtengapi.indomaber.com/digitex/${logo}`} alt="" className="w-auto h-6"  />
                    }
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {eventname}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {moment(date).format('D MMM YYYY')} 
                      {todate == null ? '' : ` - ${moment(todate).format('D MMM YYYY')}`}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {location}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {kolom}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {baris}
                    </Typography>
                  </td>
                  <td className={`${classes} flex justify-end gap-2`}>
                    <IconButton color="yellow" size="sm" variant="gradient"
                      disabled={showSpinner}
                      onClick={()=>{
                        setmapexist([{}])
                        seteventname(eventname)
                        seteventdate(moment(date).format("YYYY-MM-DD"))
                        settodate(moment(todate).format("YYYY-MM-DD"))
                        setlocation(location)
                        setcol(kolom)
                        setrow(baris)
                        seturl(url)
                        setReady(ready)
                        setdigitexid(id)
                        getArsir(id)
                        setShowEdit(true)
                      }}  
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-5" fill="#000">
                      <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L368 46.1 465.9 144 490.3 119.6c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L432 177.9 334.1 80 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg>
                    </IconButton>
                    <IconButton color="red" size="sm" variant="gradient"
                      disabled={showSpinner}
                      onClick={async()=>{
                        setshowSpinner(true)
                         await axios.delete(`https://tengtengapi.indomaber.com/digitex`,{
                          headers: {},
                          data: {
                            id: id,
                            eventname: eventname,
                          }
                        })
                        .then(response => {
                          console.log('Item deleted:', response.data);
                          //getArsir(digitexid)
                          //setSelectedBox([])
                          setShowEdit(false)
                          setArsir([])
                          getDidgitex()
                          setshowSpinner(false)
                        })
                        .catch(error => {
                          console.error('Error deleting item:', error);
                          setshowSpinner(false)
                        });
                      }}  
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"  className="w-4 h-5" fill="#fff">
                      <path d="M136.7 5.9C141.1-7.2 153.3-16 167.1-16l113.9 0c13.8 0 26 8.8 30.4 21.9L320 32 416 32c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 8.7-26.1zM32 144l384 0 0 304c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-304zm88 64c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24z"/></svg>
                    </IconButton>
                  </td>
                </tr>
              );
            })}
            </>}
          </tbody>
        </table>
      </Card>
      {showEdit &&
      <>
      <DigitexExhibitors digitexid={digitexid} event={eventname} mapurl={url} row={row} col={col} />
      <Card className="mt-8">
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
               <Input size="sm" placeholder="image" variant="outlined" label="Exihition Logo"  type="file"
              accept="image/*" name="logo"
              onChange={(event)=>{    
                if (event.target.files && event.target.files[0]) {
                  console.log("filename", event.target.files[0].name)
                  setlogopameran(event.target.files[0])
                }
              }}
            />
            </div>
          <div className="">
            <Input variant="outlined" size="md" label="Event Name" value={eventname} onChange={(e)=>{seteventname(e.target.value)}} />
          </div>
          <div className="">
            <Input variant="outlined" type="date" size="md" label="Event Date" value={eventdate} onChange={(e)=>{seteventdate(e.target.value)}} />
            {eventdate === '' ? null :
            <Typography
              variant="small"
              color="gray"
              className="mt-0 flex items-center gap-1 italic "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="-mt-px h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>
              {moment(eventdate).format("DD MMMM YYYY")}
              </Typography>
            }
          </div>
          <div className="">
            <Input variant="outlined" type="date" size="md" label="To Date" value={todate} onChange={(e)=>{settodate(e.target.value)}} />
            {todate === '' ? null :
            <Typography
              variant="small"
              color="gray"
              className="mt-0 flex items-center gap-1 italic "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="-mt-px h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>
              {moment(todate).format("DD MMMM YYYY")}
              </Typography>
            }
          </div>
          <div className="">
            <Input variant="outlined"  size="md" label="Location" value={location} onChange={(e)=>{setlocation(e.target.value)}} />
          </div>
          <div className="">
            <Input variant="outlined"  size="md" label="Columns" value={col} onChange={(e)=>{setcol(e.target.value)}} />
          </div>
          <div className="">
            <Input variant="outlined"  size="md" label="Rows" value={row} onChange={(e)=>{setrow(e.target.value)}} />
          </div>
           <div className="">
            <Switch color="blue" label="Publish"  ripple={true} checked={ready===1 ? true : false}
              onChange={(e)=>{
                setReady(e.target.checked ? 1 : 0)
              }}
            />
          </div>
          </div>
          <div className="flex justify-end items-center mt-4">
            <Spinner color="purple" size="md" className={replaceSpinner? '': 'hidden'} ></Spinner>
            <Button variant="gradient" color="deep-purple" size="sm"
            disabled={showSpinner}
            onClick={async()=>{
              setshowSpinner(true)
               let imgdata = new FormData();
              if (logopameran) {  
                const imageFile = logopameran;
                const options = {
                  maxSizeMB: 0.5,
                  useWebWorker: true,
                }
                const compressedFile = await imageCompression(imageFile, options);
                imgdata.append('logo', compressedFile, logopameran.name);  
              }
              imgdata.append("id",digitexid)
              imgdata.append("eventname", eventname)
              imgdata.append("date", eventdate)
              imgdata.append("todate", todate)
              imgdata.append("location", location)
              imgdata.append("kolom", col)
              imgdata.append("baris", row)
              imgdata.append("ready", ready)
              await axios.put('https://tengtengapi.indomaber.com/digitex', imgdata, {
                headers: {
                  'accept': 'application/json',
                  'Accept-Language': 'en-US,en;q=0.8',
                  'Content-Type': `multipart/form-data; boundary=${imgdata._boundary}`,
                },
                mode : 'cors'
              })
                .then(response => {
                  console.log('Resource updated successfully:', response.data);
                  getDidgitex()
                  setshowSpinner(false)
                })
                .catch(error => {
                  console.error('Error updating resource:', error);
                  setshowSpinner(false)
                });
            }}
            >Update</Button>
          </div>
        </CardBody>
      </Card>
      <Card className="mt-10">
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <Input
              size="sm"
              placeholder="image"
              variant="outlined"
              label="Floor Map"
              type="file"
              accept="image/*"
              name="file"
              onChange={(event)=>{    
                if (event.target.files && event.target.files[0]) {
                  console.log("filename", event.target.files[0].name)
                  setImgFile(event.target.files[0])
                }
              }}
            />
            <div>
              <Spinner color="purple" size="md" className={replaceSpinner? '': 'hidden'} ></Spinner>
              <Button variant="gradient" color="deep-purple" size="sm"
                className={replaceSpinner? 'hidden' : ''}
                disabled={!imgFile}
                onClick={async ()=>{
                  setreplaceSpinner(true)
                  if (imgFile) {  
                    const imageFile = imgFile;
                    const options = {
                      maxSizeMB: 0.7,
                      //maxWidthOrHeight: 350,
                      useWebWorker: true,
                    }
                    try {
                      const compressedFile = await imageCompression(imageFile, options);
                      let imgdata = new FormData();
                      imgdata.append('file', compressedFile, imgFile.name);  
                      imgdata.append("id",digitexid)
                      await axios.post('https://tengtengapi.indomaber.com/digitex/map', imgdata, {
                        headers: {
                          'accept': 'application/json',
                          'Accept-Language': 'en-US,en;q=0.8',
                          'Content-Type': `multipart/form-data; boundary=${imgdata._boundary}`,
                        },
                        mode : 'cors'
                        })
                        .then((response) => {
                          console.log("replace map file res",response.data)
                          //getDidgitex()
                          if (response.data.length>0){
                            seturl(response.data[0].url)
                          }
                          setreplaceSpinner(false)
                        }).catch((error) => {
                          console.error(error)
                          setreplaceSpinner(false)
                        })
                    } catch (error) {
                      console.error(error);
                    }   
                  } 
                }}
              >Replace Map</Button>
            </div>
          </div>
          
        </CardBody>
      </Card>
      </>
      }
      <Dialog open={open} handler={handleOpen} size="xxl" className="overflow-scroll">
        <DialogBody className="space-y-4 pb-6 ">
          <Spinner color="purple" size="md" className={action3Spinner? '': 'hidden'} ></Spinner>
          <div className={replaceSpinner ? 'hidden':"grid grid-cols-1 md:grid-cols-3 gap-6"}>                      
            <div>
              <div className="text-black mb-8 font-bold">
                Boxes : {selectedBox.map((item,idx)=>{
                  return (
                    <span key={idx}>{item}, </span>
                  )
                })}
              </div>
              <div>
                <Input
                  size="sm"
                  variant="outlined"
                  name="slotcode"
                  label="#Stand"
                  value={slotCode}
                  onChange={(e)=>{setSlotCode(e.target.value)}}
                /> 
              </div>
              <div className="mt-4 flex flex-wrap justify-start gap-2 items-center">                
                {logo &&
                  <img src={`https://tengtengapi.indomaber.com/digitex/${logo}`} alt="" className="h-20 w-auto object-contain" />
                }
                <Input
                  size="sm"
                  type="file"
                  accept="image/*"
                  variant="outlined"
                  name="logo"
                  label="Logo"
                  onChange={(event)=>{    
                  if (event.target.files && event.target.files[0]) {
                    console.log("filename", event.target.files[0].name)
                    setLogo(event.target.files[0])
                  }
                }}
                />
              </div>
              <div className="mt-4">
                <Input
                  size="sm"
                  variant="outlined"
                  type="url"
                  name="web"
                  label="Website"
                  value={website}
                  onChange={(e)=>{setWebsite(e.target.value)}}
                />
              </div>
              <div className="mt-4">
                <Input
                  size="sm"
                  type="email"
                  variant="outlined"
                  name="email"
                  label="Email"
                  value={email}
                  onChange={(e)=>{
                    setEmail(e.target.value)
                  }}
                />
              </div>
              <div className="mt-4">
                <Input
                  size="sm"
                  type="tel"
                  variant="outlined"
                  name="phone"
                  label="Phone"
                  value={phone}
                  onChange={(e)=>{
                    setPhone(e.target.value)
                  }}
                />
              </div>
              <div className="mt-4">   
                <Input
                  size="sm"
                  type="file"
                  accept="application/pdf"
                  variant="outlined"
                  name="catelog"
                  label="Catalog PDF"
                  onChange={(event)=>{    
                  if (event.target.files && event.target.files[0]) {
                    setCatalog(event.target.files[0])
                  }
                }}
                />                
                {catalogURL && 
                  <a href={`https://tengtengapi.indomaber.com/digitex/${catalogURL}`} download
                  target="_blank" rel="noopener noreferrer" className="flex justify-start gap-1 items-center text-black ml-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-4 h-4">
                    <path d="M0 64C0 28.7 28.7 0 64 0L213.5 0c17 0 33.3 6.7 45.3 18.7L365.3 125.3c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zm208-5.5l0 93.5c0 13.3 10.7 24 24 24L325.5 176 208 58.5zM175 441c9.4 9.4 24.6 9.4 33.9 0l64-64c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-23 23 0-86.1c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 86.1-23-23c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64z"/></svg>
                    Download Catalog
                  </a>
                }
              </div>
              <div className="mt-4">   
                <Input
                  size="sm"
                  type="file"
                  accept="application/pdf"
                  variant="outlined"
                  name="brochure"
                  label="Brochure PDF"
                  onChange={(event)=>{    
                  if (event.target.files && event.target.files[0]) {
                    setBrochure(event.target.files[0])
                  }
                }}
                />                
                              
                {brochureURL && 
                  <a href={`https://tengtengapi.indomaber.com/digitex/${brochureURL}`} download
                  target="_blank" rel="noopener noreferrer" className="flex justify-start gap-1 items-center text-black ml-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-4 h-4">
                    <path d="M0 64C0 28.7 28.7 0 64 0L213.5 0c17 0 33.3 6.7 45.3 18.7L365.3 125.3c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zm208-5.5l0 93.5c0 13.3 10.7 24 24 24L325.5 176 208 58.5zM175 441c9.4 9.4 24.6 9.4 33.9 0l64-64c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-23 23 0-86.1c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 86.1-23-23c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64z"/></svg>
                    Download Brochure
                  </a>
                }
              </div>
              <div className="mt-4">   
                <Input
                  size="sm"
                  type="file"
                  accept="application/pdf"
                  variant="outlined"
                  name="pricelist"
                  label="Price List PDF"
                  onChange={(event)=>{    
                  if (event.target.files && event.target.files[0]) {
                    setPricelist(event.target.files[0])
                  }
                }}
                />              
                {pricelistURL && 
                  <a href={`https://tengtengapi.indomaber.com/digitex/${pricelistURL}`} download
                  target="_blank" rel="noopener noreferrer" className="flex justify-start gap-1 items-center text-black ml-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-4 h-4">
                    <path d="M0 64C0 28.7 28.7 0 64 0L213.5 0c17 0 33.3 6.7 45.3 18.7L365.3 125.3c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zm208-5.5l0 93.5c0 13.3 10.7 24 24 24L325.5 176 208 58.5zM175 441c9.4 9.4 24.6 9.4 33.9 0l64-64c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-23 23 0-86.1c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 86.1-23-23c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64z"/></svg>
                    Download Price List
                  </a>
                }
              </div>
            </div>
            <div className="md:col-span-2">
              <div>
                <Input
                  size="sm"
                  variant="outlined"
                  name="category"
                  label="Category"
                  value={category}
                  onChange={(e)=>{setCategory(e.target.value)}}
                />
              </div>
              <div className="mt-4">
                <Input
                  size="sm"
                  name="title"
                  label="Title"
                  variant="outlined"
                  value={title}
                  onChange={(e)=>{
                    setTitle(e.target.value)
                  }}
                />
              </div>
              <div className="mt-4">
                <Textarea  variant="outlined" label="Content"
                  value={content}
                  onChange={(e)=>{
                    setContent(e.target.value)
                  }}
                >
                  {content}
                </Textarea>
              </div>
              <div className="mt-4">
                <Input
                  size="sm"
                  variant="outlined"
                  name="utubeid"
                  label="Youtube ID"
                  value={UtubeCode}
                  onChange={(e)=>{
                    setUtubeCode(e.target.value)
                  }}
                />
              </div>
              <div className="mt-4">
                <Input
                  size="sm"
                  variant="outlined"
                  name="utubetitle"
                  label="Youtube Title"
                  value={UtubeTitle}
                  onChange={(e)=>{
                    setUtubeTitle(e.target.value)
                  }}
                />
              </div>
              <div className="mt-4">
                <Input
                  size="sm"
                  variant="outlined"
                  name="utubedesc"
                  label="Youtube Description"
                  value={UtubeDesc}
                  onChange={(e)=>{
                    setUtubeDesc(e.target.value)
                  }}
                />
              </div>
              <div className="mt-4">
                <Input
                  size="sm"
                  variant="outlined"
                  type="url"
                  label="Video Preview URL"
                  value={videosituational}
                  onChange={(e)=>{
                    setVideosituational(e.target.value)
                  }}
                />
              </div>
              <div className="mt-4">
                <Input
                  size="sm"
                  variant="outlined"
                  type="url"
                  label="Video Highlight URL"
                  value={videopromo}
                  onChange={(e)=>{
                    setVideopromo(e.target.value)
                  }}
                />
              </div>
              <div className="mt-4">
                <Input
                  size="sm"
                  variant="outlined"
                  type="url"
                  label="Video Promo URL"
                  value={videohighlight}
                  onChange={(e)=>{
                    setVideohighlight(e.target.value)
                  }}
                />
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className={replaceSpinner ? 'hidden':"gap-6"}>
          <Spinner color="purple" size="md" className={action3Spinner? '': 'hidden'} ></Spinner>          
          <Button variant="outlined" size="sm" onClick={()=>{
            handleOpen()
          }}
            className={action3Spinner ? 'hidden':''}
          >
            Close
          </Button>   
          {mapexist.length>0 &&       
            <Button variant="gradient" color="red" size="sm" 
            disabled={selectedBox.length===0}
            className={action3Spinner ? 'hidden':''}
            onClick={async()=>{
              setaction3Spinner(true)
              await axios.delete('https://tengtengapi.indomaber.com/digitex/map',{
                headers: {},
                data: {
                  id: selectedBox,
                  digitexid: digitexid
                }
              })
              .then(response => {
                console.log('Item yang deleted:', response.data);
                setArsir([])
                getArsir(digitexid)
                setSelectedBox([])
                setaction3Spinner(false)
              })
              .catch(error => {
                console.error('Error deleting item:', error);
                setaction3Spinner(false)
              });
              handleOpen
            }}>
              Delete
            </Button>
          }
          <Button variant="gradient" color="deep-purple" size="sm" 
            className={action3Spinner ? 'hidden':''}
            disabled={selectedBox.length===0}
            onClick={async()=>{              
              setaction3Spinner(true)              
                try {                  
                  let imgdata = new FormData();
                  if (typeof logo !== 'string') {  
                    const imageFile = logo;
                    const options = {
                      maxSizeMB: 0.3,
                      //maxWidthOrHeight: 350,
                      useWebWorker: true,
                    }
                    const compressedFile = await imageCompression(imageFile, options);
                    
                    imgdata.append('file', compressedFile, imageFile.name);  
                  }                    
                  imgdata.append('id', JSON.stringify(selectedBox));   
                  imgdata.append('digitexid', digitexid);   
                  imgdata.append('slotcode', slotCode);   
                  imgdata.append("web", website)
                  imgdata.append("email",email)
                  imgdata.append("phone",phone)
                  imgdata.append("category",category)
                  imgdata.append("title",title)
                  imgdata.append("content",content)
                  imgdata.append("utubeid",UtubeCode)
                  imgdata.append("utubetitle",UtubeTitle)
                  imgdata.append("utubedesc",UtubeDesc) 
                  imgdata.append("videosituational",videosituational) 
                  imgdata.append("videopromo",videopromo) 
                  imgdata.append("videohighlight",videohighlight) 
                  if (catalog) { 
                    imgdata.append('catalog', catalog, catalog.name); 
                  }  
                  if (brochure) { 
                    imgdata.append('brochure', brochure, brochure.name); 
                  }  
                  if (pricelist) { 
                    imgdata.append('pricelist', pricelist, pricelist.name); 
                  }  
                  await axios.post('https://tengtengapi.indomaber.com/digitex/map/detailwithmanyfiles', imgdata, {
                    headers: {
                      'accept': 'application/json',
                      'Accept-Language': 'en-US,en;q=0.8',
                      'Content-Type': `multipart/form-data; boundary=${imgdata._boundary}`,
                    },
                    mode : 'cors'
                    })
                    .then((response) => {
                      console.log("map detail file res",response.data)
                      setSelectedBox([])
                      getArsir(digitexid)
                      setaction3Spinner(false)
                    }).catch((error) => {
                      console.error(error)
                      setaction3Spinner(false)
                    })
                } catch (error) {
                  console.error(error);
                }  
              handleOpen
            }}>
            Save
          </Button>
        </DialogFooter>
      </Dialog>
      <Dialog open={openDelAll} handler={handleOpenDelAll}>
        <DialogHeader>Warning!</DialogHeader>
        <DialogBody>
          It will delete all boxes's data. Are you sure?
        </DialogBody>
        <DialogFooter>
          <Spinner color="purple" size="md" className={action3Spinner? '': 'hidden'} ></Spinner>
          <Button
            disabled={action3Spinner}
            variant="text"
            onClick={()=>{
              handleOpenDelAll()
            }}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="deep-purple" 
          disabled={action3Spinner}
          onClick={async()=>{
            setaction3Spinner(true)
            await axios.delete(`https://tengtengapi.indomaber.com/digitex/map/alldata`,{
              headers: {},
              data: {
                digitexid: digitexid
              }
            })
            .then(response => {
              console.log('All data deleted:', response.data);
              setArsir([])
              setaction3Spinner(false)
              handleOpenDelAll()
            })
            .catch(error => {
              console.error('Error deleting all data:', error);
              setaction3Spinner(false)
            });
          }}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default DigitexHome;
