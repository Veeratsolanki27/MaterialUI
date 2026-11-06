import {
    Avatar,
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Container,
    Grid,
    IconButton,
    makeStyles,
    Typography,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Button,
    Chip,
} from "@material-ui/core";
import { PlayArrow, Favorite, FavoriteBorder } from "@material-ui/icons";
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
    },
    mediaWrapper: {
        position: "relative",
        height: 220,
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#000",
    },
    media: {
        height: "100%",
        width: "100%",
        objectFit: "cover",
    },
    playOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    playBtn: {
        backgroundColor: "white",
        color: theme.palette.primary.main,
        padding: 16,
        "&:hover": {
            backgroundColor: "#f5f5f5",
            transform: "scale(1.1)",
        },
        transition: "all 0.2s ease",
    },
    durationBadge: {
        position: "absolute",
        bottom: 12,
        right: 12,
        backgroundColor: "rgba(0,0,0,0.8)",
        color: "white",
        padding: "2px 8px",
        borderRadius: 4,
        fontSize: 12,
        fontWeight: "bold",
    },
    cardContent: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
}));

const videos = [
    {
        id: 1,
        title: "Build a Full React & Material-UI Web Application",
        channel: "Veerat Dev",
        views: "142K views",
        time: "2 days ago",
        duration: "24:15",
        img: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
        id: 2,
        title: "Modern CSS Grid & Flexbox Masterclass",
        channel: "Code Ninja",
        views: "89K views",
        time: "1 week ago",
        duration: "18:40",
        img: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
        id: 3,
        title: "Top 10 Material-UI Components You Must Know",
        channel: "Design Hub",
        views: "230K views",
        time: "3 weeks ago",
        duration: "12:05",
        img: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
        id: 4,
        title: "React State Management with Hooks & Context API",
        channel: "Veerat Dev",
        views: "95K views",
        time: "1 month ago",
        duration: "32:10",
        img: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
];

const VideosView = () => {
    const classes = useStyles();
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [likedVideos, setLikedVideos] = useState({});

    const toggleLike = (id) => {
        setLikedVideos((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <Container className={classes.container}>
            <Box marginBottom={3}>
                <Typography variant="h4" gutterBottom>
                    Trending Videos
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Watch technical tutorials, coding walkthroughs, and UI design showcases.
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {videos.map((vid) => (
                    <Grid item xs={12} sm={6} key={vid.id}>
                        <Card className={classes.card} elevation={3}>
                            <Box className={classes.mediaWrapper}>
                                <CardMedia className={classes.media} image={vid.img} title={vid.title} />
                                <Box className={classes.playOverlay}>
                                    <IconButton className={classes.playBtn} onClick={() => setSelectedVideo(vid)}>
                                        <PlayArrow style={{ fontSize: 32 }} />
                                    </IconButton>
                                </Box>
                                <span className={classes.durationBadge}>{vid.duration}</span>
                            </Box>
                            <CardContent className={classes.cardContent}>
                                <Typography variant="h6" gutterBottom style={{ minHeight: 64, display: "flex", alignItems: "center" }}>
                                    {vid.title}
                                </Typography>
                                <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={1}>
                                    <Typography variant="body2" color="textSecondary">
                                        {vid.channel} • {vid.views} • {vid.time}
                                    </Typography>
                                    <IconButton size="small" onClick={() => toggleLike(vid.id)}>
                                        {likedVideos[vid.id] ? <Favorite color="secondary" /> : <FavoriteBorder />}
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Video Player Modal */}
            <Dialog open={Boolean(selectedVideo)} onClose={() => setSelectedVideo(null)} maxWidth="md" fullWidth disableRestoreFocus>
                {selectedVideo && (
                    <>
                        <DialogTitle>{selectedVideo.title}</DialogTitle>
                        <DialogContent dividers>
                            <Box
                                style={{
                                    height: 380,
                                    backgroundColor: "black",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "white",
                                    borderRadius: 8,
                                    backgroundImage: `url(${selectedVideo.img})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    position: "relative",
                                }}
                            >
                                <Box className={classes.playOverlay}>
                                    <Chip label="▶ Playing Video Stream..." color="primary" style={{ fontSize: 16, padding: 8 }} />
                                </Box>
                            </Box>
                            <Box marginTop={2}>
                                <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                                    {selectedVideo.channel}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    {selectedVideo.views} • Published {selectedVideo.time}
                                </Typography>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setSelectedVideo(null)} color="primary">
                                Close Player
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </Container>
    );
};

export default VideosView;
