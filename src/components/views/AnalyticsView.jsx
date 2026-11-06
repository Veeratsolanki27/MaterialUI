import {
    Box,
    Card,
    CardContent,
    Container,
    Grid,
    LinearProgress,
    makeStyles,
    Paper,
    Select,
    MenuItem,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
} from "@material-ui/core";
import {
    TrendingUp,
    People,
    ThumbUp,
    Visibility,
    Equalizer,
} from "@material-ui/icons";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(6),
    },
    statCardContent: {
        display: "flex",
        alignItems: "center",
        padding: "16px !important",
        minHeight: 88,
    },
    iconWrapper: {
        width: 48,
        height: 48,
        minWidth: 48,
        borderRadius: 12,
        marginRight: theme.spacing(2),
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    progressSection: {
        padding: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    channelRow: {
        marginBottom: theme.spacing(2),
    },
}));

const popularPosts = [
    { title: "Build a Full React & Material-UI Web Application", views: "142K", likes: "1.2K", comments: "148", status: "Trending" },
    { title: "React State Management with Hooks & Context API", views: "95K", likes: "890", comments: "94", status: "High Impact" },
    { title: "Top 10 Material-UI Components You Must Know", views: "230K", likes: "2.4K", comments: "310", status: "Viral" },
    { title: "Modern CSS Grid & Flexbox Masterclass", views: "89K", likes: "650", comments: "42", status: "Steady" },
];

const AnalyticsView = () => {
    const classes = useStyles();
    const [timeRange, setTimeRange] = useState("30");

    return (
        <Container className={classes.container}>
            <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={3} flexWrap="wrap" gap={2}>
                <Box>
                    <Typography variant="h4" gutterBottom style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Equalizer color="primary" fontSize="large" /> Performance & Analytics
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Track application engagement metrics, traffic distribution, and top performing posts.
                    </Typography>
                </Box>
                <Select
                    variant="outlined"
                    size="small"
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    style={{ minWidth: 140 }}
                >
                    <MenuItem value="7">Last 7 Days</MenuItem>
                    <MenuItem value="30">Last 30 Days</MenuItem>
                    <MenuItem value="90">Last 90 Days</MenuItem>
                </Select>
            </Box>

            {/* Key Stat Cards Grid */}
            <Grid container spacing={3} style={{ marginBottom: 24 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card elevation={2} style={{ height: "100%" }}>
                        <CardContent className={classes.statCardContent}>
                            <Box className={classes.iconWrapper} style={{ backgroundColor: "#3f51b5" }}>
                                <Visibility />
                            </Box>
                            <Box style={{ overflow: "hidden" }}>
                                <Typography variant="h5" style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                                    {timeRange === "7" ? "32.4K" : timeRange === "30" ? "142.8K" : "480K"}
                                </Typography>
                                <Typography variant="caption" color="textSecondary" style={{ whiteSpace: "nowrap", display: "block" }}>
                                    Total Pageviews
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card elevation={2} style={{ height: "100%" }}>
                        <CardContent className={classes.statCardContent}>
                            <Box className={classes.iconWrapper} style={{ backgroundColor: "#4caf50" }}>
                                <People />
                            </Box>
                            <Box style={{ overflow: "hidden" }}>
                                <Typography variant="h5" style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                                    {timeRange === "7" ? "820" : timeRange === "30" ? "3,420" : "12.8K"}
                                </Typography>
                                <Typography variant="caption" color="textSecondary" style={{ whiteSpace: "nowrap", display: "block" }}>
                                    Active Users
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card elevation={2} style={{ height: "100%" }}>
                        <CardContent className={classes.statCardContent}>
                            <Box className={classes.iconWrapper} style={{ backgroundColor: "#f50057" }}>
                                <ThumbUp />
                            </Box>
                            <Box style={{ overflow: "hidden" }}>
                                <Typography variant="h5" style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                                    {timeRange === "7" ? "2.1K" : timeRange === "30" ? "12.4K" : "42.1K"}
                                </Typography>
                                <Typography variant="caption" color="textSecondary" style={{ whiteSpace: "nowrap", display: "block" }}>
                                    Total Likes
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card elevation={2} style={{ height: "100%" }}>
                        <CardContent className={classes.statCardContent}>
                            <Box className={classes.iconWrapper} style={{ backgroundColor: "#ff9800" }}>
                                <TrendingUp />
                            </Box>
                            <Box style={{ overflow: "hidden" }}>
                                <Typography variant="h5" style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                                    84.5%
                                </Typography>
                                <Typography variant="caption" color="textSecondary" style={{ whiteSpace: "nowrap", display: "block" }}>
                                    Engagement Rate
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Traffic Source Breakdown */}
            <Paper className={classes.progressSection} elevation={2}>
                <Typography variant="h6" gutterBottom style={{ fontWeight: "bold", marginBottom: 16 }}>
                    Traffic Source Channels
                </Typography>
                
                <Box className={classes.channelRow}>
                    <Box display="flex" justifyContent="space-between" marginBottom={0.5}>
                        <Typography variant="body2">Direct Search</Typography>
                        <Typography variant="body2" style={{ fontWeight: "bold" }}>45%</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={45} style={{ height: 8, borderRadius: 4 }} color="primary" />
                </Box>

                <Box className={classes.channelRow}>
                    <Box display="flex" justifyContent="space-between" marginBottom={0.5}>
                        <Typography variant="body2">Social Media Referral</Typography>
                        <Typography variant="body2" style={{ fontWeight: "bold" }}>30%</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={30} style={{ height: 8, borderRadius: 4 }} color="secondary" />
                </Box>

                <Box className={classes.channelRow}>
                    <Box display="flex" justifyContent="space-between" marginBottom={0.5}>
                        <Typography variant="body2">Developer Forums & Github</Typography>
                        <Typography variant="body2" style={{ fontWeight: "bold" }}>25%</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={25} style={{ height: 8, borderRadius: 4 }} />
                </Box>
            </Paper>

            {/* Popular Posts Table */}
            <Paper elevation={2}>
                <Box padding={2}>
                    <Typography variant="h6" style={{ fontWeight: "bold" }}>
                        Top Content Performance
                    </Typography>
                </Box>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: "bold" }}>Post Title</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Views</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Likes</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Comments</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {popularPosts.map((row, index) => (
                                <TableRow key={index} hover>
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>{row.views}</TableCell>
                                    <TableCell>{row.likes}</TableCell>
                                    <TableCell>{row.comments}</TableCell>
                                    <TableCell>
                                        <Chip label={row.status} color="primary" size="small" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
};

export default AnalyticsView;
