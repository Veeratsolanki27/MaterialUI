import { makeStyles, Typography, Divider, Box, Chip } from "@material-ui/core";
import {
    Bookmark,
    List as ListIcon,
    ExitToApp,
    Home,
    Person,
    PhotoCamera,
    PlayCircleOutline,
    Settings,
    Storefront,
    TabletMac,
    Explore,
    HelpOutline,
    Star,
    Equalizer,
    Event,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    container: {
        height: "calc(100vh - 64px)",
        maxHeight: "calc(100vh - 64px)",
        position: "sticky",
        top: 64,
        overflowY: "auto",
        overflowX: "hidden",
        boxSizing: "border-box",
        paddingTop: theme.spacing(2.5),
        paddingBottom: theme.spacing(10),
        paddingLeft: theme.spacing(1.5),
        paddingRight: theme.spacing(1.5),
        backgroundColor: theme.palette.primary.main,
        color: "white",
        zIndex: 10,
        scrollBehavior: "smooth",
        WebkitOverflowScrolling: "touch",
        "&::-webkit-scrollbar": {
            width: "6px",
        },
        "&::-webkit-scrollbar-track": {
            background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.type === "dark" ? "rgba(255, 255, 255, 0.25)" : "rgba(0, 0, 0, 0.25)",
            borderRadius: "6px",
        },
        "&:hover::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.primary.main,
        },
        [theme.breakpoints.up("sm")]: {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            borderRight: `1px solid ${theme.palette.divider}`,
        },
    },
    sectionLabel: {
        fontSize: "0.75rem",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "1px",
        color: theme.palette.text.secondary,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        [theme.breakpoints.down("xs")]: {
            display: "none",
        },
    },
    item: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: theme.spacing(1),
        padding: theme.spacing(1.2, 1.5),
        borderRadius: 10,
        cursor: "pointer",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        userSelect: "none",
        "&:hover": {
            backgroundColor: theme.palette.action.hover,
            color: theme.palette.primary.main,
            transform: "translateX(4px)",
        },
    },
    itemLeft: {
        display: "flex",
        alignItems: "center",
    },
    activeItem: {
        backgroundColor: theme.palette.type === "dark" ? "rgba(63, 81, 181, 0.3)" : theme.palette.primary.main + "18",
        color: theme.palette.primary.main,
        fontWeight: "bold",
        boxShadow: `inset 3px 0 0 0 ${theme.palette.primary.main}`,
    },
    icon: {
        marginRight: theme.spacing(1.5),
        fontSize: "22px",
        transition: "transform 0.2s ease",
        [theme.breakpoints.down("xs")]: {
            marginRight: 0,
        },
    },
    text: {
        fontWeight: 500,
        fontSize: "0.92rem",
        [theme.breakpoints.down("xs")]: {
            display: "none",
        },
    },
    divider: {
        margin: theme.spacing(1.5, 0),
    },
    badgeChip: {
        height: 18,
        fontSize: "0.68rem",
        fontWeight: "bold",
        backgroundColor: theme.palette.secondary.main,
        color: "white",
        [theme.breakpoints.down("xs")]: {
            display: "none",
        },
    },
}));

const mainNavItems = [
    { text: "Homepage", icon: Home },
    { text: "Friends", icon: Person },
    { text: "Lists", icon: ListIcon },
    { text: "Camera", icon: PhotoCamera },
];

const mediaNavItems = [
    { text: "Videos", icon: PlayCircleOutline },
    { text: "Analytics", icon: Equalizer },
    { text: "Events", icon: Event },
    { text: "Apps", icon: TabletMac },
    { text: "Collections", icon: Bookmark },
    { text: "Market Place", icon: Storefront },
];

const accountNavItems = [
    { text: "Settings", icon: Settings },
    { text: "Logout", icon: ExitToApp },
];

const Leftbar = ({ activeCategory, onSelectCategory }) => {
    const classes = useStyles();

    const renderNavItem = (item) => {
        const IconComponent = item.icon;
        const isActive = activeCategory === item.text;
        return (
            <div
                key={item.text}
                className={`${classes.item} ${isActive ? classes.activeItem : ""}`}
                onClick={() => onSelectCategory && onSelectCategory(item.text)}
            >
                <div className={classes.itemLeft}>
                    <IconComponent className={classes.icon} color={isActive ? "primary" : "inherit"} />
                    <Typography className={classes.text}>{item.text}</Typography>
                </div>
                {item.badge && <Chip label={item.badge} className={classes.badgeChip} size="small" />}
            </div>
        );
    };

    return (
        <div className={classes.container}>
            <Typography className={classes.sectionLabel}>Main Menu</Typography>
            {mainNavItems.map(renderNavItem)}

            <Divider className={classes.divider} />

            <Typography className={classes.sectionLabel}>Discover Media</Typography>
            {mediaNavItems.map(renderNavItem)}

            <Divider className={classes.divider} />

            <Typography className={classes.sectionLabel}>Account & System</Typography>
            {accountNavItems.map(renderNavItem)}
        </div>
    );
};

export default Leftbar;