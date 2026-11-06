import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Grid,
    IconButton,
    makeStyles,
    Paper,
    Snackbar,
    Typography,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@material-ui/core";
import {
    PhotoCamera,
    Videocam,
    VideocamOff,
    GetApp,
    Publish,
    Delete,
    Filter,
} from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import { useState, useRef, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(8),
    },
    cameraBox: {
        position: "relative",
        width: "100%",
        height: 380,
        backgroundColor: "#111",
        borderRadius: theme.shape.borderRadius,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: theme.shadows[4],
        marginBottom: theme.spacing(3),
    },
    video: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    controlsBar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: theme.spacing(2),
        padding: theme.spacing(2),
        marginBottom: theme.spacing(4),
    },
    galleryGrid: {
        marginTop: theme.spacing(2),
    },
    snapshotCard: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    snapshotMedia: {
        height: 180,
    },
    filterChip: {
        margin: theme.spacing(0.5),
        cursor: "pointer",
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const filters = [
    { name: "Normal", style: "none" },
    { name: "Sepia", style: "sepia(0.8)" },
    { name: "Grayscale", style: "grayscale(1)" },
    { name: "Vintage", style: "contrast(1.2) brightness(0.9) sepia(0.4)" },
    { name: "High Contrast", style: "contrast(1.6)" },
    { name: "Invert", style: "invert(0.9)" },
];

const sampleSnapshots = [
    {
        id: 1,
        url: "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=500",
        timestamp: "10 mins ago",
        filter: "Normal",
    },
    {
        id: 2,
        url: "https://images.pexels.com/photos/7319337/pexels-photo-7319337.jpeg?auto=compress&cs=tinysrgb&w=500",
        timestamp: "1 hour ago",
        filter: "Vintage",
    },
];

const CameraView = ({ onAddPost }) => {
    const classes = useStyles();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const [isCamActive, setIsCamActive] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(filters[0]);
    const [snapshots, setSnapshots] = useState(sampleSnapshots);
    const [alertMsg, setAlertMsg] = useState("");
    const [streamError, setStreamError] = useState(false);
    const [publishDialogItem, setPublishDialogItem] = useState(null);
    const [postTitle, setPostTitle] = useState("");

    // Start Camera Stream
    const startCamera = async () => {
        try {
            setStreamError(false);
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }
            setIsCamActive(true);
            setAlertMsg("Camera turned on successfully!");
        } catch (err) {
            console.warn("Camera access denied or unavailable:", err);
            setStreamError(true);
            setIsCamActive(true); // Fallback active mode
            setAlertMsg("Live camera unavailable. Running simulated camera mode.");
        }
    };

    // Stop Camera Stream
    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach((track) => track.stop());
            videoRef.current.srcObject = null;
        }
        setIsCamActive(false);
    };

    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []);

    // Take Photo Snapshot
    const capturePhoto = () => {
        let photoUrl = "";
        if (isCamActive && !streamError && videoRef.current && canvasRef.current) {
            const canvas = canvasRef.current;
            const video = videoRef.current;
            canvas.width = video.videoWidth || 640;
            canvas.height = video.videoHeight || 480;
            const ctx = canvas.getContext("2d");

            ctx.filter = selectedFilter.style;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            photoUrl = canvas.toDataURL("image/png");
        } else {
            // Simulated snapshot image if camera feed isn't live
            const fallbackImages = [
                "https://images.pexels.com/photos/7078467/pexels-photo-7078467.jpeg?auto=compress&cs=tinysrgb&w=500",
                "https://images.pexels.com/photos/7245535/pexels-photo-7245535.jpeg?auto=compress&cs=tinysrgb&w=500",
                "https://images.pexels.com/photos/7833646/pexels-photo-7833646.jpeg?auto=compress&cs=tinysrgb&w=500",
            ];
            photoUrl = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
        }

        const newSnap = {
            id: Date.now(),
            url: photoUrl,
            timestamp: "Just now",
            filter: selectedFilter.name,
        };

        setSnapshots([newSnap, ...snapshots]);
        setAlertMsg("Snapshot captured!");
    };

    const deleteSnapshot = (id) => {
        setSnapshots(snapshots.filter((s) => s.id !== id));
        setAlertMsg("Snapshot deleted.");
    };

    const handlePublishPost = (snap) => {
        if (onAddPost) {
            onAddPost({
                id: Date.now(),
                title: postTitle.trim() || `Captured Photo (${snap.filter} Filter)`,
                desc: `Photo snapped live using Veerat Dev Camera with ${snap.filter} effect.`,
                img: snap.url,
                likes: 0,
                isLiked: false,
                category: "Camera",
            });
            setAlertMsg("Photo published to Feed!");
        }
        setPublishDialogItem(null);
        setPostTitle("");
    };

    return (
        <Container className={classes.container}>
            <Box marginBottom={3}>
                <Typography variant="h4" gutterBottom>
                    Camera & Photo Studio
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Capture photos live from your camera, apply filter effects, and publish directly to your feed.
                </Typography>
            </Box>

            {/* Camera Viewfinder */}
            <Box className={classes.cameraBox}>
                {isCamActive && !streamError ? (
                    <video
                        ref={videoRef}
                        className={classes.video}
                        style={{ filter: selectedFilter.style }}
                        autoPlay
                        playsInline
                        muted
                    />
                ) : isCamActive && streamError ? (
                    <Box
                        textAlign="center"
                        color="white"
                        style={{
                            backgroundImage: `url("https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=800")`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            filter: selectedFilter.style,
                        }}
                    >
                        <Chip
                            label="Simulated Camera Active"
                            color="secondary"
                            style={{ marginBottom: 12 }}
                        />
                        <Typography variant="h6" style={{ background: "rgba(0,0,0,0.6)", padding: "4px 16px", borderRadius: 4 }}>
                            Ready to Snap Photo
                        </Typography>
                    </Box>
                ) : (
                    <Box textAlign="center" color="grey.500">
                        <VideocamOff style={{ fontSize: 64, marginBottom: 8 }} />
                        <Typography variant="h6">Camera Off</Typography>
                        <Typography variant="body2">Click 'Turn On Camera' to start preview</Typography>
                    </Box>
                )}
            </Box>

            {/* Hidden canvas element for photo rendering */}
            <canvas ref={canvasRef} style={{ display: "none" }} />

            {/* Filter selection & Controls */}
            <Paper className={classes.controlsBar} elevation={2}>
                <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
                    <Filter color="action" style={{ marginRight: 8 }} />
                    <Typography variant="subtitle2" style={{ marginRight: 8 }}>
                        Filters:
                    </Typography>
                    {filters.map((f) => (
                        <Chip
                            key={f.name}
                            label={f.name}
                            className={classes.filterChip}
                            color={selectedFilter.name === f.name ? "primary" : "default"}
                            onClick={() => setSelectedFilter(f)}
                        />
                    ))}
                </Box>

                <Box display="flex" gap={2}>
                    {isCamActive ? (
                        <>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<PhotoCamera />}
                                onClick={capturePhoto}
                            >
                                Snap Photo
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                startIcon={<VideocamOff />}
                                onClick={stopCamera}
                            >
                                Turn Off
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<Videocam />}
                            onClick={startCamera}
                        >
                            Turn On Camera
                        </Button>
                    )}
                </Box>
            </Paper>

            {/* Snapshots Gallery */}
            <Typography variant="h6" gutterBottom style={{ marginTop: 24 }}>
                My Photo Gallery ({snapshots.length})
            </Typography>
            <Grid container spacing={3} className={classes.galleryGrid}>
                {snapshots.map((snap) => (
                    <Grid item xs={12} sm={6} md={4} key={snap.id}>
                        <Card className={classes.snapshotCard} elevation={3}>
                            <CardMedia className={classes.snapshotMedia} image={snap.url} title="Snapshot" />
                            <CardContent style={{ flexGrow: 1 }}>
                                <Typography variant="subtitle2">Filter: {snap.filter}</Typography>
                                <Typography variant="caption" color="textSecondary">
                                    Captured {snap.timestamp}
                                </Typography>
                            </CardContent>
                            <CardActions style={{ justifyContent: "space-between", padding: 12 }}>
                                <Button
                                    size="small"
                                    color="primary"
                                    startIcon={<Publish />}
                                    onClick={() => {
                                        setPublishDialogItem(snap);
                                        setPostTitle(`Photo with ${snap.filter} Filter`);
                                    }}
                                >
                                    Post
                                </Button>
                                <Box>
                                    <IconButton
                                        size="small"
                                        component="a"
                                        href={snap.url}
                                        download={`snapshot-${snap.id}.jpg`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <GetApp fontSize="small" />
                                    </IconButton>
                                    <IconButton size="small" color="secondary" onClick={() => deleteSnapshot(snap.id)}>
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </Box>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Publish Dialog */}
            <Dialog open={Boolean(publishDialogItem)} onClose={() => setPublishDialogItem(null)} disableRestoreFocus>
                <DialogTitle>Publish Photo to Feed</DialogTitle>
                <DialogContent dividers>
                    {publishDialogItem && (
                        <img src={publishDialogItem.url} alt="To Publish" style={{ width: "100%", borderRadius: 8, marginBottom: 16 }} />
                    )}
                    <Typography variant="body2" paragraph>
                        This photo will be posted directly to your social feed under the "Camera" category!
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setPublishDialogItem(null)}>Cancel</Button>
                    <Button
                        onClick={() => handlePublishPost(publishDialogItem)}
                        color="primary"
                        variant="contained"
                    >
                        Publish Now
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={Boolean(alertMsg)} autoHideDuration={3000} onClose={() => setAlertMsg("")}>
                <Alert onClose={() => setAlertMsg("")} severity="info">
                    {alertMsg}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default CameraView;
