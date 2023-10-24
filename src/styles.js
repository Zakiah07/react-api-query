import {
  FormControl,
  Grid,
  Pagination,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

export const FormControlStyled = styled(FormControl)`
  margin-bottom: 30px;
  margin-top: 30px;
`;

export const StyledSelect = styled(Select)`
  width: 200px;
`;

export const StyledGrid = styled(Grid)`
  display: flex;
  justify-content: center;
`;

export const StyledPaper = styled(Paper)`
  border: 7px solid turquoise;
  text-align: center;
  width: 128px;
  height: 128px;
  position: relative;

  &:nth-child(3n + 2) {
    border-color: orange;
  }

  img {
    transition: 0.5s ease-in-out;
    position: absolute;
    top: 0;
    left: 0;
  }

  &:hover {
    background-color: white;

    img {
      display: none;
      opacity: 0;
    }

    .profile-content {
      display: flex;
      opacity: 1;
    }
  }

  .profile-content {
    opacity: 0;
    display: none;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: 0.2s ease-out;
  }
`;

export const StyledTypography = styled(Typography)`
  font-size: 10px;
`;

export const StyledPagination = styled(Pagination)`
  margin-top: 30px;
`;
