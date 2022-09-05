import { React, useState, useEffect, useRef} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ItemCard(props) {

  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };
  
  const [item, setItem] = useState([]);
  const [seller, setSeller] = useState([]);

  // const getProducts = async () => {
  //   const datap = await axios.get("https://prositegroup2.herokuapp.com/admin/getProducts");
  //   setName(datap.data.products.productname);
  //   console.log(datap.data);
  // };

  const getDetails = async () => {
    const data = await axios.get(`https://prositegroup2.herokuapp.com/getProductInfo/${props.id}`)
    setItem(data.data.product);
    setSeller(data.data.product.seller);
  }


  useEffect(()=>{
    getDetails(); 
  })

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <BootstrapDialog
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.show}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          {item.productname}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div className='App'>
            <img src={item.imageUrl} alt="text" sizes='large' width={300} height={250}/>
          </div>
          <Typography gutterBottom>
            Seller : {seller.owner}
          </Typography>
          <Typography gutterBottom>
            Category : {item.category}
          </Typography>
          <Typography gutterBottom>
            Price : {item.price}
          </Typography>
          <Typography gutterBottom>
            Stock : {item.stock}
          </Typography>
          <Typography gutterBottom>
            Size : {item.size}
          </Typography>
          <Typography gutterBottom>
            Description : {item.description}
          </Typography>
        </DialogContent>
        
      </BootstrapDialog>
    </div>
  );
}