import { Link } from "react-router-dom";
import { editAccount, viewAccount } from "../../../Routes/RouterPage";

export const AccountColumns = [
    {
        Header: 'Full Name',
        accessor: 'full_name',             
        width: '200px',
        Cell: ({cell}) => (
          <Link to={viewAccount.link+(cell.row.original.id)}>
            { cell.row.original.full_name }
          </Link>
        )
    },
    {
        Header: 'Email',
        accessor: 'email',
        Cell: ({cell}) => <div className="text-dark">{cell.row.original.email}</div>
    },
    {
        Header: 'Company',
        accessor: 'company_name',
        Cell: ({cell}) => <div className="text-dark">{cell.row.original.company_name}</div>
    },
    {
        Header: 'Phone',
        accessor: 'phone_number',
        Cell: ({cell}) => <div className="text-dark">{cell.row.original.phone_number}</div>
    },
    {
        Header: 'Last Login',
        accessor: 'last_login',
        Cell: ({cell}) => <div className="text-dark">{cell.row.original.last_login}</div>
    },
    {
        Header: 'Status',
        Cell: ({ cell }) => (
            <span className={"badge badge-light-"+cell.row.original.package_color}>{cell.row.original.packages}</span>
        ),
        accessor: 'packages',
    },
    {
        Header: () => <div style={{ textAlign: "right", marginRight: '22px' }}>Action</div>,
        accessor: 'action',
        Cell: ({ cell }) => (            
          <div className="text-end">              
            <div className="d-flex justify-content-end flex-shrink-0">
            <Link to={viewAccount.link+(cell.row.original.id)} className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                <i className="fas fa-eye"/>
            </Link>
              <Link to={editAccount.link+(cell.row.original.id)} className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                <i className="fas fa-pencil-alt" />
              </Link>
            </div>
          </div>
        ),
      },
];  