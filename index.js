//fareezar, 4E0pUtc88ASmcklk
//run with  "npm start index.js"
// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const DB = "mongodb+srv://anngocthienpham:12Anpham24@cluster0.77miiza.mongodb.net/app-data?retryWrites=true&w=majority"
require('dotenv').config();
const cors = require('cors');

const Card = require('./models/card');
const User = require('./models/user');


// var allowedOrigins = process.env.allowedOrigins.split(',');

// using express, creating express app object
const app  = express();

// app.use(cors({
//     origin: function (origin, callback) {
//         // allow requests with no origin 
//         // (like mobile apps or curl requests)
//         if (!origin) return callback(null, true);

//        if (allowedOrigins.indexOf(origin) === -1) {
//            var msg = 'The CORS policy for this site does not ' + 'allow access from the specified Origin.';
//            return callback(new Error(msg), false);
//        }
//        return callback(null, true);
//    }
// }));

//using body-parser middleware
app.use(bodyParser.json());

const schema = buildSchema(`
    type Card {
        _id : ID!
        major: String!
        studyClass: String!
        tags: String!
        datetime: [String]
        location: String!
        creator : ID!

     }

     type User {
        _id : ID!
        major: String!
        email: String!
        username : String!
        name: String!
        userimg: String
        studyClass: String
        tags: String!
        joinedGroups: [ID]
     }

    input CardInput{
        major: String!
        studyClass: String!
        tags: String!
        datetime: [String]
        location: String!

    }

    input UserInput {
        email: String!
        major: String!
        username : String!
        name: String!
        userimg: String
        tags: String!
        studyClass: String
        joinedGroups: [ID]
    }

     type Query {
        cards: [Card!]!
        users: [User!]! 
        getUserById(_id: ID!): User!
     }

    type Mutation {
        createCard(cardInput: CardInput): Card
        createUser(userInput: UserInput): User

    }
    schema {
        query: Query
        mutation: Mutation
    }
 `);


const rootValue = {
    cards: () => {
        return Card.find().then(cards => {
            return cards.map(card => {
                return { ...card._doc, _id: card.id };
            });
        }).catch(err => {
            throw err;
        });
    },

    createCard: args => {
       const card = new Card({
        major: args.cardInput.major,
        studyClass: args.cardInput.studyClass,
        tags: args.cardInput.tags,
        datetime: new datetime (args.cardInput.datetime),
        location: args.cardInput.location,
        creator: '64201ac03649cbcd8c204ddb',
       }); 
       let createdCard;
        return card.save().then(result => {
            createdCard = { ...result._doc, _id: result.id};
            return User.findById("64201ac03649cbcd8c204ddb")}).then(user => {
            if (!user) {
                throw new Error ('User not found.');
            }
            user.createdCards.push(card);
            return user.save();
        }).then(result => {
            return createdCards;
        })
        .catch(err =>{
            console.log(err);
            throw err;
        }); 
     },

     createUser : args => {
        const user = new User ({
            email: args.userInput.email,
            major: args.userInput.major,
            studyClass: args.userInput.studyClass,
            tags: args.userInput.tags,
            username: args.userInput.username,
            name: args.userInput.name,
            joinedGroups: args.userInput.joinedGroups,
            userimg : args.userInput.userimg
        });
        return user.save().then(result => {
            console.log(result);
            return { ...result._doc, _id: result.id}
        }).catch(err =>{
            console.log(err);
            throw err;
        });
     }, 
     getUserById : args => {
        return User.findOne({_id: args._id}).then((user) => {
            return {
                ...user._doc,
                _id: user._id
            }
        })
     }
};


//end point - only one, middleware function (has schemas within)
app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        rootValue,
        graphiql:true,
    })
);
    


app.get('/graphiql', (req, res) => {
    res.redirect('/graphql');
});

app.get('/', (req, res, next) => {
    res.send('Hello World!');
})

mongoose.connect(DB).then(() => {
    console.log('Connection Successful');
}).catch(e => {
    console.log(e);
});

// listening on port
app.listen(3000);