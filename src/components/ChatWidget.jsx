import {
    Avatar,
    Badge,
    Box,
    Button,
    Fab,
    IconButton,
    InputBase,
    Paper,
    Typography,
    Chip,
} from "@material-ui/core";
import { Chat, Close, Send } from "@material-ui/icons";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    fab: {
        position: "fixed",
        bottom: 20,
        right: 90,
        zIndex: 1100,
        backgroundColor: theme.palette.secondary.main,
        color: "white",
        "&:hover": {
            backgroundColor: theme.palette.secondary.dark,
        },
        [theme.breakpoints.down("xs")]: {
            bottom: 72,
            right: 80,
        },
    },
    chatWindow: {
        position: "fixed",
        bottom: 85,
        right: 20,
        width: 330,
        height: 420,
        zIndex: 1200,
        borderRadius: 16,
        boxShadow: theme.shadows[10],
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        [theme.breakpoints.down("xs")]: {
            width: "90vw",
            right: 16,
            bottom: 135,
        },
    },
    header: {
        padding: "10px 16px",
        backgroundColor: theme.palette.primary.main,
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    messageList: {
        flexGrow: 1,
        overflowY: "auto",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 12,
    },
    myBubble: {
        alignSelf: "flex-end",
        backgroundColor: theme.palette.primary.main,
        color: "white",
        padding: "8px 14px",
        borderRadius: "16px 16px 2px 16px",
        maxWidth: "80%",
        wordBreak: "break-word",
    },
    theirBubble: {
        alignSelf: "flex-start",
        backgroundColor: theme.palette.action.hover,
        color: theme.palette.text.primary,
        padding: "8px 14px",
        borderRadius: "16px 16px 16px 2px",
        maxWidth: "80%",
        wordBreak: "break-word",
    },
    inputArea: {
        padding: "8px 16px",
        display: "flex",
        alignItems: "center",
        borderTop: `1px solid ${theme.palette.divider}`,
    },
}));

import { makeStyles } from "@material-ui/core/styles";

const friendsList = [
    { id: 1, name: "Remy Sharp", avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150", online: true },
    { id: 2, name: "Travis Howard", avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150", online: true },
    { id: 3, name: "Cindy Baker", avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150", online: false },
];

const ChatWidget = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [selectedFriendId, setSelectedFriendId] = useState(1);
    const [inputMsg, setInputMsg] = useState("");
    const [unreadCount, setUnreadCount] = useState(2);
    const [chatLogs, setChatLogs] = useState({
        1: [
            { sender: "them", text: "Hey! How is the web application looking?" },
            { sender: "me", text: "Looking awesome! All features are interactive now." },
        ],
        2: [{ sender: "them", text: "Let's test the messenger chat widget!" }],
        3: [{ sender: "them", text: "Catch you later today!" }],
    });

    const activeFriend = friendsList.find((f) => f.id === selectedFriendId) || friendsList[0];
    const activeMessages = chatLogs[activeFriend.id] || [];

    const handleSend = (e) => {
        if (e) e.preventDefault();
        const trimmed = inputMsg.trim();
        if (!trimmed) return;

        const friendId = activeFriend.id;
        const currentLogs = chatLogs[friendId] || [];
        const newLogs = [...currentLogs, { sender: "me", text: trimmed }];

        setChatLogs({ ...chatLogs, [friendId]: newLogs });
        setInputMsg("");
    };

    return (
        <>
            {/* Floating Chat Launcher Button */}
            <Fab
                className={classes.fab}
                onClick={() => {
                    setOpen(!open);
                    setUnreadCount(0);
                }}
            >
                <Badge badgeContent={unreadCount} color="error" overlap="rectangular">
                    <Chat />
                </Badge>
            </Fab>

            {/* Messenger Popover Window */}
            {open && (
                <Paper className={classes.chatWindow} elevation={8}>
                    <div className={classes.header}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <Avatar src={activeFriend.avatar} style={{ width: 28, height: 28 }} />
                            <Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
                                {activeFriend.name}
                            </Typography>
                        </div>
                        <IconButton size="small" style={{ color: "white" }} onClick={() => setOpen(false)}>
                            <Close fontSize="small" />
                        </IconButton>
                    </div>

                    {/* Friend selector chips */}
                    <div style={{ display: "flex", gap: 8, padding: 8, overflowX: "auto", borderBottom: "1px solid rgba(150,150,150,0.2)" }}>
                        {friendsList.map((f) => (
                            <Chip
                                key={f.id}
                                avatar={<Avatar src={f.avatar} />}
                                label={f.name.split(" ")[0]}
                                size="small"
                                color={activeFriend.id === f.id ? "primary" : "default"}
                                onClick={() => setSelectedFriendId(f.id)}
                                style={{ cursor: "pointer" }}
                            />
                        ))}
                    </div>

                    {/* Messages Body */}
                    <div className={classes.messageList}>
                        {activeMessages.map((m, i) => (
                            <div key={i} className={m.sender === "me" ? classes.myBubble : classes.theirBubble}>
                                <Typography variant="body2">{m.text}</Typography>
                            </div>
                        ))}
                    </div>

                    {/* Quick Input Bar */}
                    <form onSubmit={handleSend} className={classes.inputArea}>
                        <InputBase
                            fullWidth
                            placeholder="Type a message..."
                            value={inputMsg}
                            onChange={(e) => setInputMsg(e.target.value)}
                        />
                        <IconButton type="submit" color="primary">
                            <Send />
                        </IconButton>
                    </form>
                </Paper>
            )}
        </>
    );
};

export default ChatWidget;
