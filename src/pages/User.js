import { React, useState, useEffect, useRef} from 'react';
import Box from '@mui/material/Box';
import { filter } from 'lodash';
import { DataGrid } from "@mui/x-data-grid";
import axios from 'axios';
import { Menu, MenuItem, Card, IconButton, ListItemIcon, ListItemText, Table, Stack, Avatar, Button, Checkbox, TableRow, TableBody, TableCell, Container, Typography, TableContainer, TablePagination } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from '@mui/icons-material/Block';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Select from '@mui/material/Select';
import Iconify from '../components/Iconify';
import Label from '../components/Label';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import USERLIST from '../_mock/user';
// import { nextDay } from 'date-fns';






const User = () => {
  
 
  const [rows,setRows] = useState([]);
  const [rowh,setRowh] = useState([]);
  const [rowl,setRowl] = useState([]);
  const [rowt,setRowt] = useState([]);
  const [category, setCategory] = useState("Contractors");
  const [platform, setPlatform] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [hoveredRow,setHoveredRow] = useState(null);
    
    const ref = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState("");


    const onMouseEnterRow = (event) => {
      const id = event.currentTarget.getAttribute("data-id");
      setHoveredRow(id);
    };
  
    const onMouseLeaveRow = (event) => {
      setHoveredRow(null);
    };
  

    const getContractors = async () => {
      try{

        const data = await axios.get("https://prositegroup2.herokuapp.com/admin/getContractors");
        setPlatform(data.data.contractors);
        setRows(data.data.contractors);
      } catch (e) {
        console.log(e);
      }
    };

    const getHardware = async () =>{
      const data = await axios.get("https://prositegroup2.herokuapp.com/admin/getHardwares");
      setPlatform(data.data.hardwares);
      setRowh(data.data.hardwares);
    };
    const getLabour = async () =>{
      const data = await axios.get("https://prositegroup2.herokuapp.com/admin/getLabours");
      setPlatform(data.data.labours);
      setRowl(data.data.labours);
    };
    const getTransporter = async () =>{
      const data = await axios.get("https://prositegroup2.herokuapp.com/admin/getTransporters");
      setPlatform(data.data.transporters);
      setRowt(data.data.transporters);
    };
  
// contractor block/delete----------------------------------------------------------------------------------------------------

    const handleSuspendCon = (email) => {
      axios.put(`https://prositegroup2.herokuapp.com/contractorStatus/${email}/block`)
      .then(() => {
        console.log("updated");
        getContractors();
      })
    }
  
  
    const handleUnblockCon = (email) => {
      axios.put(`https://prositegroup2.herokuapp.com/contractorStatus/${email}/active`)
      .then(() => {
        getContractors();
      })
    }

    const handleDeleteCon = (email) => {
      try{
        console.log(email);
        axios.delete(`https://prositegroup2.herokuapp.com/deleteContractor/${email}`)
        .then(() => {
          setRows(rows.filter((data) => data._email !== email));
          getContractors();
          console.log(email);
          
        })
      }catch(err){
        console.log(err);
      }
    }

    // Hardware Owner block/delete----------------------------------------------------------------------------------------------------

    const handleSuspendHw = (email) => {
      axios.put(`https://prositegroup2.herokuapp.com/hardwareStatus/${email}/block`)
      .then(() => {
        console.log("updated");
        getHardware();
      })
    }
  
  
    const handleUnblockHw = (email) => {
      axios.put(`https://prositegroup2.herokuapp.com/hardwareStatus/${email}/active`)
      .then(() => {
        getHardware();
      })
    }

    const handleDeleteHw = (email) => {
      try{
        console.log(email);
        axios.delete(`https://prositegroup2.herokuapp.com/deleteHardware/${email}`)
        .then(() => {
          setRowh(rows.filter((data) => data._email !== email));
          getHardware();
          console.log(email);
          
        })
      }catch(err){
        console.log(err);
      }
    }

    // Labour block/delete----------------------------------------------------------------------------------------------------

    const handleSuspendLab = (email) => {
      axios.put(`https://prositegroup2.herokuapp.com/labourStatus/${email}/block`)
      .then(() => {
        console.log("updated");
        getLabour();
      })
    }
  
  
    const handleUnblockLab = (email) => {
      axios.put(`https://prositegroup2.herokuapp.com/labourStatus/${email}/active`)
      .then(() => {
        getLabour();
      })
    }

    const handleDeleteLab = (email) => {
      try{
        console.log(email);
        axios.delete(`https://prositegroup2.herokuapp.com/deleteLabour/${email}`)
        .then(() => {
          setRowl(rows.filter((data) => data._email !== email));
          getLabour();
          console.log(email);
          
        })
      }catch(err){
        console.log(err);
      }
    }

    // Transporter block/delete----------------------------------------------------------------------------------------------------

    const handleSuspendTra = (email) => {
      axios.put(`https://prositegroup2.herokuapp.com/transporterStatus/${email}/block`)
      .then(() => {
        console.log("updated");
        getTransporter();
      })
    }
  
  
    const handleUnblockTra = (email) => {
      axios.put(`https://prositegroup2.herokuapp.com/transporterStatus/${email}/active`)
      .then(() => {
        getTransporter();
      })
    }

    const handleDeleteTra = (email) => {
      try{
        console.log(email);
        axios.delete(`https://prositegroup2.herokuapp.com/deleteTransporter/${email}`)
        .then(() => {
          setRowt(rows.filter((data) => data._email !== email));
          getTransporter();
          console.log(email);
          
        })
      }catch(err){
        console.log(err);
      }
    }

    useEffect(()=>{

      if(category === "Contractors") getContractors(); 
      else if(category === "Hardware") getHardware(); 
      else if(category === "Labour") getLabour(); 
      else getTransporter(); 
    },[category])




    const columns = [
      
        { field: 'imageUrl', headerName: 'Contractors', width: 90 ,
        renderCell: (data) => {
          console.log(data);
          return (
            <>
              <Avatar src={"http://res.cloudinary.com/muthahhar97/image/upload/v1659546006/images/"} />
            </>
          );
        }
      },
      
        
        {
          field: 'contractorname',
          headerName: 'Name',
          width: 150,
          editable: false,
        },
        {
          field: 'email',
          headerName: 'Email',
          width: 150,
          editable: false,
        },
        {
          field: 'contactNo',
          headerName: 'ContactNo',
          type: 'number',
          width: 110,
          editable: false,
        },
        {
          field: 'address',
          headerName: 'Address',
          width: 150,
          editable: false,
        },
        {
          field: 'hometown',
          headerName: 'Hometown',
          width: 150,
          editable: false,
        },
        {
          field: 'district',
          headerName: 'District',
          width: 150,
          editable: false,
        },
        {
          field: 'regno',
          headerName: 'RegNo',
          width: 150,
          editable: false,
        },
        {
          field: 'no_of_workers',
          headerName: 'No_Of_Workers',
          width: 150,
          editable: false,
        },
        {
          field: 'status',
          headerName: 'Status',
          width: 150,
          editable: false,
            renderCell: (params) => { 
              return(
                params.getValue(params.id,'status') ==="active" ?  <Label color="success">Active</Label> 
                                                                :  <Label color="error">Blocked</Label> 
                                                                     
              );
            }
        
          },
        
          { field: "actions", headerName: "Actions", width: 100, sortable: false, disableColumnMenu: true,
          renderCell: (params) => {
            if (hoveredRow === params.id) {
              return (
                <Box
                  sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
                >
                  <Tooltip title={params.getValue(params.id,'status') === "active" ? "block" : "Unblock"}  arrow>
                    <IconButton onClick={() => params.getValue(params.id,'status') === "active" ? handleSuspendCon(params.row.email) : handleUnblockCon(params.row.email)}>
                      {params.getValue(params.id,'status') === "active" ? <BlockIcon color="warning" /> : <RemoveCircleOutlineIcon color="secondary"/>}
                    </IconButton>
                  </Tooltip>
    
                  <IconButton onClick={() => handleDeleteCon(params.row.email)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Box> 
              );
              }
          }
        }
      ];

      const hardwareColumns = [
      
        { field: 'imageUrl', headerName: 'Hardware Owner', width: 90 ,
        renderCell: (data) => {
          console.log(data);
          return (
            <>
              <Avatar src={"http://res.cloudinary.com/muthahhar97/image/upload/v1659546150/images/…"} />
            </>
          );
        }
      },
      
        
        {
          field: 'hardwarename',
          headerName: 'Hardware Name',
          width: 150,
          editable: false,
        },
        {
          field: 'email',
          headerName: 'Email',
          width: 150,
          editable: false,
        },
        {
          field: 'contactNo',
          headerName: 'ContactNo',
          type: 'number',
          width: 110,
          editable: false,
        },
        {
          field: 'address',
          headerName: 'Address',
          width: 150,
          editable: false,
        },
        {
          field: 'city',
          headerName: 'City',
          width: 150,
          editable: false,
        },
        {
          field: 'district',
          headerName: 'District',
          width: 150,
          editable: false,
        },
        {
          field: 'regno',
          headerName: 'RegNo',
          width: 150,
          editable: false,
        },
        {
          field: 'owner',
          headerName: 'Owner name',
          width: 150,
          editable: false,
        },
        {
          field: 'status',
          headerName: 'Status',
          width: 150,
          editable: false,
            renderCell: (params) => { 
              return(
                params.getValue(params.id,'status') ==="active" ?  <Label color="success">Active</Label> 
                                                                :  <Label color="error">Blocked</Label> 
                                                                     
              );
            }
           
          },
        
          { field: "actions", headerName: "Actions", width: 100, sortable: false, disableColumnMenu: true,
          renderCell: (params) => {
            if (hoveredRow === params.id) {
              return (
                <Box
                  sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
                >
                  <Tooltip title={params.getValue(params.id,'status') === "active" ? "block" : "Unblock"}  arrow>
                    <IconButton onClick={() => params.getValue(params.id,'status') === "active" ? handleSuspendHw(params.row.email) : handleUnblockHw(params.row.email)}>
                      {params.getValue(params.id,'status') === "active" ? <BlockIcon color="warning" /> : <RemoveCircleOutlineIcon color="secondary"/>}
                    </IconButton>
                  </Tooltip>
    
                  <IconButton onClick={() => handleDeleteHw(params.row.email)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Box> 
              );
              }
          }
        }
      ];

      const labourColumns = [
      
        { field: 'imageUrl', headerName: 'Labours', width: 90 ,
        renderCell: (data) => {
          console.log(data);
          return (
            <>
              <Avatar src={"http://res.cloudinary.com/muthahhar97/image/upload/v1659546006/images/"} />
            </>
          );
        }
      },
      
      {
        field: 'profession',
        headerName: 'Profession',
        width: 150,
        editable: false,
      },
        {
          field: 'username',
          headerName: 'Name',
          width: 150,
          editable: false,
        },
        {
          field: 'email',
          headerName: 'Email',
          width: 150,
          editable: false,
        },
        {
          field: 'contactNo',
          headerName: 'ContactNo',
          type: 'number',
          width: 110,
          editable: false,
        },
        {
          field: 'address',
          headerName: 'Address',
          width: 150,
          editable: false,
        },
        {
          field: 'hometown',
          headerName: 'Hometown',
          width: 150,
          editable: false,
        },
        {
          field: 'district',
          headerName: 'District',
          width: 150,
          editable: false,
        },
        {
          field: 'qualification',
          headerName: 'Qualification Type',
          width: 150,
          editable: false,
        },
        {
          field: 'experience',
          headerName: 'Experience',
          width: 150,
          editable: false,
        },
        {
          field: 'status',
          headerName: 'Status',
          width: 150,
          editable: false,
            renderCell: (params) => { 
              return(
                params.getValue(params.id,'status') ==="active" ?  <Label color="success">Active</Label> 
                                                                :  <Label color="error">Blocked</Label> 
                                                                     
              );
            }
            
          },
        
          { field: "actions", headerName: "Actions", width: 100, sortable: false, disableColumnMenu: true,
          renderCell: (params) => {
            if (hoveredRow === params.id) {
              return (
                <Box
                  sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
                >
                  <Tooltip title={params.getValue(params.id,'status') === "active" ? "block" : "Unblock"}  arrow>
                    <IconButton onClick={() => params.getValue(params.id,'status') === "active" ? handleSuspendLab(params.row.email) : handleUnblockLab(params.row.email)}>
                      {params.getValue(params.id,'status') === "active" ? <BlockIcon color="warning" /> : <RemoveCircleOutlineIcon color="secondary"/>}
                    </IconButton>
                  </Tooltip>
    
                  <IconButton onClick={() => handleDeleteLab(params.row.email)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Box> 
              );
              }
          }
        }
      ];

      const transporterColumns = [
      
        { field: 'imageUrl', headerName: 'Transporters', width: 90 ,
        renderCell: (data) => {
          console.log(data);
          return (
            <>
              <Avatar src={"http://res.cloudinary.com/muthahhar97/image/upload/v1659546006/images/"} />
              
            </>
          );
        }
      },
      
        
        {
          field: 'username',
          headerName: 'Name',
          width: 150,
          editable: false,
        },
        {
          field: 'email',
          headerName: 'Email',
          width: 150,
          editable: false,
        },
        {
          field: 'contactNo',
          headerName: 'ContactNo',
          type: 'number',
          width: 110,
          editable: false,
        },
        {
          field: 'address',
          headerName: 'Address',
          width: 150,
          editable: false,
        },
        {
          field: 'hometown',
          headerName: 'Hometown',
          width: 150,
          editable: false,
        },
        {
          field: 'district',
          headerName: 'District',
          width: 150,
          editable: false,
        },
        {
          field: 'vehicle',
          headerName: 'Vehicle',
          width: 150,
          editable: false,
        },
        {
          field: 'work_out',
          headerName: 'Among Districs ',
          width: 150,
          editable: false,
        },
        {
          field: 'status',
          headerName: 'Status',
          width: 150,
          editable: false,
            renderCell: (params) => { 
              return(
                params.getValue(params.id,'status') ==="active" ?  <Label color="success">Active</Label> 
                                                                :  <Label color="error">Blocked</Label> 
                                                                     
              );
            }
           
          },
        
          { field: "actions", headerName: "Actions", width: 100, sortable: false, disableColumnMenu: true,
          renderCell: (params) => {
            if (hoveredRow === params.id) {
              return (
                <Box
                  sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
                >
                  <Tooltip title={params.getValue(params.id,'status') === "active" ? "block" : "Unblock"}  arrow>
                    <IconButton onClick={() => params.getValue(params.id,'status') === "active" ? handleSuspendTra(params.row.email) : handleUnblockTra(params.row.email)}>
                      {params.getValue(params.id,'status') === "active" ? <BlockIcon color="warning" /> : <RemoveCircleOutlineIcon color="secondary"/>}
                    </IconButton>
                  </Tooltip>
    
                  <IconButton onClick={() => handleDeleteTra(params.row.email)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Box> 
              );
              }
          }
        }
      ];

  function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
const requestSearch = (searchValue) => {
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = platform.filter((row) => {
        return Object.keys(row).some((field) => {
            return searchRegex.test(row[field].toString());
        });
    });
    setRows(filteredRows);
    setRowh(filteredRows);
    setRowl(filteredRows);
    setRowt(filteredRows);
};


    return ( 
      <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Service Providers
          </Typography>
    
    <Box sx={{ minWidth: 120 }}>
      {/* <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Role
        </InputLabel>
        <NativeSelect
          
          label="category" onChange={(event) => setCategory(event.target.value)}
          inputProps={{
            name: 'role',
            id: 'uncontrolled-native',
          }}
          // defaultValue={"Contractors"}
        >
          <option value={"Contractors"}>Contractor</option>
          <option value={"Hardware"}>Hardware Owner</option>
          <option value={"Labour"}>Labour</option>
          <option value={"Transporter"}>Transporter</option>
        </NativeSelect>
      </FormControl> */}

      <FormControl sx={{minwidth : "120px", float: "right", marginRight: "20px" }} size="small">
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" defaultValue={"Contractors"}
            label="category" onChange={(event) => setCategory(event.target.value)}
          >
            
             <MenuItem value={"Contractors"}>Contractor</MenuItem>
            <MenuItem value={"Hardware"}>Hardware Owner</MenuItem>
            <MenuItem value={"Labour"}>Labour</MenuItem>
            <MenuItem value={"Transporter"}>Transporter</MenuItem>
          </Select>
        </FormControl>
    </Box>
        </Stack>
        <Box>
                    <TextField
                        variant="standard"
                        value={searchText}
                        onChange={(e) => { setSearchText(e.target.value); requestSearch(e.target.value) }}
                        placeholder="Search..."
                        InputProps={{
                            startAdornment: <SearchIcon fontSize="small" color="action" />,
                            endAdornment: (
                                <IconButton
                                    title="Clear"
                                    aria-label="Clear"
                                    size="small"
                                    style={{ visibility: searchText ? 'visible' : 'hidden', borderRadius: "80%", paddingRight: "1px", margin: "0", fontSize: "1.25rem", }}
                                    onClick={(e) => {setSearchText(''); setRows(platform); setRowh(platform); setRowl(platform); setRowt(platform)} }
                                >
                                    <ClearIcon fontSize="small" color="action" />
                                </IconButton>
                            ),
                        }}
                        sx={{
                            width: { xs: 1, sm: 'auto' }, m: (theme) => theme.spacing(1, 0.5, 1.5),
                            '& .MuiSvgIcon-root': {
                                mr: 0.5,
                            },
                            '& .MuiInput-underline:before': {
                                borderBottom: 1,
                                borderColor: 'divider',
                            },
                        }}
                    />
                </Box>
        <Card>
          
          {/* <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}
          <Box sx={{ height: 600, width: '100%' }}>
            { category === "Contractors"  && rows  !== undefined ?(<DataGrid
            
            rows={rows}
            columns={columns}
            getRowId={(row)=>row._id}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            disableSelectionOnClick
            componentsProps={{
              row: {
                onMouseEnter: onMouseEnterRow,
                onMouseLeave: onMouseLeaveRow
              }
            }} 
        />):null}
        { category === "Hardware" && rowh  !== undefined ?(<DataGrid
            
            rows={rowh}
            columns={hardwareColumns}
            getRowId={(row)=>row._id}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            disableSelectionOnClick
            componentsProps={{
              row: {
                onMouseEnter: onMouseEnterRow,
                onMouseLeave: onMouseLeaveRow
              }
            }} 
        />):null}
        { category === "Labour" && rowl  !== undefined ?(<DataGrid
            
            rows={rowl}
            columns={labourColumns}
            getRowId={(row)=>row._id}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            disableSelectionOnClick
            componentsProps={{
              row: {
                onMouseEnter: onMouseEnterRow,
                onMouseLeave: onMouseLeaveRow
              }
            }} 
        />):null}
        { category === "Transporter" && rowt  !== undefined ?(<DataGrid
            
            rows={rowt}
            columns={transporterColumns}
            getRowId={(row)=>row._id}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            disableSelectionOnClick
            componentsProps={{
              row: {
                onMouseEnter: onMouseEnterRow,
                onMouseLeave: onMouseLeaveRow
              }
            }} 
        />):null}
            </Box>
        </Card>
      </Container>
    </Page>
    );
}
 
export default User;