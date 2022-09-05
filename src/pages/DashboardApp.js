import { React, useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();

  const [contCount, setContCount] = useState(0);
  const [hwCount, setHwCount] = useState(0);
  const [labtCount, setLabtCount] = useState(0);
  const [tranCount, setTranCount] = useState(0);
  const [consCount, setConsCount] = useState(0);
  const [proCount, setProCount] = useState(0);
  

  const total = hwCount+contCount+labtCount+tranCount;

  const getContractors = async () => {
    
    const data = await axios.get("https://prositegroup2.herokuapp.com/admin/getContractors");
    setContCount(data.data.contractors.length);
    console.log(data.data);
  };
  const getHardware = async () =>{
    const datah = await axios.get("https://prositegroup2.herokuapp.com/admin/getHardwares");
    setLabtCount(datah.data.hardwares.length);
    console.log(datah.data);
  };
  const getLabour = async () =>{
    const data = await axios.get("https://prositegroup2.herokuapp.com/admin/getLabours");
    setHwCount(data.data.labours.length);
  };
  const getTransporter = async () =>{
    const data = await axios.get("https://prositegroup2.herokuapp.com/admin/getTransporters");
    setTranCount(data.data.transporters.length);
    
  };
  const getProducts = async () => {
    const datap = await axios.get("https://prositegroup2.herokuapp.com/admin/getProducts");
    setProCount(datap.data.products.length);
    console.log(datap.data);
  };
  const getConsumers = async () => {
    const data = await axios.get("https://prositegroup2.herokuapp.com/admin/getConsumers");
    setConsCount(data.data.consumers.length);
  };
  


  useEffect(()=>{
    getConsumers();
    getProducts();
    getContractors();
    getHardware();
    getLabour();
    getTransporter();
  })

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
        Welcome back!
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Service Providers" total={total} icon={'fa-solid:user-clock'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Consumers" total={consCount} color="info" icon={'fa-solid:user-edit'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Products" total={proCount} color="warning" icon={'ep:goods-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Hardwares" total={hwCount} color="error" icon={'fa-solid:tools'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Transporters" total={tranCount} color="error" icon={'icon-park-solid:transporter'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Contractors" total={contCount} color="error" icon={'emojione-monotone:construction-worker'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Labours" total={labtCount} color="error" icon={'fa-solid:tools'} />
          </Grid>

         


          {/* <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Hardwares vs Products"
              chartLabels={[
                '01/09/2022',
                '02/09/2022',
                '03/09/2022',
                '04/09/2022',
                '05/09/2022',
                '06/09/2022',
                '07/09/2022',
                '08/09/2022',
                '09/09/2022',
                '10/09/2022',
                '11/09/2022',
                '12/09/2022',
              ]}
              chartData={[
      
                {
                  name: 'Hardwares',
                  type: 'column',
                  fill: 'solid',
                  data: [15, 11, 22, 27, 13, 22, 37, 21,hwCount, 22, 30,24],
                },
               
                {
                  name: 'Products',
                  type: 'area',
                  fill: 'gradient',
                  data: [16, 55, 41, 67, 22, 43, 21, 41,proCount, 56, 27, 43],
                },
               
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits(Provincialy)"
              chartData={[
                { label: 'Western', value: 4344 },
                { label: 'Central', value: 5435 },
                { label: 'Southern', value: 1443 },
                { label: 'Northern', value: 4443 },
                { label: 'North Central', value: 4443 },
                { label: 'Eastern', value: 4443 },
                { label: 'North Western', value: 4443 },
                { label: 'Uwa', value: 4443 },
                { label: 'Sabaragamuwa', value: 4443 },
                
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.chart.blue[0],
                theme.palette.chart.violet[0],
                theme.palette.chart.yellow[0],
                theme.palette.chart.green[0],
                
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} height={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} height={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} height={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} height={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
