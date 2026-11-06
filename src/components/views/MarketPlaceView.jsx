import {
    Badge,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Chip,
    Container,
    Drawer,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItemSecondaryAction,
    makeStyles,
    Snackbar,
    Typography,
    Paper,
} from "@material-ui/core";
import { ShoppingCart, Delete, CheckCircle } from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(6),
    },
    topBar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: theme.spacing(4),
    },
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    media: {
        height: 200,
    },
    cardContent: {
        flexGrow: 1,
    },
    price: {
        color: theme.palette.primary.main,
        fontWeight: "bold",
    },
    cartDrawer: {
        width: 350,
        padding: theme.spacing(3),
        [theme.breakpoints.down("xs")]: {
            width: "100vw",
        },
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const products = [
    { id: 1, name: "Wireless Noise-Canceling Headphones", price: 149.99, category: "Electronics", img: "https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=500" },
    { id: 2, name: "Minimalist Mechanical Keyboard", price: 89.50, category: "Accessories", img: "https://images.pexels.com/photos/1772475/pexels-photo-1772475.jpeg?auto=compress&cs=tinysrgb&w=500" },
    { id: 3, name: "Ergonomic Office Chair", price: 210.00, category: "Furniture", img: "https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=500" },
    { id: 4, name: "Smart Fitness Watch", price: 129.00, category: "Wearables", img: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500" },
    { id: 5, name: "HD Desktop Camera Lens", price: 65.00, category: "Electronics", img: "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=500" },
    { id: 6, name: "Stainless Steel Water Flask", price: 25.00, category: "Lifestyle", img: "https://images.pexels.com/photos/4000090/pexels-photo-4000090.jpeg?auto=compress&cs=tinysrgb&w=500" },
];

const MarketPlaceView = () => {
    const classes = useStyles();
    const [cart, setCart] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");

    const addToCart = (product) => {
        setCart([...cart, product]);
        setAlertMsg(`Added ${product.name} to cart!`);
    };

    const removeFromCart = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
    };

    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <Container className={classes.container}>
            <Box className={classes.topBar}>
                <Box>
                    <Typography variant="h4">Market Place</Typography>
                    <Typography variant="body2" color="textSecondary">
                        Explore tech gear, accessories, and lifestyle products.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={
                        <Badge badgeContent={cart.length} color="secondary" overlap="rectangular">
                            <ShoppingCart />
                        </Badge>
                    }
                    onClick={() => setCartOpen(true)}
                >
                    My Cart
                </Button>
            </Box>

            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Card className={classes.card} elevation={3}>
                            <CardMedia className={classes.media} image={product.img} title={product.name} />
                            <CardContent className={classes.cardContent}>
                                <Chip label={product.category} size="small" color="primary" style={{ marginBottom: 8 }} />
                                <Typography variant="h6" gutterBottom>
                                    {product.name}
                                </Typography>
                                <Typography variant="h5" className={classes.price}>
                                    ${product.price.toFixed(2)}
                                </Typography>
                            </CardContent>
                            <CardActions style={{ padding: 16 }}>
                                <Button fullWidth variant="contained" color="primary" onClick={() => addToCart(product)}>
                                    Add to Cart
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Shopping Cart Drawer */}
            <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)} disableRestoreFocus>
                <Box className={classes.cartDrawer}>
                    <Typography variant="h5" gutterBottom>
                        Shopping Cart ({cart.length})
                    </Typography>
                    <List>
                        {cart.map((item, index) => (
                            <ListItem key={index} divider>
                                <ListItemAvatar>
                                    <Avatar src={item.img} variant="square" />
                                </ListItemAvatar>
                                <ListItemText primary={item.name} secondary={`$${item.price.toFixed(2)}`} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" color="secondary" onClick={() => removeFromCart(index)}>
                                        <Delete />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>

                    {cart.length > 0 ? (
                        <Box marginTop={3}>
                            <Typography variant="h6" style={{ marginBottom: 16 }}>
                                Total: ${totalPrice.toFixed(2)}
                            </Typography>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                size="large"
                                onClick={() => {
                                    setCart([]);
                                    setCartOpen(false);
                                    setAlertMsg("Order placed successfully! Thank you.");
                                }}
                            >
                                Checkout (${totalPrice.toFixed(2)})
                            </Button>
                        </Box>
                    ) : (
                        <Box textAlign="center" marginTop={4}>
                            <Typography color="textSecondary">Your cart is empty.</Typography>
                        </Box>
                    )}
                </Box>
            </Drawer>

            <Snackbar open={Boolean(alertMsg)} autoHideDuration={3000} onClose={() => setAlertMsg("")}>
                <Alert onClose={() => setAlertMsg("")} severity="success">
                    {alertMsg}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default MarketPlaceView;
