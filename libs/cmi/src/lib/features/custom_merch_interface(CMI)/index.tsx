import React, { useEffect, useState } from 'react'
import './styles/index.css';
import './styles/font.css'
import './styles/designer.css'
import { CircularProgress, Container, Grid, useMediaQuery } from '@mui/material'
import { LeftPanelControls } from './components/leftPanel'
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import Center from './components/center';
import RightPanel from './components/rightPanel';
import { useDispatch } from 'react-redux';
import { resetDesigner } from './store/designerSlice';
import { resetObjects } from './store/objects';

const theme = createTheme({
    palette: {
        // type: 'light',
        primary: {
            main: '#ff002e',
            dark: '#fa1e46'
        },
        secondary: {
            main: '#161C33',
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
    const [previews, setPreviews] = useState<boolean>(false)
    const media = useMediaQuery(theme.breakpoints.up('md'))
    const dispatch = useDispatch()
    useEffect(() => {
      return () => {
        dispatch(resetDesigner())
        dispatch(resetObjects())
      }
    }, [])
    
    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth={false} >
                <Grid container spacing={0}>
                    <Grid item md={3} xs={12}>
                        <LeftPanelControls
                            setLoading={setLoading}
                            selectedId={selectedId}
                            setSelectedId={setSelectedId}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} style={{ height: 700, paddingTop: media?50:10 }} >
                        {loading ?
                            <CircularProgress />
                            :
                            <Center
                                setLoading={setLoading}
                                loading={loading}
                                selectedId={selectedId}
                                setSelectedId={setSelectedId}
                                previews={previews}
                                setPreviews={setPreviews}
                            />
                        }
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <RightPanel
                            selectedId={selectedId}
                            setSelectedId={setSelectedId}
                            setLoading={setLoading}
                            previews={previews}
                            setPreviews={setPreviews}
                        />
                    </Grid>
                </Grid>
            </Container>

        </ThemeProvider>
    )
}
