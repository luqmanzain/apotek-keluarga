import React from "react";
import "./ModalLogout.css";
import Image from "../../image";

const ModalLogout = ({ show, onClose, onSubmit }) => {
    const modalStyle = {
        display: show ? "block" : "none",
    };

    const backdropStyle = {
        display: show ? "block" : "none",
    };


    return (
        <>
            <div className={`modal-backdrop fade${show ? " show" : ""}`} style={backdropStyle}></div>
            <div className={`modal${show ? " show" : ""}`} tabIndex="-1" style={modalStyle} role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body  text-center">
                            <div className="col-12">
                                <img src={Image.admin} height="80px" width="80px" alt="" className="mb-3" />
                            </div>
                            <h5>Apakah Anda Yakin Ingin Keluar?</h5>
                            <p>Pastikan semua pekerjaan telah disimpan sebelum keluar</p>
                            <div className="row button-footer-logout d-flex flex-row justify-content-end">
                                <div className="col-3">
                                    <button type="button" className="btn btn-outline-primary" onClick={onClose}>
                                        Batal
                                    </button>
                                </div>
                                <div className="col-3">
                                    <button type="button" className="btn btn-danger" onClick={onSubmit}>
                                        Keluar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalLogout