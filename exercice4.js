// Supprimer les étudiants avec une moyenne inférieure à 12
db.students.deleteMany({ grade: { $lt: 12 } });

// Supprimer l'étudiant nommé "Charlie"
db.students.deleteOne({ name: "Charlie" });
