import {useEffect, useState} from "react";
import axios from "axios";
import { Alert, Button, Spinner } from "@material-tailwind/react";

export function DigitexMapping(props) {
  const [rowcol, setrowcol] = useState([])
  const [selectedBox, setSelectedBox] = useState([])
  const [select,setSelect] = useState(false)
  const [deselect, setDeselect] = useState(false)
  const [arsir, setArsir] = useState([])
  const [selectionMode, setSelectionMode] = useState("You're on filling mode")
  const [showSpinner, setshowSpinner] = useState(false)

  const [isdelete, setisdelete] = useState(false)
  const handleIsDelete = () => setisdelete(!isdelete);
  const [openView, setOpenView] = useState(false); 
  const handleOpenView = () => setOpenView(!openView);
  const [openMap, setOpenMap] = useState(false); 

  const getArsir = async () => {
    await axios.get(`https://tengtengapi.indomaber.com/digitexmapping/${props.digitexid}`)
    .then(response => {    
      if (response.data.length > 0) {
        console.log('arsir from server', response.data)
        let dataarsir = []
        response.data.map((item,idx)=>{
          dataarsir.push(item.mapid)
        })
        console.log('arsir baru',dataarsir)
        setArsir(dataarsir)
      } else {
        setArsir([])
      }
    })
    .catch(error => {
      console.error(error);
    });
  }

  useEffect(()=>{
    let total = props.row * props.col
    let komponen = []
    for (let index = 0; index < total ; index++) {
      komponen.push(1)
    }
    setrowcol(komponen)
    getArsir()
  }, [props])

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

  return (
    <>
    <Alert color={selectionMode === "You're on filling mode" ? "blue" : "red"}
    className="mt-6">{selectionMode}</Alert>
    <Spinner color="purple" size="md" className={showSpinner? '': 'hidden'} ></Spinner>
    <div className={showSpinner? "hidden": "flex justify-end mt-4"} >
      <Button variant="gradient" size="sm" color="deep-purple"
        className={selectionMode === "You're on filling mode" ? "" : "hidden"}
        onClick={()=>{
          setSelectionMode("You're on delete mode")
        }}
      >
        Change To Delete Mode
      </Button>
      <Button variant="gradient" size="sm" color="deep-purple"
        className={selectionMode === "You're on filling mode" ? "hidden":""}
        onClick={()=>{
          setSelectionMode("You're on filling mode")
        }}
      >
        Change To Filling Mode
      </Button>
    </div>
    <div className="relative mt-6">
      <img src={`https://tengtengapi.indomaber.com/digitex/${props.mapurl}`} 
        className={showSpinner ? "hidden": "w-full h-auto object-contain "} alt=""/>
      <div className={showSpinner ? "hidden":`absolute left-0 right-0 top-0 bottom-0 grid `}
        style={{gridTemplateColumns: `repeat(${props.col}, minmax(0, 1fr))`}}
      >
        {rowcol.length>0 &&                
          rowcol.map((item,id)=>(
            <div key={id} 
              className={checkBg(id)}
              onClick={async()=>{
                if (selectionMode === "You're on filling mode")  {
                  setshowSpinner(true)
                  await axios.post('https://tengtengapi.indomaber.com/digitexmapping', {
                    digitexid: props.digitexid,
                    digitexexhibitorsid: props.digitexexhibitorsid,
                    mapid:id
                  })
                  .then(response => {
                    console.log('add mapping successfully:', response.data);
                    setshowSpinner(false)
                    getArsir()
                  })
                  .catch(error => {
                    console.error('Error updating resource:', error);
                    setshowSpinner(false)
                  });
                } else {
                  await axios.delete('https://tengtengapi.indomaber.com/digitexmapping', {
                    headers: {},
                    data: {
                      digitexid: props.digitexid,
                      digitexexhibitorsid: props.digitexexhibitorsid,
                      mapid:id
                    }
                  })
                  .then(response => {
                    console.log('Item deleted:', response.data);
                    setshowSpinner(false)
                    getArsir()
                  })
                  .catch(error => {
                    console.error('Error deleting item:', error);
                    setshowSpinner(false)
                  });
                }        
              }}
            >
            </div>
          ))
        }
      </div>
    </div>
    </>
  );
}

DigitexMapping.displayName = "/src/widgets/cards/digitexmapping.jsx";

export default DigitexMapping;
