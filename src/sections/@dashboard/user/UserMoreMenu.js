import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';


// ----------------------------------------------------------------------


export default function UserMoreMenu(props) {

  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("");

  console.log(props.status);

  const handleblock = async () => {
    try{
      if(props.status === "active"){
        setStatus("block");
        await axios.put(`https://prositegroup2.herokuapp.com/contractorStatus/${props.email}/block`)
        .then(()=>{
          getData();
        })
      }else if(props.status === "block"){
        setStatus("active");
        await axios.put(`https://prositegroup2.herokuapp.com/contractorStatus/${props.email}/active`)
        .then(()=>{
          getData();
        })

      }
    }
    catch{
      console.log("hh");
    }
  }

  const getData = async () => {
    await axios.get("https://prositegroup2.herokuapp.com/admin/getContractors");
  }

  useEffect(()=>{
    getData();
  },[status])

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%'},
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }} onClick={() => handleblock()}>
          <ListItemIcon>
            <Iconify icon="akar-icons:block" width={16} height={16} />
          </ListItemIcon>
          {(props.status==="active") ? <ListItemText primary="Block" primaryTypographyProps={{ variant: 'body2' }} /> :
                                <ListItemText primary="Unblock" primaryTypographyProps={{ variant: 'body2' }} />}
          
          
        </MenuItem>
        
        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={16} height={16} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        
      </Menu>
    </>
    
  );
  
}
