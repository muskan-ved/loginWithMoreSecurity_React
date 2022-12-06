import { Helmet } from "react-helmet-async";
// components
import Iconify from "../components/iconify";
// sections
import { AppWidgetSummary } from "../sections/@dashboard/app";

import { useEffect, useState } from "react";
// @mui
import {
  Grid,
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Box,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
// components
import Label from "../components/label";
import Scrollbar from "../components/scrollbar";
// sections
import {
  UserListHead,
  UserListToolbar,
} from "../sections/@dashboard/user";
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  VISITOR_DELETE,
  VISITOR_LIST,
} from "src/actions/visitor";
import { toast } from "react-toastify";
import { LoaderFile } from "src/common/loader";
import moment from "moment";
import { RECEPTION_LOGOUT } from "src/actions/auth";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "age", label: "Age", alignRight: false },
  { id: "emailAddress", label: "Email", alignRight: false },
  { id: "phoneNumber", label: "Contact", alignRight: false },
  { id: "address", label: "Address", alignRight: false },
  { id: "purposeToVisit", label: "Purpose To Visit", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "" },
];

export default function DashboardAppPage(props) {

  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const ReduxStore = useSelector((state) => state);
  const ReduxStoreVisitor = ReduxStore?.visitor?.visitor_list;
  const todayDate = moment().format("YYYY-MM-DD");

  const filterVisitor = ReduxStoreVisitor?.visitors?.filter(
    (item) =>
      item?.status === "checkin" &&
      moment(item?.checkInTime).format("YYYY-MM-DD") === todayDate
  );

  const navigate = useNavigate();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleVisitorList = async (data) => {
    const requestData = {
      headerAuthToken: ReduxStore.auth.auth_token,
      headerLoginToken: ReduxStore.auth.login_token,
      search: data,
    };

    await dispatch(
      VISITOR_LIST(requestData, (res) => {
        if (res?.response?.status === 401) {
          RECEPTION_LOGOUT();
        } else if (res?.response?.data?.message) {
          toast.error(res?.response?.data?.message);
        }else{
		}
      })
    );
    setLoading(false);
  };

  const handleVisitorById = async (id,name) => {
    setEditId(id);
	setName(name)
  };

  useEffect(() => {
    setLoading(true);
    handleVisitorList("");
  },[]);

  const handleClose = () => {
    setOpenDeleteModal(false);
  };

  const handleDelete = async () => {
    const requestData = {
      headerAuthToken: ReduxStore.auth.auth_token,
      headerLoginToken: ReduxStore.auth.login_token,
      id: editId,
    };

    await dispatch(
      VISITOR_DELETE(requestData, (res) => {
        if (res?.response?.status === 401) {
          RECEPTION_LOGOUT();
        } else if (res?.response?.data?.message) {
          toast.error(res?.response?.data?.message);
        } else {
          toast.success("Visitor Deleted");
          handleVisitorList("");
          handleClose();
        }
      })
    );
  };

  const handleClickVisitorDetail = (identifier) => {
    if (identifier === "edit") {
      navigate(`/dashboard/edit/${editId}`);
    } else if (identifier === "visitor detail") {
      navigate(`/dashboard/yourDetail/${editId}`);
    } else {
      setOpenDeleteModal(true);
      handleCloseMenu(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
    handleVisitorList(event.target.value);
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filterVisitor?.length)
      : 0;

  if (loading) {
    return <LoaderFile />;
  }

  return (
    <>
      <Helmet>
        <title> Dashboard | Booking Direction </title>
      </Helmet>
      <a
               className={'contanier'}
               href={props.page || '#'}>
               {props.page}
           </a>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummary
              title="Total Visitors"
              total={ReduxStoreVisitor.totalRecords > 0 ? ReduxStoreVisitor.totalRecords : 0}
              icon={"ant-design:user-outlined"}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <AppWidgetSummary
              title="Today Check-in Visitors"
              total={filterVisitor?.length > 0 ? filterVisitor?.length : 0}
              color="info"
              icon={"ant-design:user-add-outlined"}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Card>
              <UserListToolbar
                filterName={filterName}
                onFilterName={handleFilterByName}
              />

              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <UserListHead
                      headLabel={TABLE_HEAD}
                      rowCount={filterVisitor?.length}
                      component="dashboard"
                    />

                    <TableBody>
                      {filterVisitor
                        ?.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          const {
                            _id,
                            Name,
                            age,
                            emailAddress,
                            status,
                            phoneNumber,
                            avatarUrl,
                            address,
                            purposeToVisit,
                          } = row;

                          return (
                            <TableRow
                              hover
                              key={_id}
                              tabIndex={-1}
                              role="checkbox"
                            >
                              <TableCell component="th" scope="row">
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={2}
                                >
                                  <Avatar alt={Name} src={avatarUrl} />
                                  <Typography variant="subtitle2" noWrap>
                                    {Name}
                                  </Typography>
                                </Stack>
                              </TableCell>

                              <TableCell align="left">{age}</TableCell>
                              <TableCell align="left">{emailAddress}</TableCell>
                              <TableCell align="left">{phoneNumber}</TableCell>

                              <TableCell align="left">{address}</TableCell>
                              <TableCell align="left">
                                {purposeToVisit}
                              </TableCell>

                              <TableCell align="left">
                                <Label
                                  color={
                                    status === "checkin"
                                      ? "success"
                                      : status === "checkout"
                                      ? "error"
                                      : "warning"
                                  }
                                >
                                  {status === "none"
                                    ? "PENDING"
                                    : status.toUpperCase()}
                                </Label>
                              </TableCell>

                              <TableCell
                                align="right"
                                onClick={() => {
                                  handleVisitorById(_id,Name);
                                }}
                              >
                                <IconButton
                                  size="large"
                                  color="inherit"
                                  onClick={handleOpenMenu}
                                >
                                  <Iconify icon={"eva:more-vertical-fill"} />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>

                    {filterVisitor?.length === 0 ||
                    filterVisitor === undefined ? (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={7} sx={{ py: 3 }}>
                            <Paper
                              sx={{
                                textAlign: "center",
                              }}
                            >
                              <Typography variant="h6" paragraph>
                                Not found
                              </Typography>

                              <Typography variant="body2">
                                No results found for &nbsp;
                                <strong>&quot;{filterName}&quot;</strong>.
                                <br /> Try checking for typos or using complete
                                words.
                              </Typography>
                            </Paper>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    ) : (
                      ""
                    )}
                  </Table>
                </TableContainer>
              </Scrollbar>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filterVisitor ? filterVisitor.length : "1"}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>

            <Popover
              open={Boolean(open)}
              anchorEl={open}
              onClose={handleCloseMenu}
              anchorOrigin={{ vertical: "top", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              PaperProps={{
                sx: {
                  p: 1,
                  width: 140,
                  "& .MuiMenuItem-root": {
                    px: 1,
                    typography: "body2",
                    borderRadius: 0.75,
                  },
                },
              }}
            >
              <MenuItem onClick={() => handleClickVisitorDetail("edit")}>
                <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
                Edit
              </MenuItem>
              <MenuItem
                onClick={() => handleClickVisitorDetail("visitor detail")}
              >
                <Iconify icon={"eva:person-fill"} />
                &nbsp;&nbsp;Visitor Detail
              </MenuItem>
              <MenuItem
                sx={{ color: "error.main" }}
                onClick={() => handleClickVisitorDetail("delete")}
              >
                <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
                Delete
              </MenuItem>
            </Popover>

            {/* ****** DELETE VISITOR ****** */}
            <Box>
              <Dialog
                open={openDeleteModal}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle textAlign={"center"} sx={{ color: "red" }}>
                  Delete Visitor
                </DialogTitle>
                <DialogContent>
                  Are you sure to remove the '{name}'
                </DialogContent>
                <DialogActions>
                  <Button
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                  <Button
                    fullWidth
                    size="large"
                    type="submit"
                    variant="outlined"
                    onClick={handleClose}
                  >
                    Discard
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
