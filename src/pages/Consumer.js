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
  

    const getAllData = async () => {
      try{

        const data = await axios.get("https://prositegroup2.herokuapp.com/admin/getConsumers");
        setRows(data.data.consumers);
        console.log(data.data.consumers);
        setPlatform(data.data.consumers);
        setRows(data.data.consumers);
      } catch (e) {
        console.log(e);
      }
    };
  


    const handleSuspend = (email) => {
      axios.put(`https://prositegroup2.herokuapp.com/consumerStatus/${email}/block`)
      .then(() => {
        console.log("updated");
        getAllData();
      })
    }
  
  
    const handleUnblock = (email) => {
      axios.put(`https://prositegroup2.herokuapp.com/consumerStatus/${email}/active`)
      .then(() => {
        getAllData();
      })
    }

    const handleDelete = (email) => {
      try{
        console.log(email);
        axios.delete(`https://prositegroup2.herokuapp.com/deleteConsumer/${email}`)
        .then(() => {
          setRows(rows.filter((data) => data._email !== email));
          getAllData();
          console.log(email);
          
        })
      }catch(err){
        console.log(err);
      }
    }










    const columns = [
      
        { field: 'imageUrl', headerName: 'Consumers', width: 90 ,
        renderCell: (data) => {
          console.log(data);
          return (
            <>
              <Avatar src={"http://res.cloudinary.com/muthahhar97/image/upload/v1659546006/images/"} />
              {/* {"http://res.cloudinary.com/muthahhar97/image/upload/v1659546006/images/"} */}
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
            // return (
            //   <>
            //     <Label variant="ghost" color={(data.getValue(data.id,'status') === 'banned' ? 'error' : 'success')}>
            //         Success        
            //     </Label>
            //   </>
            // );
          },
        
          { field: "actions", headerName: "Actions", width: 100, sortable: false, disableColumnMenu: true,
          renderCell: (params) => {
            if (hoveredRow === params.id) {
              return (
                <Box
                  sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
                >
                  <Tooltip title={params.getValue(params.id,'status') === "active" ? "block" : "Unblock"}  arrow>
                    <IconButton onClick={() => params.getValue(params.id,'status') === "active" ? handleSuspend(params.row.email) : handleUnblock(params.row.email)}>
                      {params.getValue(params.id,'status') === "active" ? <BlockIcon color="warning" /> : <RemoveCircleOutlineIcon color="secondary"/>}
                    </IconButton>
                  </Tooltip>
    
                  <IconButton onClick={() => handleDelete(params.row.email)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Box> 
              );
              }
          }
        }
      ];
      

  useEffect(()=>{
    getAllData();
  },[rows.status]);

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
};


    return ( 
      <Page title="Consumer">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Consumers
          </Typography>
    
    {/* <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Role
        </InputLabel>
        <NativeSelect
          defaultValue={10}
          inputProps={{
            name: 'role',
            id: 'uncontrolled-native',
          }}
        >
          <option value={10}>Contractor</option>
          <option value={20}>Hardware Owner</option>
          <option value={30}>Labour</option>
          <option value={40}>Transporters</option>
        </NativeSelect>
      </FormControl>
    </Box> */}
          {/* <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button> */}
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
                                    onClick={(e) => {setSearchText(''); setRows(platform)} }
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
            <DataGrid
            
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
            />
            </Box>
            
          

          
        </Card>
      </Container>
    </Page>

            

    );
  }
 
export default User;