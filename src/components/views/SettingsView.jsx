import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Divider,
    FormControlLabel,
    Grid,
    makeStyles,
    Paper,
    Snackbar,
    Switch,
    TextField,
    Typography,
} from "@material-ui/core";
import { Save, Lock, Notifications, Person } from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(6),
    },
    paper: {
        padding: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        marginBottom: theme.spacing(2),
    },
    sectionTitle: {
        marginBottom: theme.spacing(2),
        display: "flex",
        alignItems: "center",
        gap: theme.spacing(1),
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SettingsView = ({ userName = "Veerat Dev", setUserName, userAvatar = "", setUserAvatar, darkMode = false, setDarkMode }) => {
    const classes = useStyles();
    const [email, setEmail] = useState("veerat.dev@example.com");
    const [bio, setBio] = useState("Senior Fullstack Developer building modern Web Applications with React and Material-UI.");
    
    // Toggles
    const [emailNotif, setEmailNotif] = useState(true);
    const [publicProfile, setPublicProfile] = useState(true);
    
    const [alertMsg, setAlertMsg] = useState("");

    const handleSave = (e) => {
        e.preventDefault();
        setAlertMsg("Settings saved successfully!");
    };

    const handlePhotoUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            if (setUserAvatar) {
                setUserAvatar(url);
            }
            setAlertMsg("Profile photo updated successfully!");
        }
    };

    return (
        <Container className={classes.container}>
            <Box marginBottom={3}>
                <Typography variant="h4" gutterBottom>
                    Account & App Settings
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Manage your personal profile, notification preferences, and privacy options.
                </Typography>
            </Box>

            <form onSubmit={handleSave}>
                <Paper className={classes.paper} elevation={2}>
                    <Typography variant="h6" className={classes.sectionTitle}>
                        <Person color="primary" /> Profile Information
                    </Typography>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} sm={3} style={{ textAlign: "center" }}>
                            <input
                                type="file"
                                accept="image/*"
                                id="profile-photo-upload"
                                style={{ display: "none" }}
                                onChange={handlePhotoUpload}
                            />
                            <Avatar
                                src={userAvatar || "https://images.pexels.com/photos/8647814/pexels-photo-8647814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"}
                                className={classes.avatar}
                                style={{ margin: "0 auto" }}
                            />
                            <Button
                                size="small"
                                variant="outlined"
                                color="primary"
                                onClick={() => document.getElementById("profile-photo-upload").click()}
                            >
                                Change Photo
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Full Name"
                                        variant="outlined"
                                        size="small"
                                        value={userName}
                                        onChange={(e) => setUserName && setUserName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Email Address"
                                        variant="outlined"
                                        size="small"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        minRows={3}
                                        label="Bio"
                                        variant="outlined"
                                        size="small"
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>

                <Paper className={classes.paper} elevation={2}>
                    <Typography variant="h6" className={classes.sectionTitle}>
                        <Notifications color="primary" /> Preferences & Theme
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <FormControlLabel
                                control={<Switch checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} color="primary" />}
                                label="Dark Mode Theme"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControlLabel
                                control={<Switch checked={emailNotif} onChange={(e) => setEmailNotif(e.target.checked)} color="primary" />}
                                label="Email Notifications"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControlLabel
                                control={<Switch checked={publicProfile} onChange={(e) => setPublicProfile(e.target.checked)} color="primary" />}
                                label="Public Profile Visible"
                            />
                        </Grid>
                    </Grid>
                </Paper>

                <Box display="flex" justifyContent="flex-end">
                    <Button type="submit" variant="contained" color="primary" size="large" startIcon={<Save />}>
                        Save All Changes
                    </Button>
                </Box>
            </form>

            <Snackbar open={Boolean(alertMsg)} autoHideDuration={3000} onClose={() => setAlertMsg("")}>
                <Alert onClose={() => setAlertMsg("")} severity="success">
                    {alertMsg}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default SettingsView;
