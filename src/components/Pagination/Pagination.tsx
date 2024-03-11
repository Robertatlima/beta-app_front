import React from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface PaginationProps {
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, newPage: number) => void;
  count: number;
}

const CustomPagination: React.FC<PaginationProps> = ({
  page,
  onChange,
  count,
}) => {
  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        page={page}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
        onChange={onChange as any}
      />
    </Stack>
  );
};

export default Pagination;
