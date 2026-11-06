import {
    Avatar,
    Box,
    Button,
    Chip,
    Dialog,
    DialogContent,
    Grid,
    IconButton,
    makeStyles,
    Typography,
} from "@material-ui/core";
import { Close, Message, PersonAdd, Share, CheckCircle } from "@material-ui/icons";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    dialogContent: {
        padding: 0,
        overflow: "hidden",
        position: "relative",
    },
    coverImage: {
        height: 140,
        width: "100%",
        objectFit: "cover",
        backgroundColor: theme.palette.primary.main,
    },
    avatarWrapper: {
        position: "absolute",
        top: 85,
        left: 24,
    },
    avatar: {
        width: 84,
        height: 84,
        border: "4px solid white",
        boxShadow: theme.shadows[4],
    },
    profileBody: {
        padding: theme.spacing(6, 3, 3, 3),
    },
    statItem: {
        textAlign: "center",
    },
}));

const ProfileModal = ({ open, onClose, user }) => {
    const classes = useStyles();
    const [following, setFollowing] = useState(false);

    if (!user) return null;

    const defaultCover = "https://images.pexels.com/photos/7319337/pexels-photo-7319337.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500";

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth disableRestoreFocus>
            <DialogContent className={classes.dialogContent}>
                <IconButton
                    style={{ position: "absolute", top: 8, right: 8, color: "white", backgroundColor: "rgba(0,0,0,0.4)", zIndex: 10 }}
                    onClick={onClose}
                >
                    <Close fontSize="small" />
                </IconButton>
                
                <img src={user.cover || defaultCover} alt="Cover" className={classes.coverImage} />
                
                <div className={classes.avatarWrapper}>
                    <Avatar src={user.avatar} className={classes.avatar} />
                </div>

                <div className={classes.profileBody}>
                    <Typography variant="h6" style={{ fontWeight: "bold" }}>
                        {user.name}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" gutterBottom display="block">
                        {user.role || "@developer"} • Joined March 2026
                    </Typography>
                    
                    <Typography variant="body2" color="textSecondary" paragraph style={{ marginTop: 8 }}>
                        {user.bio || "Passionate about Web Development, Material-UI design systems, and responsive user experiences."}
                    </Typography>

                    <Grid container spacing={2} style={{ margin: "16px 0", borderTop: "1px solid #eee", borderBottom: "1px solid #eee", padding: "12px 0" }}>
                        <Grid item xs={4} className={classes.statItem}>
                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>1.2k</Typography>
                            <Typography variant="caption" color="textSecondary">Followers</Typography>
                        </Grid>
                        <Grid item xs={4} className={classes.statItem}>
                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>480</Typography>
                            <Typography variant="caption" color="textSecondary">Following</Typography>
                        </Grid>
                        <Grid item xs={4} className={classes.statItem}>
                            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>34</Typography>
                            <Typography variant="caption" color="textSecondary">Posts</Typography>
                        </Grid>
                    </Grid>

                    <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
                        <Button
                            variant={following ? "outlined" : "contained"}
                            color="primary"
                            startIcon={following ? <CheckCircle /> : <PersonAdd />}
                            onClick={() => setFollowing(!following)}
                            size="small"
                        >
                            {following ? "Following" : "Follow"}
                        </Button>
                        <Button variant="outlined" color="primary" startIcon={<Message />} size="small" onClick={onClose}>
                            Message
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProfileModal;
