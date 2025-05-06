import axios from "axios";
import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import { FbDeleteJob } from "./FbDeleteJob";

//import "ag-grid-community/styles/ag-grid.css";
//import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  ModuleRegistry,
  ClientSideRowModelModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  CustomFilterModule,
  ExternalFilterModule,
  QuickFilterModule,
  themeAlpine,
  colorSchemeLightCold,
  ColumnAutoSizeModule, // Import the missing module
} from "ag-grid-community";
import { RefreshButton } from "../utilities/RefreshButton";

ModuleRegistry.registerModules([
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  CustomFilterModule,
  ExternalFilterModule,
  QuickFilterModule,
  ClientSideRowModelModule,
  ColumnAutoSizeModule, // Register the module
]);

function FacebookGetList() {
  const [items, setItems] = useState([]);
  const myTheme = themeAlpine.withPart(colorSchemeLightCold);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const serverHost = process.env.REACT_APP_API_URL;
  const serverPort = process.env.REACT_APP_API_PORT;

  const navigate = useNavigate();

  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      filter: true,
    };
  }, []);

  const containerStyle = useMemo(
    () => ({ width: "100%", height: "99%", overflow: "auto" }),
    []
  );
  const gridStyle = useMemo(() => ({ height: "99%", width: "100%" }), []);
  const gridApiRef = useRef(null);

  const onGridReady = useCallback((params) => {
    gridApiRef.current = params.api;
    // Now you can safely use gridApiRef.current
    console.log("Grid is ready, API:", gridApiRef.current);
    // Auto-size columns here, or trigger another function to do so
    params.api.autoSizeAllColumns(); // Initial auto-size
  }, []);

  useEffect(() => {
    console.log(`resizing reached`, gridApiRef.current);
    if (gridApiRef.current && gridApiRef.current.api) {
      setTimeout(() => {
        gridApiRef.current.api.autoSizeAllColumns();
      }, 0); // Delay the auto-sizing to allow the grid to render
    }
  }, [items]);

  // Data Fetching
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        //const postURL = `${serverHost}:${serverPort}/api/get-job-list`;
        const getURL = `${serverHost}/api/get-job-list`;
        console.log(`getURL is`, getURL);

        const response = await axios.get(
          getURL // Replace with your actual API endpoint
        );
        console.log(`facebookGetList response.data is`, response.data[0]);
        setItems(response.data[0]); // Assuming the API returns an array of objects
      } catch (err) {
        setError(err);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [serverHost, serverPort]); // Empty dependency array means this runs only once on mount

  /*const TokenStatusCellRenderer = useCallback((params) => {
    const status = params.value; // The tokenStatus value ("Active" or "Expired")

    const style = {
      color: status === "Expired" ? "red" : "inherit", // Red if Expired, otherwise default
    };

    return <span style={style}>{status}</span>;
  }, []);*/

  const JobStatusCellRenderer = useCallback((params) => {
    const value = params.value;
    const tokenStatusStyle = {
      color: value !== 1 ? "red" : "inherit",
    };

    const jobStatusText = value === 1 ? "Active" : "Inactive";

    return <div style={tokenStatusStyle}>{jobStatusText}</div>;
  }, []);

  const ActionButtons = useCallback(
    (params) => {
      const handleEditClick = () => {
        navigate(`/FbDetail/${params.data.job_id}`); // Navigate to the edit page
      };

      const handleDeleteClick = () => {
        FbDeleteJob(params.data.job_id);
        const refresh = new RefreshButton();
        refresh.handleRefresh();
      };
      /*const handleInactiveClick = () => {
        FbInactiveJob();
        const refresh = new RefreshButton();
        refresh.handleRefresh();
      };*/

      return (
        <div
          style={{
            display: "flex",
            gap: "4px",
            justifyContent: "center",
          }}
        >
          <button
            className="list-action-button flex-1"
            onClick={handleEditClick}
          >
            Edit
          </button>
          <button
            className="list-action-button flex-1"
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        </div>
      );
    },
    [navigate]
  ); // Add navigate as a dependency

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Action",
        cellRenderer: ActionButtons,
        filter: false,
        autoSize: true, // Try this as well
      },
      {
        headerName: "Job Status",
        field: "job_status",
        cellRenderer: JobStatusCellRenderer,
        sortable: true,
        filter: true,
        autoSize: true, // Try this as well
      },
      { headerName: "Job ID", field: "job_id", sortable: true, filter: true },
      {
        headerName: "From",
        field: "select_from",
        sortable: true,
        filter: true,
        autoSize: true, // Try this as well
      },
      {
        headerName: "To",
        field: "select_to",
        sortable: true,
        filter: true,
        autoSize: true,
      },
      {
        headerName: "Email",
        field: "email",
        sortable: true,
        filter: true,
        autoSize: true,
      },
      {
        headerName: "Frequency",
        field: "freq",
        sortable: true,
        filter: true,
        autoSize: true,
      },
      {
        headerName: "Last Run",
        field: "last_run",
        sortable: true,
        filter: true,
        autoSize: true,
      },

      /*{
        headerName: "Token Status",
        field: "tokenStatus",
        cellRenderer: TokenStatusCellRenderer,
        sortable: true,
        filter: true,
      },
      {
        headerName: "Expiry Date",
        field: "expiry_date",
        sortable: true,
        filter: true,
      },*/
    ],
    [ActionButtons, JobStatusCellRenderer]
  );

  // Loading and Error Handling UI
  if (loading) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div style={containerStyle} className="w-full">
      <div style={gridStyle}>
        <AgGridReact
          rowData={items}
          columnDefs={columnDefs}
          theme={myTheme}
          defaultColDef={defaultColDef}
          //onGridReady={(params) => (gridApiRef.current = params.api)}
          onGridReady={onGridReady} // Pass the callback to AgGridReact
        />
      </div>
    </div>
  );
}

export default FacebookGetList;
