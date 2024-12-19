use ecommerceDB;

// 1. Insérer les commandes
db.orders.insertMany([
  {
    orderId: "001",
    customer: { name: "John Doe", email: "john.doe@example.com" },
    items: [
      { productName: "Laptop", price: 1000, quantity: 1 },
      { productName: "Mouse", price: 25, quantity: 2 }
    ],
    orderDate: new Date(), // Aujourd'hui
    status: "pending"
  },
  {
    orderId: "002",
    customer: { name: "Jane Smith", email: "jane.smith@example.com" },
    items: [
      { productName: "Headphones", price: 100, quantity: 1 },
      { productName: "Keyboard", price: 50, quantity: 1 }
    ],
    orderDate: new Date(new Date().setDate(new Date().getDate() - 1)), // Hier
    status: "shipped"
  }
]);

// 2.a Trouver les commandes avec un statut "pending"
db.orders.find({ status: "pending" }).pretty();

// 2.b Calculer le montant total de chaque commande

/**
NB:Une seule $ est utilisée pour désigner des champs
 d'un document dans la collection.

Exemple : "$price" fait référence au champ price dans un document.
Les doubles $$ indiquent une variable définie 
dans le contexte de l'opérateur d'agrégation.
 Ces variables sont utilisées dans des sous-contextes
  comme les expressions passées à $map, $reduce, 
  etc. Elles permettent de distinguer les champs du document principal 
  et les variables créées dans ces opérateurs.
*/
db.orders.aggregate([
  {
    $addFields: {
      totalAmount: {
        $sum: {
          $map: {
            input: "$items",
            as: "item",
            in: { $multiply: ["$$item.price", "$$item.quantity"] }
          }
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      orderId: 1,
      customer: 1,
      totalAmount: 1
    }
  }
]).pretty();

// 2.c Modifier le statut de la commande de John Doe en "shipped"
db.orders.updateOne(
  { "customer.name": "John Doe" },
  { $set: { status: "shipped" } }
);

// 2.d Supprimer les commandes passées il y a plus d'un jour
db.orders.deleteMany({
  orderDate: { $lt: new Date(new Date().setDate(new Date().getDate() - 1)) }
});
