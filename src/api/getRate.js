import Post from '../api/post';
export default  function getRates (user, category) {
const data = {
    category : category
}
const ENDPOINT ='/rating';
 return Post (ENDPOINT, user, data)
}