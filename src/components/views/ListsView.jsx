import {
    Box,
    Button,
    Checkbox,
    Chip,
    Container,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles,
    Paper,
    Select,
    MenuItem,
    Tab,
    Tabs,
    TextField,
    Typography,
    Snackbar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    LinearProgress,
} from "@material-ui/core";
import { Add, Delete, PlaylistAdd, Search, Clear, FilterList, CheckCircle } from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(6),
    },
    topHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: theme.spacing(2),
        marginBottom: theme.spacing(3),
    },
    filterBar: {
        display: "flex",
        gap: theme.spacing(2),
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
        alignItems: "center",
        flexWrap: "wrap",
        [theme.breakpoints.down("xs")]: {
            flexDirection: "column",
            alignItems: "stretch",
        },
    },
    completedText: {
        textDecoration: "line-through",
        color: theme.palette.text.disabled,
    },
    taskPaper: {
        borderRadius: theme.shape.borderRadius,
        overflow: "hidden",
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const initialTasks = [
    { id: 1, text: "Finish Material-UI responsive layout project", priority: "High", completed: false },
    { id: 2, text: "Review pull requests from frontend team", priority: "Medium", completed: true },
    { id: 3, text: "Prepare documentation for new API endpoints", priority: "High", completed: false },
    { id: 4, text: "Update component unit tests", priority: "Low", completed: false },
    { id: 5, text: "Design responsive grid view for marketplace products", priority: "Medium", completed: true },
];

const priorityColors = {
    High: "secondary",
    Medium: "primary",
    Low: "default",
};

const ListsView = () => {
    const classes = useStyles();
    const [tasks, setTasks] = useState(initialTasks);
    
    // Search & Filter states
    const [searchQuery, setSearchQuery] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("All");
    const [tab, setTab] = useState(0);
    
    const [alertMsg, setAlertMsg] = useState("");
    
    // Quick Add Modal state
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogText, setDialogText] = useState("");
    const [dialogPriority, setDialogPriority] = useState("Medium");

    const handleAddDialogTask = (e) => {
        if (e) e.preventDefault();
        const trimmedText = dialogText.trim();
        if (!trimmedText) return;

        const newTask = {
            id: Date.now(),
            text: trimmedText,
            priority: dialogPriority,
            completed: false,
        };

        setTasks([newTask, ...tasks]);
        setDialogText("");
        setDialogOpen(false);
        setAlertMsg(`Task added: "${trimmedText}"`);
    };

    const toggleTask = (id) => {
        setTasks(
            tasks.map((t) => {
                if (t.id === id) {
                    const newStatus = !t.completed;
                    setAlertMsg(newStatus ? "Task marked completed!" : "Task reactivated.");
                    return { ...t, completed: newStatus };
                }
                return t;
            })
        );
    };

    const deleteTask = (id, e) => {
        if (e) e.stopPropagation();
        setTasks(tasks.filter((t) => t.id !== id));
        setAlertMsg("Task removed.");
    };

    // Progress metrics calculation
    const completedCount = tasks.filter((t) => t.completed).length;
    const totalCount = tasks.length;
    const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    // Filter Tasks by Search Query, Priority Filter, and Status Tab
    const filteredTasks = tasks.filter((t) => {
        const matchesSearch = t.text.toLowerCase().includes(searchQuery.toLowerCase().trim());
        const matchesPriority = priorityFilter === "All" || t.priority === priorityFilter;
        const matchesStatus =
            tab === 0 ? true : tab === 1 ? !t.completed : t.completed;

        return matchesSearch && matchesPriority && matchesStatus;
    });

    return (
        <Container className={classes.container}>
            <Box className={classes.topHeader}>
                <Box>
                    <Typography variant="h4" gutterBottom>
                        My Task Lists
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Organize your daily tasks, project goals, and checklists with instant search and priority filters.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PlaylistAdd />}
                    onClick={() => setDialogOpen(true)}
                >
                    New Task Form
                </Button>
            </Box>

            {/* Task Completion Progress Metric Card */}
            <Paper style={{ padding: 16, marginBottom: 20 }} elevation={2}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <Typography variant="subtitle2" style={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: 6 }}>
                        <CheckCircle color="primary" fontSize="small" /> Task Completion Progress
                    </Typography>
                    <Chip label={`${completionPercentage}% Completed (${completedCount}/${totalCount})`} color="primary" size="small" />
                </div>
                <LinearProgress variant="determinate" value={completionPercentage} style={{ height: 8, borderRadius: 4 }} />
            </Paper>

            {/* Search & Priority Filter Controls Bar */}
            <Paper className={classes.filterBar} elevation={2}>
                <TextField
                    style={{ flexGrow: 1 }}
                    variant="outlined"
                    size="small"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search color="action" />
                            </InputAdornment>
                        ),
                        endAdornment: searchQuery ? (
                            <InputAdornment position="end">
                                <IconButton size="small" onClick={() => setSearchQuery("")}>
                                    <Clear />
                                </IconButton>
                            </InputAdornment>
                        ) : null,
                    }}
                />
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <FilterList color="action" style={{ marginRight: 4 }} />
                    <Typography variant="body2" color="textSecondary" style={{ marginRight: 8, whiteSpace: "nowrap" }}>
                        Filter Priority:
                    </Typography>
                    <Select
                        variant="outlined"
                        size="small"
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                        style={{ minWidth: 140 }}
                    >
                        <MenuItem value="All">All Priorities</MenuItem>
                        <MenuItem value="High">High Only</MenuItem>
                        <MenuItem value="Medium">Medium Only</MenuItem>
                        <MenuItem value="Low">Low Only</MenuItem>
                    </Select>
                </div>
            </Paper>

            {/* Filter Tabs */}
            <Paper style={{ marginBottom: 16 }}>
                <Tabs value={tab} onChange={(e, val) => setTab(val)} indicatorColor="primary" textColor="primary" centered variant="fullWidth">
                    <Tab label={`All Tasks (${tasks.length})`} />
                    <Tab label={`Active (${tasks.filter((t) => !t.completed).length})`} />
                    <Tab label={`Completed (${tasks.filter((t) => t.completed).length})`} />
                </Tabs>
            </Paper>

            {/* Task List */}
            <Paper className={classes.taskPaper} elevation={3}>
                <List disablePadding>
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map((task) => (
                            <ListItem key={task.id} button onClick={() => toggleTask(task.id)} divider>
                                <ListItemIcon>
                                    <Checkbox checked={task.completed} edge="start" color="primary" readOnly />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography className={task.completed ? classes.completedText : ""}>
                                            {task.text}
                                        </Typography>
                                    }
                                />
                                <Chip
                                    label={task.priority}
                                    color={priorityColors[task.priority]}
                                    size="small"
                                    style={{ marginRight: 16 }}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" color="secondary" onClick={(e) => deleteTask(task.id, e)}>
                                        <Delete />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))
                    ) : (
                        <Box padding={4} textAlign="center">
                            <Typography color="textSecondary" variant="subtitle1" gutterBottom>
                                No tasks match your current search or filter criteria.
                            </Typography>
                            {(searchQuery || priorityFilter !== "All") && (
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    onClick={() => {
                                        setSearchQuery("");
                                        setPriorityFilter("All");
                                    }}
                                    style={{ marginTop: 8 }}
                                >
                                    Clear Search & Filters
                                </Button>
                            )}
                        </Box>
                    )}
                </List>
            </Paper>

            {/* Quick Add Modal Dialog */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} disableRestoreFocus maxWidth="xs" fullWidth>
                <form onSubmit={handleAddDialogTask}>
                    <DialogTitle>Add New Task</DialogTitle>
                    <DialogContent dividers>
                        <TextField
                            fullWidth
                            autoFocus
                            label="Task Description"
                            variant="outlined"
                            size="small"
                            value={dialogText}
                            onChange={(e) => setDialogText(e.target.value)}
                            style={{ marginBottom: 16 }}
                            required
                        />
                        <TextField
                            select
                            fullWidth
                            label="Priority Level"
                            variant="outlined"
                            size="small"
                            value={dialogPriority}
                            onChange={(e) => setDialogPriority(e.target.value)}
                        >
                            <MenuItem value="High">High</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="Low">Low</MenuItem>
                        </TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                        <Button type="submit" variant="contained" color="primary">
                            Save Task
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            <Snackbar open={Boolean(alertMsg)} autoHideDuration={3000} onClose={() => setAlertMsg("")}>
                <Alert onClose={() => setAlertMsg("")} severity="success">
                    {alertMsg}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ListsView;
