import { baseApiurl } from "../../api";
import "./ModalWithInput.css";
import axios from "axios";

const ModalWithInput = ({
  isModalOpen,
  inputMealData,
  setInputMealData,
  onClose,
  selectedMealOption,
  isEditMode,
}) => {
  const handleUpdateSubmit = async () => {
    try {
      const { id, editedMealName } = inputMealData;
      //console.log("Updated Meal Name:", id, editedMealName);

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

  const handleAddNewMealSubmit = async () => {
    try {
      const mealOptionId = selectedMealOption?.id;
      const today = new Date();
      const date = today.toISOString();
      const editedMealName = inputMealData?.editedMealName;

      console.log("Meal Option ID:", mealOptionId);
      console.log("Date:", date);
      console.log("Edited Meal Name:", inputMealData?.editedMealName);

      const response = await axios.post(
        "http://localhost:5175/api/meal/createMeal",
        {
          mealOptionId,
          date,
          editedMealName,
        }
      );
      console.log("Meal added successfully:", response.data);
      alert("Meal added successfully!");
      onClose();
    } catch (error) {
      console.error("Failed to add meal:", error);
      alert("Failed to add meal");
    }
  };

  console.log("Modal inputMealData:", selectedMealOption);

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
          {isEditMode ? (
            <button onClick={handleUpdateSubmit}>Update meal name</button>
          ) : (
            <button onClick={handleAddNewMealSubmit}>Add new Meal</button>
          )}

          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ModalWithInput;
