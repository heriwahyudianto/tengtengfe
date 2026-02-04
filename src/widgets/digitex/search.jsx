import {Button, Typography, Textarea,
  Card, CardHeader,
  CardBody,
  CardFooter, Input, Spinner,
  Dialog,
  DialogBody,
  DialogHeader, Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel, 
  DialogFooter,
  Alert, Select, Option,
  IconButton} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
//import Select from 'react-select'
import { useParams } from "react-router-dom";
import nologo from '../../assets/img/nologo.png'
import bg from '../../assets/img/browsebrandbg.jpg'

export function Search() { 
  let params = useParams(); 
  const [showErr, setShowErr] = useState(false); 
  const [showSpinner, setShowSpinner] = useState(false);
  const [row, setrow] = useState(0)
  const [col, setcol] = useState(0)
  const [rowcol, setrowcol] = useState([])
  const [options,setoptions] = useState([])
  const [open, setOpen] = useState(false); 
  const handleOpen = () => setOpen(!open);
  const [action3Spinner, setaction3Spinner] = useState(false)
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
  const [replaceSpinner, setreplaceSpinner] = useState(false)
  const [maps, setmaps] = useState([]);
  const [eventname, seteventname] = useState([]);
  const [catalogURL, setCatalogURL] = useState()
  const [brochureURL, setBrochureURL] = useState()
  const [pricelistURL, setPricelistURL] = useState()
  const [videosituational, setVideosituational] = useState('')
  const [videopromo, setVideopromo] = useState('')
  const [videohighlight, setVideohighlight] = useState('')

  useEffect(() => {
    if (showErr) {
      const timer = setTimeout(() => {
        setShowErr(false);
      }, 5000); // Hide error after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [showErr]); 

  const getDetailMap = async () => {
    setShowSpinner(true);
    await axios.get(`https://inarconsapi.indomaber.com/digitex/mapgroupbyslotcode/${eventname[0].id}`)
    .then(response => {      
      console.log('map contestan from server',response.data)
      if (response.data.length > 0) {
        setmaps(response.data)
        let temp = []
        temp = response.data.map((item, id)=>(
          { value: item.id, label: item.slotcode + ' ' + item.title }
        ))
        setoptions(temp)
      } else {
        setmaps([])
      }
    })
    .catch(error => {
      console.error(error);
    });
    setShowSpinner(false);
  }

  useEffect(()=>{
    if (eventname.length > 0) {
      getDetailMap()
    }
  },[eventname])

  const getMap = async () => {
    setShowSpinner(true);
    await axios.get(`https://inarconsapi.indomaber.com/digitex/fe/${params.eventname}`)
    .then(response => {      
      console.log("nama event", response.data)
      if (response.data.length > 0) {
        seteventname(response.data)
      }
    })
    .catch(error => {
      console.error(error);
    });
    setShowSpinner(false)
  }

  useEffect(()=>{
    getMap()
  }, [])

  useEffect(()=>{
  let total = row * col
    let komponen = []
    for (let index = 0; index < total ; index++) {
      komponen.push(1)
    }
    setrowcol(komponen)
  }, [row,col])

  const getDetail = async (idx) => { 
    console.log(`https://inarconsapi.indomaber.com/digitexexhibitorsdetail/${idx}`)
    setaction3Spinner(true)
     await axios.get(`https://inarconsapi.indomaber.com/digitexexhibitorsdetail/${idx}`)
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
        let url = ''
        let params = ''
        let videoId = ''
        if(URL.canParse(response.data[0].videohighlight)) {
          url = new URL(response.data[0].videohighlight);
          params = new URLSearchParams(url.search);
          videoId = params.get('v');
          setVideohighlight(videoId)
        }
        if(URL.canParse(response.data[0].videopromo)) {
          url = new URL(response.data[0].videopromo);
          params = new URLSearchParams(url.search);
          videoId = params.get('v');
          setVideopromo(videoId)
        }     
        if(URL.canParse(response.data[0].videosituational)) {
          url = new URL(response.data[0].videosituational);
          params = new URLSearchParams(url.search);
          videoId = params.get('v');
          setVideosituational(videoId)
        }
        setCatalogURL(response.data[0].catalog)
        setBrochureURL(response.data[0].brochure)
        setPricelistURL(response.data[0].pricelist)
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

  const data = [
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
  
  return ( 
    <>
    <section className=" mt-11 p-6 rounded-md bg-deep-purple-500"
    >
      <div className=''>
        <div className="w-72 mx-auto">
          {maps.length> 0 &&
            <Select className="" size="md" label="Brands"
              onChange={(e)=>{
                getDetail(e)
                setOpen(true)
              }}
            >
            {maps.map((item, idx) => (
              <Option key={idx} value={item.id}>{item.slotcode} {item.title}</Option>
             ))}
            </Select>
          }
        </div>
        <Typography variant="h3" color="white">
          Brand
        </Typography>        
        {maps.length > 0 && 
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {maps.map((item, index) => (
              <div  key={index}  className='bg-white'>
                <div className=" p-1 aspect-video flex items-center justify-center">
                <img src={item.logo ? `https://inarconsapi.indomaber.com/digitex/${item.logo}` : nologo} 
                alt="" className='h-full w-auto object-contain hover:cursor-pointer' 
                onClick={()=>{
                  console.log(item.id)
                  getDetail(item.id)
                  setOpen(true)
                }}
                />
                </div>
                <Typography variant="h6" className="text-center leading-tight mb-2">
                  {item.title}
                </Typography>
              </div>
            ))}
          </div>
        }
      </div>
    </section>
      <Dialog open={open} handler={handleOpen} className="bg-gray-500 pb-0 m-0" size="lg">
        <DialogBody className="overflow-scroll">
          <Spinner color="purple" size="md" className={action3Spinner? '': 'hidden'} ></Spinner>
          <div className={replaceSpinner ? 'hidden':"grid grid-cols-1 md:grid-cols-3 gap-4"}>                      
            <div>
              <div>
                <Typography variant="h4" color="black">
                {slotCode}
                </Typography>
              </div>
              <div className="mt-2 md:ml-6">
                {logo &&
                  <img src={`https://inarconsapi.indomaber.com/digitex/${logo}`} alt="" className="h-20 w-auto object-cover object-center" />
                }
              </div>
              <div className="mt-2 md:ml-6">
                <Typography variant="paragraph" color="black">
                  Website
                </Typography>
                <Typography variant="h6" color="black">
                {website}
                </Typography>
              </div>
              <div className="mt-2 md:ml-6">
                <Typography variant="paragraph" color="black">
                  Email
                </Typography>
                <Typography variant="h6" color="black">
                {email}
                </Typography>
              </div>
              <div className="mt-2 md:ml-6">
                <Typography variant="paragraph" color="black">
                  Phone
                </Typography>
                <Typography variant="h6" color="black">
                {phone}
                </Typography>
              </div>
              {catalogURL && 
                <div className="mt-2 md:ml-6">
                  <a href={`https://inarconsapi.indomaber.com/digitex/${catalogURL}`} download
                  target="_blank" rel="noopener noreferrer" className="flex justify-start gap-1 items-center text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-4 h-4">
                    <path d="M0 64C0 28.7 28.7 0 64 0L213.5 0c17 0 33.3 6.7 45.3 18.7L365.3 125.3c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zm208-5.5l0 93.5c0 13.3 10.7 24 24 24L325.5 176 208 58.5zM175 441c9.4 9.4 24.6 9.4 33.9 0l64-64c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-23 23 0-86.1c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 86.1-23-23c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64z"/></svg>
                    Download Catalog
                  </a>
                </div>
              }
              {brochureURL && 
                <div className="mt-2 md:ml-6">
                  <a href={`https://inarconsapi.indomaber.com/digitex/${brochureURL}`} download
                  target="_blank" rel="noopener noreferrer" className="flex justify-start gap-1 items-center text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-4 h-4">
                    <path d="M0 64C0 28.7 28.7 0 64 0L213.5 0c17 0 33.3 6.7 45.3 18.7L365.3 125.3c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zm208-5.5l0 93.5c0 13.3 10.7 24 24 24L325.5 176 208 58.5zM175 441c9.4 9.4 24.6 9.4 33.9 0l64-64c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-23 23 0-86.1c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 86.1-23-23c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64z"/></svg>
                    Download Brochure
                  </a>
                </div>
              }
              {pricelistURL && 
                <div className="mt-2 md:ml-6">
                  <a href={`https://inarconsapi.indomaber.com/digitex/${pricelistURL}`} download
                  target="_blank" rel="noopener noreferrer" className="flex justify-start gap-1 items-center text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-4 h-4">
                    <path d="M0 64C0 28.7 28.7 0 64 0L213.5 0c17 0 33.3 6.7 45.3 18.7L365.3 125.3c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zm208-5.5l0 93.5c0 13.3 10.7 24 24 24L325.5 176 208 58.5zM175 441c9.4 9.4 24.6 9.4 33.9 0l64-64c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-23 23 0-86.1c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 86.1-23-23c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64z"/></svg>
                    Download Price List
                  </a>
                </div>
              }
            </div>
            <div className="md:col-span-2">
              {/*<div>
                <Typography variant="h4" color="black">
                {category}
                </Typography>
              </div>*/
              }
              <div className="">
                <Typography variant="h3" color="black">
                {title}
                </Typography>
              </div>
              <div className="">
                <Typography variant="paragraph" color="black">
                {content}
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
                    {data.map(({ label, value }) => (
                      <Tab key={value} value={value}>
                        {label}
                      </Tab>
                    ))}
                  </TabsHeader>
                  <TabsBody>
                    <TabPanel key={'html'} value={'html'} className="container mx-auto px-0">
                      {videosituational &&                                         
                        <LiteYouTubeEmbed
                        id={videosituational}
                        poster="maxresdefault"
                        params="autoplay=1"
                        />
                      }
                    </TabPanel>
                    <TabPanel key={'react'} value={'react'} className="container mx-auto px-0">
                      {videopromo &&                                         
                        <LiteYouTubeEmbed
                        id={videopromo}
                        poster="maxresdefault"
                        />
                      }
                    </TabPanel>
                    <TabPanel key={'vue'} value={'vue'} className="container mx-auto px-0">
                      {videohighlight &&                                         
                        <LiteYouTubeEmbed
                        id={videohighlight}
                        poster="maxresdefault"
                        />
                      }
                    </TabPanel>
                  </TabsBody>
                </Tabs>                
              </div>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}

export default Search;