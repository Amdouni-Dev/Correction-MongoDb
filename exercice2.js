// Étudiants avec une moyenne supérieure à 15
db.students.find({ grade: { $gt: 15 } }).pretty();

// Étudiant avec le nom "Bob"
db.students.find({ name: "Bob" }).pretty();
