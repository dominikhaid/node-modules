const {RESTDataSource} = require('apollo-datasource-rest');

class GQLRest extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://jsonplaceholder.typicode.com';
  }

  willSendRequest(request) {
    //console.log(request.params)
    //console.log(request.headers)
    // console.log(request.path);
  }

  async getUsers() {
    const response = await this.get('users');
    let res;
    if (!Array.isArray(response)) return (res = this.usersReducer(response));
    if (
      response.length > 1 && Array.isArray(response)
        ? (res = response.map(post => this.usersReducer(post)))
        : (res = this.usersReducer(response[0]))
    );
    return res;
  }

  // async getAllPages() {
  //   const response = await this.get('pages')
  //   if (!Array.isArray(response)) return (res = this.postReducer(response))

  //   if (
  //     response.length > 1 && Array.isArray(response)
  //       ? (res = response.map((post) => this.postReducer(post)))
  //       : (res = this.postReducer(response[0]))
  //   );
  //   return res
  // }

  // async getCatPosts() {
  //   const response = await this.get('category/print-design')
  //   if (!Array.isArray(response)) return (res = this.postReducer(response))

  //   if (
  //     response.length > 1 && Array.isArray(response)
  //       ? (res = response.map((post) => this.postReducer(post)))
  //       : (res = this.postReducer(response[0]))
  //   );
  //   return res
  // }

  // async getAllPosts() {
  //   const response = await this.get('posts')
  //   if (!Array.isArray(response)) return (res = this.postReducer(response))

  //   if (
  //     response.length > 1 && Array.isArray(response)
  //       ? (res = response.map((post) => this.postReducer(post)))
  //       : (res = this.postReducer(response[0]))
  //   );
  //   return res
  // }

  // async getItemSearch(search) {
  //   const response = await this.get(`search/`, { search: search })
  //   let res

  //   if (!Array.isArray(response)) return (res = this.postReducer(response))

  //   if (
  //     response.length > 1 && Array.isArray(response)
  //       ? (res = response.map((post) => this.postReducer(post)))
  //       : (res = this.postReducer(response[0]))
  //   );
  //   return res
  // }

  // async getSlugPost(search) {
  //   const response = await this.get(`post/${search}`)
  //   console.log(response.length)
  //   let res

  //   if (!Array.isArray(response)) return (res = this.postReducer(response))

  //   if (
  //     response.length > 1 && Array.isArray(response)
  //       ? (res = response.map((post) => this.postReducer(post)))
  //       : (res = this.postReducer(response[0]))
  //   );
  //   return res
  // }

  usersReducer(data) {
    return {
      name: data.name || '',
      username: data.username || '',
      email: data.email || '',
    };
  }

  // pagesReducer(data) {
  //   return {
  //     id: data.id || 0,
  //     title: data.title || '',
  //     slug: data.slug || '',
  //     excerpt: data.excerpt || '',
  //     yoast: data.yoast || '',
  //     media: data.media || '',
  //   }
  // }

  // postReducer(data) {
  //   return {
  //     id: data.id,
  //     title: data.title,
  //     slug: data.slug,
  //     excerpt: data.excerpt,
  //     content: data.content,
  //     date_modified: data.date_modified,
  //   }
  // }
}

module.exports = GQLRest;
