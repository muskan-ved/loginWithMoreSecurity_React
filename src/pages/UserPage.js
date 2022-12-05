import { Helmet } from 'react-helmet-async';
import * as React from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
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
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserForm, UserListHead, UserListToolbar } from '../sections/@dashboard/user';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { VISITOR_ALL_DELETE, VISITOR_DELETE, VISITOR_LIST } from 'src/actions/visitor';
import { RECEPTION_LOGOUT } from 'src/actions/auth';
import { toast } from 'react-toastify';
import { LoaderFile } from 'src/common/loader';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'age', label: 'Age', alignRight: false },
  { id: 'emailAddress', label: 'Email', alignRight: false },
  { id: 'phoneNumber', label: 'Contact', alignRight: false },
  { id: 'address', label: 'Address', alignRight: false },
  { id: 'purposeToVisit', label: 'Purpose To Visit', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function UserPage() {
  const [open, setOpen] = React.useState(false);
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [selected, setSelected] = React.useState([]);
  const [filterName, setFilterName] = React.useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [loading, setLoading] = React.useState(false);
  const [loading1, setLoading1] = React.useState(false);
  const [editId, setEditId] = React.useState("");
  const [name, setName] = React.useState("");

  const ReduxStore = useSelector((state) => state);
  const ReduxStoreVisitor = ReduxStore?.visitor?.visitor_list.visitors;

  const navigate = useNavigate()
  const dispatch = useDispatch()

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

  React.useEffect(() => {
    setLoading(true);
    handleVisitorList("");
  }, []);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleVisitorById = async (id,name) => {
    setEditId(id);
	  setName(name)
  };

  const handleClose = (identifier) => {
    if(identifier === 'add'){
      setOpenAddModal(false);
    }else{
      setOpenDeleteModal(false);
    }
  };

  const handleDelete = async () => {
      const requestData = {
        headerAuthToken: ReduxStore.auth.auth_token,
        headerLoginToken: ReduxStore.auth.login_token,
        id: editId,
      };
  setLoading1(true)
      await dispatch(
        VISITOR_DELETE(requestData, (res) => {
          if (res?.response?.status === 401) {
            RECEPTION_LOGOUT();
          } else if (res?.response?.data?.message) {
            toast.error(res?.response?.data?.message);
          } else {
            toast.success("Visitor Deleted");
            handleVisitorList("");
            handleClose('delete');
          }
          setLoading1(false)
        })
      );  
  }

  const handleAllDelete = async () => {
    const requestData = {
      headerAuthToken: ReduxStore.auth.auth_token,
      headerLoginToken: ReduxStore.auth.login_token,
      payload: selected,
    };

    await dispatch(
      VISITOR_ALL_DELETE(requestData, (res) => {
        if (res?.response?.status === 401) {
          RECEPTION_LOGOUT();
        } else if (res?.response?.data?.message) {
          toast.error(res?.response?.data?.message);
        } else {
          toast.success("Selected Visitors are Deleted");
          handleVisitorList("");
          setSelected([]);
        }
      })
    );  
}

  const handleClickVisitorDetail = (identifier) => {
    if (identifier === "edit") {
      navigate(`/dashboard/edit/${editId}`);
    } else if (identifier === "visitor detail") {
      navigate(`/dashboard/yourDetail/${editId}`);
    } else if(identifier === "delete") {
      setOpenDeleteModal(true);
      handleCloseMenu(false);
    }else if(identifier === "add"){
      navigate(`/dashboard/add`);
    }
  }


  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = ReduxStoreVisitor.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, Name) => {
    const selectedIndex = selected.indexOf(Name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, Name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ReduxStoreVisitor.length) : 0;

  // const isNotFound = !ReduxStoreVisitor?.length && !!filterName;


  if (loading) {
    return <LoaderFile />;
  }

  return (
    <>
      <Helmet>
        <title> User | Booking Direction </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Visitor
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleClickVisitorDetail('add')}>
            Add New
          </Button>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} handleAllDelete={handleAllDelete}/>

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  headLabel={TABLE_HEAD}
                  rowCount={ReduxStoreVisitor?.length}
                  numSelected={selected.length}
                  onSelectAllClick={handleSelectAllClick}
                  component='visitor'
                />
                <TableBody>
                  {ReduxStoreVisitor?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const {  _id,
                      Name,
                      age,
                      emailAddress,
                      status,
                      phoneNumber,
                      avatarUrl,
                      address,
                      purposeToVisit,} = row;
                    const selectedUser = selected.indexOf(_id) !== -1;

                    return (
                      <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, _id)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
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
                        <TableCell align="left">{purposeToVisit }</TableCell>

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

                        <TableCell align="right"  onClick={() => {
                                  handleVisitorById(_id,Name);
                                }}>
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
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

                {ReduxStoreVisitor?.length === 0 ||
                    ReduxStoreVisitor === undefined ?(
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={8} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ):''}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={ReduxStoreVisitor?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 150,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={() => handleClickVisitorDetail('edit')}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <MenuItem onClick = {() => handleClickVisitorDetail('visitor detail')}>
          <Iconify icon={'eva:person-fill'} sx={{ mr:2  }} />
           Visitor Detail
        </MenuItem>
        <MenuItem sx={{ color: 'error.main' }} onClick = {() => handleClickVisitorDetail('delete')}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
      {/* ****** ADD NEW VISITOR ****** */}
      <Box>
      <Dialog
        open={openAddModal}
        keepMounted
        onClose={() => handleClose('add')}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box  sx={{display: "flex",justifyContent: "space-between"}}>
        <DialogTitle textAlign={'center'} >{"Add New Visitor"}</DialogTitle>
        <Iconify icon={'eva:close-outline'} onClick={() => handleClose('add')} sx={{ color: "#103996",width: "30px",height: "28px", margin: "3px",cursor:"pointer"}} />
        </Box>
        <DialogContent>
            <UserForm handleVisitorList={handleVisitorList}/>
        </DialogContent>
      </Dialog>
    </Box>


     {/* ****** DELETE VISITOR ****** */}
     <Box>
      <Dialog
        open={openDeleteModal}
        keepMounted
        onClose={() => handleClose('delete')}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle textAlign={'center'} sx={{color:'red'}}>Delete Visitor</DialogTitle>
        <DialogContent>
            Are you sure to remove the '{name}' 
        </DialogContent>
        <DialogActions>
          <Button   fullWidth   
        size="large"
        type="submit"
        variant="contained"
        disabled={loading1 ? true : false} onClick={handleDelete}>Delete</Button>
          <Button  fullWidth   
        size="large"
        type="submit"
        variant="outlined" onClick={() => handleClose('delete')}>Discard</Button>
        </DialogActions>
      </Dialog>
    </Box>
    </>
  );
}
