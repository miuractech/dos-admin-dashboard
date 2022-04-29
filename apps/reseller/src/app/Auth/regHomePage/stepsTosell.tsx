import { Card, Container, Grid, Typography } from '@mui/material';


export const StepsToSell = () => {
    return (
        <Container maxWidth={'xl'} >
            <h2 style={{ textAlign: "center", padding: "2%" }}>How to sell on DropOut Store?</h2>
            <Grid container spacing={7} justifyContent="center">
                {[{
                    num: "01",
                    title: 'Add Busniess Name',
                    discripton: 'By adding business name get register yourself',
                    image: "../../assets/images/BusniessName.svg"
                },
                {
                    num: "02",
                    title: 'Create Seller Account',
                    discripton: 'Fill all details which are needed for registration',
                    image: "../../assets/images/Create.svg"
                },
                {
                    num: "03",
                    title: 'Add & Sell Products',
                    discripton: 'After sign up add your product as per your choice to sell',
                    image: "../../assets/images/Add&sell.svg"
                }].map(item => (
                    <Grid item xs={12} sm={6} md={6} lg={4} key={item.num}>
                        <Card
                            variant='outlined'
                            style={{ width: "100%", textAlign: 'center', backgroundColor: '#FBFBFB' }}
                        >
                            <div
                                style={{ padding: 16 }}
                            >
                                <Typography variant='h6' color={'secondary'} style={{ fontWeight: 600, fontSize: '24px' }} textAlign='left' >{item.num}</Typography>
                                <img src={item.image} alt="BusniessName" />
                                <h3>{item.title}</h3>
                                <p style={{ textAlign: 'center', width: "76%", margin: "auto" }}>{item.discripton}</p>
                            </div>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}