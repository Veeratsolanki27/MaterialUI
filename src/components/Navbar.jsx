import {
    alpha,
    AppBar,
    Avatar,
    Badge,
    InputBase,
    makeStyles,
    Toolbar,
    Typography,
    Menu,
    MenuItem,
    IconButton,
    Divider,
} from "@material-ui/core";
import { Cancel, Mail, Notifications, Search, Person, Settings, ExitToApp } from "@material-ui/icons";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
    logoLg: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
        cursor: "pointer",
    },
    logoSm: {
        display: "block",
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
        cursor: "pointer",
    },
    search: {
        display: "flex",
        alignItems: "center",
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        borderRadius: theme.shape.borderRadius,
        width: "50%",
        [theme.breakpoints.down("sm")]: {
            display: (props) => (props.open ? "flex" : "none"),
            width: "70%",
        },
    },
    searchIcon: {
        marginLeft: theme.spacing(1),
    },
    input: {
        color: "white",
        marginLeft: theme.spacing(1),
        width: "100%",
    },
    cancel: {
        cursor: "pointer",
        marginRight: theme.spacing(1),
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    searchButton: {
        marginRight: theme.spacing(2),
        cursor: "pointer",
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    icons: {
        alignItems: "center",
        display: (props) => (props.open ? "none" : "flex"),
    },
    iconButton: {
        color: "white",
        marginRight: theme.spacing(1),
    },
    avatar: {
        cursor: "pointer",
        width: theme.spacing(4.5),
        height: theme.spacing(4.5),
    },
}));

const Navbar = ({ userName = "Veerat Dev", userAvatar = "", searchQuery = "", setSearchQuery, onResetFilter, onSelectCategory, onOpenCommandPalette, onOpenNotifications }) => {
    const [open, setOpen] = useState(false);
    const [mailAnchor, setMailAnchor] = useState(null);
    const [notifAnchor, setNotifAnchor] = useState(null);
    const [profileAnchor, setProfileAnchor] = useState(null);
    const [mailCount, setMailCount] = useState(4);
    const [notifCount, setNotifCount] = useState(2);

    const classes = useStyles({ open });

    const handleClearSearch = () => {
        if (setSearchQuery) setSearchQuery("");
        setOpen(false);
    };

    return (
        <AppBar position="fixed">
            <Toolbar className={classes.toolbar}>
                <Typography
                    variant="h6"
                    className={classes.logoLg}
                    onClick={() => {
                        handleClearSearch();
                        if (onResetFilter) onResetFilter();
                    }}
                >
                    {userName || "Veerat Dev"}
                </Typography>
                <Typography
                    variant="h6"
                    className={classes.logoSm}
                    onClick={() => {
                        handleClearSearch();
                        if (onResetFilter) onResetFilter();
                    }}
                >
                    {(userName ? userName.split(" ")[0] : "VEERAT").toUpperCase()}
                </Typography>
                <div className={classes.search}>
                    <Search className={classes.searchIcon} onClick={() => onOpenCommandPalette && onOpenCommandPalette()} style={{ cursor: "pointer" }} />
                    <InputBase
                        placeholder="Search posts, tools, or press Ctrl+K..."
                        className={classes.input}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                        onFocus={() => onOpenCommandPalette && onOpenCommandPalette()}
                    />
                    {searchQuery ? (
                        <Cancel className={classes.cancel} onClick={handleClearSearch} style={{ display: "block" }} />
                    ) : (
                        <Cancel className={classes.cancel} onClick={() => setOpen(false)} />
                    )}
                </div>
                <div className={classes.icons}>
                    <Search className={classes.searchButton} onClick={() => onOpenCommandPalette ? onOpenCommandPalette() : setOpen(true)} />

                    {/* Mail Icon with Dropdown Menu */}
                    <IconButton className={classes.iconButton} onClick={(e) => setMailAnchor(e.currentTarget)}>
                        <Badge badgeContent={mailCount} color="secondary" overlap="rectangular">
                            <Mail />
                        </Badge>
                    </IconButton>
                    <Menu
                        anchorEl={mailAnchor}
                        keepMounted
                        open={Boolean(mailAnchor)}
                        onClose={() => setMailAnchor(null)}
                    >
                        <MenuItem onClick={() => setMailCount(0)}>
                            <strong>Messages ({mailCount})</strong>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={() => setMailAnchor(null)}>John: Hey! Nice post design.</MenuItem>
                        <MenuItem onClick={() => setMailAnchor(null)}>Sarah: Are we meeting today?</MenuItem>
                        <MenuItem onClick={() => setMailAnchor(null)}>Alex: Loved your recipe post!</MenuItem>
                        <Divider />
                        <MenuItem onClick={() => { setMailCount(0); setMailAnchor(null); }}>
                            Mark all as read
                        </MenuItem>
                    </Menu>

                    {/* Notifications Icon with Dropdown Menu / Drawer */}
                    <IconButton className={classes.iconButton} onClick={(e) => onOpenNotifications ? onOpenNotifications() : setNotifAnchor(e.currentTarget)}>
                        <Badge badgeContent={notifCount} color="secondary" overlap="rectangular">
                            <Notifications />
                        </Badge>
                    </IconButton>
                    <Menu
                        anchorEl={notifAnchor}
                        keepMounted
                        open={Boolean(notifAnchor)}
                        onClose={() => setNotifAnchor(null)}
                    >
                        <MenuItem onClick={() => setNotifCount(0)}>
                            <strong>Notifications ({notifCount})</strong>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={() => setNotifAnchor(null)}>❤️ Alex liked your post</MenuItem>
                        <MenuItem onClick={() => setNotifAnchor(null)}>💬 New comment on London guide</MenuItem>
                        <Divider />
                        <MenuItem onClick={() => { setNotifCount(0); setNotifAnchor(null); }}>
                            Clear notifications
                        </MenuItem>
                    </Menu>

                    {/* User Avatar with Profile Menu */}
                    <Avatar
                        alt={userName}
                        src={userAvatar || "https://images.pexels.com/photos/8647814/pexels-photo-8647814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"}
                        className={classes.avatar}
                        onClick={(e) => setProfileAnchor(e.currentTarget)}
                    />
                    <Menu
                        anchorEl={profileAnchor}
                        keepMounted
                        open={Boolean(profileAnchor)}
                        onClose={() => setProfileAnchor(null)}
                    >
                        <MenuItem onClick={() => { setProfileAnchor(null); onSelectCategory && onSelectCategory("Settings"); }}>
                            <Person style={{ marginRight: 10 }} /> My Profile
                        </MenuItem>
                        <MenuItem onClick={() => { setProfileAnchor(null); onSelectCategory && onSelectCategory("Settings"); }}>
                            <Settings style={{ marginRight: 10 }} /> Settings
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={() => { setProfileAnchor(null); onSelectCategory && onSelectCategory("Logout"); }}>
                            <ExitToApp style={{ marginRight: 10 }} /> Logout
                        </MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;