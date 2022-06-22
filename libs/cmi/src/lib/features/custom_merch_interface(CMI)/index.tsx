import React, { useState } from 'react'
import './styles/index.css';
import './styles/font.css'
import './styles/designer.css'
import { CircularProgress, Container, Grid } from '@mui/material'
import { LeftPanelControls } from './components/leftPanel'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Center from './components/center';
import RightPanel from './components/rightPanel';

const theme = createTheme({
    palette: {
        // type: 'light',
        primary: {
            main: '#ff002e',
        },
        secondary: {
            main: '#ff002e',
        },
        error: {
            main: '#bd5857',
        },
        text: {
            secondary: 'rgba(249,249,249,0.54)',
        },
        background: {
            default: '#FBFAF8',
        },
        info: {
            main: "#167AF9",
        }
    },
    typography: {
        fontFamily: "'Montserrat', sans-serif"
    }
});

export default function CustomMerchInterface() {
    const [loading, setLoading] = useState(false)
    const [selectedId, setSelectedId] = useState<string | null>(null)
    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth={false} >
                <Grid container spacing={0}>
                    <Grid item md={3}>
                        <LeftPanelControls
                            setLoading={setLoading}
                            selectedId={selectedId}
                            setSelectedId={setSelectedId}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {loading ?
                            <CircularProgress />
                            :
                            <Center
                                setLoading={setLoading}
                                loading={loading}
                                selectedId={selectedId}
                                setSelectedId={setSelectedId}
                            />
                        }
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <RightPanel
                            selectedId={selectedId}
                            setSelectedId={setSelectedId}
                        />
                    </Grid>
                </Grid>
            </Container>

        </ThemeProvider>
    )
}
