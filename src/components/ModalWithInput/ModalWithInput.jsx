import "./ModalWithInput.css";
import api from "../../api";

const ModalWithInput = ({
  isModalOpen,
  inputMealData,
  setInputMealData,
  onClose,
  selectedMealOption,
  isEditMode,
  fetchDailyMenu,
}) => {
  const handleUpdateSubmit = async () => {
    try {
      const { id, editedMealName } = inputMealData || {};
      if (!editedMealName || !editedMealName.trim()) {
        alert("⚠️ Meal name cannot be empty.");
        return;
      }

      /*const response = await axios.put(
         `http://localhost:5175/api/meal/editName/${id}`,
         { editedMealName }
       );*/
      const response = await api.put(`/meal/editName/${id}`, {
        editedMealName,
      });
      alert("✅ Meal name updated successfully!");
      console.log("Meal updated successfully:", response?.data);
      if (fetchDailyMenu) await fetchDailyMenu();
      onClose();
    } catch (error) {
      console.error("Error updating meal:", error);
      alert("❌ Failed to update the meal name");
    }
    onClose();
  };

  const handleAddNewMealSubmit = async () => {
    try {
      const mealOptionId = selectedMealOption?.id;
      const today = new Date();
      const date = today.toISOString();
      const editedMealName = inputMealData?.editedMealName;
      if (!editedMealName || !editedMealName.trim()) {
        alert("⚠️ Meal name cannot be empty.");
        return;
      }

      const response = await api.post("/meal/createMeal", {
        mealOptionId,
        date,
        editedMealName,
      });
      console.log("Meal added successfully:", response.data);
      alert("✅ Meal added successfully!");
      if (fetchDailyMenu) await fetchDailyMenu();
      onClose();
    } catch (error) {
      console.error("Failed to add meal:", error);
      alert("❌ Failed to add meal");
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{isEditMode ? "Edit Meal Name" : "Add New Meal"}</h3>{" "}
        <input
          type="text"
          placeholder="Enter meal name"
          value={inputMealData?.editedMealName || ""}
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
