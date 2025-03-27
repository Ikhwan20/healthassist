document.getElementById("calculate-btn").addEventListener("click", function() {
    const lmpInput = document.getElementById("lmp").value;
    const dueDateDisplay = document.getElementById("due-date");
  
    if (!lmpInput) {
      alert("Please select your last menstrual period (LMP) date.");
      return;
    }
  
    const lmpDate = new Date(lmpInput);
    const dueDate = new Date(lmpDate);
  
    // Add 280 days (40 weeks) to calculate the due date
    dueDate.setDate(dueDate.getDate() + 280);
  
    const options = { year: "numeric", month: "long", day: "numeric" };
    dueDateDisplay.textContent = dueDate.toLocaleDateString(undefined, options);
  });
  