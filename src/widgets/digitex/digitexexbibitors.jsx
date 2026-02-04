import { Avatar, Typography, Card, CardBody, Button ,
  Input,
  CardHeader,
  IconButton,
  Spinner,
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter, Tabs,CardFooter,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel, 
  Textarea} from "@material-tailwind/react";
import DataTable from 'react-data-table-component';
import {useEffect, useState, useRef} from "react";
import axios from "axios";
import imageCompression from 'browser-image-compression';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import '../../widgets/mapscrollbar.css'
import DigitexMapping from "./digitexmapping";

export function DigitexExhibitors(props) {
  const [exbibitors, setExhibitors] = useState([])
  const [showSpinner, setshowSpinner] = useState(false)
  const [showAddExhibitorUI,setShowAddExhibitorUI] = useState(false)
  const [selectedExhibitor, setSelectedExhibitor] = useState([])
  const [isedit, setisedit] = useState(false)
  const [isdelete, setisdelete] = useState(false)
  const handleIsDelete = () => setisdelete(!isdelete);
  const [openView, setOpenView] = useState(false); 
  const handleOpenView = () => setOpenView(!openView);
  const [openMap, setOpenMap] = useState(false); 
  const [openReplaceLogo,setOpenReplaceLogo] = useState(false)
  const handleOpenReplaceLogo = () => setOpenReplaceLogo((cur) => !cur);

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
  const [catalog, setCatalog] = useState()
  const [brochure, setBrochure] = useState()
  const [pricelist, setPricelist] = useState()
  const [videosituational, setVideosituational] = useState('')
  const [videopromo, setVideopromo] = useState('')
  const [videohighlight, setVideohighlight] = useState('')

  const getExhibitors = async (digitexid)=>{
    await axios.get(`https://tengtengapi.indomaber.com/digitexexhibitors/${digitexid}`)
    .then(response => {      
      console.log('digitexexhibitors',response.data)
      if (response.data.length > 0) {
        setExhibitors(response.data)
      } else {
        setExhibitors([])
      }
      setshowSpinner(false)
    })
    .catch(error => {
      console.error(error);
    });
  }

  useEffect(()=>{
    getExhibitors(props.digitexid)
  },[props])

  const tabsTitle = [
    {
      label: "Preview",
      value: "html",
      desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people 
      who are like offended by it, it doesn't matter.`,
    },
    {
      label: "Highlight",
      value: "react",
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
    {
      label: "Promo",
      value: "vue",
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    }
  ];

  const utubeParam = (utubeurl) => {
    if (URL.canParse(utubeurl)) {
      let url = new URL(utubeurl);
      let params = new URLSearchParams(url.search);
      let videoId = params.get('v')
      return videoId
    }
    return null
  }

  const fileCatalogRef = useRef(null);

  useEffect(()=>{
    if (isedit && selectedExhibitor.length > 0) {
      setSlotCode(selectedExhibitor[0].slotcode)
      setWebsite(selectedExhibitor[0].web)
      setEmail(selectedExhibitor[0].email)
      setPhone(selectedExhibitor[0].phone)
      setTitle(selectedExhibitor[0].title)
      setContent(selectedExhibitor[0].content)
      setVideosituational(selectedExhibitor[0].videosituational)
      setVideohighlight(selectedExhibitor[0].videohighlight)
      setVideopromo(selectedExhibitor[0].videopromo)
    }
  }, [selectedExhibitor, isedit])

  return (
    <>
    <Card className="my-8">
      <CardBody>
        <div className="flex justify-between items-center gap-4 flex-wrap">
          <Typography variant="h3">
            Exhibitors of  {props.event}
          </Typography>
          <Button variant="gradient" size="sm" color="deep-purple"
            className={(openMap && selectedExhibitor.length > 0) || isedit ? "hidden" : ''}
            onClick={()=>{
              setShowAddExhibitorUI(true)
            }}
          >
            Add Exbihibitors
          </Button>
        </div>
        {showAddExhibitorUI &&
          <>
          <div className={"grid grid-cols-1 md:grid-cols-3 gap-6 mt-6"}>                      
            <div>
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
                  ref={fileCatalogRef}
                  onChange={(event)=>{    
                  if (event.target.files && event.target.files[0]) {
                    setCatalog(event.target.files[0])
                  }
                }}
                /> 
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
              </div>
            </div>
            <div className="md:col-span-2">              
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
          <div className="flex justify-end items-center mt-4 gap-4">
            <Spinner color="purple" size="md" className={showSpinner? '': 'hidden'} ></Spinner>
            <Button variant="outlined" size="sm"
              className={showSpinner? 'hidden': ''}
              onClick={()=>{
                setShowAddExhibitorUI(false)
              }}
            >
              Close
            </Button> 
            <Button variant="gradient" color="deep-purple" size="sm" 
              className={showSpinner ? 'hidden':''}
              onClick={async()=>{              
                setshowSpinner(true)              
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
                    imgdata.append('digitexid', props.digitexid);   
                    imgdata.append('slotcode', slotCode);   
                    imgdata.append("web", website)
                    imgdata.append("email",email)
                    imgdata.append("phone",phone)
                    imgdata.append("title",title)
                    imgdata.append("content",content)
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
                    await axios.post('https://tengtengapi.indomaber.com/digitexexhibitors', imgdata, {  
                      headers: {
                        'accept': 'application/json',
                        'Accept-Language': 'en-US,en;q=0.8',
                        'Content-Type': `multipart/form-data; boundary=${imgdata._boundary}`,
                      },
                      mode : 'cors'
                      })
                    .then((response) => {
                      console.log("map detail file res",response.data)
                      setSlotCode('');
                      setWebsite('');
                      setEmail('');
                      setPhone('');
                      setLogo('');
                      setCategory('')
                      setTitle('');
                      setContent('');
                      setUtubeTitle('');
                      setUtubeDesc('');
                      setUtubeCode('');
                      setCatalog()
                      //if (fileCatalogRef.current) {
                        fileCatalogRef.current.value = ''; // or ''
                        fileCatalogRef.current.type = "text";
                        fileCatalogRef.current.type = "file";
                      //}
                      setBrochure()
                      setPricelist()
                      setVideosituational('')
                      setVideopromo('')
                      setVideohighlight('')
                      setShowAddExhibitorUI(false)
                      setshowSpinner(false)
                      getExhibitors(props.digitexid)
                    }).catch((error) => {
                      console.error(error)
                      setshowSpinner(false)
                    })
                  } catch (error) {
                    console.error(error);
                  } 
              }}>
              Save
            </Button>
          </div>
          </>
        }
        {isedit && selectedExhibitor.length>0 &&
          <>
          <div className={"grid grid-cols-1 md:grid-cols-3 gap-6 mt-6"}>                      
            <div>
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
            </div>
            <div className="md:col-span-2">
              <div className="mt-0">
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
          <div className="flex justify-end items-center mt-4 gap-4">
            <Spinner color="purple" size="md" className={showSpinner? '': 'hidden'} ></Spinner>
            <Button variant="outlined" size="sm"
              className={showSpinner? 'hidden': ''}
              onClick={()=>{
                setShowAddExhibitorUI(false)
                setisedit(false)
                setSelectedExhibitor([])
              }}
            >
              Close
            </Button> 
              <Button variant="gradient" color="deep-purple" size="sm" 
              className={showSpinner ? 'hidden':''}
              onClick={async()=>{              
                setshowSpinner(true)              
                try {             
                  await axios.put('https://tengtengapi.indomaber.com/digitexexhibitors', {
                    id: selectedExhibitor[0].id,   
                    slotcode:slotCode,   
                    web:website,
                    email:email,
                    phone:phone,
                    title:title,
                    content:content,
                    videosituational:videosituational,
                    videopromo:videopromo,
                    videohighlight:videohighlight, 
                  })
                  .then(response => {
                    console.log('Resource updated successfully:', response.data);
                    setSlotCode('');
                      setWebsite('');
                      setEmail('');
                      setPhone('');
                      setLogo('');
                      setCategory('')
                      setTitle('');
                      setContent('');
                      setUtubeTitle('');
                      setUtubeDesc('');
                      setUtubeCode('');
                      setCatalog()
                      setBrochure()
                      setPricelist()
                      setVideosituational('')
                      setVideopromo('')
                      setVideohighlight('')
                      setshowSpinner(false)
                      setSelectedExhibitor([])
                    getExhibitors(props.digitexid)
                    setisedit(false)
                    setshowSpinner(false)
                  })
                  .catch(error => {
                    console.error('Error updating resource:', error);
                    setshowSpinner(false)
                  });
                     
                   
                  } catch (error) {
                    console.error(error);
                  } 
              }}>
              Save
            </Button>
          </div>
          </>
        }
        {exbibitors.length > 0 &&
          <div className="mt-6">
           {openMap && selectedExhibitor.length > 0 && 
              <Card color="transparent" shadow={true} className="w-full ">
                <CardHeader
                  color="transparent"
                  floated={false}
                  shadow={false}
                  className="flex items-start justify-between gap-4 "
                >
                  <div className="flex items-center justify-between gap-4">
                  {selectedExhibitor[0].logo &&
                    <Avatar
                      size="lg"
                      variant="rounded"
                      src={`https://tengtengapi.indomaber.com/digitex/${selectedExhibitor[0].logo}`}
                      alt="tania andrew"
                    />
                  }
                      <Typography variant="h5" color="blue-gray" >
                        {selectedExhibitor[0].title}
                      </Typography>
                  </div>
                  <IconButton variant="text" color="red"
                    onClick={()=>{
                      setSelectedExhibitor([])
                      setOpenMap(false)
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-6 h-6" fill="red">
                    <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm71 135c9.4-9.4 24.6-9.4 33.9 0l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
                  </IconButton>
                </CardHeader>
                <CardBody className="mb-6 p-0">
                  <DigitexMapping digitexid={props.digitexid} mapurl={props.mapurl} row={props.row} col={props.col} 
                  digitexexhibitorsid={selectedExhibitor[0].id}
                  />
                </CardBody>
              </Card>
           } 
          <DataTable
            className={(openMap && selectedExhibitor.length > 0) || isedit ? "hidden":""}
            columns={[
              {
                name: '',
                selector: row => row.email,
                cell: (row) => (
                  <>
                  <div className='flex justify-start items-center flex-wrap gap-1 my-1'>
                    <IconButton size="sm" variant="outlined" 
                      onClick={() => {
                        setSelectedExhibitor([row])
                        setOpenMap(true)
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className='w-4 h-4'>
                      <path d="M128 40c0-22.1-17.9-40-40-40L40 0C17.9 0 0 17.9 0 40L0 88c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM0 424l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 40c0-22.1-17.9-40-40-40L232 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM192 232l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 424c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z"/></svg>
                    </IconButton>
                    <IconButton size="sm" variant="outlined" 
                      onClick={() => {
                        setSelectedExhibitor([row])
                        setOpenView(true)
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"  className='w-4 h-4'>
                      <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6-46.8 43.5-78.1 95.4-93 131.1-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64-11.5 0-22.3-3-31.7-8.4-1 10.9-.1 22.1 2.9 33.2 13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-12.2-45.7-55.5-74.8-101.1-70.8 5.3 9.3 8.4 20.1 8.4 31.7z"/></svg>
                    </IconButton>
                    <IconButton size="sm" variant="gradient" color="yellow" 
                      onClick={() => {
                        setSelectedExhibitor([row])
                        setisedit(true)
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-4 h-4' fill='white'>
                      <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg>
                    </IconButton>
                    <div className='flex items-end flex-col justify-center gap-4'>
                      <IconButton size="sm" variant="gradient" color="red"
                        onClick={() => {
                          setSelectedExhibitor([row])
                          setisdelete(true)
                        }}
                      >
                        <svg width="16px" height="16px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#FFFFFF"><path d="M20 9L18.005 20.3463C17.8369 21.3026 17.0062 22 16.0353 22H7.96474C6.99379 22 6.1631 21.3026 5.99496 20.3463L4 9" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M21 6L15.375 6M3 6L8.625 6M8.625 6V4C8.625 2.89543 9.52043 2 10.625 2H13.375C14.4796 2 15.375 2.89543 15.375 4V6M8.625 6L15.375 6" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                      </IconButton>
                    </div>
                  </div>
                  </>
                ),
                width: "250px",
              },
              {
                name: 'Stand',
                selector: row => row.slotcode,
                sortable: true,
              },
              {
                name: 'Logo',
                selector: row => row.logo,
                cell: (row) => {
                  if (row.logo) {
                    return (
                    <img src={`https://tengtengapi.indomaber.com/digitex/${row.logo}`} className="h-8 w-auto object-contain hover:cursor-pointer" 
                      onClick={()=>{
                        setSelectedExhibitor([row])
                        setOpenReplaceLogo(true)
                     }}
                    />)
                  }
                  return (
                    <IconButton variant="text" size="sm"
                     onClick={()=>{
                        setSelectedExhibitor([row])
                        setOpenReplaceLogo(true)
                     }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-4 h-4" fill="#f59e0b">
                      <path d="M0 64C0 28.7 28.7 0 64 0L213.5 0c17 0 33.3 6.7 45.3 18.7L365.3 125.3c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zm208-5.5l0 93.5c0 13.3 10.7 24 24 24L325.5 176 208 58.5zM128 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM92.6 448l198.8 0c15.8 0 28.6-12.8 28.6-28.6 0-7.3-2.8-14.4-7.9-19.7L215.3 297.9c-6-6.3-14.4-9.9-23.2-9.9l-.3 0c-8.8 0-17.1 3.6-23.2 9.9L71.9 399.7C66.8 405 64 412.1 64 419.4 64 435.2 76.8 448 92.6 448z"/></svg>
                    </IconButton>
                  )
                },
                sortable: false,
              },
              {
                name: 'Website',
                selector: row => row.web, 
                sortable: false,
                cell: (row) => (
                  <a href={row.web} target="_blank" className="underline text-blue-600">{row.web}</a>
                )
              },
              {
                name: 'Email',
                selector: row => row.email,
                sortable: false,
                cell: (row) => (
                  <a href={`mailto:${row.email}`} target="_blank" className="underline text-blue-600">{row.email}</a>
                )
              },
              {
                name: 'Phone',
                selector: row => row.phone,
                sortable: false,
              },
              {
                name: 'Title',
                selector: row => row.title,
                sortable: false,
              },
              {
                name: 'Content',
                selector: row => row.content,
                sortable: false,
              },
              {
                name: 'Catalog',
                selector: row => row.catalog,
                sortable: false,
              },
              {
                name: 'Brochure',
                selector: row => row.brochure,
                sortable: false,
              },
              {
                name: 'Pricelist',
                selector: row => row.pricelist,
                sortable: false,
              },
              {
                name: 'Situational Video',
                selector: row => row.videosituational,
                sortable: false,
                cell: (row) => (
                  <a href={row.videosituational} target="_blank" className="underline text-blue-600">{row.videosituational}</a>
                )
              },
              {
                name: 'Promo Video',
                selector: row => row.videopromo,
                sortable: false,
                cell: (row) => (
                  <a href={row.videopromo} target="_blank" className="underline text-blue-600">{row.videopromo}</a>
                )
              },
              {
                name: 'Highlight Video',
                selector: row => row.videohighlight,
                sortable: false,
                cell: (row) => (
                  <a href={row.videohighlight} target="_blank" className="underline text-blue-600">{row.videohighlight}</a>
                )
              },	
            ]}
            data={exbibitors}
            dense={true}
            compact={true}
          /> 
          </div>
        }
      </CardBody>
    </Card>
    <Dialog open={isdelete} handler={handleIsDelete}>
      <DialogHeader>Warning!</DialogHeader>
      <DialogBody>
        It will delete all boxes's data. Are you sure?
      </DialogBody>
      <DialogFooter>
        <Spinner color="purple" size="md" className={showSpinner? '': 'hidden'} ></Spinner>
        <Button
          disabled={showSpinner}
          variant="text"
          onClick={()=>{
            handleIsDelete()
            setSelectedExhibitor([])
          }}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="deep-purple" 
        disabled={showSpinner}
        onClick={async()=>{
          setshowSpinner(true)
          await axios.delete(`https://tengtengapi.indomaber.com/digitexexhibitors`,{
            headers: {},
            data: {
              id: selectedExhibitor[0].id
            }
          })
          .then(response => {
            console.log('All data deleted:', response.data);
            setshowSpinner(false)
            setSelectedExhibitor([])
            getExhibitors(props.digitexid)
            handleIsDelete()
          })
          .catch(error => {
            console.error('Error deleting all data:', error);
            setshowSpinner(false)
          });
        }}>
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
    <Dialog open={openView} handler={handleOpenView} className="bg-gray-500 pb-0 m-0" size="lg">
      <DialogBody className="overflow-scroll">
        <Spinner color="purple" size="md" className={showSpinner? '': 'hidden'} ></Spinner>
        {selectedExhibitor.length > 0 &&
        <div className={"grid grid-cols-1 md:grid-cols-3 gap-4"}>                      
          <div>
            <div>
              <Typography variant="h4" color="black">
              {selectedExhibitor[0].slotCode}
              </Typography>
            </div>
            <div className="mt-2 md:ml-6">
              {selectedExhibitor[0].logo &&
                <img src={`https://tengtengapi.indomaber.com/digitex/${selectedExhibitor[0].logo}`} alt="" className="h-20 w-auto object-cover object-center" />
              }
            </div>
            <div className="mt-2 md:ml-6">
              <Typography variant="paragraph" color="black">
                Website
              </Typography>
              <Typography variant="h6" color="black">
              {selectedExhibitor[0].web}
              </Typography>
            </div>
            <div className="mt-2 md:ml-6">
              <Typography variant="paragraph" color="black">
                Email
              </Typography>
              <Typography variant="h6" color="black">
              {selectedExhibitor[0].email}
              </Typography>
            </div>
            <div className="mt-2 md:ml-6">
              <Typography variant="paragraph" color="black">
                Phone
              </Typography>
              <Typography variant="h6" color="black">
              {selectedExhibitor[0].phone}
              </Typography>
            </div>
            {selectedExhibitor[0].catalog && 
              <div className="mt-2 md:ml-6">
                <a href={`https://tengtengapi.indomaber.com/digitex/${selectedExhibitor[0].catalogURL}`} download
                target="_blank" rel="noopener noreferrer" className="flex justify-start gap-1 items-center text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-4 h-4">
                  <path d="M0 64C0 28.7 28.7 0 64 0L213.5 0c17 0 33.3 6.7 45.3 18.7L365.3 125.3c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zm208-5.5l0 93.5c0 13.3 10.7 24 24 24L325.5 176 208 58.5zM175 441c9.4 9.4 24.6 9.4 33.9 0l64-64c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-23 23 0-86.1c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 86.1-23-23c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64z"/></svg>
                  Download Catalog
                </a>
              </div>
            }
            {selectedExhibitor[0].brochure && 
              <div className="mt-2 md:ml-6">
                <a href={`https://tengtengapi.indomaber.com/digitex/${selectedExhibitor[0].brochureURL}`} download
                target="_blank" rel="noopener noreferrer" className="flex justify-start gap-1 items-center text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-4 h-4">
                  <path d="M0 64C0 28.7 28.7 0 64 0L213.5 0c17 0 33.3 6.7 45.3 18.7L365.3 125.3c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zm208-5.5l0 93.5c0 13.3 10.7 24 24 24L325.5 176 208 58.5zM175 441c9.4 9.4 24.6 9.4 33.9 0l64-64c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-23 23 0-86.1c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 86.1-23-23c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64z"/></svg>
                  Download Brochure
                </a>
              </div>
            }
            {selectedExhibitor[0].pricelist && 
              <div className="mt-2 md:ml-6">
                <a href={`https://tengtengapi.indomaber.com/digitex/${selectedExhibitor[0].pricelistURL}`} download
                target="_blank" rel="noopener noreferrer" className="flex justify-start gap-1 items-center text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-4 h-4">
                  <path d="M0 64C0 28.7 28.7 0 64 0L213.5 0c17 0 33.3 6.7 45.3 18.7L365.3 125.3c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zm208-5.5l0 93.5c0 13.3 10.7 24 24 24L325.5 176 208 58.5zM175 441c9.4 9.4 24.6 9.4 33.9 0l64-64c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-23 23 0-86.1c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 86.1-23-23c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64z"/></svg>
                  Download Price List
                </a>
              </div>
            }
          </div>
          <div className="md:col-span-2">
            <div className="">
              <Typography variant="h3" color="black">
              {selectedExhibitor[0].title}
              </Typography>
            </div>
            <div className="">
              <Typography variant="paragraph" color="black">
              {selectedExhibitor[0].content}
              </Typography>
            </div>
            <div className="mt-2 bg-white px-4 py-1 rounded-md">
              <Tabs value="html" >
                <TabsHeader
                  className="bg-transparent"
                  indicatorProps={{
                    className: "bg-gray-900/10 shadow-none !text-gray-900",
                  }}
                >
                  {tabsTitle.map(({ label, value }) => (
                    <Tab key={value} value={value}>
                      {label}
                    </Tab>
                  ))}
                </TabsHeader>
                <TabsBody>
                  <TabPanel key={'html'} value={'html'} className="container mx-auto px-0">
                    {selectedExhibitor[0].videosituational &&                                         
                      <LiteYouTubeEmbed
                      id={utubeParam(selectedExhibitor[0].videosituational)}
                      poster="maxresdefault"
                      params="autoplay=1"
                      />
                    }
                  </TabPanel>
                  <TabPanel key={'react'} value={'react'} className="container mx-auto px-0">
                    {selectedExhibitor[0].videopromo &&                                         
                      <LiteYouTubeEmbed
                      id={utubeParam(selectedExhibitor[0].videopromo)}
                      poster="maxresdefault"
                      />
                    }
                  </TabPanel>
                  <TabPanel key={'vue'} value={'vue'} className="container mx-auto px-0">
                    {selectedExhibitor[0].videohighlight &&                                         
                      <LiteYouTubeEmbed
                      id={utubeParam(selectedExhibitor[0].videohighlight)}
                      poster="maxresdefault"
                      />
                    }
                  </TabPanel>
                </TabsBody>
              </Tabs>                
            </div>
          </div>
        </div>
        }
      </DialogBody>
    </Dialog>
    <Dialog
      size="xs"
      open={openReplaceLogo}
      handler={handleOpenReplaceLogo}
      className="bg-transparent shadow-none"
    >
      <Card className="mx-auto w-full max-w-[24rem]">
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h4" color="blue-gray">
            Replace Logo
          </Typography>
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
        </CardBody>
        <CardFooter className="pt-0 flex justify-start items-center gap-4">
          <Spinner color="purple" size="md" className={showSpinner? '': 'hidden'} ></Spinner>
          <Button variant="gradient" color="red"  size="sm" 
            disabled={showSpinner}
            onClick={async()=>{
              setshowSpinner(true)
              await axios.delete(`https://tengtengapi.indomaber.com/digitexexhibitors/logo`,{
                headers: {},
                data: {
                  id: selectedExhibitor[0].id
                }
              })
              .then(response => {
                console.log('All data deleted:', response.data);
                setshowSpinner(false)
                setSelectedExhibitor([])
                getExhibitors(props.digitexid)
                setOpenReplaceLogo(false)
              })
              .catch(error => {
                console.error('Error deleting all data:', error);
                setshowSpinner(false)
              });
            }}
          >
            Delete
          </Button>
          <Button variant="gradient" color="deep-purple" 
            disabled={!logo || showSpinner}
            onClick={async ()=>{
              setshowSpinner(true)              
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
                imgdata.append('id', selectedExhibitor[0].id);   
                await axios.post('https://tengtengapi.indomaber.com/digitexexhibitors/logo', imgdata, {    
                  headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data; boundary=${imgdata._boundary}`,
                  },
                  mode : 'cors'
                })
                .then((response) => {
                  console.log("logo replace file res",response.data)
                  setLogo('');
                  setShowAddExhibitorUI(false)
                  setshowSpinner(false)
                  getExhibitors(props.digitexid)
                  setOpenReplaceLogo(false)
                }).catch((error) => {
                  console.error(error)
                  setshowSpinner(false)
                })
              } catch (error) {
                console.error(error);
              } 
            }} size="sm">
            Replace
          </Button>
        </CardFooter>
      </Card>
    </Dialog>
    </>
  );
}

DigitexExhibitors.displayName = "/src/widgets/cards/digitexexhibitors.jsx";

export default DigitexExhibitors;
