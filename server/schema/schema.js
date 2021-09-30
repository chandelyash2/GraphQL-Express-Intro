const graphql = require("graphql");
const _ = require("lodash");
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLInt,GraphQLList } = graphql;

var books = [
  { name: "The last kingdom", genre: "Thriller", id: "1",authorID:"1" },
  { name: "The 100", genre: "Sci-fi", id: "2" ,authorID:"2"},
  { name: "The Final Empire", genre: "Fantasy", id: "3",authorId:"3" },
  {name:'The Color of Magic', genre:'Fantasy',id:"4",authorID:'2'},
  {name:"The Gablin",genre:'thriller',id:'5',authorID:"2"}
];
var authors = [
  {
    name: "Patrick",
    age: 34,
    id: "1",
  },
  { name: "Brandon", age: 42, id: "2" },
  { name: "Terry Rchardson", age: 48, id: "3" },
];
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author:{
        type:AuthorType,
        resolve(parent,args){
           
            return _.find(authors,{id:parent.authorID})
        }
    }
  }),
});
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books:{
        type:new GraphQLList(BookType),
        resolve(parent,args){
return _.filter(books,{authorID:parent.id})
        }
    }
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
