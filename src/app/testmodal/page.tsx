"use client";
import React, { useState } from "react";
import { Modal } from "antd";

export default function Page() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div>
      <button onClick={openModal} className="btn">
        Open Form
      </button>
      <Modal
        open={modalIsOpen}
        onCancel={closeModal}
        title="Google Form Modal"
        width={800}
        footer={null}
      >
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSf315SBjmPQkJ422Kpo2PUhL9NUxLXSbi5rQRol7KEErEPwtw/viewform"
          width="100%"
          height="700px"
          style={{ overflow: "hidden" }}
        >
          Đang tải…
        </iframe>
      </Modal>
    </div>
  );
}
