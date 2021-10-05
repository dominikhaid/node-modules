const {ApolloServer} = require('apollo-server-express');

function startServer(app, serverOptions, protocol) {
  const GQLRest = require('../routers/gql-user');
  const json = require('../querys/schema');
  const jsonReslover = require('../resolver/graphql-resolver');

  let resolvers = {
    ...jsonReslover,
    // ...spaceXResolver,
  };
  resolvers.Query = {
    ...jsonReslover.Query,
    // ...spaceXResolver.Query,
  };

  const filterFields = obj => {
    let queryFields,
      querys = [];
    for (const iterator of obj) {
      if (iterator.name.value === 'Query') {
        //console.log(iterator.fields)
        queryFields = iterator.fields;
      } else {
        querys.push(iterator);
      }
    }
    return [queryFields, querys];
  };

  let [userQuery, userQuierys] = filterFields(json.definitions);
  // let [spaceQuery, spaceQuierys] = filterFields(spaceX.definitions);

  let typeDefs = {
    kind: 'Document',
    definitions: [
      {
        kind: 'ObjectTypeDefinition',
        description: undefined,
        name: {kind: 'Name', value: 'Query'},
        interfaces: [],
        directives: [],
        // fields: [...userQuery, ...spaceQuery],
        fields: [...userQuery],
      },
      ...userQuierys,
      // ...spaceQuierys,
    ],
  };

  const schema = new ApolloServer({
    // context: async ({req, res}) => {
    //   const auth = (req.headers && req.headers.authorization) || '';
    //   const email = Buffer.from(auth, 'base64').toString('ascii');
    //   if (!isEmail.validate(email))
    //   return { user: null }
    //   const users = await store.users.findOrCreate({
    //     where: {email},
    //   });
    //   const user = (users && users[0]) || null;
    //   return {user: {...user.dataValues}};
    // },
    typeDefs,
    resolvers,
    playground: {
      endpoint: '/graphql',
      settings: {'editor.theme': 'dark', 'schema.polling.enable': false},
    },
    engine: {
      apiKey: process.env.ENGINE_API_KEY,
      graphVariant: 'production',
    },
    dataSources: () => ({
      data: new GQLRest(),
      // launchAPI: new LaunchAPI(),
      // userAPI: new UserAPI({store}),
    }),
  });

  schema.applyMiddleware({app});

  port = process.env.PORT || 5000;
  if (protocol.httpServer) protocol.httpServer.listen(port);
  if (protocol.httpsServer) protocol.httpsServer.listen(port);
  if (!protocol.httpServer && !protocol.httpsServer) app.listen(port);
}

module.exports.startServer = startServer;
