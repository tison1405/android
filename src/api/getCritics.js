import Post from '../api/post';
export default  function getCritics (user, category, rating, trib) {
const data = {
    category : category,
    rating : rating,
    trib : trib
}
const ENDPOINT ='/critic/get';
 return Post (ENDPOINT, user, data)
}