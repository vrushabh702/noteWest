import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { clientDocuments } from "../../../Routes/RouterPage";
import moment from "moment";

const renderTooltip = (props) => 
(
  <Tooltip id="button-tooltip">
    {props}
  </Tooltip>
);
export const ClientColumns2 = [
  {
    Header: 'Clients',
    accessor: 'full_name',
    Cell: ({ cell }) => (
      cell.row.original?.id ?(
      <Link to={clientDocuments.link +(cell.row.original.id) + '/6'}>
        {cell.row.original.first_name}
      </Link>
      ):(
        <Link to={clientDocuments.link +(cell.row.original.client_id) + '/6'}>
        {cell.row.original.first_name}
      </Link>
      )
    )
  },
  {
    // Header: 'Date of Birth',
    Header: () => <div style={{ textAlign: "center" }}>Date of Birth</div>,
    accessor: 'dob',
    Cell: ({cell}) => <div className="text-dark text-center">{moment(cell.row.original.dob).format('MM/DD/Y')}</div>
  },
  {
    Header: () => <div style={{ textAlign: "center" }}>Create New</div>,
    accessor: 'create_new',
    Cell: ({ cell }) => (
      <div className="text-center">
        <div className="d-flex justify-content-center flex-shrink-0">
          <Link to={clientDocuments.link + (cell.row.original.id)+'/1'} className="btn btn-icon btn-active-color-primary btn-sm me-1">
            <OverlayTrigger
              placement="bottom"
              className={"bg-dark"}
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip('Progress Notes')}
            >
              <button className="btn btn-sm btn-info py-1 px-2">PN</button>
            </OverlayTrigger>
          </Link>
          <Link to={clientDocuments.link + (cell.row.original.id)+'/4'} className="btn btn-icon btn-active-color-primary btn-sm me-1">
          <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip('Treatment Plan')}
            >
            <button className="btn btn-sm btn-success py-1 px-2">TP</button>
            </OverlayTrigger>
          </Link>
          <Link to={clientDocuments.link + (cell.row.original.id)+'/3'} className="btn btn-icon btn-active-color-primary btn-sm me-1">
          <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip('Assessment')}
            >
            <button className="btn btn-sm btn-warning py-1 px-2">AS</button>
            </OverlayTrigger>
          </Link>
          <Link to={clientDocuments.link + (cell.row.original.id)+'/5'} className="btn btn-icon btn-active-color-primary btn-sm me-1">
          <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip('Discharge Summary')}
            >
            <button className="btn btn-sm btn-primary py-1 px-2">DS</button>
            </OverlayTrigger>
          </Link>
        </div>
      </div>
    ),
  },
];  

export const pendingNotes = [
  {
    Header: 'Clients',
    accessor: 'full_name',
    Cell: ({ cell }) => (
      <Link to={clientDocuments.link + (cell.row.original.client_id) + '/6'}>
        {cell.row.original.first_name}
      </Link>
    )
  },
  {
    // Header: 'DOB',
    Header: () => <div style={{ textAlign: "center" }}>DOB</div>,
    accessor: 'dob',
    Cell: ({cell}) => <div className="text-dark text-center">{moment(cell.row.original.dob).format('MM/DD/Y')}</div>
  },
  {
    // Header: 'Last Service Date',
    Header: () => <div style={{ textAlign: "center" }}>Last Service Date</div>,
    accessor: 'last_service_date',
    Cell: ({cell}) => <div className="text-dark text-center">{cell.row.original?.latest_inprogress_doc?.date_of_service ? moment(cell.row.original.latest_inprogress_doc?.date_of_service ).format('MM/DD/Y') : cell.row.original?.dob ? moment(cell.row.original.dob).format('MM/DD/Y') :''}</div>
  },
  {
    Header: () => <div style={{ textAlign: "center" }}>Create New</div>,
    accessor: 'create_new',
    Cell: ({ cell }) => (
      <div className="text-center">
        <div className="d-flex justify-content-center flex-shrink-0">
          <Link to={clientDocuments.link + (cell.row.original.client_id)+'/1'} className="btn btn-icon btn-active-color-primary btn-sm me-1">
            <OverlayTrigger
              placement="bottom"
              className={"bg-dark"}
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip('Progress Notes')}
            >
              <button className="btn btn-sm btn-info py-1 px-2">PN</button>
            </OverlayTrigger>
          </Link>
          <Link to={clientDocuments.link + (cell.row.original.client_id)+'/4'} className="btn btn-icon btn-active-color-primary btn-sm me-1">
          <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip('Treatment Plan')}
            >
            <button className="btn btn-sm btn-success py-1 px-2">TP</button>
            </OverlayTrigger>
          </Link>
          <Link to={clientDocuments.link + (cell.row.original.client_id)+'/3'} className="btn btn-icon btn-active-color-primary btn-sm me-1">
          <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip('Assessment')}
            >
            <button className="btn btn-sm btn-warning py-1 px-2">AS</button>
            </OverlayTrigger>
          </Link>
          <Link to={clientDocuments.link + (cell.row.original.client_id)+'/5'} className="btn btn-icon btn-active-color-primary btn-sm me-1">
          <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip('Discharge Summary')}
            >
            <button className="btn btn-sm btn-primary py-1 px-2">DS</button>
            </OverlayTrigger>
          </Link>
        </div>
      </div>
    ),
  },
]; 

export const pendingSignatures = [
  {
    Header: 'Clients',
    accessor: 'full_name',
    Cell: ({ cell }) => (
      <Link to={clientDocuments.link + (cell.row.original.client_id) + '/6'}>
        {cell.row.original.first_name}
      </Link>
    )
  },
  {
    // Header: 'DOB',
    Header: () => <div style={{ textAlign: "center" }}>DOB</div>,
    accessor: 'dob',
    Cell: ({cell}) => <div className="text-dark text-center">{moment(cell.row.original.dob).format('MM/DD/Y')}</div>
  },
  {
    // Header: 'Last Service Date',
    Header: () => <div style={{ textAlign: "center" }}>Last Service Date</div>,
    accessor: 'last_service_date',
    Cell: ({cell}) => <div className="text-dark text-center">{cell.row.original?.latest_inprogress_doc?.date_of_service ? moment(cell.row.original.latest_inprogress_doc?.date_of_service ).format('MM/DD/Y') : cell.row.original?.dob ? moment(cell.row.original.dob).format('MM/DD/Y') :''}</div>
  },
  // {
  //   Header: () => <div style={{ textAlign: "center" }}>Create New</div>,
  //   accessor: 'create_new',
  //   Cell: ({ cell }) => (
  //     <div className="text-center">
  //       <div className="d-flex justify-content-center flex-shrink-0">
  //         <Link to={clientDocuments.link + (cell.row.original.client_id)+'/1'} className="btn btn-icon btn-active-color-primary btn-sm me-1">
  //           <OverlayTrigger
  //             placement="bottom"
  //             className={"bg-dark"}
  //             delay={{ show: 250, hide: 400 }}
  //             overlay={renderTooltip('Progress Notes')}
  //           >
  //             <button className="btn btn-sm btn-info py-1 px-2">PN</button>
  //           </OverlayTrigger>
  //         </Link>
  //         <Link to={clientDocuments.link + (cell.row.original.client_id)+'/4'} className="btn btn-icon btn-active-color-primary btn-sm me-1">
  //         <OverlayTrigger
  //             placement="bottom"
  //             delay={{ show: 250, hide: 400 }}
  //             overlay={renderTooltip('Treatment Plan')}
  //           >
  //           <button className="btn btn-sm btn-success py-1 px-2">TP</button>
  //           </OverlayTrigger>
  //         </Link>
  //         <Link to={clientDocuments.link + (cell.row.original.client_id)+'/3'} className="btn btn-icon btn-active-color-primary btn-sm me-1">
  //         <OverlayTrigger
  //             placement="bottom"
  //             delay={{ show: 250, hide: 400 }}
  //             overlay={renderTooltip('Assessment')}
  //           >
  //           <button className="btn btn-sm btn-warning py-1 px-2">AS</button>
  //           </OverlayTrigger>
  //         </Link>
  //         <Link to={clientDocuments.link + (cell.row.original.client_id)+'/5'} className="btn btn-icon btn-active-color-primary btn-sm me-1">
  //         <OverlayTrigger
  //             placement="bottom"
  //             delay={{ show: 250, hide: 400 }}
  //             overlay={renderTooltip('Discharge Summary')}
  //           >
  //           <button className="btn btn-sm btn-primary py-1 px-2">DS</button>
  //           </OverlayTrigger>
  //         </Link>
  //       </div>
  //     </div>
  //   ),
  // },
]; 