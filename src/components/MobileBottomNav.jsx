import {
    BottomNavigation,
    BottomNavigationAction,
    makeStyles,
    Paper,
} from "@material-ui/core";
import {
    Home,
    People,
    PhotoCamera,
    TabletMac,
    Bookmark,
    Storefront,
    OndemandVideo,
    Settings,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        overflowX: "auto",
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
}));

const MobileBottomNav = ({ activeCategory, onSelectCategory }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root} elevation={8}>
            <BottomNavigation
                value={activeCategory}
                onChange={(event, newValue) => {
                    if (onSelectCategory) onSelectCategory(newValue);
                }}
                showLabels
            >
                <BottomNavigationAction label="Home" value="Homepage" icon={<Home />} />
                <BottomNavigationAction label="Camera" value="Camera" icon={<PhotoCamera />} />
                <BottomNavigationAction label="Apps" value="Apps" icon={<TabletMac />} />
                <BottomNavigationAction label="Saved" value="Collections" icon={<Bookmark />} />
                <BottomNavigationAction label="Friends" value="Friends" icon={<People />} />
                <BottomNavigationAction label="Market" value="Market Place" icon={<Storefront />} />
                <BottomNavigationAction label="Videos" value="Videos" icon={<OndemandVideo />} />
                <BottomNavigationAction label="Settings" value="Settings" icon={<Settings />} />
            </BottomNavigation>
        </Paper>
    );
};

export default MobileBottomNav;
