import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Chip,
    Container,
    Grid,
    IconButton,
    InputAdornment,
    makeStyles,
    Paper,
    Snackbar,
    Tab,
    Tabs,
    TextField,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@material-ui/core";
import {
    Bookmark,
    Delete,
    Add,
    Share,
    Search,
    Folder,
    Visibility,
} from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(8),
    },
    topBar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: theme.spacing(2),
        marginBottom: theme.spacing(3),
    },
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    media: {
        height: 180,
    },
    cardContent: {
        flexGrow: 1,
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const initialCollections = [
    {
        id: 1,
        title: "Simply Recipes Less Stress. More Joy",
        folder: "Recipes",
        img: "https://images.pexels.com/photos/7363671/pexels-photo-7363671.jpeg?auto=compress&cs=tinysrgb&w=500",
        desc: "Discover amazing quick recipes that save time and bring joy to your family dinner table.",
        savedAt: "Yesterday",
    },
    {
        id: 2,
        title: "Shortcut Travel Guide to Manhattan",
        folder: "Travel",
        img: "https://images.pexels.com/photos/7078467/pexels-photo-7078467.jpeg?auto=compress&cs=tinysrgb&w=500",
        desc: "Explore New York City's top attractions, museums, and rooftop dining experiences.",
        savedAt: "3 days ago",
    },
    {
        id: 3,
        title: "Killer Actions to Boost Your Self-Confidence",
        folder: "Inspiration",
        img: "https://images.pexels.com/photos/7833646/pexels-photo-7833646.jpeg?auto=compress&cs=tinysrgb&w=500",
        desc: "Simple daily habits and psychological hacks to improve focus, motivation, and self-belief.",
        savedAt: "1 week ago",
    },
    {
        id: 4,
        title: "What To Do In London",
        folder: "Travel",
        img: "https://images.pexels.com/photos/7245535/pexels-photo-7245535.jpeg?auto=compress&cs=tinysrgb&w=500",
        desc: "A complete 3-day travel itinerary exploring hidden spots, iconic landmarks, and coffee shops in London.",
        savedAt: "2 weeks ago",
    },
];

const CollectionsView = () => {
    const classes = useStyles();
    const [collections, setCollections] = useState(initialCollections);
    const [folders, setFolders] = useState(["All", "Favorites", "Recipes", "Travel", "Inspiration"]);
    const [activeTab, setActiveTab] = useState(0);
    const [search, setSearch] = useState("");
    const [alertMsg, setAlertMsg] = useState("");

    // Modals
    const [newFolderOpen, setNewFolderOpen] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);

    const handleCreateFolder = (e) => {
        e.preventDefault();
        if (!newFolderName.trim()) return;
        if (!folders.includes(newFolderName.trim())) {
            setFolders([...folders, newFolderName.trim()]);
            setAlertMsg(`Created collection folder "${newFolderName.trim()}"!`);
        }
        setNewFolderName("");
        setNewFolderOpen(false);
    };

    const handleRemoveFromCollection = (id) => {
        setCollections(collections.filter((item) => item.id !== id));
        setAlertMsg("Item removed from collections.");
    };

    const filteredItems = collections.filter((item) => {
        const matchesSearch =
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.desc.toLowerCase().includes(search.toLowerCase());
        const selectedFolderName = folders[activeTab];
        const matchesFolder =
            selectedFolderName === "All" || item.folder === selectedFolderName;
        return matchesSearch && matchesFolder;
    });

    return (
        <Container className={classes.container}>
            <Box className={classes.topBar}>
                <Box>
                    <Typography variant="h4" gutterBottom>
                        Saved Collections & Bookmarks
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Organize your bookmarked posts, articles, and saved inspiration by folder.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    onClick={() => setNewFolderOpen(true)}
                >
                    New Collection Folder
                </Button>
            </Box>

            <TextField
                fullWidth
                variant="outlined"
                placeholder="Search saved bookmarks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ marginBottom: 24 }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search color="action" />
                        </InputAdornment>
                    ),
                }}
            />

            <Paper style={{ marginBottom: 24 }}>
                <Tabs
                    value={activeTab}
                    onChange={(e, val) => setActiveTab(val)}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    {folders.map((f) => (
                        <Tab key={f} label={f} icon={<Folder fontSize="small" />} />
                    ))}
                </Tabs>
            </Paper>

            {filteredItems.length > 0 ? (
                <Grid container spacing={3}>
                    {filteredItems.map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item.id}>
                            <Card className={classes.card} elevation={3}>
                                <CardMedia className={classes.media} image={item.img} title={item.title} />
                                <CardContent className={classes.cardContent}>
                                    <Chip label={item.folder} size="small" color="primary" style={{ marginBottom: 8 }} />
                                    <Typography variant="h6" gutterBottom>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {item.desc}
                                    </Typography>
                                    <Typography variant="caption" color="textSecondary" style={{ marginTop: 8, display: "block" }}>
                                        Saved {item.savedAt}
                                    </Typography>
                                </CardContent>
                                <CardActions style={{ justifyContent: "space-between", padding: 16 }}>
                                    <Button
                                        size="small"
                                        color="primary"
                                        startIcon={<Visibility />}
                                        onClick={() => setSelectedItem(item)}
                                    >
                                        View Details
                                    </Button>
                                    <IconButton
                                        size="small"
                                        color="secondary"
                                        onClick={() => handleRemoveFromCollection(item.id)}
                                    >
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Box textAlign="center" padding={6}>
                    <Bookmark style={{ fontSize: 48, color: "#ccc", marginBottom: 8 }} />
                    <Typography variant="h6" color="textSecondary">
                        No saved items in this collection folder.
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Click the bookmark icon on any post in your feed to save it here!
                    </Typography>
                </Box>
            )}

            {/* Create Folder Dialog */}
            <Dialog open={newFolderOpen} onClose={() => setNewFolderOpen(false)} disableRestoreFocus>
                <form onSubmit={handleCreateFolder}>
                    <DialogTitle>Create New Collection Folder</DialogTitle>
                    <DialogContent dividers>
                        <TextField
                            fullWidth
                            label="Folder Name"
                            variant="outlined"
                            size="small"
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            required
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setNewFolderOpen(false)}>Cancel</Button>
                        <Button type="submit" variant="contained" color="primary">
                            Create Folder
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            {/* Item Details Dialog */}
            <Dialog open={Boolean(selectedItem)} onClose={() => setSelectedItem(null)} maxWidth="sm" fullWidth disableRestoreFocus>
                {selectedItem && (
                    <>
                        <DialogTitle>{selectedItem.title}</DialogTitle>
                        <DialogContent dividers>
                            <img src={selectedItem.img} alt={selectedItem.title} style={{ width: "100%", borderRadius: 8, marginBottom: 16 }} />
                            <Chip label={`Folder: ${selectedItem.folder}`} color="primary" style={{ marginBottom: 12 }} />
                            <Typography variant="body1" paragraph>
                                {selectedItem.desc}
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setSelectedItem(null)} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>

            <Snackbar open={Boolean(alertMsg)} autoHideDuration={3000} onClose={() => setAlertMsg("")}>
                <Alert onClose={() => setAlertMsg("")} severity="info">
                    {alertMsg}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default CollectionsView;
