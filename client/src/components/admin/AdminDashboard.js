import React, { Fragment, useState, useEffect } from 'react';
import DataTable from "react-data-table-component";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import { getAllUsers, changeAllowUser } from '../../actions/auth'
import { getAllPDFS, changeAllowPDF } from '../../actions/pdf_upload'

import '../components.css'

const customStyles = {
  table:{
    style:{
      borderRadius : '10px'
    }
  },
  rows: {
    style: {
      minHeight: '52px', // override the row height
      fontSize:'14px'
    }
  },
  headCells: {
    style: {
      paddingLeft: '8px', // override the cell padding for head cells
      paddingRight: '8px',
      fontSize:'16px',
      background:'#28A745'
    },
  },
  cells: {
    style: {
      paddingLeft: '8px', // override the cell padding for data cells
      paddingRight: '8px',
    },
  },
};

const AdminDashboard = ({
  auth:{ users },
  pdf:{ allpdfs },
  getAllUsers,
  getAllPDFS,
  changeAllowUser,
  changeAllowPDF
}) => {

  const openPDF = (name) => {
    window.open(`http://localhost:5000/api/pdf/${name}`)
  }

  const userColumuns = [
    {
      name: 'Name',
      selector: row => `${row.name}`,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => `${row.email}`,
      sortable: true,
    },
    {
      name: 'Create_at',
      selector: row => <Moment format="YYYY/MM/DD hh:mm">{row.date}</Moment>,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => `${row.role}`,
      cell: row => { 
        if(row.role === 1) {
          return (<div className="ok"/> )
        } else { 
          return (<div className="pending"/> )
        }
      },
      sortable: true,
      center: true
    },
    {
      name: 'Action',
      selector: row => `${row.role}`,
      cell: row => {
        if(row.role === 1) {
          return ( <button className="btn btn-danger" onClick={()=> changeAllowUser(row._id)}>Remove</button> )
        } else { 
          return ( <button className="btn btn-success" onClick={()=>changeAllowUser(row._id)}>Allow</button>  )
        }
      },
      width:'15%',
      center: true,
      sortable: true
    }
  ];

  const pdfColumuns = [
    {
      name: "Title",
      selector: row => <div data-tag="allowRowEvents" onClick={() => openPDF( row.changedName )} style={{ color:'blue', cursor:'pointer'}}>{row.title}</div>,
      sortable: true,
      width:'20%'
    },
    {
      name: "Uploader",
      selector: row => `${row.uploader}`,
      sortable: true,
    },
    {
      name: "Description",
      selector: row => `${row.description}`,
      width:'15%'
    },
    {
      name: "Create_at",
      selector: row => <Moment format="YYYY/MM/DD hh:mm">{row.create_at}</Moment>,
      sortable: true
    },
    {
      name: "Views",
      selector: row => `${row.views}`,
      sortable: true,
      right: true,
    },
    {
      name: 'Status',
      selector: row => `${row.status}`,
      cell: row => { 
        if(row.status === 1) {
          return (<div className="ok"/> )
        } else { 
          return (<div className="pending"/> )
        }
      },
      sortable: true,
      center: true
    },
    {
      name: 'Action',
      selector: row => `${row.status}`,
      cell: row => {
        if(row.status === 1) {
          return ( <button className="btn btn-danger" onClick={() => changeAllowPDF(row._id)}>Remove</button> )
        } else { 
          return ( <button className="btn btn-success" onClick={() => changeAllowPDF(row._id)}>Allow</button>  )
        }
      },
      width:'15%',
      center: true,
      sortable: true
    }
  ]
  useEffect(() => {
    getAllUsers();
    getAllPDFS();
  }, [getAllUsers]);
  
  return (
    <div className="admin">
      <div className="userlist">
        <p className="mt-5 mb-3 lead">
          <i className="fas fa-user"/> 
          {' '}User Lists
        </p>
       <DataTable
          columns={userColumuns}
          data = { users? users:''}
          customStyles={customStyles}
          selectableRows
          pagination
          defaultSortFieldId={1}
          striped
          defaultSortAsc={true}
          defaultSortField="title"
        />
      </div>
      <div className="pdflist">
        <p className="mt-5 mb-3 lead">
          <i className="fas fa-file-pdf"/> 
          {' '}PDF Lists
        </p>
       <DataTable
          columns={pdfColumuns}
          data = { allpdfs? allpdfs:''}
          customStyles={customStyles}
          selectableRows
          pagination
          defaultSortFieldId={1}
          striped
          defaultSortAsc={true}
          defaultSortField="title"
        />
      </div>
    </div>
  )
}

AdminDashboard.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  getAllPDFS: PropTypes.func.isRequired,
  changeAllowUser: PropTypes.func,
  changeAllowPDF: PropTypes.func
};

const mapStateToProps = (state) => ({
  users : state.users,
  auth: state.auth,
  pdf: state.pdf
});

export default connect(mapStateToProps, { getAllUsers, getAllPDFS, changeAllowUser, changeAllowPDF })(
  AdminDashboard
);
