import PropTypes from "prop-types";

const DeleteModal = ({ show, onClose, onDelete }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold">Confirm Deletion</h2>
        <p className="mb-6 text-gray-600">
          Are you sure you want to delete this product?
        </p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 text-white bg-gray-500 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 text-white bg-red-500 rounded"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteModal;
