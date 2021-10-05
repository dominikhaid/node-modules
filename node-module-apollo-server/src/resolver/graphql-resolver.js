const resolvers = {
  Query: {
    users: (root, args, {dataSources}) => dataSources.data.getUsers(),
    // slugpost: (root, { search }, { dataSources }) =>
    //   dataSources.wpRest.getSlugPost(search),
  },
};
module.exports = resolvers;
