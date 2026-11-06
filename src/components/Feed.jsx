import { Container, makeStyles, Typography, Box } from "@material-ui/core";
import Post from "./Post";
import Stories from "./Stories";

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(6),
    },
    emptyState: {
        textAlign: "center",
        padding: theme.spacing(6),
        color: theme.palette.text.secondary,
    },
}));

const Feed = ({ posts, onLike, onDelete, searchQuery = "", activeCategory = "Homepage" }) => {
    const classes = useStyles();

    const filteredPosts = posts.filter((post) => {
        const matchesSearch =
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.desc.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCategory =
            !activeCategory ||
            activeCategory === "Homepage" ||
            activeCategory === "All" ||
            (post.category && post.category.toLowerCase() === activeCategory.toLowerCase());

        return matchesSearch && matchesCategory;
    });

    return (
        <Container className={classes.container}>
            {/* Top Stories Bar */}
            <Stories />

            {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                    <Post key={post.id} post={post} onLike={onLike} onDelete={onDelete} />
                ))
            ) : (
                <Box className={classes.emptyState}>
                    <Typography variant="h6" gutterBottom>
                        No posts found
                    </Typography>
                    <Typography variant="body2">
                        Try searching for something else or change the category filter.
                    </Typography>
                </Box>
            )}
        </Container>
    );
};

export default Feed;