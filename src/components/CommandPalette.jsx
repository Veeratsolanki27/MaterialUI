import {
    Dialog,
    DialogContent,
    InputBase,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Typography,
    Chip,
} from "@material-ui/core";
import {
    Search,
    Home,
    Person,
    List as ListIcon,
    PhotoCamera,
    PlayCircleOutline,
    TabletMac,
    Bookmark,
    Storefront,
    Settings,
} from "@material-ui/icons";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    searchBar: {
        padding: theme.spacing(1, 2),
        display: "flex",
        alignItems: "center",
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    input: {
        marginLeft: theme.spacing(1.5),
        flex: 1,
        fontSize: "1.1rem",
    },
    list: {
        maxHeight: 360,
        overflowY: "auto",
    },
}));

const commandItems = [
    { text: "Homepage", category: "View Navigation", icon: Home },
    { text: "Friends", category: "View Navigation", icon: Person },
    { text: "Lists", category: "View Navigation", icon: ListIcon },
    { text: "Camera", category: "View Navigation", icon: PhotoCamera },
    { text: "Videos", category: "View Navigation", icon: PlayCircleOutline },
    { text: "Apps", category: "View Navigation", icon: TabletMac },
    { text: "Collections", category: "View Navigation", icon: Bookmark },
    { text: "Market Place", category: "View Navigation", icon: Storefront },
    { text: "Settings", category: "View Navigation", icon: Settings },
];

const CommandPalette = ({ open, onClose, onSelectCategory }) => {
    const classes = useStyles();
    const [query, setQuery] = useState("");

    const filtered = commandItems.filter((item) =>
        item.text.toLowerCase().includes(query.toLowerCase().trim())
    );

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth disableRestoreFocus>
            <div className={classes.searchBar}>
                <Search color="action" />
                <InputBase
                    autoFocus
                    placeholder="Search views, tools, settings (e.g. Camera, Videos, Settings)..."
                    className={classes.input}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Chip label="ESC" size="small" variant="outlined" />
            </div>
            <DialogContent style={{ padding: 0 }}>
                <List className={classes.list}>
                    {filtered.length > 0 ? (
                        filtered.map((item) => {
                            const IconComp = item.icon;
                            return (
                                <ListItem
                                    button
                                    key={item.text}
                                    onClick={() => {
                                        if (onSelectCategory) onSelectCategory(item.text);
                                        onClose();
                                    }}
                                >
                                    <ListItemIcon>
                                        <IconComp color="primary" />
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} secondary={item.category} />
                                </ListItem>
                            );
                        })
                    ) : (
                        <div style={{ padding: 24, textAlign: "center" }}>
                            <Typography color="textSecondary">No navigation matching "{query}"</Typography>
                        </div>
                    )}
                </List>
            </DialogContent>
        </Dialog>
    );
};

export default CommandPalette;
