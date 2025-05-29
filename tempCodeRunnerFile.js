// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('aggregation_pipeline');

// Create a new document in the collection.
db.getCollection('books').insertMany({
    [
        {
          "id": 1,
          "title": "Pride and Prejudice",
          "author_id": 100,
          "genre": "Romance"
        },
        {
          "id": 2,
          "title": "Adventures of Huckleberry Finn",
          "author_id": 101,
          "genre": "Adventure"
        },
        {
          "id": 3,
          "title": "1984",
          "author_id": 102,
          "genre": "Dystopian"
        },
        {
          "id": 4,
          "title": "To the Lighthouse",
          "author_id": 103,
          "genre": "Modernist"
        },
        {
          "id": 5,
          "title": "One Hundred Years of Solitude",
          "author_id": 104,
          "genre": "Magical Realism"
        }
      ]
    ]      
});
