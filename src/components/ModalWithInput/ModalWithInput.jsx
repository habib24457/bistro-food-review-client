import { baseApiurl } from "../../api";
import "./ModalWithInput.css";
import axios from "axios";

const ModalWithInput = ({
  isModalOpen,
  inputMealData,
  setInputMealData,
  onClose,
}) => {
  const handleSubmit = async () => {
    try {
      const { id, editedMealName } = inputMealData;
      console.log("Updated Meal Name:", id, editedMealName);

      const response = await axios.put(
        `http://localhost:5175/api/meal/editName/${id}`,
        { editedMealName }
      );

      console.log("Meal updated successfully:", response.data);
      onClose();
    } catch (error) {
      console.error("Error updating meal:", error);
      alert("Failed to update the meal name");
    }
    onClose();
  };

  if (!isModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit Meal Name</h3>
        <input
          type="text"
          placeholder="Enter meal name"
          onChange={(e) =>
            setInputMealData({
              ...inputMealData,
              editedMealName: e.target.value,
            })
          }
        />
        <div className="modal-buttons">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ModalWithInput;
