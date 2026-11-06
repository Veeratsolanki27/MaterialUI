import {
    Avatar,
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Collapse,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles,
    Snackbar,
    TextField,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@material-ui/core";
import {
    Favorite,
    FavoriteBorder,
    Share,
    Delete,
    Bookmark,
    BookmarkBorder,
    ChatBubbleOutline,
    Send,
} from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    card: {
        marginBottom: theme.spacing(4),
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[3],
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
            boxShadow: theme.shadows[6],
        },
    },
    media: {
        height: 250,
        [theme.breakpoints.down("sm")]: {
            height: 160,
        },
    },
    actions: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: theme.spacing(1),
        padding: theme.spacing(1, 2),
    },
    commentSection: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.default,
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const initialComments = [
    { id: 1, name: "Remy Sharp", text: "Awesome post! Thanks for sharing this layout code.", time: "1h ago", avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150" },
    { id: 2, name: "Travis Howard", text: "Material-UI components make web apps look super sleek!", time: "30m ago", avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150" },
];

const Post = ({ post, onLike, onDelete }) => {
    const classes = useStyles();
    const [bookmarked, setBookmarked] = useState(false);
    const [openShare, setOpenShare] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);
    const [bookmarkMsg, setBookmarkMsg] = useState("");

    // Comments State
    const [commentsExpanded, setCommentsExpanded] = useState(false);
    const [comments, setComments] = useState(initialComments);
    const [newComment, setNewComment] = useState("");

    const handleShare = () => {
        setOpenShare(true);
    };

    const handleToggleBookmark = () => {
        const next = !bookmarked;
        setBookmarked(next);
        setBookmarkMsg(next ? "Post saved to Collections!" : "Post removed from Collections.");
    };

    const handleAddComment = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const commentObj = {
            id: Date.now(),
            name: "Veerat Dev",
            text: newComment.trim(),
            time: "Just now",
            avatar: "https://images.pexels.com/photos/8647814/pexels-photo-8647814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        };

        setComments([...comments, commentObj]);
        setNewComment("");
    };

    return (
        <Card className={classes.card}>
            <CardActionArea onClick={() => setOpenDetails(true)}>
                <CardMedia className={classes.media} image={post.img} title={post.title} />
                <CardContent>
                    <Typography gutterBottom variant="h5">
                        {post.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {post.desc}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.actions}>
                <Box display="flex" alignItems="center">
                    <IconButton size="small" color="primary" onClick={handleShare}>
                        <Share fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="primary" onClick={() => setCommentsExpanded(!commentsExpanded)}>
                        <ChatBubbleOutline fontSize="small" />
                    </IconButton>
                    <Typography variant="caption" style={{ marginRight: 12 }}>
                        {comments.length}
                    </Typography>
                    <Button size="small" color="primary" onClick={() => setOpenDetails(true)}>
                        Learn More
                    </Button>
                </Box>
                <Box display="flex" alignItems="center">
                    <IconButton size="small" onClick={() => onLike(post.id)}>
                        {post.isLiked ? (
                            <Favorite style={{ color: "#f50057" }} fontSize="small" />
                        ) : (
                            <FavoriteBorder fontSize="small" />
                        )}
                    </IconButton>
                    <Typography variant="caption" style={{ marginRight: 12 }}>
                        {post.likes}
                    </Typography>
                    <IconButton size="small" onClick={handleToggleBookmark}>
                        {bookmarked ? (
                            <Bookmark color="primary" fontSize="small" />
                        ) : (
                            <BookmarkBorder fontSize="small" />
                        )}
                    </IconButton>
                    {onDelete && (
                        <IconButton size="small" color="secondary" onClick={() => onDelete(post.id)}>
                            <Delete fontSize="small" />
                        </IconButton>
                    )}
                </Box>
            </CardActions>

            {/* Expandable Comments Drawer */}
            <Collapse in={commentsExpanded} timeout="auto" unmountOnExit>
                <Divider />
                <Box className={classes.commentSection}>
                    <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 600 }}>
                        Comments ({comments.length})
                    </Typography>
                    <List disablePadding style={{ marginBottom: 16 }}>
                        {comments.map((c) => (
                            <ListItem key={c.id} alignItems="flex-start" style={{ paddingLeft: 0, paddingRight: 0 }}>
                                <ListItemAvatar style={{ minWidth: 40, marginRight: 8 }}>
                                    <Avatar src={c.avatar} style={{ width: 32, height: 32 }} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Box display="flex" justifyContent="space-between">
                                            <Typography variant="subtitle2">{c.name}</Typography>
                                            <Typography variant="caption" color="textSecondary">
                                                {c.time}
                                            </Typography>
                                        </Box>
                                    }
                                    secondary={c.text}
                                />
                            </ListItem>
                        ))}
                    </List>

                    <form onSubmit={handleAddComment} style={{ display: "flex", gap: 8 }}>
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            placeholder="Write a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <Button type="submit" variant="contained" color="primary" endIcon={<Send />}>
                            Post
                        </Button>
                    </form>
                </Box>
            </Collapse>

            {/* Learn More Details Dialog */}
            <Dialog open={openDetails} onClose={() => setOpenDetails(false)} disableRestoreFocus maxWidth="sm" fullWidth>
                <DialogTitle>{post.title}</DialogTitle>
                <DialogContent dividers>
                    <img src={post.img} alt={post.title} style={{ width: "100%", borderRadius: 8, marginBottom: 16 }} />
                    <Typography variant="body1" paragraph>
                        {post.desc}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        Category: {post.category || "General"} • {post.likes} Likes • {comments.length} Comments
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDetails(false)} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Share Notification Snackbar */}
            <Snackbar
                open={openShare}
                autoHideDuration={3000}
                onClose={() => setOpenShare(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                <Alert onClose={() => setOpenShare(false)} severity="info">
                    Post link copied to clipboard!
                </Alert>
            </Snackbar>

            {/* Bookmark Notification Snackbar */}
            <Snackbar
                open={Boolean(bookmarkMsg)}
                autoHideDuration={3000}
                onClose={() => setBookmarkMsg("")}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                <Alert onClose={() => setBookmarkMsg("")} severity="success">
                    {bookmarkMsg}
                </Alert>
            </Snackbar>
        </Card>
    );
};

export default Post;