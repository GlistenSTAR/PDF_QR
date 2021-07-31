import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DataTable from "react-data-table-component";
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Moment from 'react-moment';
import api from '../../utils/api';


import { upload_pdf, getPDFs } from '../../actions/pdf_upload';

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
      background:'rgb(101 101 243 / 69%)'
    },
  },
  cells: {
    style: {
      paddingLeft: '8px', // override the cell padding for data cells
      paddingRight: '8px',
    },
  },
};

const openPDF = (name, id) => {
  window.open(`http://localhost:5000/api/pdf/${name}`);
}

const columns = [
  {
    name: "Title",
    cell: row => <div data-tag="allowRowEvents" onClick={()=>openPDF(row.meta_data.filename, row._id)}><div style={{ color:'blue', cursor:'pointer'}}>{row.title}</div></div>,
    sortable: true,
    width:'20%'
  },
  {
    name: "Uploader",
    cell: row => `${row.uploader}`,
    sortable: true,
    width:'10%'
  },
  {
    name: "Description",
    cell: row => `${row.description}`,
    width:'40%'
  },
  {
    name: "Create_at",
    cell: row => <Moment format="YYYY/MM/DD hh:mm">{row.create_at}</Moment>
  },
  {
    name: "Views",
    cell: row => `${row.views}`,
    width:'10%',
    sortable: true,
    right: true,
  }
];

const Dashboard = ({
  auth: { user },
  pdf, 
  upload_pdf,
  history,
  getPDFs
}) => {

  const [openModal, setOpenModal] = useState(false);
  const [selectFile, setSelectFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  useEffect(() => {
    getPDFs();
  }, [getPDFs]);


  const onChangeHandler =(e) => {
    setSelectFile(e.target.files[0]);
  }

  const onClickHandler = (e) => {
    e.preventDefault();
    upload_pdf(selectFile, formData, history, user)
  }
  
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  

  return (
    <>
      <Fragment>
        <h1 className="large text-primary mt-5">Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user"/> Welcome {user && user.name}
        </p>
          <Fragment>
            <button className="btn btn-success my-1 btn-lg" onClick={() => setOpenModal(true)}>
              Upload New PDF
            </button>
            <span className="text-danger" style={{display:'flex', alignItems:'center', justifyContent: 'center'}}>You can upload the new pdf on here.</span>  

            <p className="mt-5 mb-3 lead">
              <i className="fas fa-file-pdf"/> 
              {' '}PDF Lists
            </p>
            <div className="list_pdf">
              <DataTable
                columns={columns}
                data={pdf.pdfs ? pdf.pdfs:''}
                defaultSortFieldId={1}
                pagination
                customStyles={customStyles}
                selectableRows
                striped
                pointerOnHover
              />
            </div>
          </Fragment>

          <Modal 
            show={openModal} 
            onHide={()=> setOpenModal(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
              <Modal.Header closeButton>
                <Modal.Title>Upload PDF</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={ onClickHandler } className="form">
                  <div className="form-group mt-2">
                    <label htmlFor="file">Select PDF : {' '}</label><br></br>
                    <input type="file" name="file" onChange={onChangeHandler}  accept=".pdf"/>
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="title">Title : </label>
                    <input type="text" name="title" className="form-control" onChange = { onChange }/>
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="description">Description : </label>
                    <textarea name="description" className="form-control" onChange = { onChange } rows="4"/>
                  </div>
                  <div className="form-group mt-2">
                    <button type="submit" className="btn btn-success from-control">Save</button>
                  </div>
                </form>
              </Modal.Body>
          </Modal>
      </Fragment>
    </>
  );
};

Dashboard.propTypes = {
  upload_pdf: PropTypes.func,
  getPDFs : PropTypes.func,
  auth: PropTypes.object.isRequired,
  pdf: PropTypes.object
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  pdf : state.pdf
});

export default connect(mapStateToProps, { upload_pdf, getPDFs })(
  Dashboard
);
