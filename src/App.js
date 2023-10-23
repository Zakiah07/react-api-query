import {
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import "./App.css";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { fetchProfiles } from "./api";
import { useState } from "react";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProfileList />
    </QueryClientProvider>
  );
}

function ProfileList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isHovered, setIsHovered] = useState(null);
  const [username, setUsername] = useState("");
  const [filteredProfile, setFilteredProfile] = useState([]);
  const [selectedOption, setSelectedOption] = useState("All");

  const { isPending, isError, error, data } = useQuery({
    queryKey: ["profiles", currentPage],
    queryFn: () => fetchProfiles(currentPage),
  });

  if (isPending) {
    return <CircularProgress />;
  }

  if (isError) {
    return (
      <Typography
        variant="h5"
        color="error"
      >
        Error: {error.message}
      </Typography>
    );
  }

  const handlePagination = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = data.total_pages;
  // console.log(totalPages);

  const handleMouseOver = (item) => {
    setIsHovered(item);
  };

  const handleMouseLeave = () => {
    setIsHovered(null);
  };

  const filteredUsers = data.data.filter((user) => {
    const fullName = `${user.first_name} ${user.last_name}`;
    return fullName.toLowerCase().includes(username.toLowerCase());
  });

  const handleChange = (e) => {
    setSelectedOption(e.target.value);

    if (e.target.value === "All") {
      setUsername(e.target.value);
      setFilteredProfile([]);
    } else {
      setUsername(e.target.value);
      setFilteredProfile(filteredUsers);
    }
  };

  const displayUsers = selectedOption === "All" ? data.data : filteredUsers;
  // console.log("user", displayUsers);

  return (
    <div className="App">
      <Typography variant="h4">Users List</Typography>
      <FormControl>
        <InputLabel id="username-selection">Find User</InputLabel>
        <Select
          className="input-selection"
          labelId="username-selection"
          id="username-selection"
          label="Username"
          value={username}
          onChange={handleChange}
        >
          <MenuItem value="All">All</MenuItem>
          {data.data.map((user) => {
            return (
              <MenuItem
                key={user.id}
                value={`${user.first_name} ${user.last_name}`}
              >
                {user.first_name} {user.last_name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Grid
        container
        spacing={2}
      >
        {displayUsers.map((item) => {
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={item.id}
            >
              <Paper
                variant="outlined primary"
                key={item.id}
                onMouseOver={() => handleMouseOver(item)}
                onMouseLeave={handleMouseLeave}
                className="profile-card"
              >
                {isHovered === item ? (
                  <div className="profile-content">
                    <Typography>ID: {item.id}</Typography>
                    <Typography variant="h6">
                      {item.first_name} {item.last_name}
                    </Typography>
                    <Typography variant="subtitle2">{item.email}</Typography>
                  </div>
                ) : (
                  <img
                    src={item.avatar}
                    alt={item.first_name}
                  />
                )}
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      {totalPages > 1 && displayUsers.length >= 6 && (
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePagination}
          variant="outlined"
          shape="rounded"
          className="pagination"
        />
      )}
    </div>
  );
}

export default App;
