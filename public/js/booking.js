// Data for appointment types
const appointments = {
    "general-checkup": {
        title: "General Health Checkup",
        image: "assets/general_checkup.jpg",
        description: "A full-body checkup to assess overall health and identify potential health risks.",
        tests: [
            "Blood Test",
            "Blood Pressure Monitoring",
            "Cholesterol Level Assessment",
            "Overall Health Risk Assessment"
        ],
        importance: [
            "Detects potential health risks early",
            "Promotes preventive healthcare and overall well-being."
        ],
        whenToSchedule: "Once annually or as recommended by your healthcare provider, depending on your age, lifestyle, and medical history."
    },
    "prenatal-checkup": {
        title: "Prenatal Checkup",
        image: "assets/prenatal_checkup.jpg",
        description: "A pregnancy checkup to monitor the health of both mother and baby.",
        tests: [
            "Ultrasound Scan",
            "Blood Pressure Monitoring",
            "Fetal Heartbeat Monitoring",
            "Nutritional Assessment"
        ],
        importance: [
            "Ensures the health and safety of the mother and baby.",
            "Detects complications early for timely intervention."
        ],
        whenToSchedule: "Monthly during the first two trimesters and every two weeks or weekly during the third trimester, as advised by your doctor."
    },
    "immunization-checkup": {
        title: "Immunization",
        image: "assets/immunization_checkup.jpg",
        description: "Routine immunizations to keep children and adults healthy.",
        tests: [
            "Vaccine Administration",
            "Allergy Reaction Monitoring",
            "Immune System Assessment"
        ],
        importance: [
            "Prevents life-threatening diseases.",
            "Strengthens the immune system to fight infections."
        ],
        whenToSchedule: "Follow the immunization schedule provided by your healthcare provider. Typically for children: at birth, 2 months, 6 months, 1 year, etc. For adults: as boosters or during specific seasons."
    },
    "xray-checkup": {
        title: "X-Ray Diagnosis",
        image: "assets/xray_diagnosis.jpg",
        description: "A scan to identify internal injuries or conditions.",
        tests: [
            "X-Ray Imaging",
            "Bone Fracture Assessment",
            "Chest X-Ray for Respiratory Issues",
            "Injury Diagnosis"
        ],
        importance: [
            "Provides a non-invasive way to diagnose internal injuries or abnormalities.",
            "Essential for accurate treatment planning."
        ],
        whenToSchedule: "As soon as you suspect an internal injury, fracture, or any condition requiring imaging, based on your doctor’s advice."
    },
    "eye-checkup": {
        title: "Eye Checkup",
        image: "assets/eye_checkup.jpeg",
        description: "A detailed vision and eye health checkup.",
        tests: [
            "Visual Acuity Test",
            "Eye Pressure Measurement",
            "Retinal Examination",
            "Optical Health Evaluation"
        ],
        importance: [
            "Detects vision problems early for corrective measures.",
            "Prevents eye diseases such as glaucoma or cataracts."
        ],
        whenToSchedule: "Annually for adults with no known issues. If you wear glasses or contact lenses, or have existing eye conditions, follow your optometrist's advice."
    },
    "postnatal-checkup": {
        title: "Postnatal Care",
        image: "assets/postnatal_checkup.png",
        description: "Timely postnatal care to ensure a healthy recovery for mothers and babies.",
        tests: [
            "Mother’s Physical Recovery Assessment",
            "Baby’s Growth and Development Monitoring",
            "Lactation Support",
            "Mental Health Screening"
        ],
        importance: [
            "Promotes a smooth recovery for mothers.",
            "Monitors the baby’s health and development for a strong start in life."
        ],
        whenToSchedule: "At 6 weeks after childbirth for the mother and as recommended by your pediatrician for the baby."
    }
};




// Function to load appointment details dynamically
function loadAppointment() {
    const params = new URLSearchParams(window.location.search);
    const appointmentType = params.get("type"); // Get 'type' from the URL

    if (appointments[appointmentType]) {
        const appointment = appointments[appointmentType];

        // Populate the page with the appointment details
        document.getElementById("appointment-title").textContent = appointment.title;
        document.getElementById("appointment-image").src = appointment.image;
        document.getElementById("appointment-name").textContent = appointment.title;
        document.getElementById("appointment-description").textContent = appointment.description;
        document.getElementById("appointment-schedule").textContent = appointment.whenToSchedule;


        const testsList = document.getElementById("tests-list");
        testsList.innerHTML = ""; // Clear any existing tests
        appointment.tests.forEach(test => {
            const li = document.createElement("li");
            li.textContent = test;
            testsList.appendChild(li);
        });

        appointmentImportance = document.getElementById("importance-text");
        appointmentImportance.innerHTML = ""; // Clear any existing importance
        appointment.importance.forEach(importance => {
            const li = document.createElement("li");
            li.textContent = importance;
            appointmentImportance.appendChild(li);
        });


    } else {
        alert("Invalid appointment type!");
    }
}

// Run the function when the page loads
window.onload = loadAppointment;
