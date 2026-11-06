import {
    Button,
    Container,
    Fab,
    FormControlLabel,
    FormLabel,
    makeStyles,
    MenuItem,
    Modal,
    Radio,
    RadioGroup,
    TextField,
    Tooltip,
    Snackbar,
} from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    fab: {
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 1100,
        [theme.breakpoints.down("xs")]: {
            bottom: 72,
            right: 16,
        },
    },
    container: {
        width: 500,
        maxWidth: "92vw",
        maxHeight: "88vh",
        overflowY: "auto",
        backgroundColor: "white",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: "auto",
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[5],
        [theme.breakpoints.down("sm")]: {
            width: "95vw",
            maxHeight: "90vh",
        },
    },
    form: {
        padding: theme.spacing(2),
    },
    item: {
        marginBottom: theme.spacing(3),
    },
    inputFullWidth: {
        width: "100%",
    },
    createButton: {
        marginRight: theme.spacing(2.5),
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const defaultImages = [
    "https://images.pexels.com/photos/7319337/pexels-photo-7319337.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    "https://images.pexels.com/photos/7363671/pexels-photo-7363671.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    "https://images.pexels.com/photos/7245535/pexels-photo-7245535.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    "https://images.pexels.com/photos/7245477/pexels-photo-7245477.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
];

const Add = ({ onAddPost }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);

    // Form inputs state
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("Homepage");
    const [visibility, setVisibility] = useState("Public");
    const [commenting, setCommenting] = useState("Everybody");
    const [customImage, setCustomImage] = useState(null);

    const handlePostImageUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            setCustomImage(url);
        }
    };

    const handleCreate = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        const randomImg = defaultImages[Math.floor(Math.random() * defaultImages.length)];
        const newPost = {
            id: Date.now(),
            title: title.trim(),
            desc: desc.trim() || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam consectetur earum est.",
            img: customImage || randomImg,
            likes: 0,
            isLiked: false,
            category: category,
        };

        if (onAddPost) {
            onAddPost(newPost);
        }

        // Reset form & show alert
        setTitle("");
        setDesc("");
        setCustomImage(null);
        setVisibility("Public");
        setCommenting("Everybody");
        setOpen(false);
        setOpenAlert(true);
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenAlert(false);
    };

    return (
        <>
            <Tooltip title="Add Post" aria-label="add" onClick={() => setOpen(true)}>
                <Fab color="primary" className={classes.fab}>
                    <AddIcon />
                </Fab>
            </Tooltip>
            <Modal open={open} onClose={() => setOpen(false)} disableRestoreFocus>
                <Container className={classes.container}>
                    <form className={classes.form} autoComplete="off" onSubmit={handleCreate}>
                        <div className={classes.item}>
                            <TextField
                                id="standard-basic"
                                label="Title"
                                size="small"
                                required
                                className={classes.inputFullWidth}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className={classes.item}>
                            <TextField
                                id="outlined-multiline-static"
                                multiline
                                minRows={4}
                                placeholder="Tell your story..."
                                label="Description"
                                size="small"
                                className={classes.inputFullWidth}
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </div>
                        <div className={classes.item} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            <input
                                type="file"
                                accept="image/*"
                                id="post-cover-upload"
                                style={{ display: "none" }}
                                onChange={handlePostImageUpload}
                            />
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => document.getElementById("post-cover-upload").click()}
                            >
                                {customImage ? "📸 Change Post Cover Image" : "📷 Upload Post Image"}
                            </Button>
                            {customImage && (
                                <img
                                    src={customImage}
                                    alt="Post Cover Preview"
                                    style={{ width: "100%", maxHeight: 180, objectFit: "cover", borderRadius: 8 }}
                                />
                            )}
                        </div>
                        <div className={classes.item}>
                            <TextField
                                select
                                label="Category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                style={{ marginRight: 16 }}
                            >
                                <MenuItem value="Homepage">Homepage</MenuItem>
                                <MenuItem value="Food">Food</MenuItem>
                                <MenuItem value="Sport">Sport</MenuItem>
                                <MenuItem value="Life">Life</MenuItem>
                                <MenuItem value="Science">Science</MenuItem>
                                <MenuItem value="Camera">Camera</MenuItem>
                            </TextField>
                            <TextField
                                select
                                label="Visibility"
                                value={visibility}
                                onChange={(e) => setVisibility(e.target.value)}
                            >
                                <MenuItem value="Public">Public</MenuItem>
                                <MenuItem value="Private">Private</MenuItem>
                                <MenuItem value="Unlisted">Unlisted</MenuItem>
                            </TextField>
                        </div>
                        <div className={classes.item}>
                            <FormLabel component="legend">Who can comment?</FormLabel>
                            <RadioGroup value={commenting} onChange={(e) => setCommenting(e.target.value)}>
                                <FormControlLabel
                                    value="Everybody"
                                    control={<Radio size="small" />}
                                    label="Everybody"
                                />
                                <FormControlLabel
                                    value="My Friends"
                                    control={<Radio size="small" />}
                                    label="My Friends"
                                />
                                <FormControlLabel
                                    value="Nobody"
                                    control={<Radio size="small" />}
                                    label="Nobody"
                                />
                            </RadioGroup>
                        </div>
                        <div className={classes.item}>
                            <Button
                                type="submit"
                                variant="outlined"
                                color="primary"
                                className={classes.createButton}
                            >
                                Create
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Container>
            </Modal>
            <Snackbar
                open={openAlert}
                autoHideDuration={4000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                <Alert onClose={handleCloseAlert} severity="success">
                    Post created successfully!
                </Alert>
            </Snackbar>
        </>
    );
};

export default Add;