import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Container,
    Grid,
    IconButton,
    makeStyles,
    Paper,
    Tab,
    Tabs,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Snackbar,
} from "@material-ui/core";
import { Event, LocationOn, People, Add, CheckCircle } from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(6),
    },
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: theme.shape.borderRadius,
    },
    media: {
        height: 160,
        position: "relative",
    },
    dateBadge: {
        position: "absolute",
        top: 12,
        left: 12,
        backgroundColor: "white",
        color: theme.palette.primary.main,
        padding: "6px 12px",
        borderRadius: 8,
        textAlign: "center",
        boxShadow: theme.shadows[3],
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const initialEvents = [
    { id: 1, title: "React & Material-UI Masterclass Live Stream", dateMonth: "AUG", dateDay: "18", time: "06:00 PM EST", location: "Online Zoom Stream", attendees: 142, img: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=500" },
    { id: 2, title: "Frontend Engineering Hackathon 2026", dateMonth: "SEP", dateDay: "04", time: "10:00 AM EST", location: "Tech Hub Auditorium", attendees: 88, img: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=500" },
    { id: 3, title: "UI/UX Design Systems Workshop", dateMonth: "SEP", dateDay: "12", time: "02:00 PM EST", location: "Online Google Meet", attendees: 230, img: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=500" },
];

const EventsView = () => {
    const classes = useStyles();
    const [events, setEvents] = useState(initialEvents);
    const [tab, setTab] = useState(0);
    const [attending, setAttending] = useState({});
    const [alertMsg, setAlertMsg] = useState("");
    
    // Create Event Dialog
    const [createOpen, setCreateOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");

    const toggleRSVP = (id) => {
        setAttending((prev) => {
            const next = !prev[id];
            setAlertMsg(next ? "RSVP confirmed! Added to your schedule." : "RSVP cancelled.");
            return { ...prev, [id]: next };
        });
    };

    const handleCreateEvent = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        const newEvt = {
            id: Date.now(),
            title: title.trim(),
            dateMonth: "SEP",
            dateDay: date || "20",
            time: "05:00 PM EST",
            location: location.trim() || "Online Stream",
            attendees: 1,
            img: "https://images.pexels.com/photos/7319337/pexels-photo-7319337.jpeg?auto=compress&cs=tinysrgb&w=500",
        };

        setEvents([newEvt, ...events]);
        setTitle("");
        setLocation("");
        setDate("");
        setCreateOpen(false);
        setAlertMsg(`Event "${newEvt.title}" created successfully!`);
    };

    return (
        <Container className={classes.container}>
            <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={3} flexWrap="wrap" gap={2}>
                <Box>
                    <Typography variant="h4" gutterBottom style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Event color="primary" fontSize="large" /> Events & Meetups
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Explore upcoming tech workshops, hackathons, and developer conferences.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    onClick={() => setCreateOpen(true)}
                >
                    Create Event
                </Button>
            </Box>

            <Paper style={{ marginBottom: 24 }}>
                <Tabs value={tab} onChange={(e, val) => setTab(val)} indicatorColor="primary" textColor="primary" centered variant="fullWidth">
                    <Tab label={`Upcoming Events (${events.length})`} />
                    <Tab label={`Attending (${Object.values(attending).filter(Boolean).length})`} />
                </Tabs>
            </Paper>

            <Grid container spacing={3}>
                {events.map((evt) => (
                    <Grid item xs={12} sm={6} md={4} key={evt.id}>
                        <Card className={classes.card} elevation={3}>
                            <Box className={classes.media}>
                                <CardMedia image={evt.img} style={{ height: "100%", width: "100%" }} />
                                <div className={classes.dateBadge}>
                                    <Typography variant="caption" style={{ fontWeight: "bold", display: "block", color: "#3f51b5" }}>
                                        {evt.dateMonth}
                                    </Typography>
                                    <Typography variant="h6" style={{ fontWeight: "bold", lineHeight: 1 }}>
                                        {evt.dateDay}
                                    </Typography>
                                </div>
                            </Box>
                            <CardContent>
                                <Typography variant="h6" gutterBottom style={{ minHeight: 56, display: "flex", alignItems: "center" }}>
                                    {evt.title}
                                </Typography>
                                <Box display="flex" alignItems="center" color="textSecondary" marginBottom={1}>
                                    <LocationOn fontSize="small" style={{ marginRight: 6 }} />
                                    <Typography variant="body2">{evt.location}</Typography>
                                </Box>
                                <Box display="flex" alignItems="center" color="textSecondary">
                                    <People fontSize="small" style={{ marginRight: 6 }} />
                                    <Typography variant="caption">{evt.attendees + (attending[evt.id] ? 1 : 0)} Attending</Typography>
                                </Box>
                            </CardContent>
                            <Box padding={2} style={{ borderTop: "1px solid #eee" }}>
                                <Button
                                    fullWidth
                                    variant={attending[evt.id] ? "outlined" : "contained"}
                                    color="primary"
                                    startIcon={attending[evt.id] ? <CheckCircle /> : <Event />}
                                    onClick={() => toggleRSVP(evt.id)}
                                >
                                    {attending[evt.id] ? "Attending" : "RSVP Join Event"}
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Create Event Dialog */}
            <Dialog open={createOpen} onClose={() => setCreateOpen(false)} disableRestoreFocus maxWidth="xs" fullWidth>
                <form onSubmit={handleCreateEvent}>
                    <DialogTitle>Create New Event</DialogTitle>
                    <DialogContent dividers>
                        <TextField
                            fullWidth
                            label="Event Title"
                            variant="outlined"
                            size="small"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={{ marginBottom: 16 }}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Location / Stream Link"
                            variant="outlined"
                            size="small"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            style={{ marginBottom: 16 }}
                        />
                        <TextField
                            fullWidth
                            label="Day Date (e.g. 25)"
                            variant="outlined"
                            size="small"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setCreateOpen(false)}>Cancel</Button>
                        <Button type="submit" variant="contained" color="primary">
                            Publish Event
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            <Snackbar open={Boolean(alertMsg)} autoHideDuration={3000} onClose={() => setAlertMsg("")}>
                <Alert onClose={() => setAlertMsg("")} severity="success">
                    {alertMsg}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default EventsView;
