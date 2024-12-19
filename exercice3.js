// Augmenter l'âge des étudiants avec une moyenne inférieure à 13
db.students.updateMany(
    { grade: { $lt: 13 } },
    { $inc: { age: 1 } }
  );
  
  // Modifier la moyenne d'Alice
  db.students.updateOne(
    { name: "Alice" },
    { $set: { grade: 18 } }
  );
  