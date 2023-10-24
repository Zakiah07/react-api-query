import {
  CircularProgress,
  Grid,
  InputLabel,
  MenuItem,
  Typography,
} from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { fetchProfiles } from "./api";
import { useState } from "react";
import {
  Container,
  FormControlStyled,
  StyledGrid,
  StyledPagination,
  StyledPaper,
  StyledSelect,
  StyledTypography,
} from "./styles";

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
    <Container>
      <Typography variant="h4">User Profile List</Typography>
      <FormControlStyled>
        <InputLabel id="username-selection">Find User</InputLabel>
        <StyledSelect
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
        </StyledSelect>
      </FormControlStyled>
      <Grid
        className="container"
        container
        spacing={2}
      >
        {displayUsers.map((item) => {
          return (
            <StyledGrid
              item
              xs={12}
              sm={6}
              md={4}
              key={item.id}
            >
              <StyledPaper
                variant="outlined"
                key={item.id}
                className="profile-card"
              >
                <div className="profile-content">
                  <Typography>ID: {item.id}</Typography>
                  <Typography variant="h6">
                    {item.first_name} {item.last_name}
                  </Typography>
                  <StyledTypography>{item.email}</StyledTypography>
                </div>
                <img
                  src={item.avatar}
                  alt={item.first_name}
                />
              </StyledPaper>
            </StyledGrid>
          );
        })}
      </Grid>

      {totalPages > 1 && displayUsers.length >= 6 && (
        <StyledPagination
          count={totalPages}
          page={currentPage}
          onChange={handlePagination}
          variant="outlined"
          shape="rounded"
          className="pagination"
        />
      )}
    </Container>
  );
}

export default App;
