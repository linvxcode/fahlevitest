import React from "react";
import { motion, AnimatePresence} from "framer-motion";


function Modal({ isOpen, onClose, title ,name}) {
  function handleSubmit(event) {
    onClose(true);
  }
  return (
    <div className="container">
          <AnimatePresence>
      {isOpen && (
        <motion.div className="modal bg-black">
        <motion.div 
          className="modal "
          initial={{ opacity: 0, scale: 0.5}}
          animate={{ opacity: 1, scale: 1}}
          // transition={{type: "spring",bounce: 0.2,duration: 0.8, opacity: 1}}
          exit={{ opacity: 0 ,scale: 0.5}}
        >
          <motion.div 
          className="modal-content">
            <motion.span className="close-button" onClick={onClose}>
              &times;
            </motion.span>
            <label className="label-input">
              Category
              </label>
            <input
              type="text"
              name="text"
              defaultValue={title}
              className="input"
            />
            <label className="label-input">
              Name
              </label>
            <input
              type="text"
              name="text"
              defaultValue={name}
              className="input"
            />
            <button onClick={handleSubmit}>Submit</button>
          </motion.div>
        </motion.div>
        </motion.div>
       )} 
    </AnimatePresence>
    </div>
  );
}

export default Modal;
