import {
    Avatar,
    Box,
    Card,
    makeStyles,
    Typography,
    Dialog,
    DialogContent,
    IconButton,
    Chip,
    Button,
    TextField,
    Paper,
} from "@material-ui/core";
import { Add, Close, Favorite, ThumbUp } from "@material-ui/icons";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    storiesWrapper: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(3),
        borderRadius: 16,
        backgroundColor: theme.palette.background.paper,
    },
    container: {
        display: "flex",
        gap: theme.spacing(2.5),
        overflowX: "auto",
        paddingBottom: theme.spacing(0.5),
        scrollBehavior: "smooth",
        "&::-webkit-scrollbar": {
            height: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(150, 150, 150, 0.3)",
            borderRadius: "4px",
        },
    },
    storyItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        minWidth: 72,
        transition: "transform 0.2s ease",
        "&:hover": {
            transform: "scale(1.06)",
        },
    },
    ringGradient: {
        padding: 3,
        borderRadius: "50%",
        background: "linear-gradient(45deg, #f50057 0%, #3f51b5 50%, #4caf50 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 6,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    },
    addRing: {
        padding: 3,
        borderRadius: "50%",
        border: `2px dashed ${theme.palette.primary.main}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 6,
    },
    avatar: {
        width: 58,
        height: 58,
        border: "2px solid white",
    },
    addAvatar: {
        width: 58,
        height: 58,
        backgroundColor: theme.palette.primary.main,
        color: "white",
    },
    userName: {
        fontSize: "0.75rem",
        fontWeight: 600,
        textAlign: "center",
        maxWidth: 76,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
}));

const initialStories = [
    {
        id: 1,
        user: "Remy Sharp",
        avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
        img: "https://images.pexels.com/photos/7319337/pexels-photo-7319337.jpeg?auto=compress&cs=tinysrgb&w=500",
        time: "2h ago",
    },
    {
        id: 2,
        user: "Travis Howard",
        avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150",
        img: "https://images.pexels.com/photos/7363671/pexels-photo-7363671.jpeg?auto=compress&cs=tinysrgb&w=500",
        time: "4h ago",
    },
    {
        id: 3,
        user: "Cindy Baker",
        avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
        img: "https://images.pexels.com/photos/7245535/pexels-photo-7245535.jpeg?auto=compress&cs=tinysrgb&w=500",
        time: "6h ago",
    },
    {
        id: 4,
        user: "Sarah Jenkins",
        avatar: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=150",
        img: "https://images.pexels.com/photos/7078467/pexels-photo-7078467.jpeg?auto=compress&cs=tinysrgb&w=500",
        time: "8h ago",
    },
    {
        id: 5,
        user: "Agnes Walker",
        avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
        img: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=500",
        time: "12h ago",
    },
];

const Stories = () => {
    const classes = useStyles();
    const [stories, setStories] = useState(initialStories);
    const [activeStory, setActiveStory] = useState(null);
    const [createStoryOpen, setCreateStoryOpen] = useState(false);
    const [storyText, setStoryText] = useState("");
    const [reactions, setReactions] = useState({});

    const handleCreateStory = (e) => {
        e.preventDefault();
        const newStory = {
            id: Date.now(),
            user: "You",
            avatar: "https://images.pexels.com/photos/8647814/pexels-photo-8647814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
            img: "https://images.pexels.com/photos/7833646/pexels-photo-7833646.jpeg?auto=compress&cs=tinysrgb&w=500",
            time: "Just now",
        };
        setStories([newStory, ...stories]);
        setStoryText("");
        setCreateStoryOpen(false);
    };

    const addReaction = (storyId, emoji) => {
        setReactions((prev) => ({
            ...prev,
            [storyId]: (prev[storyId] || 0) + 1,
        }));
    };

    return (
        <>
            <Paper className={classes.storiesWrapper} elevation={2}>
                <Typography variant="subtitle2" style={{ fontWeight: "bold", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                    ✨ Highlights & Stories
                </Typography>
                
                <Box className={classes.container}>
                    {/* Add Story Button */}
                    <div className={classes.storyItem} onClick={() => setCreateStoryOpen(true)}>
                        <div className={classes.addRing}>
                            <Avatar className={classes.addAvatar}>
                                <Add />
                            </Avatar>
                        </div>
                        <Typography className={classes.userName} style={{ color: "#3f51b5", fontWeight: "bold" }}>
                            Add Story
                        </Typography>
                    </div>

                    {/* Friends Stories */}
                    {stories.map((story) => (
                        <div key={story.id} className={classes.storyItem} onClick={() => setActiveStory(story)}>
                            <div className={classes.ringGradient}>
                                <Avatar src={story.avatar} className={classes.avatar} />
                            </div>
                            <Typography className={classes.userName}>
                                {story.user}
                            </Typography>
                        </div>
                    ))}
                </Box>
            </Paper>

            {/* Story Viewer Lightbox */}
            <Dialog open={Boolean(activeStory)} onClose={() => setActiveStory(null)} maxWidth="xs" fullWidth disableRestoreFocus>
                {activeStory && (
                    <DialogContent style={{ padding: 0, position: "relative", backgroundColor: "#000", borderRadius: 8 }}>
                        <IconButton
                            style={{ position: "absolute", top: 8, right: 8, color: "white", zIndex: 10, backgroundColor: "rgba(0,0,0,0.4)" }}
                            onClick={() => setActiveStory(null)}
                        >
                            <Close />
                        </IconButton>
                        <div style={{ padding: 16, position: "absolute", top: 0, left: 0, zIndex: 5, width: "100%", color: "white", background: "linear-gradient(rgba(0,0,0,0.8), transparent)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <Avatar src={activeStory.avatar} />
                                <Box>
                                    <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
                                        {activeStory.user}
                                    </Typography>
                                    <Typography variant="caption">{activeStory.time}</Typography>
                                </Box>
                            </div>
                        </div>
                        <img
                            src={activeStory.img}
                            alt={activeStory.user}
                            style={{ width: "100%", height: 420, objectFit: "cover" }}
                        />
                        <div style={{ padding: 16, position: "absolute", bottom: 0, left: 0, width: "100%", background: "linear-gradient(transparent, rgba(0,0,0,0.8))" }}>
                            <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
                                <Chip icon={<Favorite style={{ color: "#f50057" }} />} label={`Like ${reactions[activeStory.id] || ""}`} onClick={() => addReaction(activeStory.id, "❤️")} style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "white" }} />
                                <Chip icon={<ThumbUp style={{ color: "#2196f3" }} />} label="Awesome" onClick={() => addReaction(activeStory.id, "👍")} style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "white" }} />
                            </div>
                        </div>
                    </DialogContent>
                )}
            </Dialog>

            {/* Create Story Dialog */}
            <Dialog open={createStoryOpen} onClose={() => setCreateStoryOpen(false)} disableRestoreFocus maxWidth="xs" fullWidth>
                <form onSubmit={handleCreateStory}>
                    <Box padding={3}>
                        <Typography variant="h6" gutterBottom>
                            Create a New Story
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            minRows={3}
                            variant="outlined"
                            placeholder="What's on your mind today?"
                            value={storyText}
                            onChange={(e) => setStoryText(e.target.value)}
                            style={{ marginBottom: 16 }}
                        />
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                            <Button onClick={() => setCreateStoryOpen(false)}>Cancel</Button>
                            <Button type="submit" variant="contained" color="primary">
                                Share Story
                            </Button>
                        </div>
                    </Box>
                </form>
            </Dialog>
        </>
    );
};

export default Stories;
