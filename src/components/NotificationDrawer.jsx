import {
    Avatar,
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Typography,
    Chip,
} from "@material-ui/core";
import { Close, Favorite, Comment, PersonAdd, Notifications, DeleteSweep } from "@material-ui/icons";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        width: 340,
        [theme.breakpoints.down("xs")]: {
            width: "100%",
        },
    },
    header: {
        padding: theme.spacing(2),
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: theme.palette.primary.main,
        color: "white",
    },
}));

const initialNotifications = [
    { id: 1, type: "like", user: "Remy Sharp", text: "liked your post 'Material-UI Project Setup'", time: "5m ago", read: false, icon: Favorite, color: "#f50057" },
    { id: 2, type: "comment", user: "Travis Howard", text: "commented: 'Great work on the responsive layout!'", time: "25m ago", read: false, icon: Comment, color: "#2196f3" },
    { id: 3, type: "friend", user: "Sarah Jenkins", text: "sent you a friend request", time: "1h ago", read: true, icon: PersonAdd, color: "#4caf50" },
    { id: 4, type: "system", user: "System", text: "Your profile stats have been updated for August", time: "3h ago", read: true, icon: Notifications, color: "#ff9800" },
];

const NotificationDrawer = ({ open, onClose }) => {
    const classes = useStyles();
    const [notifs, setNotifs] = useState(initialNotifications);

    const markAllRead = () => {
        setNotifs(notifs.map((n) => ({ ...n, read: true })));
    };

    const clearAll = () => {
        setNotifs([]);
    };

    return (
        <Drawer anchor="right" open={open} onClose={onClose} classes={{ paper: classes.drawerPaper }}>
            <Box className={classes.header}>
                <Typography variant="h6" style={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: 8 }}>
                    <Notifications /> Notifications
                </Typography>
                <IconButton size="small" style={{ color: "white" }} onClick={onClose}>
                    <Close />
                </IconButton>
            </Box>

            <Box padding={1.5} display="flex" justifyContent="space-between" alignItems="center" bgcolor="#f5f5f5">
                <Button size="small" color="primary" onClick={markAllRead}>
                    Mark all read
                </Button>
                <Button size="small" color="secondary" startIcon={<DeleteSweep />} onClick={clearAll}>
                    Clear
                </Button>
            </Box>

            <Divider />

            <List disablePadding>
                {notifs.length > 0 ? (
                    notifs.map((n) => {
                        const IconComp = n.icon;
                        return (
                            <ListItem key={n.id} button divider style={{ backgroundColor: n.read ? "transparent" : "rgba(63,81,181,0.06)" }}>
                                <ListItemIcon>
                                    <Avatar style={{ backgroundColor: n.color, width: 36, height: 36 }}>
                                        <IconComp fontSize="small" style={{ color: "white" }} />
                                    </Avatar>
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography variant="body2" style={{ fontWeight: n.read ? "normal" : "bold" }}>
                                            {n.user} {n.text}
                                        </Typography>
                                    }
                                    secondary={<Typography variant="caption" color="textSecondary">{n.time}</Typography>}
                                />
                            </ListItem>
                        );
                    })
                ) : (
                    <Box padding={4} textAlign="center">
                        <Typography color="textSecondary">No notifications right now.</Typography>
                    </Box>
                )}
            </List>
        </Drawer>
    );
};

export default NotificationDrawer;
