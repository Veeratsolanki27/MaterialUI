import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Container,
    Grid,
    InputAdornment,
    makeStyles,
    Paper,
    Snackbar,
    Switch,
    Tabs,
    Tab,
    TextField,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@material-ui/core";
import {
    Search,
    Launch,
    Cloud,
    Code,
    Equalizer,
    MusicNote,
    CheckCircle,
    Android,
    Storage,
    Work,
} from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(8),
    },
    topBar: {
        marginBottom: theme.spacing(3),
    },
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: theme.shadows[6],
        },
    },
    appIcon: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        backgroundColor: theme.palette.primary.main,
        color: "white",
        marginBottom: theme.spacing(2),
    },
    categoryChip: {
        marginBottom: theme.spacing(1),
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const initialApps = [
    {
        id: 1,
        name: "Analytics Pro Dashboard",
        category: "Utilities",
        icon: Equalizer,
        color: "#3f51b5",
        desc: "Real-time web traffic analytics, metrics dashboard, and user conversion reports.",
        installed: true,
    },
    {
        id: 2,
        name: "Cloud Storage Drive",
        category: "Productivity",
        icon: Cloud,
        color: "#0288d1",
        desc: "Sync documents, photos, and backups securely across devices with end-to-end encryption.",
        installed: true,
    },
    {
        id: 3,
        name: "Live Code Playground",
        category: "Developer Tools",
        icon: Code,
        color: "#7b1fa2",
        desc: "Interactive JavaScript & React sandbox tool with instant preview and export.",
        installed: false,
    },
    {
        id: 4,
        name: "Stream Music & Podcast Hub",
        category: "Media & Entertainment",
        icon: MusicNote,
        color: "#e91e63",
        desc: "Listen to high-fidelity audio streams, curated coding playlists, and tech podcasts.",
        installed: false,
    },
    {
        id: 5,
        name: "AI Content Studio",
        category: "Developer Tools",
        icon: Android,
        color: "#009688",
        desc: "AI assistant that drafts blog posts, headlines, social captions, and code snippets.",
        installed: true,
    },
    {
        id: 6,
        name: "Database Storage Vault",
        category: "Utilities",
        icon: Storage,
        color: "#ff9800",
        desc: "Manage relational data structures, schemas, and query logs with high security.",
        installed: false,
    },
];

const AppsView = () => {
    const classes = useStyles();
    const [apps, setApps] = useState(initialApps);
    const [search, setSearch] = useState("");
    const [tab, setTab] = useState(0);
    const [alertMsg, setAlertMsg] = useState("");
    const [activeDemoApp, setActiveDemoApp] = useState(null);

    const toggleAppInstall = (id) => {
        setApps(
            apps.map((app) => {
                if (app.id === id) {
                    const newStatus = !app.installed;
                    setAlertMsg(
                        newStatus
                            ? `${app.name} connected successfully!`
                            : `${app.name} disconnected.`
                    );
                    return { ...app, installed: newStatus };
                }
                return app;
            })
        );
    };

    const categories = ["All", "Productivity", "Utilities", "Developer Tools", "Media & Entertainment"];

    const filteredApps = apps.filter((app) => {
        const matchesSearch =
            app.name.toLowerCase().includes(search.toLowerCase()) ||
            app.desc.toLowerCase().includes(search.toLowerCase());
        const matchesTab =
            tab === 0 || app.category === categories[tab];
        return matchesSearch && matchesTab;
    });

    return (
        <Container className={classes.container}>
            <Box className={classes.topBar}>
                <Typography variant="h4" gutterBottom>
                    Apps & Integrations Hub
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Discover and manage connected extensions, developer tools, and productivity applications.
                </Typography>
            </Box>

            <TextField
                fullWidth
                variant="outlined"
                placeholder="Search apps by name or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ marginBottom: 24 }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search color="action" />
                        </InputAdornment>
                    ),
                }}
            />

            <Paper style={{ marginBottom: 24 }}>
                <Tabs
                    value={tab}
                    onChange={(e, val) => setTab(val)}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    {categories.map((cat, i) => (
                        <Tab key={cat} label={cat} />
                    ))}
                </Tabs>
            </Paper>

            <Grid container spacing={3}>
                {filteredApps.map((app) => {
                    const IconComp = app.icon;
                    return (
                        <Grid item xs={12} sm={6} md={4} key={app.id}>
                            <Card className={classes.card} elevation={3}>
                                <CardContent>
                                    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                                        <Avatar className={classes.appIcon} style={{ backgroundColor: app.color }}>
                                            <IconComp />
                                        </Avatar>
                                        <Switch
                                            checked={app.installed}
                                            onChange={() => toggleAppInstall(app.id)}
                                            color="primary"
                                        />
                                    </Box>
                                    <Chip
                                        label={app.category}
                                        size="small"
                                        color="primary"
                                        variant="outlined"
                                        className={classes.categoryChip}
                                    />
                                    <Typography variant="h6" gutterBottom style={{ fontWeight: 600 }}>
                                        {app.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {app.desc}
                                    </Typography>
                                </CardContent>
                                <CardActions style={{ padding: 16, borderTop: "1px solid #eee" }}>
                                    <Button
                                        fullWidth
                                        variant={app.installed ? "contained" : "outlined"}
                                        color="primary"
                                        startIcon={<Launch />}
                                        onClick={() => setActiveDemoApp(app)}
                                    >
                                        {app.installed ? "Launch App" : "Preview Demo"}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>

            {/* Interactive Demo Dialog */}
            <Dialog open={Boolean(activeDemoApp)} onClose={() => setActiveDemoApp(null)} maxWidth="sm" fullWidth disableRestoreFocus>
                {activeDemoApp && (
                    <>
                        <DialogTitle>
                            <Box display="flex" alignItems="center" gap={2}>
                                <Avatar style={{ backgroundColor: activeDemoApp.color }}>
                                    <activeDemoApp.icon />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6">{activeDemoApp.name}</Typography>
                                    <Typography variant="caption" color="textSecondary">
                                        Status: {activeDemoApp.installed ? "Connected" : "Preview Mode"}
                                    </Typography>
                                </Box>
                            </Box>
                        </DialogTitle>
                        <DialogContent dividers>
                            <Box padding={2} textAlign="center" backgroundColor="#f9f9f9" borderRadius={8} marginBottom={2}>
                                <CheckCircle color="primary" style={{ fontSize: 48, marginBottom: 8 }} />
                                <Typography variant="h6" gutterBottom>
                                    {activeDemoApp.name} is Ready!
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {activeDemoApp.desc}
                                </Typography>
                            </Box>
                            <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 600 }}>
                                Key Features:
                            </Typography>
                            <ul>
                                <li>Instant synchronization with Veerat Dev dashboard</li>
                                <li>Custom workspace notifications & webhooks</li>
                                <li>Granular privacy and control options</li>
                            </ul>
                        </DialogContent>
                        <DialogActions>
                            {!activeDemoApp.installed && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        toggleAppInstall(activeDemoApp.id);
                                        setActiveDemoApp(null);
                                    }}
                                >
                                    Connect App
                                </Button>
                            )}
                            <Button onClick={() => setActiveDemoApp(null)} color="default">
                                Close
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>

            <Snackbar open={Boolean(alertMsg)} autoHideDuration={3000} onClose={() => setAlertMsg("")}>
                <Alert onClose={() => setAlertMsg("")} severity="success">
                    {alertMsg}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default AppsView;
