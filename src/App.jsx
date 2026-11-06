import { Grid, makeStyles, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Snackbar, ThemeProvider, Paper } from "@material-ui/core";
import { useState, useEffect } from "react";
import Add from "./components/Add";
import Feed from "./components/Feed";
import Leftbar from "./components/Leftbar";
import Navbar from "./components/Navbar";
import Rightbar from "./components/Rightbar";
import MobileBottomNav from "./components/MobileBottomNav";
import ChatWidget from "./components/ChatWidget";
import CommandPalette from "./components/CommandPalette";
import { getCustomTheme } from "./theme";

// Views
import FriendsView from "./components/views/FriendsView";
import ListsView from "./components/views/ListsView";
import MarketPlaceView from "./components/views/MarketPlaceView";
import VideosView from "./components/views/VideosView";
import SettingsView from "./components/views/SettingsView";
import CameraView from "./components/views/CameraView";
import AppsView from "./components/views/AppsView";
import CollectionsView from "./components/views/CollectionsView";
import AnalyticsView from "./components/views/AnalyticsView";
import EventsView from "./components/views/EventsView";
import NotificationDrawer from "./components/NotificationDrawer";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  right: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  mainContent: {
    paddingBottom: theme.spacing(8),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const initialPosts = [
  {
    id: 1,
    title: "My First Post",
    img: "https://images.pexels.com/photos/7319337/pexels-photo-7319337.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam consectetur earum est repudiandae aliquam neque molestiae, praesentium placeat unde illo?",
    likes: 12,
    isLiked: false,
    category: "Homepage",
  },
  {
    id: 2,
    title: "Simply Recipes Less Stress. More Joy",
    img: "https://images.pexels.com/photos/7363671/pexels-photo-7363671.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    desc: "Discover amazing quick recipes that save time and bring joy to your family dinner table.",
    likes: 34,
    isLiked: true,
    category: "Food",
  },
  {
    id: 3,
    title: "What To Do In London & Sports Highlights",
    img: "https://images.pexels.com/photos/7245535/pexels-photo-7245535.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    desc: "A complete 3-day travel itinerary exploring hidden spots, iconic landmarks, and football stadiums in London.",
    likes: 56,
    isLiked: false,
    category: "Sport",
  },
  {
    id: 4,
    title: "Top Acoustic & Lo-Fi Chill Beats 2026",
    img: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    desc: "Immerse yourself in relaxing instrumental lo-fi acoustic tracks perfect for deep work, coding, and relaxation.",
    likes: 98,
    isLiked: true,
    category: "Music",
  },
  {
    id: 5,
    title: "Must-Watch Sci-Fi & Blockbuster Movies of the Year",
    img: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    desc: "Our top cinematic recommendations, film reviews, and upcoming movie trailers you cannot miss this season.",
    likes: 114,
    isLiked: false,
    category: "Movies",
  },
  {
    id: 6,
    title: "Shortcut Travel Guide to Manhattan",
    img: "https://images.pexels.com/photos/7078467/pexels-photo-7078467.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    desc: "Explore New York City's top attractions, museums, and rooftop dining experiences.",
    likes: 89,
    isLiked: false,
    category: "Life",
  },
  {
    id: 7,
    title: "Killer Actions to Boost Your Self-Confidence & Focus",
    img: "https://images.pexels.com/photos/7833646/pexels-photo-7833646.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    desc: "Simple daily habits and psychological hacks to improve focus, motivation, and scientific self-belief.",
    likes: 45,
    isLiked: false,
    category: "Science",
  },
  {
    id: 8,
    title: "Live Concerts & Indie Music Festival Scene",
    img: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    desc: "Behind the scenes coverage of live indie music festivals, artist interviews, and stage performances.",
    likes: 142,
    isLiked: true,
    category: "Music",
  },
  {
    id: 9,
    title: "Top 10 Classic Film Cinema Masterpieces",
    img: "https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    desc: "An in-depth breakdown of cinematography, screenwriting, and iconic movie scenes throughout cinema history.",
    likes: 77,
    isLiked: false,
    category: "Movies",
  },
];

const App = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState(initialPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Homepage");
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [userName, setUserName] = useState("Veerat Dev");
  const [userAvatar, setUserAvatar] = useState("https://images.pexels.com/photos/8647814/pexels-photo-8647814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500");
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [notifDrawerOpen, setNotifDrawerOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Backfill initial posts for newly added categories into state & update image URLs
  useEffect(() => {
    setPosts((currentPosts) => {
      const initialMap = new Map(initialPosts.map((p) => [p.id, p]));
      let updated = false;

      const merged = currentPosts.map((cp) => {
        const fresh = initialMap.get(cp.id);
        if (fresh && fresh.img !== cp.img) {
          updated = true;
          return { ...cp, img: fresh.img };
        }
        return cp;
      });

      const existingIds = new Set(merged.map((p) => p.id));
      const newItems = initialPosts.filter((p) => !existingIds.has(p.id));

      if (newItems.length > 0 || updated) {
        return [...merged, ...newItems];
      }
      return currentPosts;
    });
  }, []);

  const theme = getCustomTheme(darkMode);

  const handleAddPost = (newPost) => {
    setPosts([newPost, ...posts]);
    setActiveCategory("Homepage");
  };

  const handleLikePost = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      })
    );
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const handleSelectCategory = (category) => {
    if (category === "Logout") {
      setLogoutOpen(true);
    } else {
      setActiveCategory(category);
    }
  };

  const handleResetFilter = () => {
    setSearchQuery("");
    setActiveCategory("Homepage");
  };

  const renderActiveView = () => {
    switch (activeCategory) {
      case "Friends":
        return <FriendsView />;
      case "Lists":
        return <ListsView />;
      case "Market Place":
        return <MarketPlaceView />;
      case "Videos":
        return <VideosView />;
      case "Settings":
        return <SettingsView userName={userName} setUserName={setUserName} userAvatar={userAvatar} setUserAvatar={setUserAvatar} darkMode={darkMode} setDarkMode={setDarkMode} />;
      case "Camera":
        return <CameraView onAddPost={handleAddPost} />;
      case "Apps":
        return <AppsView />;
      case "Collections":
        return <CollectionsView />;
      case "Analytics":
        return <AnalyticsView />;
      case "Events":
        return <EventsView />;
      default:
        return (
          <Feed
            posts={posts}
            onLike={handleLikePost}
            onDelete={handleDeletePost}
            searchQuery={searchQuery}
            activeCategory={activeCategory}
          />
        );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper style={{ minHeight: "100vh", borderRadius: 0, backgroundColor: theme.palette.background.default }} elevation={0}>
        <div className={classes.mainContent}>
      <Navbar
        userName={userName}
        userAvatar={userAvatar}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onResetFilter={handleResetFilter}
        onSelectCategory={handleSelectCategory}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenNotifications={() => setNotifDrawerOpen(true)}
      />
      <Grid container>
        <Grid item sm={2} xs={2}>
          <Leftbar
            activeCategory={activeCategory}
            onSelectCategory={handleSelectCategory}
          />
        </Grid>
        <Grid item sm={7} xs={10}>
          {renderActiveView()}
        </Grid>
        <Grid item sm={3} className={classes.right}>
          <Rightbar
            activeCategory={activeCategory}
            onSelectCategory={handleSelectCategory}
          />
        </Grid>
      </Grid>
      <Add onAddPost={handleAddPost} />
      <ChatWidget />
      <CommandPalette
        open={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectCategory={handleSelectCategory}
      />
      <NotificationDrawer
        open={notifDrawerOpen}
        onClose={() => setNotifDrawerOpen(false)}
      />
      <MobileBottomNav
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* Logout Confirmation Dialog */}
      <Dialog open={logoutOpen} onClose={() => setLogoutOpen(false)} disableRestoreFocus>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out of Veerat Dev Web App?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              setLogoutOpen(false);
              setAlertMsg("Logged out successfully.");
              setActiveCategory("Homepage");
            }}
            color="secondary"
            variant="contained"
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={Boolean(alertMsg)}
        autoHideDuration={3000}
        onClose={() => setAlertMsg("")}
      >
        <Alert onClose={() => setAlertMsg("")} severity="info">
          {alertMsg}
        </Alert>
      </Snackbar>
    </div>
   </Paper>
  </ThemeProvider>
  );
};

export default App;