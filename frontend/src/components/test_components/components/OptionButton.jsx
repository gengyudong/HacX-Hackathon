import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AnalyseIcon from "@mui/icons-material/Insights";
import GoToIcon from "@mui/icons-material/Place";
import LoadingBackdrop from "./LoadingBackdrop";
import ValidationDialog from "./ValidationDialog";
import AlertDialog from "./AlertDialog";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
    ...theme.applyStyles("dark", {
      color: theme.palette.grey[300],
    }),
  },
}));

export default function OptionButton({source}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [loading, setLoading] = React.useState(false);
  const [empty, setEmpty] = React.useState(true);
  const [result, setResult] = React.useState({});
  const [alert, setAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [openDialog, setOpenDialog] = React.useState(false);
  
  const fact_source = source;
  const source_url = source.sourceURL;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
};
  const handleGoto = () => {
    setAnchorEl(null);
    window.open(source_url, "_blank", "noopener,noreferrer");
  };

  console.log("soure: ", source);

  const handleValidate = async (event) => {
    event.preventDefault(); // Prevent default behavior if using a form
    console.log("Analyse URL: ", source_url);
    setAnchorEl(null);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post_url: source_url }),
      });

      if (!response.ok) {
        setLoading(false);
        setAlertMessage("Invalid URL. Please enter a valid URL.");
        setAlert(true);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);
      setResult(data);
      setOpenDialog(true);
      setLoading(false);
      setEmpty(false);
    } catch (error) {
      console.error("Error:", error);
      setAlertMessage(error.message);
      setAlert(true);
      setLoading(false);
    }
  };

  return (
    <div>
      <AlertDialog message={alertMessage} open={alert} setOpen={setAlert} />
      {loading ? <LoadingBackdrop /> : null}
      <Button
        id="customized-button"
        aria-controls={open ? "customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="text"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        size="small"
      >
        {fact_source.sourceName}
      </Button>
      <StyledMenu
        id="customized-menu"
        MenuListProps={{
          "aria-labelledby": "customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ fontSize: "0.8rem" }}
      >
        <MenuItem
          onClick={handleGoto}
          disableRipple
          sx={{ fontSize: "0.8rem" }}
        >
          <GoToIcon />
          Go to Post
        </MenuItem>
        <MenuItem
          onClick={handleValidate}
          disableRipple
          sx={{ fontSize: "0.8rem" }}
        >
          <AnalyseIcon />
          Source Analysis
        </MenuItem>
      </StyledMenu>
      {openDialog ? (
        <ValidationDialog
          result={result}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
      ) : null}
    </div>
  );
}
