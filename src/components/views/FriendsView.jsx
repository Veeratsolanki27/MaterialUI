import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    InputAdornment,
    makeStyles,
    Paper,
    Tab,
    Tabs,
    TextField,
    Typography,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@material-ui/core";
import { Search, PersonAdd, Message, Check } from "@material-ui/icons";
import { useState } from "react";
import ProfileModal from "../ProfileModal";

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(6),
    },
    header: {
        marginBottom: theme.spacing(3),
    },
    searchBar: {
        marginBottom: theme.spacing(3),
    },
    friendCard: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(2),
        height: "100%",
    },
    avatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        marginRight: theme.spacing(2),
        cursor: "pointer",
    },
    friendInfo: {
        flexGrow: 1,
    },
    statusBadge: {
        width: 10,
        height: 10,
        borderRadius: "50%",
        display: "inline-block",
        marginRight: theme.spacing(0.5),
    },
    online: {
        backgroundColor: "#4caf50",
    },
    offline: {
        backgroundColor: "#9e9e9e",
    },
    actionButtons: {
        display: "flex",
        gap: theme.spacing(1),
    },
    clickableName: {
        cursor: "pointer",
        "&:hover": {
            textDecoration: "underline",
        },
    },
}));

const initialFriends = [
    { id: 1, name: "Remy Sharp", title: "Senior Software Engineer", avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150", online: true, mutual: 14, status: "friend" },
    { id: 2, name: "Travis Howard", title: "UI/UX Designer", avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150", online: true, mutual: 8, status: "friend" },
    { id: 3, name: "Cindy Baker", title: "Product Manager", avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150", online: false, mutual: 23, status: "friend" },
    { id: 4, name: "Agnes Walker", title: "Frontend Developer", avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150", online: true, mutual: 5, status: "pending" },
    { id: 5, name: "Trevor Henderson", title: "Data Scientist", avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150", online: false, mutual: 2, status: "suggested" },
    { id: 6, name: "Sarah Jenkins", title: "Digital Marketer", avatar: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=150", online: true, mutual: 19, status: "friend" },
];

const FriendsView = () => {
    const classes = useStyles();
    const [friends, setFriends] = useState(initialFriends);
    const [tab, setTab] = useState(0);
    const [search, setSearch] = useState("");
    const [chatFriend, setChatFriend] = useState(null);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [chatMsg, setChatMsg] = useState("");
    const [messages, setMessages] = useState([]);

    const toggleFriendStatus = (id) => {
        setFriends(
            friends.map((f) => {
                if (f.id === id) {
                    return {
                        ...f,
                        status: f.status === "friend" ? "suggested" : "friend",
                    };
                }
                return f;
            })
        );
    };

    const filtered = friends.filter((f) => {
        const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase()) || f.title.toLowerCase().includes(search.toLowerCase());
        if (tab === 0) return matchesSearch && f.status === "friend";
        if (tab === 1) return matchesSearch && f.status === "friend" && f.online;
        if (tab === 2) return matchesSearch && (f.status === "pending" || f.status === "suggested");
        return matchesSearch;
    });

    const handleSendChat = (e) => {
        e.preventDefault();
        if (!chatMsg.trim()) return;
        setMessages([...messages, { text: chatMsg, sender: "me", time: "Just now" }]);
        setChatMsg("");
    };

    return (
        <Container className={classes.container}>
            <Box className={classes.header}>
                <Typography variant="h4" gutterBottom>
                    Friends & Network
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Connect with colleagues, friends, and collaborators.
                </Typography>
            </Box>

            <TextField
                className={classes.searchBar}
                fullWidth
                variant="outlined"
                placeholder="Search friends by name or role..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search color="action" />
                        </InputAdornment>
                    ),
                }}
            />

            <Paper style={{ marginBottom: 24 }}>
                <Tabs value={tab} onChange={(e, val) => setTab(val)} indicatorColor="primary" textColor="primary" centered>
                    <Tab label={`All Friends (${friends.filter((f) => f.status === "friend").length})`} />
                    <Tab label={`Online (${friends.filter((f) => f.status === "friend" && f.online).length})`} />
                    <Tab label={`Suggestions & Requests (${friends.filter((f) => f.status !== "friend").length})`} />
                </Tabs>
            </Paper>

            <Grid container spacing={3}>
                {filtered.map((friend) => (
                    <Grid item xs={12} sm={6} key={friend.id}>
                        <Card elevation={2}>
                            <CardContent className={classes.friendCard}>
                                <Avatar src={friend.avatar} className={classes.avatar} onClick={() => setSelectedProfile(friend)} />
                                <Box className={classes.friendInfo}>
                                    <Typography variant="h6" className={classes.clickableName} onClick={() => setSelectedProfile(friend)}>{friend.name}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {friend.title}
                                    </Typography>
                                    <Box display="flex" alignItems="center" marginTop={0.5}>
                                        <span className={`${classes.statusBadge} ${friend.online ? classes.online : classes.offline}`} />
                                        <Typography variant="caption" color="textSecondary">
                                            {friend.online ? "Online" : "Offline"} • {friend.mutual} mutual friends
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box className={classes.actionButtons}>
                                    {friend.status === "friend" ? (
                                        <>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                startIcon={<Message />}
                                                onClick={() => {
                                                    setChatFriend(friend);
                                                    setMessages([
                                                        { text: `Hey ${friend.name.split(" ")[0]}, how are you doing?`, sender: "them", time: "10:30 AM" },
                                                    ]);
                                                }}
                                            >
                                                Chat
                                            </Button>
                                            <Button variant="outlined" color="secondary" size="small" onClick={() => toggleFriendStatus(friend.id)}>
                                                Remove
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            startIcon={<PersonAdd />}
                                            onClick={() => toggleFriendStatus(friend.id)}
                                        >
                                            Add Friend
                                        </Button>
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Chat Dialog */}
            <Dialog open={Boolean(chatFriend)} onClose={() => setChatFriend(null)} fullWidth maxWidth="xs" disableRestoreFocus>
                {chatFriend && (
                    <>
                        <DialogTitle>
                            <Box display="flex" alignItems="center">
                                <Avatar src={chatFriend.avatar} style={{ marginRight: 12 }} />
                                <Box>
                                    <Typography variant="h6">{chatFriend.name}</Typography>
                                    <Typography variant="caption" color="textSecondary">
                                        {chatFriend.online ? "Active Now" : "Offline"}
                                    </Typography>
                                </Box>
                            </Box>
                        </DialogTitle>
                        <DialogContent dividers style={{ height: 300, overflowY: "auto" }}>
                            {messages.map((m, i) => (
                                <Box
                                    key={i}
                                    display="flex"
                                    justifyContent={m.sender === "me" ? "flex-end" : "flex-start"}
                                    marginBottom={1.5}
                                >
                                    <Paper
                                        style={{
                                            padding: "8px 14px",
                                            backgroundColor: m.sender === "me" ? "#3f51b5" : "#e0e0e0",
                                            color: m.sender === "me" ? "white" : "black",
                                            borderRadius: 16,
                                            maxWidth: "75%",
                                        }}
                                    >
                                        <Typography variant="body2">{m.text}</Typography>
                                    </Paper>
                                </Box>
                            ))}
                        </DialogContent>
                        <DialogActions style={{ padding: 12 }}>
                            <form onSubmit={handleSendChat} style={{ display: "flex", width: "100%", gap: 8 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    placeholder="Write a message..."
                                    value={chatMsg}
                                    onChange={(e) => setChatMsg(e.target.value)}
                                />
                                <Button type="submit" variant="contained" color="primary">
                                    Send
                                </Button>
                            </form>
                        </DialogActions>
                    </>
                )}
            </Dialog>

            {/* Profile Lightbox Modal */}
            <ProfileModal
                open={Boolean(selectedProfile)}
                onClose={() => setSelectedProfile(null)}
                user={selectedProfile}
            />
        </Container>
    );
};

export default FriendsView;
