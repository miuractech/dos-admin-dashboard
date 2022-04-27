import { Card, Container, Grid, Typography } from '@mui/material';


export const StepsToSell = () => {
    return (
        <Container maxWidth={'xl'} >
            <h2>How to sell on DropOut Store?</h2>
            <Grid container spacing={2} justifyContent="center">
                {[{
                    num: "01",
                    title: 'Add Busniess Name',
                    discripton: 'By adding business name get register yourself',
                },
                {
                    num: "02",
                    title: 'Create Seller Account',
                    discripton: 'Fill all details which are needed for registration',
                },
                {
                    num: "03",
                    title: 'Add & Sell Products',
                    discripton: 'After sign up add your product as per your choice to sell',
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
                                <h3>{item.title}</h3>
                                <p style={{ textAlign: 'center' }}>{item.discripton}</p>
                            </div>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}