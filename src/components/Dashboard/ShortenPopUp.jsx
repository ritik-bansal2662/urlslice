import React, { useState } from 'react'
import Modal from '@mui/material/Modal';
import CreateNewShorten from './CreateNewShorten';

const ShortenPopUp = ({open, setOpen, refetch }) => {
    const handleClose = () => {
        setOpen(false)
    }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <div className='flex justify-center items-center h-full w-full'>
          <CreateNewShorten setOpen={setOpen} refetch={refetch} />
      </div>
      </Modal>
    </div>
  )
}

export default ShortenPopUp
