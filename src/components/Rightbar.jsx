import {
    Link,
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    Container,
    ImageList,
    ImageListItem,
    makeStyles,
    Typography,
    Divider,
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    Paper,
    Grid,
} from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";
import { TrendingUp, PostAdd, CheckCircle, Bookmark, Whatshot, WbSunny, Category } from "@material-ui/icons";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(6),
        position: "sticky",
        top: 64,
        height: "calc(100vh - 64px)",
        maxHeight: "calc(100vh - 64px)",
        overflowY: "auto",
        overflowX: "hidden",
        "&::-webkit-scrollbar": {
            width: "5px",
        },
        "&::-webkit-scrollbar-track": {
            background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(150, 150, 150, 0.3)",
            borderRadius: "4px",
        },
    },
    title: {
        fontSize: 15,
        fontWeight: 600,
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(1.5),
        display: "flex",
        alignItems: "center",
        gap: theme.spacing(1),
    },
    statCard: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(3),
        borderRadius: 12,
        background: theme.palette.type === "dark"
            ? "linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%)"
            : "linear-gradient(135deg, #ffffff 0%, #f4f6ff 100%)",
        border: `1px solid ${theme.palette.divider}`,
    },
    statItem: {
        textAlign: "center",
    },
    statValue: {
        fontWeight: "bold",
        color: theme.palette.primary.main,
    },
    link: {
        marginRight: theme.spacing(2),
        color: theme.palette.text.primary,
        fontSize: 14,
        cursor: "pointer",
        textDecoration: "none",
        "&:hover": {
            color: theme.palette.primary.main,
            textDecoration: "underline",
        },
    },
    activeLink: {
        color: theme.palette.primary.main,
        fontWeight: "bold",
    },
    avatarGroup: {
        marginBottom: theme.spacing(2.5),
    },
    imageList: {
        marginBottom: theme.spacing(2.5),
    },
    imageItem: {
        cursor: "pointer",
        borderRadius: 8,
        overflow: "hidden",
        transition: "transform 0.2s ease",
        "&:hover": {
            transform: "scale(1.04)",
        },
    },
    divider: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
}));

const galleryImages = [
    "https://images.pexels.com/photos/7319337/pexels-photo-7319337.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    "https://images.pexels.com/photos/7363671/pexels-photo-7363671.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    "https://images.pexels.com/photos/7245535/pexels-photo-7245535.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    "https://images.pexels.com/photos/7245477/pexels-photo-7245477.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    "https://images.pexels.com/photos/7078467/pexels-photo-7078467.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    "https://images.pexels.com/photos/7833646/pexels-photo-7833646.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
];

const topicCategories = [
    { name: "Sport", count: "124" },
    { name: "Food", count: "89" },
    { name: "Music", count: "210" },
    { name: "Movies", count: "75" },
    { name: "Science", count: "150" },
    { name: "Life", count: "310" },
];

const Rightbar = ({ activeCategory, onSelectCategory }) => {
    const classes = useStyles();
    const [selectedImg, setSelectedImg] = useState(null);

    return (
        <Container className={classes.container}>
            {/* Live Weather Widget */}
            <Paper style={{ padding: 14, marginBottom: 20, background: "linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)", color: "white", borderRadius: 12 }} elevation={3}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                        <Typography variant="caption" style={{ opacity: 0.85, fontWeight: "bold", textTransform: "uppercase" }}>
                            ☀️ Local Weather
                        </Typography>
                        <Typography variant="h5" style={{ fontWeight: "bold" }}>
                            78°F Sunny
                        </Typography>
                        <Typography variant="caption" style={{ opacity: 0.9 }}>
                            San Francisco • Humidity 42%
                        </Typography>
                    </div>
                    <WbSunny style={{ fontSize: 44, color: "#ffeb3b" }} />
                </div>
            </Paper>

            {/* Feature E: Activity & Dashboard Stats Card */}
            <Paper className={classes.statCard} elevation={2}>
                <Typography className={classes.title}>
                    <TrendingUp color="primary" /> My Activity Dashboard
                </Typography>
                <Grid container spacing={1}>
                    <Grid item xs={3} className={classes.statItem}>
                        <Typography variant="h6" className={classes.statValue}>6</Typography>
                        <Typography variant="caption" color="textSecondary">Posts</Typography>
                    </Grid>
                    <Grid item xs={3} className={classes.statItem}>
                        <Typography variant="h6" className={classes.statValue}>12</Typography>
                        <Typography variant="caption" color="textSecondary">Tasks</Typography>
                    </Grid>
                    <Grid item xs={3} className={classes.statItem}>
                        <Typography variant="h6" className={classes.statValue}>4</Typography>
                        <Typography variant="caption" color="textSecondary">Saved</Typography>
                    </Grid>
                    <Grid item xs={3} className={classes.statItem}>
                        <Typography variant="h6" className={classes.statValue}>98%</Typography>
                        <Typography variant="caption" color="textSecondary">Score</Typography>
                    </Grid>
                </Grid>
            </Paper>

            {/* Online Friends */}
            <Typography className={classes.title}>
                <Whatshot color="secondary" /> Online Network
            </Typography>
            <AvatarGroup max={6} className={classes.avatarGroup}>
                <Avatar alt="Remy Sharp" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150" />
                <Avatar alt="Travis Howard" src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150" />
                <Avatar alt="Cindy Baker" src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150" />
                <Avatar alt="Agnes Walker" src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150" />
                <Avatar alt="Trevor Henderson" src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150" />
                <Avatar alt="Sarah Jenkins" src="https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=150" />
            </AvatarGroup>

            {/* Gallery Showcase */}
            <Typography className={classes.title}>
                Gallery Showcase
            </Typography>
            <ImageList rowHeight={90} className={classes.imageList} cols={2}>
                {galleryImages.map((src, index) => (
                    <ImageListItem key={index} className={classes.imageItem} onClick={() => setSelectedImg(src)}>
                        <img src={src} alt={`Gallery item ${index + 1}`} loading="lazy" style={{ height: "100%", width: "100%", objectFit: "cover" }} />
                    </ImageListItem>
                ))}
            </ImageList>

            {/* Redesigned Trending Topic Explorer Card */}
            <Paper style={{ padding: 16, marginTop: 16, borderRadius: 12 }} elevation={2}>
                <Typography className={classes.title} style={{ marginBottom: 12 }}>
                    <Category color="primary" /> Trending Topics & Categories
                </Typography>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {topicCategories.map((item) => (
                        <Chip
                            key={item.name}
                            avatar={<Avatar style={{ backgroundColor: item.color, color: "white", fontWeight: "bold" }}>{item.icon}</Avatar>}
                            label={`${item.name} (${item.count})`}
                            onClick={() => onSelectCategory && onSelectCategory(item.name)}
                            color={activeCategory === item.name ? "primary" : "default"}
                            variant={activeCategory === item.name ? "default" : "outlined"}
                            style={{
                                fontWeight: activeCategory === item.name ? "bold" : "normal",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                            }}
                        />
                    ))}
                </div>
            </Paper>

            {/* Gallery Lightbox Dialog */}
            <Dialog open={Boolean(selectedImg)} onClose={() => setSelectedImg(null)} maxWidth="md" disableRestoreFocus>
                <DialogContent style={{ padding: 8 }}>
                    {selectedImg && <img src={selectedImg} alt="Enlarged gallery view" style={{ width: "100%", height: "auto", borderRadius: 4 }} />}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSelectedImg(null)} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Rightbar;