import {useEffect, useState} from "react";
import {
  Typography,
  Card,
  CardBody,
  IconButton,
  Button,
  Input,
  Spinner,
} from "@material-tailwind/react";
import axios from "axios";

export function HashtagHome() {  
  const [showSpinner, setshowSpinner] = useState(false)
  const [replaceSpinner, setreplaceSpinner] = useState(false)
  const [hashtagId, setHashtagId] = useState()
  const [oldHashtag, setOldHashtag] = useState()
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [hashtag, setHashtag] = useState([])
  const [addHashtag,setAddHashtag] = useState('#')

  const getHashtag = async () => {
    setshowSpinner(true)
    await axios.get('https://inarconsapi.indomaber.com/hashtag')
    .then(response => {      
      console.log('hashatg',response.data)
      if (response.data.length > 0) {
        setHashtag(response.data)
      } else {
        setHashtag([])
      }
      setshowSpinner(false)
    })
    .catch(error => {
      console.error(error);
    });
  }

  useEffect(()=> {
    getHashtag()
  }, [])

  useEffect(()=>{
    if (addHashtag.length>0) {
      if (addHashtag[0] === '#') {

      } else {
        setAddHashtag('#'+addHashtag)
      }
    }
  },[addHashtag])

  return (
    <div className="mt-12">
      <Typography variant="h1">
        HashTag 
      </Typography>      
      {showAdd &&
        <Card className="my-8">
          <CardBody>
            <Typography variant="h3">
              Add HashTag
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="mt-2 flex items-center gap-1 font-normal"
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
              HashTags are useful to make content easily discoverable online. Use HashTags to better define, position, group and market your product to wider audience. DO NOT use spacing and DO NOT use more than 3 words.
            </Typography>
            
            <div className="flex justify-start items-center mt-4 gap-4">
              <div className="max-w-sm">
                <Input variant="outlined" size="md" label="HashTag" value={addHashtag} 
                onChange={(e)=>{setAddHashtag(e.target.value)}} />
              </div>
              <Spinner color="amber" size="md" className={showSpinner? '': 'hidden'} ></Spinner>
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
                disabled={addHashtag.length < 2}
                onClick={async()=>{
                  setshowSpinner(true)
                  await axios.post('https://inarconsapi.indomaber.com/hashtag', {
                    hashtag: addHashtag,
                  })
                  .then(response => {
                    console.log('add hashtag successfully:', response.data);
                    getHashtag()
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
      <Card className={showEdit ? 'hidden' : "h-full w-full overflow-scroll"}>
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>             
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4" >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  HashTag
                </Typography>
              </th>                
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 flex justify-end">
                 <IconButton color="blue" size="sm" variant="gradient"
                  onClick={()=>{setShowAdd(true)}}
                 >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4" fill="#fff">
                    <path d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"/></svg>
                    
                  </IconButton>
                </th>
            </tr>
          </thead>
          <tbody>
            {hashtag.length>0 &&
            <>
            {hashtag.map(({ id, hashtag, }, index) => {
              const isLast = index === hashtag.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";  
              return (
                <tr key={index}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {hashtag}
                    </Typography>
                  </td>
                  <td className={`${classes} flex justify-end gap-2`}>
                    <IconButton color="amber" size="sm" variant="gradient"
                      disabled={showSpinner}
                      onClick={()=>{
                        setHashtagId(id)
                        setOldHashtag(hashtag)
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
                        await axios.delete(`https://inarconsapi.indomaber.com/hashtag`,{
                          headers: {},
                          data: {
                            id: id,
                            hashtag: hashtag,
                          }
                        })
                        .then(response => {
                          console.log('Item deleted:', response.data);
                          setShowEdit(false)
                          getHashtag()
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
      <Card className="mt-8">
        <CardBody>
          <div className="flex justify-start items-center mt-4 gap-4">
          <div className="">
            <Input variant="outlined" size="md" label="HashTag" value={addHashtag} 
            onChange={(e)=>{setAddHashtag(e.target.value)}} />
          </div>
          
            <Spinner color="amber" size="md" className={replaceSpinner? '': 'hidden'} ></Spinner>
            <Button variant="outlined" size="sm"
              className={showSpinner? 'hidden': ''}
              onClick={()=>{
                setShowEdit(false)
              }}
            >
              Cancel
            </Button> 
            <Button variant="gradient" color="amber" size="sm"
            disabled={showSpinner}
            onClick={async()=>{
              setshowSpinner(true)
              await axios.put('https://inarconsapi.indomaber.com/hashtag', {
                hashtag: addHashtag,
                oldhashtag: oldHashtag,
                id:hashtagId
              })
              .then(response => {
                console.log('Resource updated successfully:', response.data);
                getHashtag()
                setShowEdit(false)
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
      }
    </div>
  );
}

export default HashtagHome;
